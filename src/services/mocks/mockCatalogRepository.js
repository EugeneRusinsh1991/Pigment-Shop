/**
 * mockCatalogRepository.js
 *
 * Mock implementation of catalogRepository.js.
 * Mirrors the exact public API with simulated latency and deterministic data.
 */

import { withServiceContract } from '../serviceContract.js';
import { delay, MOCK_PRODUCTS, MOCK_CATEGORIES } from './mockFactories.js';

export { SORT_KEYS } from '../repositories/catalogQueryBuilder.js';

export class MissingIndexError extends Error {
  constructor(message = 'Mock: Firestore index missing') {
    super(message);
    this.name = 'MissingIndexError';
    this.code = 'MISSING_INDEX';
  }
}

let _simulateError = false;

/** Toggle error simulation mode for E2E testing */
export function setSimulateError(value) {
  _simulateError = value;
}

async function _signInAsAdmin() {
  await delay(100);
}

async function _fetchProductPage(filters, sortKey, afterDoc = null, pageSize = 15) {
  await delay();
  if (_simulateError) throw new Error('Mock: network error');

  let products = JSON.parse(JSON.stringify(MOCK_PRODUCTS));

  if (filters?.categoryId) {
    products = products.filter((p) => p.categoryId === filters.categoryId);
  }

  const startIndex = afterDoc ? products.findIndex((p) => p.id === afterDoc.id) + 1 : 0;
  const page = products.slice(startIndex, startIndex + pageSize);

  return {
    products: page,
    lastDoc: page.length > 0 ? page[page.length - 1] : null,
  };
}

async function _fetchProductCount(filters) {
  await delay(100);
  if (_simulateError) throw new Error('Mock: network error');

  let products = MOCK_PRODUCTS;
  if (filters?.categoryId) {
    products = products.filter((p) => p.categoryId === filters.categoryId);
  }
  return products.length;
}

async function _saveCatalogDrafts() {
  await delay(300);
}

async function _saveBanners() {
  await delay(100);
}

async function _fetchExistingCatalogData() {
  await delay(200);
  return {
    productsDocsIds: MOCK_PRODUCTS.map((p) => p.id),
    categoriesDocsIds: MOCK_CATEGORIES.map((c) => c.id),
    ordersDocsIds: [],
    users: [],
    counts: {
      products: MOCK_PRODUCTS.length,
      categories: MOCK_CATEGORIES.length,
      orders: 0,
    },
  };
}

async function _replaceCatalogData() {
  await delay(300);
}

export const signInAsAdmin = withServiceContract(_signInAsAdmin, 'Mock admin sign-in failed');
export const fetchProductPage = withServiceContract(_fetchProductPage, 'Mock product page fetch failed');
export const fetchProductCount = withServiceContract(_fetchProductCount, 'Mock product count fetch failed');
export const saveCatalogDrafts = withServiceContract(_saveCatalogDrafts, 'Mock save catalog drafts failed');
export const saveBanners = withServiceContract(_saveBanners, 'Mock save banners failed');
export const fetchExistingCatalogData = withServiceContract(_fetchExistingCatalogData, 'Mock fetch existing catalog data failed');
export const replaceCatalogData = withServiceContract(_replaceCatalogData, 'Mock replace catalog data failed');
