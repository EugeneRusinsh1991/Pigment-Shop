import { documentId, orderBy, where } from 'firebase/firestore';

export const SORT_KEYS = {
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  RATING: 'rating',
};

function getInequalityField(filters) {
  if (filters.priceMin !== '' || filters.priceMax !== '') return 'price';
  if (filters.onSale) return 'discountPercent';
  if (filters.inStock || filters.outOfStock) return 'stock';
  return null;
}

export function addWhereConstraints(constraints, filters) {
  if (filters.categoryIds && filters.categoryIds.length > 0) {
    if (filters.categoryIds.length === 1) {
      constraints.push(where('categoryId', '==', filters.categoryIds[0]));
    } else {
      constraints.push(where('categoryId', 'in', filters.categoryIds.slice(0, 30)));
    }
  } else if (filters.targetProductIds && filters.targetProductIds.length > 0) {
    constraints.push(where(documentId(), 'in', filters.targetProductIds.slice(0, 30)));
  }

  const whereRules = [
    { condition: filters.priceMin !== '', field: 'price', operator: '>=', value: Number(filters.priceMin) },
    { condition: filters.priceMax !== '', field: 'price', operator: '<=', value: Number(filters.priceMax) },
    { condition: filters.onSale, field: 'discountPercent', operator: '>', value: 0 },
    { condition: filters.isNew, field: 'isNew', operator: '==', value: true },
    { condition: filters.inStock, field: 'stock', operator: '>', value: 0 },
    { condition: filters.outOfStock, field: 'stock', operator: '<=', value: 0 },
  ];

  whereRules.forEach(({ condition, field, operator, value }) => {
    if (condition) constraints.push(where(field, operator, value));
  });
}

function getSortOrdering(sortKey, inequalityField) {
  const sortStrategies = {
    [SORT_KEYS.PRICE_ASC]: () => [orderBy('price', 'asc')],
    [SORT_KEYS.PRICE_DESC]: () => [orderBy('price', 'desc')],
    [SORT_KEYS.RATING]: () => {
      const orders = [];
      if (inequalityField && inequalityField !== 'sold') {
        orders.push(orderBy(inequalityField, 'desc'));
      }
      orders.push(orderBy('sold', 'desc'));
      return orders;
    },
  };
  
  const strategy = sortStrategies[sortKey];
  return strategy ? strategy() : [];
}

function addSortConstraints(constraints, sortKey, inequalityField) {
  if (inequalityField && inequalityField !== 'price' && sortKey.startsWith('price')) {
    constraints.push(orderBy(inequalityField, 'desc'));
  }
  const sortOrders = getSortOrdering(sortKey, inequalityField);
  constraints.push(...sortOrders);
}

export function buildQueryConstraints(filters, sortKey) {
  const constraints = [];
  const inequalityField = getInequalityField(filters);
  addWhereConstraints(constraints, filters);
  addSortConstraints(constraints, sortKey, inequalityField);
  return constraints;
}
