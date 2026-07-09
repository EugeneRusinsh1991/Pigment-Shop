import { useMemo } from 'react';

/**
 * useSearch
 *
 * Filters a flat product index by a query string.
 * Matching is case-insensitive substring containment.
 *
 * @param {Array<{ id: string, label: string, icon: string }>} index
 * @param {string} query
 * @returns {Array<{ id: string, label: string, icon: string }>}
 */
export default function useSearch(index, query) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((item) => item.label.toLowerCase().includes(q));
  }, [index, query]);
}
