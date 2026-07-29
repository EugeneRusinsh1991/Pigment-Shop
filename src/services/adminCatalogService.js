/**
 * adminCatalogService.js
 *
 * Functional module that handles all write operations and database persistence
 * for the admin features.
 */

import { SEED_BANNERS } from '../data/catalogState';
import { regenerateCatalogDatabase } from './catalogDatabaseRegenerator';
import { withServiceContract } from './serviceContract';
import { catalogRepository } from './repositories/index.js';
const { saveCatalogDrafts, saveBanners } = catalogRepository;

async function _saveDrafts(draftProducts, draftCategories, oldProducts, oldCategories) {
  const res = await saveCatalogDrafts(draftProducts, draftCategories, oldProducts, oldCategories);
  if (!res.success) throw new Error(res.error || 'Failed to save catalog drafts');
  return { products: draftProducts, categories: draftCategories };
}

async function _updateBanners(banners) {
  const res = await saveBanners(banners);
  if (!res.success) throw new Error(res.error || 'Failed to update banners');
  return { banners };
}

async function _resetBannersToSeed() {
  const seed = [...SEED_BANNERS];
  const res = await saveBanners(seed);
  if (!res.success) throw new Error(res.error || 'Failed to reset banners');
  return { banners: seed };
}

export const saveDrafts = withServiceContract(_saveDrafts, 'Failed to save catalog drafts');
export const updateBanners = withServiceContract(_updateBanners, 'Failed to update banners');
export const resetBannersToSeed = withServiceContract(_resetBannersToSeed, 'Failed to reset banners');
export const regenerateDatabase = regenerateCatalogDatabase;
