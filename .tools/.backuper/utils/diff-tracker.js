const fs = require('fs');
const path = require('path');
const { ensureDirExists } = require('./fs-tools');

function scanFileStats(dir, baseDir = dir) {
  const map = new Map();
  if (!fs.existsSync(dir)) return map;

  function walk(currentDir) {
    let entries = [];
    try {
      entries = fs.readdirSync(currentDir);
    } catch (e) {
      return;
    }
    entries.forEach((entry) => {
      const fullPath = path.join(currentDir, entry);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        return;
      }
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
        map.set(relPath, { size: stat.size, mtimeMs: stat.mtimeMs });
      }
    });
  }

  walk(dir);
  return map;
}

function calculateDiff(latestBackupDir, currentBackupDir) {
  if (!latestBackupDir || !fs.existsSync(latestBackupDir)) {
    return { added: 0, removed: 0, modified: 0, topFolders: [] };
  }

  const prevFiles = scanFileStats(latestBackupDir);
  const currFiles = scanFileStats(currentBackupDir);

  let added = 0;
  let removed = 0;
  let modified = 0;
  const folderChanges = new Map();

  function trackFolder(relPath) {
    const folder = relPath.includes('/') ? relPath.substring(0, relPath.lastIndexOf('/')) : '(root)';
    folderChanges.set(folder, (folderChanges.get(folder) || 0) + 1);
  }

  currFiles.forEach((info, relPath) => {
    if (!prevFiles.has(relPath)) {
      added++;
      trackFolder(relPath);
    } else {
      const prevInfo = prevFiles.get(relPath);
      if (info.size !== prevInfo.size || Math.abs(info.mtimeMs - prevInfo.mtimeMs) > 1000) {
        modified++;
        trackFolder(relPath);
      }
    }
  });

  prevFiles.forEach((_, relPath) => {
    if (!currFiles.has(relPath)) {
      removed++;
      trackFolder(relPath);
    }
  });

  const topFolders = Array.from(folderChanges.entries())
    .map(([folder, count]) => ({ folder, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { added, removed, modified, topFolders };
}

function saveDiffLog(backupName, diffData) {
  try {
    const logDir = path.resolve(__dirname, '../log');
    ensureDirExists(logDir);
    const jsonFile = path.join(logDir, 'diff-history.json');

    let history = {};
    if (fs.existsSync(jsonFile)) {
      try {
        history = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
      } catch (e) {}
    }

    history[backupName] = {
      timestamp: new Date().toISOString(),
      diff: diffData
    };

    fs.writeFileSync(jsonFile, JSON.stringify(history, null, 2), 'utf8');
  } catch (err) {
    console.error('⚠️  Failed to write diff log:', err.message);
  }
}

function getDiffLog(backupName) {
  try {
    const jsonFile = path.resolve(__dirname, '../log/diff-history.json');
    if (!fs.existsSync(jsonFile)) return null;
    const history = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    return history[backupName] || null;
  } catch (e) {
    return null;
  }
}

module.exports = {
  calculateDiff,
  saveDiffLog,
  getDiffLog
};
