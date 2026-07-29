const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { deduplicate } = require('./auditor-utils');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '03-hardcode-styles-violations.log');
const STRICT_LOG_FILE = path.join(AUDITS_DIR, '03-hardcode-styles-strict-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '03-hardcode-styles-files.log');

// Disable raw/legacy report generation (keep strict AST report only)
const DISABLE_RAW_REPORTS = true;

const NAMED_COLORS = new Set(['red', 'blue', 'green', 'black', 'white']);

function isColorString(val) {
  return val.startsWith('#') || val.startsWith('rgb') || NAMED_COLORS.has(val);
}

function isHardcodedValue(node) {
  if (!node) return false;
  if (node.type === 'NumericLiteral') return true;
  if (node.type === 'StringLiteral') return isColorString(node.value.trim());
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

const COLOR_FIX_MAP = {
  '#ffffff': 'colors.white', '#fff': 'colors.white', '#FFFFFF': 'colors.white', '#FFF': 'colors.white',
  '#000000': 'colors.black', '#000': 'colors.black',
  '#E31B23': 'colors.accent', '#e31b23': 'colors.accent',
  '#EF4444': 'colors.danger', '#ef4444': 'colors.danger',
  '#16A34A': 'colors.success', '#16a34a': 'colors.success',
};

function applyColorFixes(content, filePath) {
  if (!content.includes('colors.') || filePath.endsWith('tokens.js') || filePath.endsWith('colors.js') || filePath.endsWith('theme.js')) {
    return content;
  }
  let modified = content;
  Object.entries(COLOR_FIX_MAP).forEach(([hex, token]) => {
    modified = modified.replace(new RegExp(`['"]${hex}['"]`, 'g'), token);
  });
  if (modified !== content) {
    fs.writeFileSync(filePath, modified, 'utf8');
  }
  return modified;
}

function getLineSnippet(lines, loc) {
  const lineNum = loc?.start?.line || 0;
  if (!lineNum) return { lineNum: 0, details: '' };
  const rawLine = (lines[lineNum - 1] || '').trim();
  const details = rawLine.length > 80 ? rawLine.slice(0, 80) + '...' : rawLine;
  return { lineNum, details };
}

function inspectJsxStyleAttribute(astPath, lines, relPath, strictViolations) {
  if (astPath.node.name?.name !== 'style') return;
  const value = astPath.node.value;
  if (value?.type !== 'JSXExpressionContainer') return;
  if (!checkInlineStyleViolations(value.expression)) return;

  const { lineNum, details } = getLineSnippet(lines, astPath.node.loc);
  strictViolations.push({
    type: 'INLINE_STYLE_OBJECT',
    location: `${relPath}:${lineNum}`,
    details
  });
}

function scanFile(filePath, rawViolations, strictViolations, isFixMode = false) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  if (isFixMode) {
    content = applyColorFixes(content, filePath);
  }
  const lines = content.split('\n');

  lines.forEach((line, index) => auditLineRaw(line, index, relPath, filePath, rawViolations));

  try {
    const ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties', 'objectRestSpread']
    });

    traverse(ast, {
      JSXAttribute(astPath) {
        inspectJsxStyleAttribute(astPath, lines, relPath, strictViolations);
      }
    });
  } catch (_) {}
}

const CODE_FILE_EXT_RE = /\.(js|jsx|ts|tsx)$/;

function walkDir(dirPath, rawViolations, strictViolations, isFixMode = false) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, rawViolations, strictViolations, isFixMode);
    } else if (entry.isFile() && CODE_FILE_EXT_RE.test(entry.name)) {
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

function writeRawReport(violations, timestamp) {
  if (DISABLE_RAW_REPORTS) return;
  if (violations.length === 0) {
    if (fs.existsSync(LOG_FILE)) try { fs.unlinkSync(LOG_FILE); } catch (_) {}
    return;
  }
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

function writeStrictReport(strictDeduplicated, timestamp) {
  if (strictDeduplicated.length === 0) {
    if (fs.existsSync(STRICT_LOG_FILE)) try { fs.unlinkSync(STRICT_LOG_FILE); } catch (_) {}
    return;
  }
  const { report } = generateReportText('3. HARDCODED STYLES REPORT (STRICT AST)', strictDeduplicated, timestamp);
  fs.writeFileSync(STRICT_LOG_FILE, report);
}

function auditStyles(disableDynamicAudits = false) {
  const isFixMode = process.argv.includes('--fix');
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  let strictViolations = [];
  walkDir(SRC_DIR, rawViolations, strictViolations, isFixMode);
  
  const violations = deduplicate(rawViolations);
  const strictDeduplicated = deduplicate(strictViolations);

  if (disableDynamicAudits) {
    console.log('[03 Hardcode Styles Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  writeRawReport(violations, timestamp);
  writeStrictReport(strictDeduplicated, timestamp);

  console.log(`[03 Hardcode Styles Audit] Finished (Raw: ${violations.length}, Strict AST: ${strictDeduplicated.length}) -> .docs/audits/audits/`);
}

module.exports = { auditStyles };

if (require.main === module) auditStyles();
