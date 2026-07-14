/**
 * adminProductsService.js
 *
 * CRUD operations for the admin product catalog.
 *
 * All mutations are now delegated to adminCatalogBoundary, which is the
 * single owner of admin-side product state changes. This service retains
 * the search helpers and re-exports the boundary commands so that the admin
 * UI has a stable, single-import surface.
 *
 * Product data lives in memory only (no Firestore backing for products).
 */


import { getProducts } from '../data/catalogState';


/** Returns all products (current snapshot). */
export function getAllProducts() {
  return getProducts();
}

const getDictValuesString = (dict) => {
  const ru = dict.ru || '';
  const uk = dict.uk || '';
  const en = dict.en || '';
  return `${ru} ${uk} ${en}`;
};

function getSearchableString(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    return getDictValuesString(val);
  }
  return val;
}

const getProductField = (field) => {
  return field || '';
};

const productMatchesQuery = (p, q) => {
  if (getSearchableString(p.label).toLowerCase().includes(q)) return true;
  if (getProductField(p.brand).toLowerCase().includes(q)) return true;
  if (getProductField(p.sku).toLowerCase().includes(q)) return true;
  return false;
};

/**
 * Search products by name, brand, or SKU (case-insensitive).
 * @param {string} query
 * @returns {Array}
 */
export function searchProducts(query) {
  if (!query || !query.trim()) return getProducts();
  const q = query.toLowerCase();
  return getProducts().filter((p) => productMatchesQuery(p, q));
}
