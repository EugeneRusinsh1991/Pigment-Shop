/**
 * adminCatalogService.js
 *
 * Functional module that handles all write operations and database persistence
 * for the admin features.
 */

import { SEED_BANNERS } from '../data/catalogState';
import { regenerateCatalogDatabase } from './catalogDatabaseRegenerator';
import { withServiceContract } from './serviceContract';
import { saveCatalogDrafts, saveBanners } from './repositories/catalogRepository';

async function _saveDrafts(draftProducts, draftCategories, oldProducts, oldCategories) {
  await saveCatalogDrafts(draftProducts, draftCategories, oldProducts, oldCategories);
  return { products: draftProducts, categories: draftCategories };
}

async function _updateBanners(banners) {
  await saveBanners(banners);
  return { banners };
}

async function _resetBannersToSeed() {
  const seed = [...SEED_BANNERS];
  await saveBanners(seed);
  return { banners: seed };
}

export const saveDrafts = withServiceContract(_saveDrafts, 'Failed to save catalog drafts');
export const updateBanners = withServiceContract(_updateBanners, 'Failed to update banners');
export const resetBannersToSeed = withServiceContract(_resetBannersToSeed, 'Failed to reset banners');
export const regenerateDatabase = regenerateCatalogDatabase;
