const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../../src/components');
const AUDITS_DIR = path.join(__dirname, '../../.audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '01-ui-architecture-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '01-ui-architecture-violations.log'.replace('violations', 'files'));

const ROOT_FILE_WHITELIST = ['useThemeUtils.js', 'SharedLayoutWrapper.js', 'Icons.js'];

// Minimum meaningful lines of code (non-empty, non-comment, non-import)
const MIN_MEANINGFUL_LINES = 3;

function scanDirectory(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true });
}

function readFile(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); } catch { return ''; }
}

/**
 * GHOST_IMPORT check: architecture file exists but the main component doesn't import it.
 */
function checkGhostImports(compName, compDir, files) {
  const violations = [];

  const stylesFile = files.find(f => f.endsWith('Styles.js'));
  const themeHookFile = files.find(f => f.startsWith('use') && f.endsWith('Theme.js'));

  const mainFile = files.find(f => f === `${compName}.js` || f === `${compName}.jsx`);
  if (!mainFile) return violations;

  const mainContent = readFile(path.join(compDir, mainFile));

  if (stylesFile && !mainContent.includes(stylesFile.replace('.js', ''))) {
    violations.push({
      type: 'GHOST_IMPORT',
      location: `src/components/${compName}/`,
      details: `${stylesFile} exists but is not imported in ${mainFile}`
    });
  }

  if (themeHookFile && !mainContent.includes(themeHookFile.replace('.js', ''))) {
    violations.push({
      type: 'GHOST_IMPORT',
      location: `src/components/${compName}/`,
      details: `${themeHookFile} exists but is not imported in ${mainFile}`
    });
  }

  return violations;
}

/**
 * EMPTY_ARCHITECTURE check: architecture file exists but has almost no real content.
 */
function checkEmptyArchitecture(compName, compDir, files) {
  const violations = [];

  const archFiles = files.filter(f =>
    f.endsWith('Styles.js') || (f.startsWith('use') && f.endsWith('Theme.js'))
  );

  for (const archFile of archFiles) {
    const content = readFile(path.join(compDir, archFile));
    const meaningfulLines = content
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('//') && !l.startsWith('*') && !l.startsWith('/*') && !l.startsWith('import') && !l.startsWith('export'));

    if (meaningfulLines.length < MIN_MEANINGFUL_LINES) {
      violations.push({
        type: 'EMPTY_ARCHITECTURE',
        location: `src/components/${compName}/`,
        details: `${archFile} exists but appears to be a stub (${meaningfulLines.length} meaningful line(s))`
      });
    }
  }

  return violations;
}

/**
 * BAD_INDEX_EXPORT check: index.js exists but doesn't export the component or its architecture pieces.
 */
function checkBadIndexExport(compName, compDir, files) {
  const violations = [];
  if (!files.includes('index.js')) return violations;

  const indexContent = readFile(path.join(compDir, 'index.js'));
  const mainFile = files.find(f => f === `${compName}.js` || f === `${compName}.jsx`);

  if (mainFile && !indexContent.includes(compName)) {
    violations.push({
      type: 'BAD_INDEX_EXPORT',
      location: `src/components/${compName}/`,
      details: `index.js does not export main component '${compName}'`
    });
  }

  return violations;
}

/**
 * HOOK_RETURNS_EMPTY check: theme hook exists but returns empty object/null or lacks return statement.
 */
function checkHookReturnsEmpty(compName, compDir, files) {
  const violations = [];
  const themeHookFile = files.find(f => f.startsWith('use') && f.endsWith('Theme.js'));
  if (!themeHookFile) return violations;

  const hookContent = readFile(path.join(compDir, themeHookFile));
  const cleaned = hookContent.replace(/\s+/g, '');

  if (cleaned.includes('return{}') || cleaned.includes('returnnull') || !hookContent.includes('return')) {
    violations.push({
      type: 'HOOK_RETURNS_EMPTY',
      location: `src/components/${compName}/`,
      details: `${themeHookFile} returns empty object/null or has no return statement`
    });
  }

  return violations;
}

function auditFileEntry(entry) {
  if (ROOT_FILE_WHITELIST.includes(entry.name)) return [];
  return [{
    type: 'DOMAIN_RELOCATION',
    location: `src/components/${entry.name}`,
    details: 'Root level component file should be moved into src/features/ or encapsulated in a component folder.'
  }];
}

function checkMissingModules(compName, hasIndex, hasStyles, hasThemeHook) {
  const missing = [];
  if (!hasIndex) missing.push('index.js');
  if (!hasStyles) missing.push(`${compName}Styles.js`);
  if (!hasThemeHook) missing.push(`use${compName}Theme.js`);

  if (missing.length === 0) return [];
  return [{
    type: 'MISSING_MODULES',
    location: `src/components/${compName}/`,
    details: `Missing: ${missing.join(', ')}`
  }];
}

function auditFolderEntry(entry) {
  const compName = entry.name;
  const compDir = path.join(COMPONENTS_DIR, compName);
  const files = scanDirectory(compDir).map(f => f.name);

  const hasIndex = files.includes('index.js');
  const hasStyles = files.some(f => f.endsWith('Styles.js'));
  const hasThemeHook = files.some(f => f.startsWith('use') && f.endsWith('Theme.js'));

  const violations = checkMissingModules(compName, hasIndex, hasStyles, hasThemeHook);

  if (hasStyles || hasThemeHook) {
    violations.push(...checkGhostImports(compName, compDir, files));
    violations.push(...checkEmptyArchitecture(compName, compDir, files));
  }

  violations.push(...checkBadIndexExport(compName, compDir, files));
  violations.push(...checkHookReturnsEmpty(compName, compDir, files));

  return violations;
}

function auditComponentEntry(entry) {
  return entry.isDirectory() ? auditFolderEntry(entry) : auditFileEntry(entry);
}

const { deduplicate, writeAuditReport: saveAuditReport } = require('./auditor-utils');

function generateAndSaveReport(violations, disableDynamicAudits = false) {
  if (disableDynamicAudits) {
    console.log('[01 UI Architecture Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  saveAuditReport({
    violations: deduplicate(violations),
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '01 UI Architecture Audit',
    issueTypeName: 'architecture violation',
    timestamp
  });
}

function auditComponents(disableDynamicAudits = false) {
  if (!fs.existsSync(COMPONENTS_DIR)) return;
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });

  const entries = scanDirectory(COMPONENTS_DIR);
  const violations = [];

  for (const entry of entries) {
    violations.push(...auditComponentEntry(entry));
  }

  generateAndSaveReport(violations, disableDynamicAudits);
}

module.exports = { auditComponents };

if (require.main === module) auditComponents();
