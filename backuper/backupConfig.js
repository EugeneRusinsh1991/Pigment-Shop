/**
 * Конфигурация для скриптов резервного копирования и восстановления
 * Определяет, какие папки и файлы нужно резервировать и восстанавливать
 */

const BACKUP_ITEMS = [
  'src',
  'package.json',
  'package-lock.json',
  'app.json',
  'app.config.js',
  'babel.config.js',
  'eslint.config.js',
  'metro.config.js',
  'tsconfig.json',
  'expo-env.d.ts',
  'README.md',
  '.gitignore',
  '.vscode'
];

const REQUIRED_ITEMS = ['src', 'package.json', 'app.config.js', 'tsconfig.json'];

module.exports = {
  BACKUP_ITEMS,
  REQUIRED_ITEMS,
};
