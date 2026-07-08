const path = require('path');
const fs = require('fs');
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

function copyConfigFiles(projectRoot, backupPath) {
  const configFiles = [
    'package.json',
    'package-lock.json',
    'app.config.js',
    'babel.config.js',
    'metro.config.js',
    'tsconfig.json',
    'eslint.config.js',
    'expo-env.d.ts',
    '.gitignore'
  ];

  configFiles.forEach(file => {
    const srcFile = path.join(projectRoot, file);
    const destFile = path.join(backupPath, file);
    if (fs.existsSync(srcFile)) {
      copyFile(srcFile, destFile);
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

function createBackup({ stepLabel, name } = {}) {
  const projectRoot = path.resolve(__dirname, '../..');
  const parentDir = path.dirname(projectRoot);
  
  let backupName;
  if (name) {
    backupName = name;
  } else {
    const timestamp = getTimestamp(false);
    const stepSuffix = stepLabel ? `_${stepLabel}` : '';
    backupName = `src_${timestamp}${stepSuffix}`;
  }
  const backupPath = path.join(parentDir, backupName);

  console.log('🔄 Создание резервной копии...');
  console.log(`📂 Источник (src): ${path.join(projectRoot, 'src')}`);
  console.log(`💾 Резервная копия: ${backupPath}\n`);

  if (fs.existsSync(backupPath)) {
    console.log(`⚠️  Папка ${backupName} уже существует! Перезаписываем...`);
    removeDir(backupPath);
  }

  ensureDirExists(backupPath);

  // Копируем всю папку src
  const srcSource = path.join(projectRoot, 'src');
  const srcDest = path.join(backupPath, 'src');
  copyDir(srcSource, srcDest);

  copyConfigFiles(projectRoot, backupPath);

  const filesInSrc = countFiles(srcSource);
  const totalFiles = countFiles(backupPath);

  console.log(`\n✨ Резервная копия успешно создана!`);
  console.log(`📂 Путь: ${backupPath}`);
  console.log(`📊 Статистика:`);
  console.log(`   - Всего файлов в папке src: ${filesInSrc}`);
  console.log(`   - Всего скопировано элементов (включая конфиги): ${totalFiles}`);

  // Emit a machine-readable success line so external callers (like smartSave.ps1)
  // can detect created backup name and timestamp without parsing human-friendly text.
  const createdAt = new Date().toISOString();
  console.log(`SMARTSAVE_BACKUP: ${backupName} | ${createdAt}`);

  writeBackupHistoryLog(backupName);

  // legacy behaviour: session-only logging handled by smartSave.ps1 in-memory
}

module.exports = {
  createBackup,
};
