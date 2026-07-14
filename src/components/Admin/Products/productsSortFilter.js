/**
 * productsSortFilter.js
 *
 * Pure functions: apply sort and filter options to a products array.
 * No React/UI dependencies.
 */

const LANG_PRIORITY = ['ru', 'en', 'uk'];

function resolveLabel(val) {
  if (!val) return '';
  if (typeof val !== 'object') return String(val);
  for (const l of LANG_PRIORITY) {
    if (val[l]) return val[l];
  }
  return '';
}

/** Filter: keep only products matching active quick-filters. */
export function applyFilters(products, { onlyDiscount, onlyNew }) {
  let result = products;
  if (onlyDiscount) result = result.filter((p) => p.discountPercent > 0);
  if (onlyNew) result = result.filter((p) => p.isNew);
  return result;
}

function getEffectivePrice(p) {
  return p.discountPercent ? Math.round(p.price * (1 - p.discountPercent / 100)) : p.price;
}

function getSortValue(p, sortField) {
  if (sortField === 'label') {
    return resolveLabel(p.label);
  }
  if (sortField === 'category') {
    return resolveLabel(p.category);
  }
  if (sortField === 'price') {
    return getEffectivePrice(p);
  }
  return p[sortField];
}

function coerceToNumber(val) {
  if (typeof val === 'boolean') return val ? 1 : 0;
  return Number(val) || 0;
}

function compareStrings(strA, strB, sortDirection) {
  const normB = strB || '';
  return sortDirection === 'asc'
    ? strA.toLowerCase().localeCompare(normB.toLowerCase())
    : normB.toLowerCase().localeCompare(strA.toLowerCase());
}

function compareValues(valA, valB, sortDirection) {
  if (typeof valA === 'string') {
    return compareStrings(valA, valB, sortDirection);
  }
  const numA = coerceToNumber(valA);
  const numB = coerceToNumber(valB);
  return sortDirection === 'asc' ? numA - numB : numB - numA;
}


/** Sort a products array by the given sort field and direction (mutates a copy). */
export function applySort(products, sortField, sortDirection) {
  if (!sortField) return products;

  return [...products].sort((a, b) => {
    const valA = getSortValue(a, sortField);
    const valB = getSortValue(b, sortField);
    return compareValues(valA, valB, sortDirection);
  });
}

