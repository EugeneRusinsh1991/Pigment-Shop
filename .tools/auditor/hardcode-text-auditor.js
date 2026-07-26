const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '02-hardcode-text-violations.log');

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const rawTextMatch = line.match(/>\s*([A-Za-zА-Яа-я0-9_\s]{3,})\s*</);
    if (rawTextMatch && !line.includes('{') && !line.includes('//') && !line.includes('/*')) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Raw text '${rawTextMatch[1].trim()}' in JSX: ${line.trim()}`
      });
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

function auditTextLiterals() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  walkDir(SRC_DIR, rawViolations);
  const violations = deduplicate(rawViolations);

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               2. HARDCODED TEXT LITERALS REPORT                   \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    report += `SUCCESS: No raw hardcoded text literals detected!\n`;
  } else {
    const grouped = {};
    violations.forEach(v => {
      const [filePath, lineNum] = v.location.split(':');
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push({ lineNum: lineNum || '', details: v.details });
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} raw text issue(s) across ${fileCount} file(s):\n\n`;

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
  console.log(`[02 Text Literals Audit] Finished (${violations.length} unique issues) -> .docs/audits/audits/02-hardcode-text-violations.log`);
}

module.exports = { auditTextLiterals };

if (require.main === module) auditTextLiterals();
