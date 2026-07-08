const fs = require('fs');
const path = require('path');
const { BACKUP_ITEMS, REQUIRED_ITEMS } = require('../backupConfig');
const { copyDir, removeDir, copyFile, getTimestamp, ensureDirExists } = require('../utils/fs-tools');

function validateRequiredItems(requiredItems, baseDir) {
  let allGood = true;

  requiredItems.forEach((item) => {
    const itemPath = path.join(baseDir, item);
    if (fs.existsSync(itemPath)) {
      console.log(`  ✅ Найден: ${item}`);
    } else {
      console.log(`  ⚠️  ОТСУТСТВУЕТ: ${item}`);
      allGood = false;
    }
  });

  return allGood;
}

function resolveBackupPath(backupPathArg) {
  if (!backupPathArg) {
    throw new Error('Путь к папке бекапа не указан');
  }
  let backupPath = backupPathArg;
  if (!path.isAbsolute(backupPath)) {
    backupPath = path.resolve(backupPath);
  }
  if (!fs.existsSync(backupPath)) {
    throw new Error(`Папка бекапа не найдена: ${backupPath}`);
  }
  return backupPath;
}

function createTemporaryBackup(currentDir, timestamp, directories) {
  console.log('📋 ШАГ 1: Создаём резервную копию текущего кода...');
  const backupDir = path.join(currentDir, `_backup_before_restore_${timestamp}`);
  ensureDirExists(backupDir);

  directories.forEach((item) => {
    const srcPath = path.join(currentDir, item);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(backupDir, item);
      copyDir(srcPath, destPath);
      console.log(`  ✅ Сохранена резервная копия: ${item}`);
    }
  });
  console.log(`  📂 Резервная копия сохранена в: _backup_before_restore_${timestamp}\n`);
}

function removeOldDirectories(currentDir, directories) {
  console.log('🗑️  ШАГ 2: Удаляем старые папки...');
  directories.forEach((item) => {
    const targetPath = path.join(currentDir, item);
    if (fs.existsSync(targetPath)) {
      removeDir(targetPath);
      console.log(`  ✅ Удалена: ${item}`);
    }
  });
  console.log();
}

function copyFromBackup(backupPath, currentDir, directories, files) {
  console.log('📥 ШАГ 3: Копируем файлы из бекапа...');
  directories.forEach((item) => {
    const srcPath = path.join(backupPath, item);
    const destPath = path.join(currentDir, item);

    if (fs.existsSync(srcPath)) {
      copyDir(srcPath, destPath);
      console.log(`  ✅ Восстановлена: ${item}`);
    } else {
      console.log(`  ⏭️  Пропущена (не найдена в бекапе): ${item}`);
    }
  });

  files.forEach((file) => {
    const srcPath = path.join(backupPath, file);
    const destPath = path.join(currentDir, file);

    if (fs.existsSync(srcPath)) {
      copyFile(srcPath, destPath);
      console.log(`  ✅ Восстановлен: ${file}`);
    }
  });
  console.log();
}

function printResult(allGood, timestamp) {
  if (allGood) {
    console.log('✨ Восстановление успешно завершено!\n');
    console.log('📝 Следующие шаги:');
    console.log('  1. Установите зависимости: npm install');
    console.log('  2. Проверьте проект: npm run lint');
    console.log('  3. Запустите приложение: npm start');
    console.log();
    console.log(`📂 Резервная копия старых файлов: _backup_before_restore_${timestamp}`);
    console.log('   (можно удалить если всё работает)\n');
  } else {
    console.error('❌ Что-то пошло не так! Проверьте ошибки выше.\n');
    console.log(`📂 Ваши старые файлы сохранены в: _backup_before_restore_${timestamp}`);
    console.log('   Восстановите их вручную если нужно.\n');
    process.exit(1);
  }
}

function restoreFromBackup(backupPathArg) {
  const currentDir = process.cwd();
  const timestamp = getTimestamp();
  
  const backupPath = resolveBackupPath(backupPathArg);

  const directories = BACKUP_ITEMS.filter(item => ['src', 'assets', 'scripts', '.vscode'].includes(item));
  const files = BACKUP_ITEMS.filter(item => !directories.includes(item));

  console.log('🔄 Начинаем восстановление из бекапа...\n');
  console.log(`📁 Текущий проект: ${currentDir}`);
  console.log(`💾 Восстанавливаем из: ${backupPath}\n`);

  createTemporaryBackup(currentDir, timestamp, directories);
  removeOldDirectories(currentDir, directories);
  copyFromBackup(backupPath, currentDir, directories, files);

  console.log('✅ ШАГ 4: Проверяем целостность восстановления...');
  const allGood = validateRequiredItems(REQUIRED_ITEMS, currentDir);
  console.log();

  printResult(allGood, timestamp);
}

module.exports = {
  restoreFromBackup,
};
