const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const COMPONENTS_DIR = path.join(__dirname, '../../src/components');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits');
const LOG_FILE = path.join(AUDITS_DIR, '06-unused-exports-violations.log');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      const relPath = path.relative(path.join(__dirname, '../..'), fullPath).replace(/\\/g, '/');
      fileList.push({ relPath, fullPath, content: fs.readFileSync(fullPath, 'utf8') });
    }
  }
  return fileList;
}

function auditUnusedExports() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const allFiles = getAllFiles(SRC_DIR);
  const violations = [];

  if (fs.existsSync(COMPONENTS_DIR)) {
    const compEntries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
    for (const entry of compEntries) {
      if (entry.isDirectory()) {
        const compName = entry.name;
        const isUsed = allFiles.some(f => !f.relPath.startsWith(`src/components/${compName}`) && (f.content.includes(compName) || f.content.includes(`components/${compName}`)));
        if (!isUsed) {
          violations.push({
            type: 'ISOLATED_UI_COMPONENT',
            location: `src/components/${compName}`,
            details: `Component '${compName}' is not imported or referenced anywhere outside its own directory.`
          });
        }
      }
    }
  }

  const compFiles = allFiles.filter(f => f.relPath.startsWith('src/components/') && !f.relPath.endsWith('index.js'));
  const ignoreExports = new Set(['default', 'VARIANTS', 'styles', 'getTextStyle', 'getTextColor', 'buttonTokens', 'layout', 'motion', 'shadows', 'colors', 'fonts', 'VARIANTS_MAP']);

  for (const file of compFiles) {
    const exportRegex = /export\s+(?:const|function|let|class)\s+([a-zA-Z0-9_]+)/g;
    let match;
    while ((match = exportRegex.exec(file.content)) !== null) {
      const expName = match[1];
      if (ignoreExports.has(expName)) continue;
      const isReferenced = allFiles.some(f => f.fullPath !== file.fullPath && f.content.includes(expName));
      if (!isReferenced) {
        violations.push({
          type: 'UNUSED_EXPORT',
          location: file.relPath,
          details: `Exported symbol '${expName}' is never imported or used in other files.`
        });
      }
    }
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `     6. UNUSED EXPORTS & ISOLATED COMPONENTS REPORT                \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    report += `SUCCESS: No isolated UI components or unused exports found!\n`;
  } else {
    report += `Found ${violations.length} violation(s):\n\n`;
    violations.forEach((v, index) => {
      report += `${index + 1}. [${v.type}]\n   Target:  ${v.location}\n   Details: ${v.details}\n\n`;
    });
  }

  fs.writeFileSync(LOG_FILE, report);
  console.log(`[06 Unused Exports Audit] Finished (${violations.length} issues) -> .docs/audits/06-unused-exports-violations.log`);
}

module.exports = { auditUnusedExports };
if (require.main === module) auditUnusedExports();
