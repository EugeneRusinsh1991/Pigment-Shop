const fs = require('fs');
const path = require('path');

const UI_DIR = path.join(__dirname, '../../src/components');
const FEATURES_DIR = path.join(__dirname, '../../src/features');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '05-service-layer-violations.log');

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    if (line.includes('firebase/firestore') || line.includes('getDoc(') || line.includes('setDoc(') || line.includes('collection(')) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: line.trim()
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
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      scanFile(fullPath, violations);
    }
  }
}

function auditServiceLayer() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const violations = [];
  walkDir(UI_DIR, violations);
  walkDir(FEATURES_DIR, violations);

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               5. SERVICE LAYER ARCHITECTURE REPORT                \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    if (fs.existsSync(LOG_FILE)) {
      try { fs.unlinkSync(LOG_FILE); } catch (_) {}
    }
    console.log('[05 Service Layer Audit] Finished (0 issues) -> Clean');
  } else {
    const grouped = {};
    violations.forEach(v => {
      const [filePath, lineNum] = v.location.split(':');
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push({ lineNum: lineNum || '', details: v.details });
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} service layer issue(s) across ${fileCount} file(s):\n\n`;

    Object.entries(grouped).forEach(([filePath, items]) => {
      report += `File: ${filePath}\n`;
      items.forEach((item) => {
        const lineStr = item.lineNum ? `L${item.lineNum}` : '';
        report += `  ${lineStr.padEnd(6)} ${item.details}\n`;
      });
      report += `\n`;
    });

    fs.writeFileSync(LOG_FILE, report);
    console.log(`[05 Service Layer Audit] Finished (${violations.length} issues) -> .docs/audits/audits/05-service-layer-violations.log`);
  }
}

module.exports = { auditServiceLayer };

if (require.main === module) auditServiceLayer();
