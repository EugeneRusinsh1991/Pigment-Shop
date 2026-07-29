const path = require('path');
const { runAuditorScan, getFileLines } = require('./auditor-utils');

const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '04-typography-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '04-typography-violations.log'.replace('violations', 'files'));

const WHITELIST = ['tokens.js', 'typography.js', 'TextStyles.js', 'TextFieldStyles.js', 'iconStyles.js', 'src/components/icons/'];

function isWhitelisted(filePath) {
  const norm = filePath.replace(/\\/g, '/');
  return WHITELIST.some(w => norm.endsWith(w) || norm.includes(w));
}

function auditLine(line, index, relPath, violations) {
  const typoMatch = line.match(/\b(fontSize|fontWeight|fontFamily|letterSpacing|lineHeight)\s*:\s*/);
  if (typoMatch && !line.includes('//')) {
    violations.push({
      location: `${relPath}:${index + 1}`,
      details: line.trim()
    });
  }
}

function scanFile(filePath, violations) {
  if (isWhitelisted(filePath)) return;
  const { relPath, lines } = getFileLines(filePath);
  lines.forEach((line, index) => auditLine(line, index, relPath, violations));
}

function auditTypography(disableDynamicAudits = false) {
  runAuditorScan({
    auditName: '04 Typography Audit',
    disableDynamicAudits,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    issueTypeName: 'typography',
    scanFile
  });
}

module.exports = { auditTypography };

if (require.main === module) auditTypography();
