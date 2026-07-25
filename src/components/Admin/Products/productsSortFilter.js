/**
 * productsSortFilter.js
 *
 * Pure functions: apply sort and filter options to a products array.
 * No React/UI dependencies.
 */

import { getEffectivePrice } from '../../../utils/pricing';
import { compareValues } from '../../../utils/sorting';
import { getLocalizedValue } from '../../../utils/localization';


/** Filter: keep only products matching active quick-filters. */
export function applyFilters(products, { onlyDiscount, onlyNew }) {
  let result = products;
  if (onlyDiscount) result = result.filter((p) => p.discountPercent > 0);
  if (onlyNew) result = result.filter((p) => p.isNew);
  return result;
}


function getSortValue(p, sortField) {
  if (sortField === 'label') {
    return getLocalizedValue(p.label, 'ru', '');
  }
  if (sortField === 'category') {
    return getLocalizedValue(p.category, 'ru', '');
  }
  if (sortField === 'price') {
    return getEffectivePrice(p.price, p.discountPercent);
  }
  return p[sortField];
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

