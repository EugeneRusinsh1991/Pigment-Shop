/**
 * adminCatalogBoundary.js
 *
 * Dedicated admin-facing boundary for catalog persistence operations.
 *
 * This is the ONLY module that performs Firestore write operations for the
 * catalog domain. Admin workflows (product CRUD, category persistence) flow
 * through this boundary instead of directly mutating the storefront state.
 *
 * Storefront consumers (CatalogContext, UI components) read from catalogState
 * and are automatically notified when this boundary updates the state.
 *
 * Public API
 * ----------
 * persistCategories(categories)   – batch-write categories to Firestore + update state
 */

import { db } from '../firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { getCategories, setCategories } from '../data/catalogState';

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
