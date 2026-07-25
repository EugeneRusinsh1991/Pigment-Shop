/**
 * pricing.js
 *
 * Authoritative effective price calculation utility.
 * The discount formula is defined in exactly one place — import from here.
 */

/**
 * Compute the effective (post-discount) price for a product.
 *
 * The result is rounded to the nearest integer so it stays consistent
 * with all prior display logic across the codebase.
 *
 * @param {number} price - The original product price.
 * @param {number|null|undefined} discountPercent - Discount percentage (0–100).
 * @returns {number} Effective price after discount, or the original price if no discount applies.
 */
export function getEffectivePrice(price, discountPercent) {
  if (discountPercent) {
    return Math.round(price * (1 - discountPercent / 100));
  }
  return price;
}
