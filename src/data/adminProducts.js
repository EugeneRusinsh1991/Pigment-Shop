/**
 * adminProducts.js
 *
 * @deprecated — product state has moved to catalogState.js.
 *               Product CRUD has moved to adminProductsService.js.
 *
 * This file is kept as a named reference so that any stale import
 * not yet updated resolves without a hard error.
 *
 * New code should import directly from:
 *   - '../data/catalogState'       for state accessors
 *   - '../services/adminProductsService'  for CRUD operations
 */

import { getProducts, setProducts } from './catalogState';

/** @deprecated Use getProducts() from catalogState instead. */
export function getAdminProducts() {
  return getProducts();
}
