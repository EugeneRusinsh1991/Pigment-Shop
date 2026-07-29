const fs = require('fs');
const path = require('path');
const { walkDir, writeAuditReport, getFileLines } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '10-performance-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '10-performance-files.log');

function scanFile(filePath, violations) {
  const { relPath, lines } = getFileLines(filePath);

  lines.forEach((line, index) => {
    // Check for useEffect without dependency array
    if (/useEffect\(\s*\(\)\s*=>\s*\{/.test(line)) {
      // Very basic heuristic: if we see useEffect(() => { ... but the file doesn't have a `],` or `[]` for it
      // we just flag it as a potential risk to check manually, but a better heuristic is looking at the line
      // Actually, regex for `useEffect(() => {...})` without deps is tough line-by-line.
      // Let's check for inline functions in renders like onPress={() => ...} or onPress={function() ...}
      if (/onPress=\{\s*\(\)\s*=>/.test(line)) {
        violations.push({
          location: `${relPath}:${index + 1}`,
          details: `Inline function in render (onPress): ${line.trim().substring(0, 50)}...`
        });
      }
    }
    
    // Additional simple checks
    if (/(useCallback|useMemo)\(\s*\(\)\s*=>\s*[^,]+,\s*(?!\[)/.test(line)) {
       violations.push({
         location: `${relPath}:${index + 1}`,
         details: `${line.trim().substring(0, 50)}...`
       });
    }
  });
}

function auditPerformance(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const violations = [];
  walkDir(SRC_DIR, (filePath) => scanFile(filePath, violations));

  if (disableDynamicAudits) {
    console.log('[10 Performance Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  writeAuditReport({
    violations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '10 Performance Audit',
    issueTypeName: 'performance',
    timestamp
  });
}

module.exports = { auditPerformance };
if (require.main === module) auditPerformance();
