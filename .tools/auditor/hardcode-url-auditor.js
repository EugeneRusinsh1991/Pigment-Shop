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
        details: `Hardcoded URL found outside of config: ${urlMatch[0]}`
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

function auditHardcodeUrl() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const violations = [];
  walkDir(SRC_DIR, violations);

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               11. HARDCODED URL & CONFIG REPORT                   \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    if (fs.existsSync(LOG_FILE)) { try { fs.unlinkSync(LOG_FILE); } catch (_) {} }
    if (fs.existsSync(FILES_LOG_FILE)) { try { fs.unlinkSync(FILES_LOG_FILE); } catch (_) {} }
    console.log('[11 Hardcoded URL Audit] Finished (0 issues) -> Clean');
  } else {
    const grouped = {};
    violations.forEach(v => {
      const filePath = v.location ? v.location.split(':')[0] : (v.location || 'Unknown');
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push(v);
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} URL issue(s) across ${fileCount} file(s):\n\n`;

    Object.entries(grouped).forEach(([filePath, items]) => {
      report += `File: ${filePath}\n`;
      items.forEach((item) => {
        const lineNum = item.location.split(':')[1] || '';
        report += `  L${lineNum.padEnd(5)} ${item.details}\n`;
      });
      report += `\n`;
    });

    if (fileCount > 10) {
      let filesReport = `===================================================================\n`;
      filesReport += `               FILES WITH ISSUES REPORT                            \n`;
      filesReport += `Timestamp: ${timestamp}\n`;
      filesReport += `===================================================================\n\n`;
      filesReport += `Found ${violations.length} issue(s) across ${fileCount} target(s):\n\n`;
      Object.keys(grouped).forEach(filePath => {
        filesReport += `- ${filePath} (${grouped[filePath].length} issues)\n`;
      });
      fs.writeFileSync(FILES_LOG_FILE, filesReport);
      console.log(`  -> Also generated compact file list: 11-hardcode-url-files.log`);
    } else {
      if (fs.existsSync(FILES_LOG_FILE)) { try { fs.unlinkSync(FILES_LOG_FILE); } catch (_) {} }
    }

    fs.writeFileSync(LOG_FILE, report);
    console.log(`[11 Hardcoded URL Audit] Finished (${violations.length} issues) -> .docs/audits/audits/11-hardcode-url-violations.log`);
  }
}

module.exports = { auditHardcodeUrl };
if (require.main === module) auditHardcodeUrl();
