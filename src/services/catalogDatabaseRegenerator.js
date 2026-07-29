import { createRandomCatalogDataset, generateOrdersDataset } from './catalogDatabaseRegenerator.helpers.js';
import { catalogRepository } from './repositories/index.js';
const { fetchExistingCatalogData, replaceCatalogData, signInAsAdmin } = catalogRepository;
import { withServiceContract } from './serviceContract.js';

function assertSuccess(res, fallbackMsg) {
  if (!res.success) throw new Error(res.error || fallbackMsg);
}

async function _regenerateCatalogDatabase(options = {}) {
  if (options.authenticate) {
    console.log(`Step 1: Signing in as admin... [mode: ${options.mode || 'standard'}]`);
    const authRes = await signInAsAdmin();
    assertSuccess(authRes, 'Admin sign-in failed');
    console.log('  Sign-in successful.');
  }

  console.log('Step 2: Fetching existing data...');
  const existingRes = await fetchExistingCatalogData();
  assertSuccess(existingRes, 'Failed to fetch existing data');
  const existingData = existingRes.data;

  console.log(`  Found ${existingData.counts.products} products, ${existingData.counts.categories} categories, ${existingData.counts.orders} orders, ${existingData.users.length} users.`);

  console.log('Step 3: Deleting existing data (products, categories, orders)...');

  console.log('Step 4: Generating and writing new dataset...');
  const dataset = createRandomCatalogDataset(options);
  const ordersDataset = generateOrdersDataset(existingData.users, dataset.products, options);

  const replaceRes = await replaceCatalogData(existingData, dataset, ordersDataset);
  assertSuccess(replaceRes, 'Failed to replace catalog data');

  console.log(`  Wrote ${dataset.categories.length} categories, ${dataset.products.length} products, and ${ordersDataset.length} orders.`);

  return { ...dataset, orders: ordersDataset };
}

export const regenerateCatalogDatabase = withServiceContract(_regenerateCatalogDatabase, 'Failed to regenerate catalog database');
