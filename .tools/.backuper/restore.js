const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { restoreFromBackup } = require('./restore/core');
const { createBackup } = require('./backup/core');
const { getDiffLog } = require('./utils/diff-tracker');

const args = process.argv.slice(2);

// Direct restoration if path argument is supplied
if (args.length > 0) {
  const backupPath = path.resolve(args[0]);
  try {
    restoreFromBackup(backupPath);
  } catch (error) {
    console.error('❌ Ошибка при восстановлении:', error.message);
    process.exit(1);
  }
  process.exit(0);
}

// Interactive CLI Menu Implementation
function getRecentBackups(limit = 20) {
  const projectRoot = path.resolve(__dirname, '../..');
  const parentDir = path.dirname(projectRoot);

  if (!fs.existsSync(parentDir)) return [];

  const entries = fs.readdirSync(parentDir);
  return entries
    .filter((name) => name.startsWith('src_'))
    .map((name) => {
      const fullPath = path.join(parentDir, name);
      let stat = { mtimeMs: 0 };
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {}
      const diffData = getDiffLog(name);
      return {
        name,
        path: fullPath,
        mtimeMs: stat.mtimeMs,
        diff: diffData ? diffData.diff : null
      };
    })
    .filter((item) => {
      try {
        return fs.statSync(item.path).isDirectory();
      } catch (e) {
        return false;
      }
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .slice(0, limit);
}

function promptComment(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('💬 Введите комментарий к бекапу: ', (answer) => {
    rl.close();
    callback(answer.trim());
  });
}

function runInteractiveMenu() {
  const stdin = process.stdin;
  const stdout = process.stdout;

  const mainOptions = [
    { type: 'quick_backup', label: '⚡ Создать быстрый бекап' },
    { type: 'comment_backup', label: '💬 Создать бекап с комментарием (--step)' },
    { type: 'restore_header', label: '--- ВОССТАНОВЛЕНИЕ (Выбор из 20 последних) ---', disabled: true },
  ];

  const backups = getRecentBackups(20);
  if (backups.length === 0) {
    mainOptions.push({ type: 'info', label: '  (Нет доступных бекапов)', disabled: true });
  } else {
    backups.forEach((b) => {
      let diffStr = '';
      if (b.diff) {
        diffStr = ` (+${b.diff.added} / -${b.diff.removed} / ~${b.diff.modified})`;
      }
      mainOptions.push({
        type: 'restore_item',
        label: `📦 ${b.name}${diffStr}`,
        backupPath: b.path,
        backupName: b.name
      });
    }
  );
  }

  let selectedIndex = 0;

  function render() {
    console.clear();
    console.log('==============================================');
    console.log('       🛠️   .TOOLS BACKUP & RESTORE   🛠️     ');
    console.log('==============================================');
    console.log('Используйте [стрелки ВВЕРХ/ВНИЗ] для выбора, [ENTER] для запуска, [ESC] для выхода\n');

    mainOptions.forEach((opt, idx) => {
      if (opt.disabled) {
        console.log(`\x1b[90m${opt.label}\x1b[0m`);
      } else if (idx === selectedIndex) {
        console.log(`\x1b[36m\x1b[1m > ${opt.label}\x1b[0m`);
      } else {
        console.log(`   ${opt.label}`);
      }
    });
  }

  if (stdin.isTTY) {
    readline.emitKeypressEvents(stdin);
    stdin.setRawMode(true);
  } else {
    console.log('Ошибки TTY terminal. Используйте: npm run backup или npm run restore <path>');
    process.exit(0);
  }

  render();

  function onKeypress(str, key) {
    if (key.name === 'escape' || (key.ctrl && key.name === 'c')) {
      cleanup();
      console.clear();
      console.log('👋 Выход.');
      process.exit(0);
    }

    if (key.name === 'up') {
      do {
        selectedIndex = (selectedIndex - 1 + mainOptions.length) % mainOptions.length;
      } while (mainOptions[selectedIndex].disabled);
      render();
    } else if (key.name === 'down') {
      do {
        selectedIndex = (selectedIndex + 1) % mainOptions.length;
      } while (mainOptions[selectedIndex].disabled);
      render();
    } else if (key.name === 'return') {
      const selected = mainOptions[selectedIndex];
      if (selected.disabled) return;

      cleanup();
      console.clear();

      if (selected.type === 'quick_backup') {
        createBackup();
      } else if (selected.type === 'comment_backup') {
        promptComment((comment) => {
          createBackup({ stepLabel: comment });
        });
      } else if (selected.type === 'restore_item') {
        console.log(`🔄 Восстанавливаем бекап: ${selected.backupName}...`);
        restoreFromBackup(selected.backupPath);
      }
    }
  }

  function cleanup() {
    stdin.removeListener('keypress', onKeypress);
    if (stdin.isTTY) {
      stdin.setRawMode(false);
    }
  }

  stdin.on('keypress', onKeypress);
}

runInteractiveMenu();
