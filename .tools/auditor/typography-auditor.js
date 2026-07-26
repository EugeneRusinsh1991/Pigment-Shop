const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '04-typography-violations.log');

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const typoMatch = line.match(/\b(fontSize|fontWeight|fontFamily|letterSpacing|lineHeight)\s*:\s*/);
    const normalizedPath = filePath.replace(/\\/g, '/');
    const isWhitelisted =
      normalizedPath.endsWith('tokens.js') ||
      normalizedPath.endsWith('typography.js') ||
      normalizedPath.endsWith('TextStyles.js') ||
      normalizedPath.endsWith('TextFieldStyles.js') ||
      normalizedPath.includes('src/components/icons/');

    if (typoMatch && !isWhitelisted && !line.includes('//')) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: line.trim()
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

function auditTypography() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  walkDir(SRC_DIR, rawViolations);
  const violations = deduplicate(rawViolations);

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               4. TYPOGRAPHY COMPLIANCE REPORT                     \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    if (fs.existsSync(LOG_FILE)) {
      try { fs.unlinkSync(LOG_FILE); } catch (_) {}
    }
    console.log('[04 Typography Audit] Finished (0 unique issues) -> Clean');
  } else {
    const grouped = {};
    violations.forEach(v => {
      const [filePath, lineNum] = v.location.split(':');
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push({ lineNum: lineNum || '', details: v.details });
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} typography issue(s) across ${fileCount} file(s):\n\n`;

    Object.entries(grouped).forEach(([filePath, items]) => {
      report += `File: ${filePath}\n`;
      items.forEach((item) => {
        const lineStr = item.lineNum ? `L${item.lineNum}` : '';
        report += `  ${lineStr.padEnd(6)} ${item.details}\n`;
      });
      report += `\n`;
    });

    fs.writeFileSync(LOG_FILE, report);
    console.log(`[04 Typography Audit] Finished (${violations.length} unique issues) -> .docs/audits/audits/04-typography-violations.log`);
  }
}

module.exports = { auditTypography };

if (require.main === module) auditTypography();
