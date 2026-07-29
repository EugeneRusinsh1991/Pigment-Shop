const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const COMPONENTS_DIR = path.join(__dirname, '../../src/components');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '06-unused-exports-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '06-unused-exports-violations.log'.replace('violations', 'files'));

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

function checkComponentFolderViolations(allFiles) {
  const violations = [];
  if (!fs.existsSync(COMPONENTS_DIR)) return violations;
  const compEntries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
  for (const entry of compEntries) {
    if (!entry.isDirectory()) continue;
    const compName = entry.name;
    const isUsed = allFiles.some(f => !f.relPath.startsWith(`src/components/${compName}`) && (f.content.includes(compName) || f.content.includes(`components/${compName}`)));
    if (!isUsed) {
      violations.push({
        location: `src/components/${compName}`,
        details: `Isolated component folder '${compName}' is not referenced outside its directory`
      });
    }
  }
  return violations;
}

function checkExportedSymbolViolations(compFiles, allFiles, ignoreExports) {
  const violations = [];
  const exportRegex = /export\s+(?:const|function|let|class)\s+([a-zA-Z0-9_]+)/g;
  for (const file of compFiles) {
    let match;
    while ((match = exportRegex.exec(file.content)) !== null) {
      const expName = match[1];
      if (ignoreExports.has(expName)) continue;
      const isReferenced = allFiles.some(f => f.fullPath !== file.fullPath && f.content.includes(expName));
      if (!isReferenced) {
        violations.push({
          location: file.relPath,
          details: `Exported symbol '${expName}' is never imported or used`
        });
      }
    }
  }
  return violations;
}

function clearLogFile(filePath) {
  if (fs.existsSync(filePath)) {
    try { fs.unlinkSync(filePath); } catch (_) {}
  }
}

function auditUnusedExports(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const allFiles = getAllFiles(SRC_DIR);
  const compFiles = allFiles.filter(f => f.relPath.startsWith('src/components/') && !f.relPath.endsWith('index.js'));
  const ignoreExports = new Set(['default', 'VARIANTS', 'styles', 'getTextStyle', 'getTextColor', 'buttonTokens', 'layout', 'motion', 'shadows', 'colors', 'fonts', 'VARIANTS_MAP']);

  const violations = [
    ...checkComponentFolderViolations(allFiles),
    ...checkExportedSymbolViolations(compFiles, allFiles, ignoreExports)
  ];

  if (disableDynamicAudits) {
    console.log('[06 Unused Exports Audit] Skipped (dynamic audits disabled)');
    return;
  }

  clearLogFile(LOG_FILE);
  clearLogFile(FILES_LOG_FILE);

  const issueCount = violations.length;
  const statusMsg = issueCount === 0 ? '0 issues) -> Clean' : `${issueCount} issues)`;
  console.log(`[06 Unused Exports Audit] Finished (${statusMsg}`);
}

module.exports = { auditUnusedExports };
if (require.main === module) auditUnusedExports();
