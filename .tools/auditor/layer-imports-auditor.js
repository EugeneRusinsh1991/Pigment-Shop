const fs = require('fs');
const path = require('path');

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
            location: file.relPath,
            details: imp
          });
        }
      } else if (/^src\/(theme|utils|constants)\//.test(file.relPath)) {
        if (/(\/components\/|\/features\/|\/services\/|\/data\/)/.test(imp)) {
          violations.push({
            location: file.relPath,
            details: imp
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
            location: source,
            details: target
          });
        }
      }
    });
  });

  const timestamp = new Date().toLocaleString('ru-RU');
  let report = `===================================================================\n`;
  report += `               7. LAYER IMPORTS & CYCLIC REPORT                    \n`;
  report += `Timestamp: ${timestamp}\n`;
  report += `===================================================================\n\n`;

  if (violations.length === 0) {
    if (fs.existsSync(LOG_FILE)) {
      try { fs.unlinkSync(LOG_FILE); } catch (_) {}
    }
    console.log('[07 Layer Imports Audit] Finished (0 issues) -> Clean');
  } else {
    const grouped = {};
    violations.forEach(v => {
      const filePath = v.location;
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push(v.details);
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} layer import issue(s) across ${fileCount} file(s):\n\n`;

    Object.entries(grouped).forEach(([filePath, items]) => {
      report += `File: ${filePath}\n`;
      items.forEach((details) => {
        report += `  - ${details}\n`;
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
    console.log(`[07 Layer Imports Audit] Finished (${violations.length} issues) -> .docs/audits/audits/07-layer-imports-violations.log`);
  }
}

module.exports = { auditLayerImports };
if (require.main === module) auditLayerImports();
