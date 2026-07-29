const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '08-magic-numbers-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '08-magic-numbers-violations.log'.replace('violations', 'files'));

const ALLOWED_FILES = ['tokens.js', 'theme.js', 'constants.js', 'spacing.js'];

function scanFile(filePath, violations) {
  const fileName = path.basename(filePath);
  if (ALLOWED_FILES.some(allowed => fileName.endsWith(allowed))) return;

  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;

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



function isTargetFile(entry) {
  if (!entry.isFile()) return false;
  return /\.[jt]sx?$/.test(entry.name);
}

function walkDir(dirPath, violations) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, violations);
    } else if (isTargetFile(entry)) {
      scanFile(fullPath, violations);
    }
  }
}


function auditMagicNumbers(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  walkDir(SRC_DIR, rawViolations);
  const violations = deduplicate(rawViolations);

  if (disableDynamicAudits) {
    console.log('[08 Magic Numbers Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  writeAuditReport({
    violations,
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '08 Magic Numbers Audit',
    issueTypeName: 'magic number',
    timestamp
  });
}

if (require.main === module) {
  auditMagicNumbers();
}

module.exports = { auditMagicNumbers };
