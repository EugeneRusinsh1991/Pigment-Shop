const path = require('path');
const fs = require('fs');
const { BACKUP_ITEMS } = require('../backupConfig');
const { ensureDirExists, copyDir, copyFile, removeDir, getTimestamp } = require('../utils/fs-tools');

function countFiles(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return 0;
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  });
  return count;
}

function copyBackupItems(projectRoot, backupPath) {
  BACKUP_ITEMS.forEach((item) => {
    const srcPath = path.join(projectRoot, item);
    if (!fs.existsSync(srcPath)) {
      return;
    }

    const destPath = path.join(backupPath, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
}

function writeBackupHistoryLog(backupName) {
  try {
    const logDir = path.resolve(__dirname, '../log');
    ensureDirExists(logDir);
    const logFile = path.join(logDir, 'backup-history.log');
    
    const now = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    const localTimestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    const logLine = `${localTimestamp} | ${backupName}\n`;
    fs.appendFileSync(logFile, logLine, 'utf8');
  } catch (logErr) {
    console.error('⚠️  Не удалось записать лог бекапа:', logErr.message);
  }
}

function getAutoStepLabel(projectRoot) {
  try {
    const parentDir = path.dirname(projectRoot);
    const entries = fs.readdirSync(parentDir);
    const backups = entries
      .filter((e) => e.startsWith('src_') && fs.statSync(path.join(parentDir, e)).isDirectory())
      .map((e) => ({ name: e, mtime: fs.statSync(path.join(parentDir, e)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime);

    const latestBackupDir = backups.length > 0 ? path.join(parentDir, backups[0].name) : null;

    let newestFile = null;
    let newestMtime = 0;
    let changedCount = 0;

    function isFileChanged(bakPath, stat) {
      if (!latestBackupDir || !fs.existsSync(bakPath)) return true;
      const bakStat = fs.statSync(bakPath);
      return stat.size !== bakStat.size || Math.abs(stat.mtimeMs - bakStat.mtimeMs) > 1000;
    }

    function processFile(relPath, srcPath, stat) {
      const bakPath = latestBackupDir ? path.join(latestBackupDir, relPath) : null;
      if (isFileChanged(bakPath, stat)) {
        changedCount++;
        if (stat.mtimeMs > newestMtime) {
          newestMtime = stat.mtimeMs;
          newestFile = path.basename(srcPath);
        }
      }
    }

    function scan(relPath) {
      const srcPath = path.join(projectRoot, relPath);
      if (!fs.existsSync(srcPath)) return;
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        fs.readdirSync(srcPath).forEach((child) => scan(path.join(relPath, child)));
      } else {
        processFile(relPath, srcPath, stat);
      }
    }

    BACKUP_ITEMS.forEach((item) => {
      scan(item);
    });

    if (!newestFile || changedCount === 0) {
      return 'unchanged';
    }

    const safeName = newestFile.replace(/[^a-zA-Z0-9._-]/g, '_');
    return `${safeName}_${changedCount}files`;
  } catch (err) {
    return 'auto';
  }
}

const { calculateDiff, saveDiffLog } = require('../utils/diff-tracker');

function createBackup({ stepLabel, name } = {}) {
  const projectRoot = path.resolve(__dirname, '../../..');
  const parentDir = path.dirname(projectRoot);
  
  // Find latest existing backup for diff calculation
  let latestBackupDir = null;
  try {
    const entries = fs.readdirSync(parentDir);
    const backups = entries
      .filter((e) => e.startsWith('src_') && fs.statSync(path.join(parentDir, e)).isDirectory())
      .map((e) => ({ name: e, mtime: fs.statSync(path.join(parentDir, e)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime);
    if (backups.length > 0) {
      latestBackupDir = path.join(parentDir, backups[0].name);
    }
  } catch (e) {}

  const finalStepLabel = stepLabel || getAutoStepLabel(projectRoot);

  let backupName;
  if (name) {
    backupName = name;
  } else {
    const timestamp = getTimestamp(false);
    const stepSuffix = finalStepLabel ? `_${finalStepLabel}` : '';
    backupName = `src_${timestamp}${stepSuffix}`;
  }
  const backupPath = path.join(parentDir, backupName);

  console.log('🔄 Создание резервной копии...');
  console.log(`📂 Источник: ${projectRoot}`);
  console.log(`💾 Резервная копия: ${backupPath}\n`);

  if (fs.existsSync(backupPath)) {
    console.log(`⚠️  Папка ${backupName} уже существует! Перезаписываем...`);
    removeDir(backupPath);
  }

  ensureDirExists(backupPath);

  copyBackupItems(projectRoot, backupPath);

  const totalFiles = countFiles(backupPath);

  const diffData = calculateDiff(latestBackupDir, backupPath);
  saveDiffLog(backupName, diffData);

  console.log(`\n✨ Резервная копия успешно создана!`);
  console.log(`📂 Путь: ${backupPath}`);
  console.log(`📊 Статистика элементов: ${totalFiles} файлов`);
  console.log(`📝 Дифф изменений: +${diffData.added} добавлено, -${diffData.removed} удалено, ~${diffData.modified} изменено`);
  if (diffData.topFolders.length > 0) {
    console.log(`📁 Топ измененных папок:`);
    diffData.topFolders.forEach((f) => console.log(`   - ${f.folder}: ${f.count} измен.`));
  }

  const createdAt = new Date().toISOString();
  console.log(`SMARTSAVE_BACKUP: ${backupName} | ${createdAt}`);

  writeBackupHistoryLog(backupName);

  return {
    backupName,
    stepLabel: finalStepLabel,
    backupPath,
    totalFiles,
    diffData
  };
}

module.exports = {
  createBackup,
};
