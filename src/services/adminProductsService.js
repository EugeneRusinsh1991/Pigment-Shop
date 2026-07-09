/**
 * adminProductsService.js
 *
 * CRUD operations for the admin product catalog.
 * Operates on the in-memory store from adminProducts.js
 */

import { getAdminProducts, setAdminProducts } from '../data/adminProducts';

/** Returns all products (copy). */
export function getAllProducts() {
  return getAdminProducts();
}

/**
 * Search products by name, brand, or SKU (case-insensitive).
 * @param {string} query
 * @returns {Array}
 */
export function searchProducts(query) {
  if (!query || !query.trim()) return getAdminProducts();
  const q = query.toLowerCase();
  return getAdminProducts().filter(
    (p) =>
      p.label.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.sku && p.sku.toLowerCase().includes(q))
  );
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
  setAdminProducts([...getAdminProducts(), newProduct]);
  return newProduct;
}

/**
 * Update an existing product by id.
 * @param {string} id
 * @param {Object} changes
 * @returns {Object|null} Updated product or null if not found.
 */
export function updateProduct(id, changes) {
  const products = getAdminProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...products[idx], ...changes };
  const newList = [...products];
  newList[idx] = updated;
  setAdminProducts(newList);
  return updated;
}

/**
 * Remove a product by id.
 * @param {string} id
 * @returns {boolean} True if removed.
 */
export function removeProduct(id) {
  const before = getAdminProducts();
  const after = before.filter((p) => p.id !== id);
  if (after.length === before.length) return false;
  setAdminProducts(after);
  return true;
}
