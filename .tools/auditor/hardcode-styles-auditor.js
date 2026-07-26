const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits');
const LOG_FILE = path.join(AUDITS_DIR, '03-hardcode-styles-violations.log');

function scanFile(filePath, violations, isFixMode = false) {
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

  lines.forEach((line, index) => {
    // 1. Inline style prop usage in JSX
    if (line.includes('style={{') || (line.includes('style={') && !line.includes('styles.') && !line.includes('style={['))) {
      violations.push({
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
        violations.push({
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
        violations.push({
          type: 'HARDCODED_SPACING',
          location: `${relPath}:${index + 1}`,
          details: `${dimMatch[1]} ${dimMatch[2]}px -> ${line.trim()}`
        });
      }
    }
  });
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

function walkDir(dirPath, violations, isFixMode = false) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, violations, isFixMode);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      scanFile(fullPath, violations, isFixMode);
    }
  }
}

function auditStyles() {
  const isFixMode = process.argv.includes('--fix');
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  walkDir(SRC_DIR, rawViolations, isFixMode);
  const violations = deduplicate(rawViolations);

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `         3. HARDCODED STYLES, COLORS & SPACING REPORT              \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    report += `SUCCESS: No hardcoded styles, magic colors, or spacing issues found!\n`;
  } else {
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
        report += `  ${lineStr.padEnd(6)} [${item.type}] ${item.details}\n`;
      });
      report += `\n`;
    });
  }

  fs.writeFileSync(LOG_FILE, report);
  console.log(`[03 Hardcode Styles Audit] Finished (${violations.length} unique issues) -> .docs/audits/03-hardcode-styles-violations.log`);
}

module.exports = { auditStyles };

if (require.main === module) auditStyles();
