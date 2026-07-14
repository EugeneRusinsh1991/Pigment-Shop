#!/usr/bin/env node

import { regenerateCatalogDatabase } from '../src/services/catalogDatabaseRegenerator.js';

async function main() {
  try {
    const result = await regenerateCatalogDatabase();
    console.log('Database regeneration complete.');
    console.log(`Products: ${result.products.length}`);
    console.log(`Categories: ${result.categories.length}`);
  } catch (error) {
    console.error('Database regeneration failed:', error);
    process.exitCode = 1;
  }
}

main();
