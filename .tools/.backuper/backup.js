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

try {
  const stepLabel = parseStepArg();
  const name = parseNameArg();
  createBackup({ stepLabel, name });
} catch (error) {
  console.error('❌ Ошибка при создании бекапа:', error.message);
  process.exit(1);
}
