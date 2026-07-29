const fs = require('fs');
const path = require('path');
const { walkDir, writeAuditReport, getFileLines, isCommentLine } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '11-hardcode-url-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '11-hardcode-url-files.log');

const WHITELIST_DIRS = ['src/config', 'src/constants'];

function scanFile(filePath, violations) {
  const { relPath, lines } = getFileLines(filePath);
  
  if (WHITELIST_DIRS.some(dir => relPath.startsWith(dir))) return;

  lines.forEach((line, index) => {
    // Ignore comments
    if (isCommentLine(line)) return;
    
    // Check for hardcoded URLs (http://, https://)
    const urlMatch = line.match(/https?:\/\/[^\s"'`)]+/);
    if (urlMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: urlMatch[0]
      });
    }
  });
}

function auditHardcodeUrl(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const violations = [];
  walkDir(SRC_DIR, (filePath) => scanFile(filePath, violations));

  if (disableDynamicAudits) {
    console.log('[11 Hardcoded URL Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  writeAuditReport({
    violations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '11 Hardcoded URL Audit',
    issueTypeName: 'hardcoded URL',
    timestamp
  });
}

module.exports = { auditHardcodeUrl };
if (require.main === module) auditHardcodeUrl();
