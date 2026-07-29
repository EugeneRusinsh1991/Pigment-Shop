const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport, walkDir, getFileLines, finishAuditReport } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '12-raw-i18n-keys-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '12-raw-i18n-keys-files.log');

const camelCaseKeyRegex = /[a-z][a-z0-9]*[A-Z][a-zA-Z0-9]*/;

function scanFile(filePath, violations) {
  const { relPath, lines } = getFileLines(filePath);

  lines.forEach((line, index) => {
    // Check JSX text nodes like >productAddToCart<
    const jsxTextMatch = line.match(/>\s*([a-z][a-z0-9]*[A-Z][a-zA-Z0-9]*)\s*</);
    if (jsxTextMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Raw i18n key '${jsxTextMatch[1]}' in JSX text: ${line.trim()}`
      });
    }

    // Check props like label="productAddToCart"
    const propMatch = line.match(/\b(label|title|placeholder)\s*=\s*(['"])([a-z][a-z0-9]*[A-Z][a-zA-Z0-9]*)\2/);
    if (propMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Raw i18n key '${propMatch[3]}' in prop '${propMatch[1]}': ${line.trim()}`
      });
    }

    // Check props like label={'productAddToCart'}
    const propBraceMatch = line.match(/\b(label|title|placeholder)\s*=\s*\{\s*(['"])([a-z][a-z0-9]*[A-Z][a-zA-Z0-9]*)\2\s*\}/);
    if (propBraceMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Raw i18n key '${propBraceMatch[3]}' in prop '${propBraceMatch[1]}': ${line.trim()}`
      });
    }
  });
}


function auditRawI18nKeys(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  walkDir(SRC_DIR, (fullPath) => scanFile(fullPath, rawViolations));
  const violations = deduplicate(rawViolations);

  finishAuditReport({
    auditName: '12 Raw i18n Keys Audit',
    disableDynamicAudits,
    violations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    issueTypeName: 'raw i18n key'
  });
}

module.exports = { auditRawI18nKeys };

if (require.main === module) auditRawI18nKeys();
