import {
  generateCategoryHierarchy,
  generateProductsForHolders,
  generateProductActivity,
  generateOrdersDataset,
  generateSupportAndNotes,
} from './catalogDatabaseRegenerator.helpers.js';
import { catalogRepository } from './repositories/index.js';
import { validatePool, mediaPool } from '../constants/mediaPool.js';
const {
  fetchExistingCatalogContext,
  batchDeleteCollections,
  batchWriteCatalogData,
  signInAsAdmin,
} = catalogRepository;
import { withServiceContract } from './serviceContract.js';

function assertSuccess(res, fallbackMsg) {
  if (!res.success) throw new Error(res.error || fallbackMsg);
}

function validateOptions(options = {}) {
  const rootCount = options.rootCount !== undefined ? Number(options.rootCount) : 3;
  if (!Number.isInteger(rootCount) || rootCount < 1 || rootCount > 10) {
    throw new Error('rootCount must be an integer between 1 and 10');
  }
  return { ...options, rootCount };
}

async function _regenerateCatalogDatabase(options = {}) {
  const startTime = Date.now();

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Database regeneration is disabled in production environment');
  }

  // Pre-flight media pool validation gate
  validatePool(mediaPool);

  const validOptions = validateOptions(options);
  const onProgress = typeof validOptions.onProgress === 'function' ? validOptions.onProgress : () => {};

  if (validOptions.authenticate) {
    onProgress('auth', 5);
    const authRes = await signInAsAdmin();
    assertSuccess(authRes, 'Admin sign-in failed');
  }

  onProgress('fetch_context', 20);
  const contextRes = await fetchExistingCatalogContext();
  assertSuccess(contextRes, 'Failed to fetch catalog context');
  const contextData = contextRes.data;

  onProgress('clean_data', 40);
  const deleteRes = await batchDeleteCollections(contextData);
  assertSuccess(deleteRes, 'Failed to clean old catalog data');

  onProgress('generate_data', 60);
  const { categories, holders } = generateCategoryHierarchy(validOptions.rootCount, mediaPool);
  const products = generateProductsForHolders(holders, { ...validOptions, mediaPool });
  const productActivity = generateProductActivity(products, contextData.users);
  const orders = generateOrdersDataset(contextData.users, products, validOptions);
  const { supportMessages, adminNotes } = generateSupportAndNotes(contextData.users, validOptions);

  onProgress('write_data', 80);
  const writeRes = await batchWriteCatalogData({
    categories,
    products,
    productActivity,
    orders,
    supportMessages,
    adminNotes,
  });
  assertSuccess(writeRes, 'Failed to write catalog data');

  onProgress('complete', 100);

  const reviewsCount = Object.values(productActivity).reduce((acc, act) => acc + (act.reviews?.length || 0), 0);
  const questionsCount = Object.values(productActivity).reduce((acc, act) => acc + (act.questions?.length || 0), 0);
  const durationMs = Date.now() - startTime;

  const stats = {
    categoriesCount: categories.length,
    productsCount: products.length,
    reviewsCount,
    questionsCount,
    ordersCount: orders.length,
    supportMessagesCount: supportMessages.length,
    adminNotesCount: adminNotes.length,
  };

  return {
    categories,
    products,
    productActivity,
    orders,
    supportMessages,
    adminNotes,
    stats,
    durationMs,
  };
}

export const regenerateCatalogDatabase = withServiceContract(_regenerateCatalogDatabase, 'Failed to regenerate catalog database');
export const regenerateDatabase = regenerateCatalogDatabase;
