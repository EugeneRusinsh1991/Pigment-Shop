/**
 * Универсальная конфигурация резервного копирования и восстановления.
 * Динамически сканирует корень любого проекта, игнорируя служебные и временные каталоги.
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_EXCLUDED = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.expo',
  'test-results',
  'playwright-report',
  'blob-report',
  '.auditor-reports',
  '.next',
  'coverage',
  '.cache',
  'tmp',
  '.auditor',
  '.backuper'
];

function getProjectRoot() {
  return path.resolve(__dirname, '../..');
}

function getBackupItems() {
  const projectRoot = getProjectRoot();
  let customConfig = {};
  const configPath = path.join(projectRoot, '.backuper.json');
  if (fs.existsSync(configPath)) {
    try {
      customConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {}
  }

  const excluded = new Set([
    ...DEFAULT_EXCLUDED,
    ...(customConfig.exclude || [])
  ]);

  let items = [];
  if (fs.existsSync(projectRoot)) {
    const rootEntries = fs.readdirSync(projectRoot);
    items = rootEntries.filter((entry) => {
      if (excluded.has(entry)) return false;
      if (entry.startsWith('_backup_before_restore_')) return false;
      if (entry.startsWith('src_')) {
        try {
          if (fs.statSync(path.join(projectRoot, entry)).isDirectory()) return false;
        } catch (e) {}
      }
      return true;
    });
  }

  if (Array.isArray(customConfig.include)) {
    customConfig.include.forEach((inc) => {
      if (!items.includes(inc)) items.push(inc);
    });
  }

  return items;
}

function getRequiredItems() {
  const projectRoot = getProjectRoot();
  const candidates = ['package.json', 'pyproject.toml', 'Cargo.toml', 'go.mod'];
  const found = candidates.filter((item) => fs.existsSync(path.join(projectRoot, item)));
  return found;
}

const BACKUP_ITEMS = getBackupItems();
const REQUIRED_ITEMS = getRequiredItems();

module.exports = {
  ALWAYS_INCLUDED_ITEMS: ['.tools'],
  EXCLUDED_BACKUP_ITEMS: DEFAULT_EXCLUDED,
  BACKUP_ITEMS,
  REQUIRED_ITEMS,
};
