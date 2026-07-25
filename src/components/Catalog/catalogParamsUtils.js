import { SORT_KEYS } from '../../services/catalogPageService';

const DEFAULT_PARAMS = {
  categoryIds: [],
  priceMin: '',
  priceMax: '',
  inStock: false,
  outOfStock: false,
  onSale: false,
  isNew: false,
};

export function getParamsState(filters, sortKey, page = 1) {
  const f = filters || {};
  const normalizedParams = {};
  Object.keys(DEFAULT_PARAMS).forEach((key) => {
    normalizedParams[key] = f[key] || DEFAULT_PARAMS[key];
  });
  normalizedParams.sortKey = sortKey || SORT_KEYS.PRICE_ASC;
  normalizedParams.page = page;
  return normalizedParams;
}

export function getFilterKey(f, sortKey, page) {
  const filters = f || {};
  const catIds = filters.categoryIds || [];
  const flags = ['inStock', 'outOfStock', 'onSale', 'isNew'].map((key) =>
    filters[key] ? '1' : '0'
  );
  return [
    catIds.join('-'),
    filters.priceMin || '',
    filters.priceMax || '',
    ...flags,
    sortKey,
    page,
  ].join('_');
}
