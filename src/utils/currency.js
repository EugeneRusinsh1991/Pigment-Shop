/**
 * Format numeric currency values for display.
 * @param {number} amount
 * @param {string} symbol
 * @returns {string}
 */
export function formatCurrency(amount, symbol = '$') {
  const num = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return `${symbol}${num.toLocaleString()}`;
}
