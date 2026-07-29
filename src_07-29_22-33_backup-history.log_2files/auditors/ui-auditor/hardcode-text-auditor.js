const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport, walkDir, getFileLines } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '02-hardcode-text-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '02-hardcode-text-violations.log'.replace('violations', 'files'));

function scanFile(filePath, violations) {
  const { relPath, lines } = getFileLines(filePath);

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

function auditTextLiterals() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const violations = [];
  walkDir(SRC_DIR, (fullPath) => scanFile(fullPath, violations));
  const uniqueViolations = deduplicate(violations);

  const timestamp = new Date().toLocaleString('ru-RU');
  writeAuditReport({
    violations: uniqueViolations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '02 Text Literals Audit',
    issueTypeName: 'raw text',
    timestamp
  });
}

module.exports = { auditTextLiterals };

if (require.main === module) auditTextLiterals();
