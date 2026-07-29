const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '02-hardcode-text-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '02-hardcode-text-violations.log'.replace('violations', 'files'));

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
  const violations = [];
  walkDir(SRC_DIR, violations);
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
