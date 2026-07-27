const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '11-hardcode-url-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '11-hardcode-url-files.log');

const WHITELIST_DIRS = ['src/config', 'src/constants'];

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath).replace(/\\/g, '/');
  
  if (WHITELIST_DIRS.some(dir => relPath.startsWith(dir))) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Ignore comments
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
    
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

function walkDir(dirPath, violations) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, violations);
    } else if (entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      scanFile(fullPath, violations);
    }
  }
}

function auditHardcodeUrl(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const violations = [];
  walkDir(SRC_DIR, violations);

  if (disableDynamicAudits) {
    console.log('[11 Hardcoded URL Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               11. HARDCODED URL & CONFIG REPORT                   \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (fs.existsSync(LOG_FILE)) { try { fs.unlinkSync(LOG_FILE); } catch (_) {} }
  if (fs.existsSync(FILES_LOG_FILE)) { try { fs.unlinkSync(FILES_LOG_FILE); } catch (_) {} }

  if (violations.length === 0) {
    console.log('[11 Hardcoded URL Audit] Finished (0 issues) -> Clean');
  } else {
    console.log(`[11 Hardcoded URL Audit] Finished (${violations.length} issues)`);
  }
}

module.exports = { auditHardcodeUrl };
if (require.main === module) auditHardcodeUrl();
