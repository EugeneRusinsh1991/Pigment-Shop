/**
 * adminCatalogBoundary.js
 *
 * The single admin-facing boundary for all catalog mutations.
 *
 * This module owns every admin-side create / update / delete operation for
 * both products and categories.  Storefront consumers (CatalogContext, UI
 * components) read from catalogState and are notified automatically whenever
 * this boundary commits a change.
 *
 * Contract
 * --------
 * Product commands (in-memory only — products have no Firestore backing):
 *   addProduct(data)          → Object   created product
 *   updateProduct(id, data)   → Object|null  updated product, or null
 *   removeProduct(id)         → boolean  true if removed
 *
 * Category commands (Firestore + in-memory):
 *   persistCategories(categories) → Promise<void>
 *
 * Update propagation
 * ------------------
 * Every command calls catalogState setters which call notify(), so all
 * useSyncExternalStore subscribers re-render without any manual refresh.
 */

import { db } from '../firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { getCategories, getProducts, setCategories, setProducts } from '../data/catalogState';

// ---------------------------------------------------------------------------
// Product commands
// ---------------------------------------------------------------------------

/**
 * Add a new product. Auto-generates an id and applies safe defaults.
 * @param {Object} data  Raw product fields from the admin form.
 * @returns {Object}     The created product stored in catalogState.
 */
export function addProduct(data) {
  const product = {
    ...data,
    id: `p-admin-${Date.now()}`,
    sold: data.sold ?? 0,
    stock: data.stock ?? 0,
    active: data.active ?? true,
  };
  setProducts([...getProducts(), product]);
  return product;
}

/**
 * Update an existing product by id.
 * @param {string} id
 * @param {Object} changes  Partial product fields to merge.
 * @returns {Object|null}   Updated product, or null if not found.
 */
export function updateProduct(id, changes) {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...products[idx], ...changes };
  const next = [...products];
  next[idx] = updated;
  setProducts(next);
  return updated;
}

/**
 * Remove a product by id.
 * @param {string} id
 * @returns {boolean}  True if the product was found and removed.
 */
export function removeProduct(id) {
  const before = getProducts();
  const after = before.filter((p) => p.id !== id);
  if (after.length === before.length) return false;
  setProducts(after);
  return true;
}

// ---------------------------------------------------------------------------
// Category commands
// ---------------------------------------------------------------------------

/**
 * Persist the given categories array to Firestore in a batch write,
 * then update the in-memory state and notify all listeners.
 *
 * Deletes categories that are in the current state but absent from the new list.
 * Strips the `image` field before writing to stay within Firestore document limits.
 *
 * @param {Array} categories - The full new category list to persist.
 * @returns {Promise<void>}
 */
export async function persistCategories(categories) {
  const oldCategories = getCategories();

  const batch = writeBatch(db);
  const categoriesCol = collection(db, 'categories');

  // Find deleted categories
  const newIds = new Set(categories.map((c) => c.id));
  const deleted = oldCategories.filter((c) => !newIds.has(c.id));

  deleted.forEach((cat) => {
    batch.delete(doc(categoriesCol, cat.id));
  });

  // Set/update all categories in the list (without images to fit document limit)
  categories.forEach((cat) => {
    const { image, ...rest } = cat;
    batch.set(doc(categoriesCol, cat.id), rest);
  });

  await batch.commit();

  // Update local state after successful Firestore commit
  setCategories(categories);
}
