/**
 * adminCategoriesService.js
 *
 * Pure transform helpers for the admin category catalog.
 *
 * All functions return a new categories array — they do NOT write to the store
 * or to Firestore. Callers (e.g. CategoriesManager) decide whether to commit
 * the result by calling adminCatalogBoundary.persistCategories().
 *
 * The read from catalogState.getCategories() is used only as a convenience
 * default argument so callers can omit the current list. This is a read-only
 * dependency and does not couple category mutation logic to the storefront path.
 *
 * Firestore persistence is handled exclusively by adminCatalogBoundary.persistCategories().
 */

import { getCategories } from '../data/catalogState';
import {
  getDepthForParent,
  MAX_DEPTH,
  recalculateAllDepths,
} from './categoryDepth';

function getDescendantIds(parentId, all) {
  const ids = [parentId];
  const children = all.filter((c) => c.parentId === parentId);
  children.forEach((child) => {
    ids.push(...getDescendantIds(child.id, all));
  });
  return ids;
}

export { getDepthForParent, MAX_DEPTH, getDescendantIds };

/** Build a tree from the flat list. Each node has a `children` array. */
export function getCategoryTree(all = getCategories()) {
  const map = {};
  all.forEach((c) => { map[c.id] = { ...c, children: [] }; });
  const roots = [];
  all.forEach((c) => {
    if (c.parentId && map[c.parentId]) map[c.parentId].children.push(map[c.id]);
    else roots.push(map[c.id]);
  });
  return roots;
}

/**
 * Add a new category. Rejects if the resulting depth would exceed MAX_DEPTH.
 * @returns {Array|null} New categories array, or null if depth exceeded.
 */
export function addCategory(category, all = getCategories()) {
  const depth = getDepthForParent(category.parentId, all);
  if (depth > MAX_DEPTH) return null;
  const newCategory = {
    ...category,
    id: `cat-admin-${Date.now()}`,
    depth,
    productIds: (category.productIds || []).filter(Boolean),
  };
  return recalculateAllDepths([...all, newCategory]);
}

/**
 * Update a category. Recalculates depth for the category and all descendants.
 * @returns {Array|null} New categories array, or null if not found.
 */
export function updateCategory(id, changes, all = getCategories()) {
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const next = [...all];
  next[idx] = {
    ...all[idx],
    ...changes,
    productIds: (changes.productIds || all[idx].productIds || []).filter(Boolean),
  };
  return recalculateAllDepths(next);
}

/**
 * Remove a category and all its descendants.
 * @returns {Array} New categories array.
 */
export function removeCategory(id, all = getCategories()) {
  const toDeleteIds = getDescendantIds(id, all);
  const next = all.filter((c) => !toDeleteIds.includes(c.id));
  if (next.length === all.length) return all;
  return recalculateAllDepths(next);
}
