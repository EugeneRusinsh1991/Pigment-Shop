const { createBackup } = require('./backup/core');

// Parse optional --step <LABEL> argument
// e.g. node backup.js --step STEP1
function parseStepArg() {
  const args = process.argv.slice(2);
  const idx = args.indexOf('--step');
  if (idx !== -1 && args[idx + 1]) {
    return args[idx + 1];
  }

  const positionalArg = args.find((arg) => !arg.startsWith('--'));
  return positionalArg || null;
}

// Parse optional --name <NAME> or --name=<NAME> argument
function parseNameArg() {
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (arg.startsWith('--name=')) {
      return arg.substring(7);
    }
  }
  const idx = args.indexOf('--name');
  if (idx !== -1 && args[idx + 1]) {
    return args[idx + 1];
  }
  return null;
}

const { execSync } = require('child_process');

try {
  const stepLabel = parseStepArg();
  const name = parseNameArg();
  const backupResult = createBackup({ stepLabel, name });

  const commitMsg = backupResult ? backupResult.backupName : (name || stepLabel || 'backup');

  console.log('\n🔄 Синхронизация с Git...');
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });

  console.log('\n✅ Backup completed and sent to Git!');

  console.log('⏳ Завершение через 10 секунд...');
  const stopAt = Date.now() + 10000;
  while (Date.now() < stopAt) {
    // Synchronous delay to preserve terminal window before auto-close
  }
} catch (error) {
  console.error('❌ Ошибка при создании бекапа:', error.message);
  process.exit(1);
}

