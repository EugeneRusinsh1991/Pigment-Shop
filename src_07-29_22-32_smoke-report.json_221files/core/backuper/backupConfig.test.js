const test = require('node:test');
const assert = require('node:assert/strict');
const { ALWAYS_INCLUDED_ITEMS, EXCLUDED_BACKUP_ITEMS, BACKUP_ITEMS } = require('./backupConfig');

test('backup config includes required project assets and excludes backup-only directories', () => {
  const items = new Set(BACKUP_ITEMS);

  for (const required of [...ALWAYS_INCLUDED_ITEMS, 'media']) {
    assert.ok(items.has(required), `expected backup config to include ${required}`);
  }

  for (const excluded of EXCLUDED_BACKUP_ITEMS) {
    assert.ok(!items.has(excluded), `expected backup config to exclude ${excluded}`);
  }
});
