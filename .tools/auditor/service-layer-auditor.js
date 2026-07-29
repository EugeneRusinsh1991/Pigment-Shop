const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport } = require('./auditor-utils');

const UI_DIR = path.join(__dirname, '../../src/components');
const FEATURES_DIR = path.join(__dirname, '../../src/features');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '05-service-layer-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '05-service-layer-violations.log'.replace('violations', 'files'));

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    if (line.includes('firebase/firestore') || line.includes('getDoc(') || line.includes('setDoc(') || line.includes('collection(')) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: line.trim()
      });
    }
  });
}

const CODE_FILE_REGEX = /\.(js|jsx|ts|tsx)$/;

function processEntry(entry, dirPath, violations) {
  const fullPath = path.join(dirPath, entry.name);
  if (entry.isDirectory()) {
    walkDir(fullPath, violations);
  } else if (entry.isFile() && CODE_FILE_REGEX.test(entry.name)) {
    scanFile(fullPath, violations);
  }
}

function walkDir(dirPath, violations) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    processEntry(entry, dirPath, violations);
  }
}


function auditServiceLayer(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const rawViolations = [];
  walkDir(UI_DIR, rawViolations);
  walkDir(FEATURES_DIR, rawViolations);
  const violations = deduplicate(rawViolations);

  if (disableDynamicAudits) {
    console.log('[05 Service Layer Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  writeAuditReport({
    violations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '05 Service Layer Audit',
    issueTypeName: 'service layer',
    timestamp
  });
}

module.exports = { auditServiceLayer };

if (require.main === module) auditServiceLayer();
