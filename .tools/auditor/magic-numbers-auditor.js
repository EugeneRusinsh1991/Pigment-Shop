const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '08-magic-numbers-violations.log');

const ALLOWED_FILES = ['tokens.js', 'theme.js', 'constants.js', 'spacing.js'];

function scanFile(filePath, violations) {
  const fileName = path.basename(filePath);
  if (ALLOWED_FILES.some(allowed => fileName.endsWith(allowed))) return;

  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;

    // 1. Hardcoded timeouts in setTimeout / setInterval
    const timeoutMatch = line.match(/\b(setTimeout|setInterval)\s*\([^,]+,\s*(\d{3,})\)/);
    if (timeoutMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Timeout delay ${timeoutMatch[2]}ms in ${timeoutMatch[1]}`
      });
    }

    // 2. Off-grid spacing magic numbers
    const spacingMatch = line.match(/\b(margin|padding|marginTop|marginBottom|marginLeft|marginRight|marginHorizontal|marginVertical|paddingTop|paddingBottom|paddingLeft|paddingRight|paddingHorizontal|paddingVertical|gap|rowGap|columnGap)\s*:\s*(\d+)/);
    if (spacingMatch) {
      const val = parseInt(spacingMatch[2], 10);
      const validGrid = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128];
      if (!validGrid.includes(val)) {
        violations.push({
          location: `${relPath}:${index + 1}`,
          details: `Off-grid ${spacingMatch[1]}: ${val}px`
        });
      }
    }
  });
}

function deduplicate(violations) {
  const seen = new Set();
  return violations.filter(v => {
    const key = `${v.location}|${v.details}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function walkDir(dirPath, violations) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, violations);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      scanFile(fullPath, violations);
    }
  }
}

function auditMagicNumbers() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  walkDir(SRC_DIR, rawViolations);
  const violations = deduplicate(rawViolations);

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               8. MAGIC NUMBERS REPORT                             \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    report += `SUCCESS: No magic number violations found!\n`;
  } else {
    const grouped = {};
    violations.forEach(v => {
      const [filePath, lineNum] = v.location.split(':');
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push({ lineNum: lineNum || '', details: v.details });
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} magic number issue(s) across ${fileCount} file(s):\n\n`;

    Object.entries(grouped).forEach(([filePath, items]) => {
      report += `File: ${filePath}\n`;
      items.forEach((item) => {
        const lineStr = item.lineNum ? `L${item.lineNum}` : '';
        report += `  ${lineStr.padEnd(6)} ${item.details}\n`;
      });
      report += `\n`;
    });
  }

  fs.writeFileSync(LOG_FILE, report);
  console.log(`[08 Magic Numbers Audit] Finished (${violations.length} unique issues) -> ${path.relative(path.join(__dirname, '../..'), LOG_FILE)}`);
}

if (require.main === module) {
  auditMagicNumbers();
}

module.exports = { auditMagicNumbers };
