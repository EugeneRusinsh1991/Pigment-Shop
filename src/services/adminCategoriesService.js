/**
 * adminCategoriesService.js
 *
 * CRUD helpers for the admin category catalog.
 * All mutation functions return a new categories array — they do NOT write
 * to the store or to Firestore. Callers decide whether to commit.
 *
 * Firestore persistence is handled by adminCatalogBoundary.persistCategories().
 * In-memory state reads come from catalogState.getCategories().
 */

import { getCategories } from '../data/catalogState';
import {
  getDepthForParent,
  MAX_DEPTH,
  recalculateAllDepths,
} from './categoryDepth';

export { getDepthForParent, MAX_DEPTH };

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
  const newCategory = { ...category, id: `cat-admin-${Date.now()}`, depth };
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
  next[idx] = { ...all[idx], ...changes };
  return recalculateAllDepths(next);
}

/**
 * Remove a category; orphans direct children to root, recalculates all depths.
 * @returns {Array} New categories array.
 */
export function removeCategory(id, all = getCategories()) {
  const orphaned = all
    .filter((c) => c.id !== id)
    .map((c) => (c.parentId === id ? { ...c, parentId: null } : c));
  if (orphaned.length === all.length) return all;
  return recalculateAllDepths(orphaned);
}
