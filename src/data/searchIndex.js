/**
 * searchIndex.js
 *
 * Re-exports the admin product store as a flat list.
 * Kept for backward compatibility with any remaining static imports.
 * Prefer using CatalogContext.flatList for reactive reads.
 */
import { getAdminProducts } from './adminProducts';

export function getSearchIndex() {
  return getAdminProducts().filter((p) => p.active !== false);
}

// Static snapshot for components that haven't migrated to context yet
export const SEARCH_INDEX = getSearchIndex();
