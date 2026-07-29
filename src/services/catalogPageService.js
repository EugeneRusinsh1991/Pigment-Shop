import { catalogRepository } from './repositories/index.js';
const { fetchProductPage, fetchProductCount, MissingIndexError, SORT_KEYS } = catalogRepository;

export const PAGE_SIZE = 15;

export { fetchProductPage, fetchProductCount, SORT_KEYS, MissingIndexError };

export function canUseServerPagination(filters, sortKey = SORT_KEYS.PRICE_ASC) {
  if (countInequalityFilters(filters) > 1) return false;

  const inequalityField = getInequalityField(filters);
  const sortField = getSortField(sortKey);

  return !(inequalityField && sortField && inequalityField !== sortField);
}

function countInequalityFilters(filters) {
  let count = 0;
  if (filters.priceMin !== '' || filters.priceMax !== '') count++;
  if (filters.onSale) count++;
  if (filters.inStock || filters.outOfStock) count++;
  return count;
}

function getInequalityField(filters) {
  if (filters.priceMin !== '' || filters.priceMax !== '') return 'price';
  if (filters.onSale) return 'discountPercent';
  if (filters.inStock || filters.outOfStock) return 'stock';
  return null;
}

function getSortField(sortKey) {
  if (!sortKey) return null;
  if (sortKey.startsWith('price')) return 'price';
  if (sortKey === SORT_KEYS.RATING) return 'sold';
  return null;
}
