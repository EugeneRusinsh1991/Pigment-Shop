const { runAuditorScan, scanFileLines, getAuditLogPaths } = require('./auditor-utils');

const { logFile: LOG_FILE, filesLogFile: FILES_LOG_FILE } = getAuditLogPaths('09', 'a11y');

function scanFile(filePath, violations) {
  scanFileLines(filePath, violations, (line, index, relPath) => {
    if (/(<TouchableOpacity|<Pressable|<Button|<TextInput)/.test(line) &&
        !line.includes('accessibilityLabel') &&
        !line.includes('accessible') &&
        line.includes('>')) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Interactive element missing accessibilityLabel: ${line.trim().substring(0, 50)}...`
      });
    }
  });
}

function auditA11y(disableDynamicAudits = false) {
  runAuditorScan({
    auditName: '09 Accessibility Audit',
    disableDynamicAudits,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    issueTypeName: 'accessibility',
    scanFile
  });
}

module.exports = { auditA11y };
if (require.main === module) auditA11y();
