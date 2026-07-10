/**
 * categoryDepth.js
 *
 * Pure utility functions for category depth calculation.
 */

export const MAX_DEPTH = 5;

function isCatInvalid(cat) {
  return !cat || !cat.parentId;
}

function getDepthFallback(id, visited, cat) {
  if (!id) return 0;
  if (visited.has(id)) return 1;
  if (isCatInvalid(cat)) return 1;
  return null;
}

/** Compute depth for a node by walking its parentId chain. */
function calcDepth(id, byId, visited = new Set()) {
  const cat = byId[id];
  const fallback = getDepthFallback(id, visited, cat);
  if (fallback !== null) return fallback;
  
  visited.add(id);
  return calcDepth(cat.parentId, byId, visited) + 1;
}

/** Recalculates `depth` for every category in the flat list. */
export function recalculateAllDepths(list) {
  const byId = Object.fromEntries(list.map((c) => [c.id, c]));
  return list.map((c) => ({ ...c, depth: calcDepth(c.id, byId) }));
}

/**
 * Returns the depth a child of `parentId` would have.
 * Uses the stored `depth` field for fast lookup.
 */
export function getDepthForParent(parentId, categories) {
  if (!parentId) return 1;
  const parent = categories.find((c) => c.id === parentId);
  if (!parent) return 1;
  
  const depth = parent.depth;
  if (depth != null) return depth + 1;
  return 2;
}
