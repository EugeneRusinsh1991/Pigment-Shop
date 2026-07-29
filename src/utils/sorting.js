/**
 * sorting.js
 *
 * Authoritative array sorting utilities.
 * All string/numeric comparison logic lives here — no other file should
 * re-implement these comparators.
 */

/**
 * Coerce any primitive to a number for numeric comparison.
 * Booleans become 1/0; non-numeric strings and null/undefined become 0.
 *
 * @param {any} val
 * @returns {number}
 */
function coerceToNumber(val) {
  if (typeof val === 'boolean') return val ? 1 : 0;
  return Number(val) || 0;
}

/**
 * Compare two string values with locale-aware, case-insensitive ordering.
 * Null/undefined are treated as empty strings.
 *
 * @param {string|null|undefined} strA
 * @param {string|null|undefined} strB
 * @param {'asc'|'desc'} direction
 * @returns {number} Negative, zero, or positive comparator result.
 */
export function compareStrings(strA, strB, direction) {
  const normA = (strA || '').toLowerCase();
  const normB = (strB || '').toLowerCase();
  return direction === 'asc'
    ? normA.localeCompare(normB)
    : normB.localeCompare(normA);
}

/**
 * Compare two numeric values.
 * Non-numeric and boolean values are coerced via {@link coerceToNumber}.
 *
 * @param {any} valA
 * @param {any} valB
 * @param {'asc'|'desc'} direction
 * @returns {number} Negative, zero, or positive comparator result.
 */
export function compareNumbers(valA, valB, direction) {
  const numA = coerceToNumber(valA);
  const numB = coerceToNumber(valB);
  return direction === 'asc' ? numA - numB : numB - numA;
}

/**
 * Compare two values of unknown type.
 * Strings are compared with {@link compareStrings}; everything else with {@link compareNumbers}.
 *
 * @param {any} valA
 * @param {any} valB
 * @param {'asc'|'desc'} direction
 * @returns {number} Negative, zero, or positive comparator result.
 */
export function compareValues(valA, valB, direction) {
  if (typeof valA === 'string') {
    return compareStrings(valA, valB, direction);
  }
  return compareNumbers(valA, valB, direction);
}

/**
 * Return a sorted copy of an array, ordering elements by a single field.
 *
 * @template T
 * @param {T[]} array - The source array (not mutated).
 * @param {keyof T} field - The field name to sort by.
 * @param {'asc'|'desc'} direction - Sort direction.
 * @param {(item: T) => any} [getValue] - Optional accessor; defaults to `item[field]`.
 * @returns {T[]} A new sorted array.
 */
function sortByField(array, field, direction, getValue) {
  if (!field || !array.length) return array;
  const accessor = getValue || ((item) => item[field]);
  return [...array].sort((a, b) => compareValues(accessor(a), accessor(b), direction));
}
