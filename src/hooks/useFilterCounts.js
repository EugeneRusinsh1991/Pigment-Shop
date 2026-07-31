import { useMemo } from 'react';
import { applyFilters } from './useCatalogFilters';

/**
 * Calculates dynamic matching product counts for each category node.
 * Filtered against all non-category active filters (price range, inStock, outOfStock, onSale, isNew).
 */
export function getCategoryCounts(flatList = [], filters = {}, categorySubtreeMap) {
  if (!flatList || flatList.length === 0) return new Map();

  const nonCategoryFilters = { ...filters, categoryIds: [] };
  const filteredProducts = applyFilters(flatList, nonCategoryFilters, categorySubtreeMap);

  const directCounts = new Map();
  for (const product of filteredProducts) {
    if (product.categoryId) {
      directCounts.set(product.categoryId, (directCounts.get(product.categoryId) || 0) + 1);
    }
  }

  const countsMap = new Map();
  if (categorySubtreeMap && categorySubtreeMap.size > 0) {
    for (const [catId, subtreeSet] of categorySubtreeMap.entries()) {
      let count = 0;
      for (const subId of subtreeSet) {
        count += directCounts.get(subId) || 0;
      }
      countsMap.set(catId, count);
    }
  } else {
    for (const [catId, count] of directCounts.entries()) {
      countsMap.set(catId, count);
    }
  }

  return countsMap;
}

/**
 * Custom hook to calculate dynamic product counts for each catalog filter flag and category.
 *
 * @param {Array} flatList - Complete list of products.
 * @param {Object} filters - Active filter criteria.
 * @param {Map} categorySubtreeMap - Map of category hierarchy IDs.
 * @returns {Object} Product count for filter flags and categories.
 */
export function useFilterCounts(flatList = [], filters = {}, categorySubtreeMap) {
  return useMemo(() => {
    if (!flatList || flatList.length === 0) {
      return { inStock: 0, outOfStock: 0, onSale: 0, isNew: 0, categories: new Map() };
    }

    const inStockCount = applyFilters(
      flatList,
      { ...filters, inStock: true, outOfStock: false },
      categorySubtreeMap
    ).length;

    const outOfStockCount = applyFilters(
      flatList,
      { ...filters, inStock: false, outOfStock: true },
      categorySubtreeMap
    ).length;

    const onSaleCount = applyFilters(
      flatList,
      { ...filters, onSale: true },
      categorySubtreeMap
    ).length;

    const isNewCount = applyFilters(
      flatList,
      { ...filters, isNew: true },
      categorySubtreeMap
    ).length;

    const categories = getCategoryCounts(flatList, filters, categorySubtreeMap);

    return {
      inStock: inStockCount,
      outOfStock: outOfStockCount,
      onSale: onSaleCount,
      isNew: isNewCount,
      categories,
    };
  }, [flatList, filters, categorySubtreeMap]);
}

export default useFilterCounts;
