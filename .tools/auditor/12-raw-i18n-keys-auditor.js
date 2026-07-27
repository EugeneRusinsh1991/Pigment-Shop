const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '12-raw-i18n-keys-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '12-raw-i18n-keys-files.log');

const camelCaseKeyRegex = /[a-z][a-z0-9]*[A-Z][a-zA-Z0-9]*/;

function scanFile(filePath, violations) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check JSX text nodes like >productAddToCart<
    const jsxTextMatch = line.match(/>\s*([a-z][a-z0-9]*[A-Z][a-zA-Z0-9]*)\s*</);
    if (jsxTextMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Raw i18n key '${jsxTextMatch[1]}' in JSX text: ${line.trim()}`
      });
    }

    // Check props like label="productAddToCart"
    const propMatch = line.match(/\b(label|title|placeholder)\s*=\s*(['"])([a-z][a-z0-9]*[A-Z][a-zA-Z0-9]*)\2/);
    if (propMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Raw i18n key '${propMatch[3]}' in prop '${propMatch[1]}': ${line.trim()}`
      });
    }

    // Check props like label={'productAddToCart'}
    const propBraceMatch = line.match(/\b(label|title|placeholder)\s*=\s*\{\s*(['"])([a-z][a-z0-9]*[A-Z][a-zA-Z0-9]*)\2\s*\}/);
    if (propBraceMatch) {
      violations.push({
        location: `${relPath}:${index + 1}`,
        details: `Raw i18n key '${propBraceMatch[3]}' in prop '${propBraceMatch[1]}': ${line.trim()}`
      });
    }
  });
}

function deduplicate(violations) {
  const seen = new Set();
  return violations.filter(v => {
    const key = `${v.location}|${v.details}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
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

function auditRawI18nKeys(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  let rawViolations = [];
  walkDir(SRC_DIR, rawViolations);
  const violations = deduplicate(rawViolations);

  if (disableDynamicAudits) {
    console.log('[12 Raw i18n Keys Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               12. RAW I18N KEYS REPORT                            \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    if (fs.existsSync(LOG_FILE)) {
      try { fs.unlinkSync(LOG_FILE); } catch (_) {}
    }
    if (fs.existsSync(FILES_LOG_FILE)) {
      try { fs.unlinkSync(FILES_LOG_FILE); } catch (_) {}
    }
    console.log('[12 Raw i18n Keys Audit] Finished (0 unique issues) -> Clean');
  } else {
    const grouped = {};
    violations.forEach(v => {
      const [filePath, lineNum] = v.location.split(':');
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push({ lineNum: lineNum || '', details: v.details });
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} raw i18n key issue(s) across ${fileCount} file(s):\n\n`;

    Object.entries(grouped).forEach(([filePath, items]) => {
      report += `File: ${filePath}\n`;
      items.forEach((item) => {
        const lineStr = item.lineNum ? `L${item.lineNum}` : '';
        report += `  ${lineStr.padEnd(6)} ${item.details}\n`;
      });
      report += `\n`;
    });

    if (fileCount > 10) {
      let filesReport = "===================================================================\n";
      filesReport += "               FILES WITH ISSUES REPORT                            \n";
      filesReport += "Timestamp: " + timestamp + "\n";
      filesReport += "===================================================================\n\n";
      filesReport += "Found " + violations.length + " issue(s) across " + fileCount + " target(s):\n\n";
      
      Object.keys(grouped).forEach(filePath => {
        filesReport += "- " + filePath + " (" + grouped[filePath].length + " issues)\n";
      });
      
      fs.writeFileSync(FILES_LOG_FILE, filesReport);
      console.log("  -> Also generated compact file list: " + path.basename(FILES_LOG_FILE));
    } else {
      if (fs.existsSync(FILES_LOG_FILE)) { try { fs.unlinkSync(FILES_LOG_FILE); } catch (_) {} }
    }
    
    fs.writeFileSync(LOG_FILE, report);
    console.log(`[12 Raw i18n Keys Audit] Finished (${violations.length} unique issues) -> .docs/audits/audits/12-raw-i18n-keys-violations.log`);
  }
}

module.exports = { auditRawI18nKeys };

if (require.main === module) auditRawI18nKeys();
