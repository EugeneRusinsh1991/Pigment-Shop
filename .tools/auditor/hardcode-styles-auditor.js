const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '03-hardcode-styles-violations.log');
const STRICT_LOG_FILE = path.join(AUDITS_DIR, '03-hardcode-styles-strict-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '03-hardcode-styles-files.log');

function isHardcodedValue(node) {
  if (!node) return false;
  // Literal numbers e.g. 12, 50, 100
  if (node.type === 'NumericLiteral') return true;
  // String colors e.g. '#fff', 'red', 'rgba(...)'
  if (node.type === 'StringLiteral') {
    const val = node.value.trim();
    if (val.startsWith('#') || val.startsWith('rgb') || ['red', 'blue', 'green', 'black', 'white'].includes(val)) {
      return true;
    }
  }
  return false;
}

function hasHardcodedProperties(objectNode) {
  if (!objectNode || objectNode.type !== 'ObjectExpression') return false;
  return objectNode.properties.some(prop => {
    if (prop.type === 'ObjectProperty') {
      return isHardcodedValue(prop.value);
    }
    return false;
  });
}

function checkInlineStyleViolations(node) {
  if (!node) return false;
  if (node.type === 'ObjectExpression') {
    return hasHardcodedProperties(node);
  }
  if (node.type === 'ArrayExpression') {
    return node.elements.some(elem => elem && elem.type === 'ObjectExpression' && hasHardcodedProperties(elem));
  }
  return false;
}

function scanFile(filePath, rawViolations, strictViolations, isFixMode = false) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  if (isFixMode && content.includes('colors.') && !filePath.endsWith('tokens.js') && !filePath.endsWith('colors.js') && !filePath.endsWith('theme.js')) {
    const map = {
      '#ffffff': 'colors.white', '#fff': 'colors.white', '#FFFFFF': 'colors.white', '#FFF': 'colors.white',
      '#000000': 'colors.black', '#000': 'colors.black',
      '#E31B23': 'colors.accent', '#e31b23': 'colors.accent',
      '#EF4444': 'colors.danger', '#ef4444': 'colors.danger',
      '#16A34A': 'colors.success', '#16a34a': 'colors.success',
    };
    let modified = content;
    Object.entries(map).forEach(([hex, token]) => {
      const regex = new RegExp(`['"]${hex}['"]`, 'g');
      modified = modified.replace(regex, token);
    });
    if (modified !== content) {
      fs.writeFileSync(filePath, modified, 'utf8');
      content = modified;
    }
  }
  const lines = content.split('\n');

  // --- RAW REGEX AUDIT (Legacy functionality) ---
  lines.forEach((line, index) => {
    // 1. Inline style prop usage in JSX
    if (line.includes('style={{') || (line.includes('style={') && !line.includes('styles.') && !line.includes('style={['))) {
      rawViolations.push({
        type: 'INLINE_STYLE',
        location: `${relPath}:${index + 1}`,
        details: line.trim()
      });
    }

    // 2. Hardcoded colors outside tokens / theme definitions
    if (!filePath.endsWith('tokens.js') && !filePath.endsWith('colors.js') && !filePath.endsWith('theme.js')) {
      const hexMatches = line.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g);
      const rgbMatches = line.match(/rgba?\([^)]+\)/gi);
      if (hexMatches || rgbMatches) {
        const found = [...(hexMatches || []), ...(rgbMatches || [])];
        rawViolations.push({
          type: 'HARDCODED_COLOR',
          location: `${relPath}:${index + 1}`,
          details: `${found.join(', ')} -> ${line.trim()}`
        });
      }
    }

    // 3. Hardcoded Magic Dimensions & Spacing
    if (!filePath.endsWith('tokens.js') && !filePath.endsWith('theme.js')) {
      const dimMatch = line.match(/\b(margin|marginTop|marginBottom|marginLeft|marginRight|marginVertical|marginHorizontal|padding|paddingTop|paddingBottom|paddingLeft|paddingRight|paddingVertical|paddingHorizontal|borderRadius|gap)\s*:\s*(\d+)/);
      if (dimMatch && !line.includes('//') && !line.includes('tokens.')) {
        rawViolations.push({
          type: 'HARDCODED_SPACING',
          location: `${relPath}:${index + 1}`,
          details: `${dimMatch[1]} ${dimMatch[2]}px -> ${line.trim()}`
        });
      }
    }
  });

  // --- STRICT AST AUDIT (Accurate functionality) ---
  try {
    const ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties', 'objectRestSpread']
    });

    traverse(ast, {
      JSXAttribute(astPath) {
        if (astPath.node.name.name === 'style') {
          const value = astPath.node.value;
          if (value && value.type === 'JSXExpressionContainer') {
            const expr = value.expression;
            if (checkInlineStyleViolations(expr)) {
              const lineNum = astPath.node.loc ? astPath.node.loc.start.line : 0;
              const rawLine = lineNum ? (lines[lineNum - 1] || '').trim() : '';
              const cleanCode = rawLine.length > 80 ? rawLine.slice(0, 80) + '...' : rawLine;
              strictViolations.push({
                type: 'INLINE_STYLE_OBJECT',
                location: `${relPath}:${lineNum}`,
                details: cleanCode
              });
            }
          }
        }
      }
    });
  } catch (_) {
    // Fallback if AST parsing fails
  }
}

function deduplicate(violations) {
  const seen = new Set();
  return violations.filter(v => {
    const key = `${v.type}|${v.location}|${v.details}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function walkDir(dirPath, rawViolations, strictViolations, isFixMode = false) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, rawViolations, strictViolations, isFixMode);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      scanFile(fullPath, rawViolations, strictViolations, isFixMode);
    }
  }
}

function generateReportText(title, violations, timestamp) {
  let report = `===================================================================\n`;
  report += `         ${title}              \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n`;
  report += `[PROMPT FOR AGENT]: Refactor hardcoded inline styles/colors in listed files.\n`;
  report += `Extract inline style objects to component styles or design tokens.\n`;
  report += `Do not alter runtime behavior or API props.\n`;
  report += `===================================================================\n\n`;

  const grouped = {};
  violations.forEach(v => {
    const [filePath, lineNum] = v.location.split(':');
    if (!grouped[filePath]) grouped[filePath] = [];
    grouped[filePath].push({ lineNum: lineNum || '', type: v.type, details: v.details });
  });

  const fileCount = Object.keys(grouped).length;
  report += `Found ${violations.length} issue(s) across ${fileCount} file(s):\n\n`;

  Object.entries(grouped).forEach(([filePath, items]) => {
    report += `File: ${filePath}\n`;
    items.forEach((item) => {
      const lineStr = item.lineNum ? `L${item.lineNum}` : '';
      const typeStr = (item.type === 'INLINE_STYLE' || item.type === 'INLINE_STYLE_OBJECT') ? '' : `[${item.type}] `;
      report += `  ${lineStr.padEnd(6)} ${typeStr}${item.details}\n`;
    });
    report += `\n`;
  });

  return { report, grouped, fileCount };
}

function auditStyles() {
  const isFixMode = process.argv.includes('--fix');
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  let strictViolations = [];
  walkDir(SRC_DIR, rawViolations, strictViolations, isFixMode);
  
  const violations = deduplicate(rawViolations);
  const strictDeduplicated = deduplicate(strictViolations);
  const timestamp = new Date().toLocaleString('ru-RU');

  // 1. Write Raw/Legacy Report
  if (violations.length === 0) {
    if (fs.existsSync(LOG_FILE)) try { fs.unlinkSync(LOG_FILE); } catch (_) {}
  } else {
    const { report, grouped, fileCount } = generateReportText('3. HARDCODED STYLES, COLORS & SPACING REPORT (RAW)', violations, timestamp);
    fs.writeFileSync(LOG_FILE, report);

    if (fileCount > 10) {
      let filesReport = "===================================================================\n";
      filesReport += "               FILES WITH ISSUES REPORT                            \n";
      filesReport += "Timestamp: " + timestamp + "\n";
      filesReport += "===================================================================\n\n";
      filesReport += "Found " + violations.length + " issue(s) across " + fileCount + " target(s):\n\n";
      
      Object.keys(grouped).forEach(filePath => {
        filesReport += "- " + filePath + " (" + grouped[filePath].length + " issues)\n";
      });
      
      fs.writeFileSync(FILES_LOG_FILE, filesReport);
    }
  }

  // 2. Write AST Strict Report
  if (strictDeduplicated.length === 0) {
    if (fs.existsSync(STRICT_LOG_FILE)) try { fs.unlinkSync(STRICT_LOG_FILE); } catch (_) {}
  } else {
    const { report } = generateReportText('3. HARDCODED STYLES REPORT (STRICT AST)', strictDeduplicated, timestamp);
    fs.writeFileSync(STRICT_LOG_FILE, report);
  }

  console.log(`[03 Hardcode Styles Audit] Finished (Raw: ${violations.length}, Strict AST: ${strictDeduplicated.length}) -> .docs/audits/audits/`);
}

module.exports = { auditStyles };

if (require.main === module) auditStyles();
