const { runAuditorScan, scanFileLines, getAuditLogPaths } = require('./auditor-utils');

const { logFile: LOG_FILE, filesLogFile: FILES_LOG_FILE } = getAuditLogPaths('10', 'performance');

function scanFile(filePath, violations) {
  scanFileLines(filePath, violations, (line, index, relPath) => {
    if (/useEffect\(\s*\(\)\s*=>\s*\{/.test(line) && /onPress=\{\s*\(\)\s*=>/.test(line)) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Inline function in render (onPress): ${line.trim().substring(0, 50)}...`
      });
    }
    if (/(useCallback|useMemo)\(\s*\(\)\s*=>\s*[^,]+,\s*(?!\[)/.test(line)) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `${line.trim().substring(0, 50)}...`
      });
    }
  });
}

function auditPerformance(disableDynamicAudits = false) {
  runAuditorScan({
    auditName: '10 Performance Audit',
    disableDynamicAudits,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    issueTypeName: 'performance',
    scanFile
  });
}

module.exports = { auditPerformance };
if (require.main === module) auditPerformance();
