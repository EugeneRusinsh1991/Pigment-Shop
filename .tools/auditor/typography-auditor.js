const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '04-typography-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '04-typography-violations.log'.replace('violations', 'files'));

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
      normalizedPath.endsWith('iconStyles.js') ||
      normalizedPath.includes('src/components/icons/');

    if (typoMatch && !isWhitelisted && !line.includes('//')) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: line.trim()
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


function auditTypography(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  walkDir(SRC_DIR, rawViolations);
  const violations = deduplicate(rawViolations);

  if (disableDynamicAudits) {
    console.log('[04 Typography Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  writeAuditReport({
    violations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '04 Typography Audit',
    issueTypeName: 'typography',
    timestamp
  });
}

module.exports = { auditTypography };

if (require.main === module) auditTypography();
