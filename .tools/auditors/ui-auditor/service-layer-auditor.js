const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport, walkDir, getFileLines, finishAuditReport } = require('./auditor-utils');

const UI_DIR = path.join(__dirname, '../../src/components');
const FEATURES_DIR = path.join(__dirname, '../../src/features');
const AUDITS_DIR = path.join(__dirname, '../../.audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '05-service-layer-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '05-service-layer-violations.log'.replace('violations', 'files'));

function scanFile(filePath, violations) {
  const { relPath, lines } = getFileLines(filePath);

  lines.forEach((line, index) => {
    if (line.includes('firebase/firestore') || line.includes('getDoc(') || line.includes('setDoc(') || line.includes('collection(')) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: line.trim()
      });
    }
  });
}


function auditServiceLayer(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const rawViolations = [];
  walkDir(UI_DIR, (fullPath) => scanFile(fullPath, rawViolations));
  walkDir(FEATURES_DIR, (fullPath) => scanFile(fullPath, rawViolations));
  const violations = deduplicate(rawViolations);

  finishAuditReport({
    auditName: '05 Service Layer Audit',
    disableDynamicAudits,
    violations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    issueTypeName: 'service layer'
  });
}

module.exports = { auditServiceLayer };

if (require.main === module) auditServiceLayer();
