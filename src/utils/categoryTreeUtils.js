/**
 * Helper utilities for working with category trees.
 */

/**
 * Recursively finds the node path from the root down to targetId in a tree of category nodes.
 * @param {Array} nodes 
 * @param {string|number} targetId 
 * @param {Array} currentPath 
 * @returns {Array|null} Array of nodes representing path from root to target node, or null if not found.
 */
export function findCategoryPath(nodes, targetId, currentPath = []) {
  if (!nodes || !Array.isArray(nodes) || targetId == null) return null;
  const targetIdStr = String(targetId);

  for (const node of nodes) {
    if (!node) continue;
    const nextPath = [...currentPath, node];
    if (String(node.id) === targetIdStr) return nextPath;
    if (node.children && Array.isArray(node.children)) {
      const path = findCategoryPath(node.children, targetId, nextPath);
      if (path) return path;
    }
  }
  return null;
}

/**
 * Returns an array of category IDs representing all ancestors (and self) for selectedCategoryId.
 * @param {Array} categoryTree 
 * @param {string|number} selectedCategoryId 
 * @returns {Array<string|number>}
 */
export function getParentCategoryIds(categoryTree, selectedCategoryId) {
  if (!categoryTree || !Array.isArray(categoryTree) || selectedCategoryId == null) return [];
  const path = findCategoryPath(categoryTree, selectedCategoryId);
  return path ? path.map((node) => node.id) : [];
}
