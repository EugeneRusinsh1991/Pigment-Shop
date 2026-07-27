/**
 * useCatalogFilters.js
 *
 * Encapsulates filter state and derives a filtered + sorted product list.
 * Inputs: flatList from useCatalog(), categoryTree from useCatalog().
 * Returns: filters object and setters.
 *
 * Category filtering uses node IDs (language-independent). Selecting a parent
 * category also matches all products in its descendant categories.
 */
import { useCallback, useEffect } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { SORT_KEYS } from '../services/catalogPageService';
import { getEffectivePrice } from '../utils/pricing';
import { compareNumbers } from '../utils/sorting';
import useSessionState from './useSessionState';

/** Sort option keys — labels are resolved in CatalogSortBar via t(labelKey). */
export const SORT_OPTIONS = [
  { key: SORT_KEYS.PRICE_ASC,  labelKey: 'catalogSortPriceAsc' },
  { key: SORT_KEYS.PRICE_DESC, labelKey: 'catalogSortPriceDesc' },
];

/**
 * Maps each composite sort key to its canonical SortState { field, direction }.
 * Used to expose the standard hook interface alongside the internal sortKey.
 */
const SORT_KEY_TO_SORT_STATE = {
  [SORT_KEYS.PRICE_ASC]:  { field: 'price', direction: 'asc' },
  [SORT_KEYS.PRICE_DESC]: { field: 'price', direction: 'desc' },
  [SORT_KEYS.RATING]:     { field: 'sold',  direction: 'desc' },
};

/**
 * Finds the best-matching composite sort key for a given { field, direction }.
 * Falls back to PRICE_ASC if no exact match is found.
 */
function sortStateToKey(field, direction) {
  const entry = Object.entries(SORT_KEY_TO_SORT_STATE).find(
    ([, s]) => s.field === field && s.direction === direction
  );
  return entry ? entry[0] : SORT_KEYS.PRICE_ASC;
}

const DEFAULT_FILTERS = {
  priceMin: '',
  priceMax: '',
  inStock: false,
  outOfStock: false,
  onSale: false,
  isNew: false,
  /** Array of category node IDs (language-independent). */
  categoryIds: [],
};



function buildFilterRules(subtreeMap) {
  return [
    (p, f, ep) => f.priceMin === '' || ep >= Number(f.priceMin),
    (p, f, ep) => f.priceMax === '' || ep <= Number(f.priceMax),
    (p, f) => !f.inStock || f.outOfStock || (p.stock ?? 0) > 0,
    (p, f) => !f.outOfStock || f.inStock || (p.stock ?? 0) <= 0,
    (p, f) => !f.onSale || p.discountPercent > 0,
    (p, f) => !f.isNew || p.isNew,
    (p, f) => {
      if (f.categoryIds.length === 0) return true;
      return f.categoryIds.some((id) => {
        const subtree = subtreeMap.get(id);
        return subtree ? subtree.has(p.categoryId) : p.categoryId === id;
      });
    },
  ];
}

/** Apply all active filters to a product list. */
export function applyFilters(products, filters, subtreeMap = new Map()) {
  const rules = buildFilterRules(subtreeMap);
  return products.filter((p) => {
    const effectivePrice = getEffectivePrice(p.price, p.discountPercent);
    return rules.every((rule) => rule(p, filters, effectivePrice));
  });
}

/** Sort a product list by the chosen key. */
export function applySort(products, sortKey) {
  if (sortKey === SORT_KEYS.PRICE_ASC)  return [...products].sort((a, b) => compareNumbers(a.price, b.price, 'asc'));
  if (sortKey === SORT_KEYS.PRICE_DESC) return [...products].sort((a, b) => compareNumbers(a.price, b.price, 'desc'));
  if (sortKey === SORT_KEYS.RATING)     return [...products].sort((a, b) => compareNumbers(a.sold ?? 0, b.sold ?? 0, 'desc'));
  return [...products];
}

/** Toggle an item in/out of an array. */
function toggleArrayItem(arr, item) {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function useCatalogFilters(flatList, categoryTree, navParams) {
  const [filters, setFilters] = useSessionState('all_products_filters', DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useSessionState('all_products_sort_key', SORT_KEYS.PRICE_ASC);

  const navParamsString = navParams ? JSON.stringify(navParams) : '';

  useEffect(() => {
    if (navParams && typeof navParams === 'object' && Object.keys(navParams).length > 0) {
      setFilters((prev) => {
        const next = { ...DEFAULT_FILTERS, ...navParams };
        if (JSON.stringify(prev) === JSON.stringify(next)) {
          return prev;
        }
        return next;
      });
    }
  }, [navParamsString, setFilters]);

  const { categorySubtreeMap } = useCatalog();

  const setFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const toggleCategory = (id) =>
    setFilters((prev) => {
      const isChecked = prev.categoryIds.includes(id);
      if (isChecked) {
        // Unchecking: remove this node and all its descendants
        const subtree = categorySubtreeMap.get(id) ?? new Set([id]);
        return { ...prev, categoryIds: prev.categoryIds.filter((cid) => !subtree.has(cid)) };
      }
      return { ...prev, categoryIds: [...prev.categoryIds, id] };
    });

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const sortState = SORT_KEY_TO_SORT_STATE[sortKey] ?? SORT_KEY_TO_SORT_STATE[SORT_KEYS.PRICE_ASC];

  /**
   * Canonical sort hook interface (matches useSort from src/hooks/useSort.js).
   * Allows a universal SortControl component to drive catalog sort without adapters.
   */
  const handleSort = useCallback((field) => {
    const nextDirection =
      sortState.field === field && sortState.direction === 'asc' ? 'desc' : 'asc';
    setSortKey(sortStateToKey(field, nextDirection));
  }, [sortState, setSortKey]);

  return {
    filters,
    // Internal composite key — consumed by catalogPageService and applySort
    sortKey,
    setSortKey,
    // Canonical SortState interface — matches useSort hook contract
    sortField: sortState.field,
    sortDirection: sortState.direction,
    handleSort,
    setFilter,
    toggleCategory,
    resetFilters,
  };
}
