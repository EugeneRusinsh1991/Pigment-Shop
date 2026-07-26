const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../../src/components');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '01-ui-architecture-violations.log');

const ROOT_FILE_WHITELIST = ['useThemeUtils.js', 'SharedLayoutWrapper.js', 'Icons.js'];

function scanDirectory(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true });
}

function auditComponents() {
  if (!fs.existsSync(COMPONENTS_DIR)) return;
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });

  const entries = scanDirectory(COMPONENTS_DIR);
  const violations = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      if (!ROOT_FILE_WHITELIST.includes(entry.name)) {
        violations.push({
          type: 'DOMAIN_RELOCATION',
          location: `src/components/${entry.name}`,
          details: 'Root level component file should be moved into src/features/ or encapsulated in a component folder.'
        });
      }
    } else {
      const compName = entry.name;
      const compDir = path.join(COMPONENTS_DIR, compName);
      const files = scanDirectory(compDir).map(f => f.name);

      const hasIndex = files.includes('index.js');
      const hasStyles = files.some(f => f.endsWith('Styles.js'));
      const hasThemeHook = files.some(f => f.startsWith('use') && f.endsWith('Theme.js'));

      const missingModules = [];
      if (!hasIndex) missingModules.push('index.js');
      if (!hasStyles) missingModules.push(`${compName}Styles.js`);
      if (!hasThemeHook) missingModules.push(`use${compName}Theme.js`);

      if (missingModules.length > 0) {
        violations.push({
          type: 'MISSING_MODULES',
          location: `src/components/${compName}/`,
          details: `Missing: ${missingModules.join(', ')}`
        });
      }
    }
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               1. UI ARCHITECTURE COMPLIANCE REPORT                \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    report += `SUCCESS: All UI components comply with architectural standards!\n`;
  } else {
    const grouped = {};
    violations.forEach(v => {
      const filePath = v.location;
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push({ type: v.type, details: v.details });
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} architecture violation(s) across ${fileCount} target(s):\n\n`;

    Object.entries(grouped).forEach(([filePath, items]) => {
      report += `Target: ${filePath}\n`;
      items.forEach((item) => {
        report += `  [${item.type}] ${item.details}\n`;
      });
      report += `\n`;
    });
  }

  fs.writeFileSync(LOG_FILE, report);
  console.log(`[01 UI Architecture Audit] Finished (${violations.length} issues) -> .docs/audits/audits/01-ui-architecture-violations.log`);
}

module.exports = { auditComponents };

if (require.main === module) auditComponents();
