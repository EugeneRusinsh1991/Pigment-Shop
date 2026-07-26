const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits');
const LOG_FILE = path.join(AUDITS_DIR, '07-layer-imports-violations.log');

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

function resolveImport(fromFullPath, importStr) {
  if (!importStr.startsWith('.')) return null;
  const dir = path.dirname(fromFullPath);
  let resolved = path.resolve(dir, importStr);
  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    resolved = path.join(resolved, 'index.js');
  } else if (!fs.existsSync(resolved)) {
    if (fs.existsSync(resolved + '.js')) resolved += '.js';
    else if (fs.existsSync(resolved + '.jsx')) resolved += '.jsx';
  }
  if (fs.existsSync(resolved)) {
    return path.relative(path.join(__dirname, '../..'), resolved).replace(/\\/g, '/');
  }
  return null;
}

function auditLayerImports() {
  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });
  const allFiles = getAllFiles(SRC_DIR);
  const violations = [];
  const graph = {};

  for (const file of allFiles) {
    graph[file.relPath] = [];
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(file.content)) !== null) {
      const imp = match[1];

      if (file.relPath.startsWith('src/components/')) {
        if (/(\/features\/|\/services\/|\/data\/|\/domain\/)/.test(imp)) {
          violations.push({
            type: 'PROHIBITED_LAYER_IMPORT',
            location: file.relPath,
            details: `Shared UI component imports from higher-level layer: ${imp}`
          });
        }
      } else if (/^src\/(theme|utils|constants)\//.test(file.relPath)) {
        if (/(\/components\/|\/features\/|\/services\/|\/data\/)/.test(imp)) {
          violations.push({
            type: 'PROHIBITED_LAYER_IMPORT',
            location: file.relPath,
            details: `Base utility/theme layer imports from higher-level UI/domain layer: ${imp}`
          });
        }
      }

      const targetRel = resolveImport(file.fullPath, imp);
      if (targetRel && targetRel !== file.relPath) {
        graph[file.relPath].push(targetRel);
      }
    }
  }

  const seenCycles = new Set();
  Object.entries(graph).forEach(([source, targets]) => {
    targets.forEach(target => {
      const targetImports = graph[target] || [];
      if (targetImports.includes(source)) {
        const cycleKey = [source, target].sort().join(' <-> ');
        if (!seenCycles.has(cycleKey)) {
          seenCycles.add(cycleKey);
          violations.push({
            type: 'CYCLIC_IMPORT_VIOLATION',
            location: `${source} <-> ${target}`,
            details: `Direct circular dependency detected between two modules.`
          });
        }
      } else {
        targetImports.forEach(target2 => {
          const target2Imports = graph[target2] || [];
          if (target2Imports.includes(source)) {
            const cycleKey = [source, target, target2].sort().join(' -> ');
            if (!seenCycles.has(cycleKey)) {
              seenCycles.add(cycleKey);
              violations.push({
                type: 'CYCLIC_IMPORT_VIOLATION',
                location: `${source} -> ${target} -> ${target2} -> ${source}`,
                details: `3-way circular dependency chain detected.`
              });
            }
          }
        });
      }
    });
  });

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `     7. LAYER ARCHITECTURE & CYCLIC IMPORTS REPORT                 \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    report += `SUCCESS: No prohibited layer imports or circular dependencies found!\n`;
  } else {
    report += `Found ${violations.length} violation(s):\n\n`;
    violations.forEach((v, index) => {
      report += `${index + 1}. [${v.type}]\n   Target:  ${v.location}\n   Details: ${v.details}\n\n`;
    });
  }

  fs.writeFileSync(LOG_FILE, report);
  console.log(`[07 Layer Imports Audit] Finished (${violations.length} issues) -> .docs/audits/07-layer-imports-violations.log`);
}

module.exports = { auditLayerImports };
if (require.main === module) auditLayerImports();
