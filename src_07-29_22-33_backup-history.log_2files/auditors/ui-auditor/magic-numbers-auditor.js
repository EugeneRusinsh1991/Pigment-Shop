const path = require('path');
const { runAuditorScan, getFileLines, isCommentLine } = require('./auditor-utils');

const AUDITS_DIR = path.join(__dirname, '../../.audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '08-magic-numbers-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '08-magic-numbers-violations.log'.replace('violations', 'files'));

const ALLOWED_FILES = ['tokens.js', 'theme.js', 'constants.js', 'spacing.js'];

function scanFile(filePath, violations) {
  const fileName = path.basename(filePath);
  if (ALLOWED_FILES.some(allowed => fileName.endsWith(allowed))) return;

  const { relPath, lines } = getFileLines(filePath);

  lines.forEach((line, index) => {
    if (isCommentLine(line)) return;

    // 1. Hardcoded timeouts in setTimeout / setInterval
    const timeoutMatch = line.match(/\b(setTimeout|setInterval)\s*\([^,]+,\s*(\d{3,})\)/);
    if (timeoutMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Timeout delay ${timeoutMatch[2]}ms in ${timeoutMatch[1]}`
      });
    }

    // 2. Off-grid spacing magic numbers
    const spacingMatch = line.match(/\b(margin|padding|marginTop|marginBottom|marginLeft|marginRight|marginHorizontal|marginVertical|paddingTop|paddingBottom|paddingLeft|paddingRight|paddingHorizontal|paddingVertical|gap|rowGap|columnGap)\s*:\s*(\d+)/);
    if (spacingMatch) {
      const val = parseInt(spacingMatch[2], 10);
      const validGrid = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128];
      if (!validGrid.includes(val)) {
        violations.push({
          location: `${relPath}:${index + 1}`,
          details: `Off-grid ${spacingMatch[1]}: ${val}px`
        });
      }
    }
  });
}


function auditMagicNumbers(disableDynamicAudits = false) {
  runAuditorScan({
    auditName: '08 Magic Numbers Audit',
    disableDynamicAudits,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    issueTypeName: 'magic number',
    scanFile
  });
}

if (require.main === module) {
  auditMagicNumbers();
}

module.exports = { auditMagicNumbers };
