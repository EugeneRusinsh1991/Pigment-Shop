const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '09-a11y-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '09-a11y-files.log');

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Basic check for interactive elements without accessibilityLabel
    if (/(<TouchableOpacity|<Pressable|<Button|<TextInput)/.test(line)) {
      if (!line.includes('accessibilityLabel') && !line.includes('accessible')) {
        // Look ahead for multiline props is tricky with just regex line-by-line,
        // but this catches inline declarations missing a11y.
        // To reduce false positives, we only flag if the element closes on the same line or is a simple tag.
        if (line.includes('>')) {
           violations.push({
             location: `${relPath}:${index + 1}`,
             details: `Interactive element missing accessibilityLabel: ${line.trim().substring(0, 50)}...`
           });
        }
      }
    }
  });
}

function walkDir(dirPath, violations) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, violations);
    } else if (entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      scanFile(fullPath, violations);
    }
  }
}


function auditA11y(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const rawViolations = [];
  walkDir(SRC_DIR, rawViolations);
  const violations = deduplicate(rawViolations);

  if (disableDynamicAudits) {
    console.log('[09 Accessibility Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  writeAuditReport({
    violations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '09 Accessibility Audit',
    issueTypeName: 'accessibility',
    timestamp
  });
}

module.exports = { auditA11y };
if (require.main === module) auditA11y();
