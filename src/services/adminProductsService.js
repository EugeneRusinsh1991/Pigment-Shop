/**
 * adminProductsService.js
 *
 * CRUD operations for the admin product catalog.
 * Reads from and writes to catalogState — mutations automatically notify all subscribers.
 *
 * Product data lives in memory only (no Firestore backing for products).
 */

import { getProducts, setProducts } from '../data/catalogState';

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

/**
 * Add a new product. Auto-generates an id.
 * @param {Object} product
 * @returns {Object} The created product.
 */
export function addProduct(product) {
  const newProduct = {
    ...product,
    id: `p-admin-${Date.now()}`,
    sold: product.sold ?? 0,
    stock: product.stock ?? 0,
    active: product.active ?? true,
  };
  setProducts([...getProducts(), newProduct]);
  return newProduct;
}

/**
 * Update an existing product by id.
 * @param {string} id
 * @param {Object} changes
 * @returns {Object|null} Updated product or null if not found.
 */
export function updateProduct(id, changes) {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...products[idx], ...changes };
  const newList = [...products];
  newList[idx] = updated;
  setProducts(newList);
  return updated;
}

/**
 * Remove a product by id.
 * @param {string} id
 * @returns {boolean} True if removed.
 */
export function removeProduct(id) {
  const before = getProducts();
  const after = before.filter((p) => p.id !== id);
  if (after.length === before.length) return false;
  setProducts(after);
  return true;
}
