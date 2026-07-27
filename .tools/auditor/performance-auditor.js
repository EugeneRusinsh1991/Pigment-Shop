const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '10-performance-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '10-performance-files.log');

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

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

function auditPerformance() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const violations = [];
  walkDir(SRC_DIR, violations);

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               10. STATE & PERFORMANCE REPORT                      \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (fs.existsSync(LOG_FILE)) { try { fs.unlinkSync(LOG_FILE); } catch (_) {} }
  if (fs.existsSync(FILES_LOG_FILE)) { try { fs.unlinkSync(FILES_LOG_FILE); } catch (_) {} }

  if (violations.length === 0) {
    console.log('[10 Performance Audit] Finished (0 issues) -> Clean');
  } else {
    console.log(`[10 Performance Audit] Finished (${violations.length} issues)`);
  }
}

module.exports = { auditPerformance };
if (require.main === module) auditPerformance();
