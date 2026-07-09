import { HIERARCHY } from './hierarchy';

/**
 * Recursively collects every leaf node (no children) from a hierarchy tree.
 *
 * @param {Array} nodes
 * @param {Array} acc – accumulator (mutated in place for performance)
 * @returns {Array}
 */
function collectLeaves(nodes, acc = []) {
  for (const node of nodes) {
    if (!node.children || node.children.length === 0) {
      acc.push(node);
    } else {
      collectLeaves(node.children, acc);
    }
  }
  return acc;
}

/**
 * Flat list of all product (leaf) nodes, built once at module load time.
 * Used as the source for the global search feature.
 */
export const SEARCH_INDEX = collectLeaves(HIERARCHY);
