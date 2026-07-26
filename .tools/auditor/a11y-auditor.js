const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '09-a11y-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '09-a11y-files.log');

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Basic check for interactive elements without accessibilityLabel
    if (/(<TouchableOpacity|<Pressable|<Button|<TextInput)/.test(line)) {
      if (!line.includes('accessibilityLabel') && !line.includes('accessible')) {
        // Look ahead for multiline props is tricky with just regex line-by-line,
        // but this catches inline declarations missing a11y.
        // To reduce false positives, we only flag if the element closes on the same line or is a simple tag.
        if (line.includes('>')) {
           violations.push({
             location: `${relPath}:${index + 1}`,
             details: `Interactive element missing accessibilityLabel: ${line.trim().substring(0, 50)}...`
           });
        }
      }
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

function auditA11y() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const violations = [];
  walkDir(SRC_DIR, violations);

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               9. ACCESSIBILITY (A11Y) REPORT                      \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    if (fs.existsSync(LOG_FILE)) { try { fs.unlinkSync(LOG_FILE); } catch (_) {} }
    if (fs.existsSync(FILES_LOG_FILE)) { try { fs.unlinkSync(FILES_LOG_FILE); } catch (_) {} }
    console.log('[09 Accessibility Audit] Finished (0 issues) -> Clean');
  } else {
    const grouped = {};
    violations.forEach(v => {
      const filePath = v.location ? v.location.split(':')[0] : (v.location || 'Unknown');
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push(v);
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} accessibility issue(s) across ${fileCount} file(s):\n\n`;

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
      console.log(`  -> Also generated compact file list: 09-a11y-files.log`);
    } else {
      if (fs.existsSync(FILES_LOG_FILE)) { try { fs.unlinkSync(FILES_LOG_FILE); } catch (_) {} }
    }

    fs.writeFileSync(LOG_FILE, report);
    console.log(`[09 Accessibility Audit] Finished (${violations.length} issues) -> .docs/audits/audits/09-a11y-violations.log`);
  }
}

module.exports = { auditA11y };
if (require.main === module) auditA11y();
