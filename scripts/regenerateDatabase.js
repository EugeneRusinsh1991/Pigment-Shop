#!/usr/bin/env node

import { regenerateCatalogDatabase } from '../src/services/catalogDatabaseRegenerator.js';

async function main() {
  try {
    const isLow = process.argv.includes('--low');
    const mode = isLow ? 'low' : 'standard';
    const result = await regenerateCatalogDatabase({ mode, authenticate: true });
    if (!result.success) {
      throw new Error(result.error);
    }
    const data = result.data;
    console.log(`Database regeneration complete [mode: ${mode}].`);
    console.log(`Products: ${data.products.length}`);
    console.log(`Categories: ${data.categories.length}`);
    console.log(`Orders: ${data.orders ? data.orders.length : 0}`);
  } catch (error) {
    console.error('Database regeneration failed:', error);
    process.exitCode = 1;
  }
}

main();
