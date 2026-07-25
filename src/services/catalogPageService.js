import { fetchProductPage as _fetchProductPage, fetchProductCount as _fetchProductCount, MissingIndexError, SORT_KEYS } from './repositories/catalogRepository';
import { withServiceContract } from './serviceContract';

export const PAGE_SIZE = 15;

export const fetchProductPage = withServiceContract(_fetchProductPage, 'Failed to fetch product page');
export const fetchProductCount = withServiceContract(_fetchProductCount, 'Failed to fetch product count');

export { SORT_KEYS, MissingIndexError };

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
