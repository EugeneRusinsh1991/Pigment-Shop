const fs = require('fs');
const path = require('path');
const { deduplicate, writeAuditReport } = require('./auditor-utils');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const LOG_FILE = path.join(AUDITS_DIR, '07-layer-imports-violations.log');
const FILES_LOG_FILE = path.join(AUDITS_DIR, '07-layer-imports-violations.log'.replace('violations', 'files'));

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

function tryAppendExtension(basePath) {
  for (const ext of ['.js', '.jsx', '.ts', '.tsx']) {
    if (fs.existsSync(basePath + ext)) return basePath + ext;
  }
  return basePath;
}

function resolveExistingPath(dir, importStr) {
  const resolved = path.resolve(dir, importStr);
  if (fs.existsSync(resolved)) {
    return fs.statSync(resolved).isDirectory() ? path.join(resolved, 'index.js') : resolved;
  }
  return tryAppendExtension(resolved);
}

function resolveImport(fromFullPath, importStr) {
  if (!importStr.startsWith('.')) return null;
  const resolved = resolveExistingPath(path.dirname(fromFullPath), importStr);
  if (!fs.existsSync(resolved)) return null;
  return path.relative(path.join(__dirname, '../..'), resolved).replace(/\\/g, '/');
}

function checkImportViolations(relPath, imp) {
  if (relPath.startsWith('src/components/')) {
    if (/(\/features\/|\/services\/|\/data\/|\/domain\/)/.test(imp)) {
      return { location: relPath, details: imp };
    }
  } else if (/^src\/(theme|utils|constants)\//.test(relPath)) {
    if (/(\/components\/|\/features\/|\/services\/|\/data\/)/.test(imp)) {
      return { location: relPath, details: imp };
    }
  }
  return null;
}

function buildImportGraphAndViolations(allFiles) {
  const violations = [];
  const graph = {};

  for (const file of allFiles) {
    graph[file.relPath] = [];
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(file.content)) !== null) {
      const imp = match[1];
      const violation = checkImportViolations(file.relPath, imp);
      if (violation) violations.push(violation);

      const targetRel = resolveImport(file.fullPath, imp);
      if (targetRel && targetRel !== file.relPath) {
        graph[file.relPath].push(targetRel);
      }
    }
  }

  return { graph, violations };
}

function findCircularDependencies(graph, violations) {
  const seenCycles = new Set();
  Object.entries(graph).forEach(([source, targets]) => {
    targets.forEach(target => {
      const targetImports = graph[target] || [];
      if (targetImports.includes(source)) {
        const cycleKey = [source, target].sort().join(' <-> ');
        if (!seenCycles.has(cycleKey)) {
          seenCycles.add(cycleKey);
          violations.push({ location: source, details: target });
        }
      }
    });
  });
}

function auditLayerImports(disableDynamicAudits = false) {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const allFiles = getAllFiles(SRC_DIR);
  const { graph, violations } = buildImportGraphAndViolations(allFiles);

  findCircularDependencies(graph, violations);

  if (disableDynamicAudits) {
    console.log('[07 Layer Imports Audit] Skipped (dynamic audits disabled)');
    return;
  }

  const timestamp = new Date().toLocaleString('ru-RU');
  writeAuditReport({
    violations: deduplicate(violations),
    logFile: LOG_FILE,
    filesLogFile: FILES_LOG_FILE,
    auditName: '07 Layer Imports Audit',
    issueTypeName: 'layer import',
    timestamp
  });
}

module.exports = { auditLayerImports };
if (require.main === module) auditLayerImports();
