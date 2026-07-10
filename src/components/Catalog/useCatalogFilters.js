/**
 * useCatalogFilters.js
 *
 * Encapsulates filter state and derives a filtered + sorted product list.
 * Inputs: flatList from useCatalog().
 * Returns: filters object, setters, and the final sortedProducts array.
 */
import { useState, useMemo } from 'react';

export const SORT_OPTIONS = [
  { key: 'price_asc',  label: 'Price: Low to High' },
  { key: 'price_desc', label: 'Price: High to Low' },
  { key: 'rating',     label: 'Rating' },
];

const DEFAULT_FILTERS = {
  priceMin: '',
  priceMax: '',
  inStock: false,
  outOfStock: false,
  onSale: false,
  isNew: false,
  categories: [],
  subcategories: [],
};

const FILTER_RULES = [
  (p, f, ep) => f.priceMin === '' || ep >= Number(f.priceMin),
  (p, f, ep) => f.priceMax === '' || ep <= Number(f.priceMax),
  (p, f) => !f.inStock || f.outOfStock || (p.stock ?? 0) > 0,
  (p, f) => !f.outOfStock || f.inStock || (p.stock ?? 0) <= 0,
  (p, f) => !f.onSale || p.discountPercent > 0,
  (p, f) => !f.isNew || p.isNew,
  (p, f) => f.categories.length === 0 || f.categories.includes(p.category),
  (p, f) => f.subcategories.length === 0 || f.subcategories.includes(p.subcategory),
];

/** Apply all active filters to a product list. */
function applyFilters(products, filters) {
  return products.filter((p) => {
    const effectivePrice = p.discountPercent > 0
      ? Math.round(p.price * (1 - p.discountPercent / 100))
      : p.price;

    return FILTER_RULES.every((rule) => rule(p, filters, effectivePrice));
  });
}

/** Sort a product list by the chosen key. */
function applySort(products, sortKey) {
  const sorted = [...products];
  if (sortKey === 'price_asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortKey === 'price_desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortKey === 'rating') {
    sorted.sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0));
  }
  return sorted;
}

/** Toggle an item in/out of an array. */
function toggleArrayItem(arr, item) {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function useCatalogFilters(flatList) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState('price_asc');

  const setFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const toggleCategory = (cat) =>
    setFilters((prev) => ({ ...prev, categories: toggleArrayItem(prev.categories, cat) }));

  const toggleSubcategory = (subcat) =>
    setFilters((prev) => ({ ...prev, subcategories: toggleArrayItem(prev.subcategories, subcat) }));

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const sortedProducts = useMemo(() => {
    const filtered = applyFilters(flatList, filters);
    return applySort(filtered, sortKey);
  }, [flatList, filters, sortKey]);

  return {
    filters,
    sortKey,
    setSortKey,
    setFilter,
    toggleCategory,
    toggleSubcategory,
    resetFilters,
    sortedProducts,
  };
}
