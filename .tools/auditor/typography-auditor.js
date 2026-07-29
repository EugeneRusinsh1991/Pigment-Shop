const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
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
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  content.split('\n').forEach((line, index) => auditLine(line, index, relPath, violations));
}

function isCodeFile(name) {
  return name.endsWith('.js') || name.endsWith('.jsx') || name.endsWith('.tsx') || name.endsWith('.ts');
}

function walkDir(dirPath, violations) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, violations);
    } else if (entry.isFile() && isCodeFile(entry.name)) {
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
