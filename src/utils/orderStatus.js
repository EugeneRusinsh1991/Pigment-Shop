/**
 * orderStatus.js
 *
 * Single source of truth for all order status definitions:
 * canonical keys, display locale keys, badge colors, raw string matching,
 * and legacy value normalization.
 *
 * Import from here — no other file should define status dictionaries.
 */

// ---------------------------------------------------------------------------
// Canonical status definitions
// ---------------------------------------------------------------------------

/**
 * All four canonical order statuses with their display locale keys,
 * badge colors, and background colors.
 *
 * @type {Array<{key: string, localeKey: string, color: string, bg: string, rowBg: string}>}
 */
const ORDER_STATUSES = [
  { key: 'pending',    localeKey: 'orderStatusPending',    color: '#3B82F6', bg: '#DBEAFE', rowBg: '#EFF6FF' },
  { key: 'processing', localeKey: 'orderStatusProcessing', color: '#D97706', bg: '#FEF3C7', rowBg: '#FFFBEB' },
  { key: 'completed',  localeKey: 'orderStatusCompleted',  color: '#10B981', bg: '#D1FAE5', rowBg: '#ECFDF5' },
  { key: 'cancelled',  localeKey: 'orderStatusCancelled',  color: '#EF4444', bg: '#FEE2E2', rowBg: '#FEF2F2' },
];

/** Quick lookup: canonical key → status definition. */
const ORDER_STATUS_BY_KEY = Object.fromEntries(
  ORDER_STATUSES.map((s) => [s.key, s])
);

// ---------------------------------------------------------------------------
// Raw-value → canonical-key mapping
// ---------------------------------------------------------------------------

/**
 * Maps every known raw status string (English, Russian) to its canonical key.
 * Defined in exactly one place — used for grouping, filtering, and matching.
 */
export const STATUS_RAW_TO_KEY = {
  // pending
  'Новый заказ': 'pending',
  'New':         'pending',
  'Pending':     'pending',
  'pending':     'pending',
  // processing
  'В обработке': 'processing',
  'Processing':  'processing',
  // completed
  'Выполнен':    'completed',
  'Completed':   'completed',
  // cancelled
  'Отменён':     'cancelled',
  'Отменен':     'cancelled',
  'Cancelled':   'cancelled',
};

/**
 * Maps every known raw status string to its canonical English selector value
 * (used when writing back to Firestore via OrderStatusSelector).
 */
export const STATUS_RAW_TO_CANONICAL = {
  'Новый заказ': 'New',
  'В обработке': 'Processing',
  'Выполнен':    'Completed',
  'Отменён':     'Completed',
  'Отменен':     'Cancelled',
};

// ---------------------------------------------------------------------------
// Keyword-based matching (fallback for unknown raw values)
// ---------------------------------------------------------------------------

/**
 * Substring keywords used to classify a raw status string when it is not
 * found in STATUS_RAW_TO_KEY.
 */
const STATUS_KEYWORDS = {
  completed:  ['complet', 'выполн'],
  cancelled:  ['cancel',  'отмен'],
  processing: ['process', 'обработ'],
};

// ---------------------------------------------------------------------------
// Resolution helpers
// ---------------------------------------------------------------------------

/**
 * Resolve the canonical status key for a raw order status string.
 * Falls back to keyword matching, then to 'pending'.
 *
 * @param {string|null|undefined} rawStatus
 * @returns {'pending'|'processing'|'completed'|'cancelled'}
 */
export function resolveStatusKey(rawStatus) {
  const raw = rawStatus || 'Новый заказ';

  // Exact match first
  if (STATUS_RAW_TO_KEY[raw]) return STATUS_RAW_TO_KEY[raw];

  // Keyword fallback
  const normalized = raw.toLowerCase();
  const found = Object.entries(STATUS_KEYWORDS).find(([, keywords]) =>
    keywords.some((kw) => normalized.includes(kw))
  );
  return found ? found[0] : 'pending';
}

/**
 * Resolve the full status definition object for a raw order status string.
 *
 * @param {string|null|undefined} rawStatus
 * @returns {{key: string, localeKey: string, color: string, bg: string, rowBg: string}}
 */
export function resolveStatusDef(rawStatus) {
  return ORDER_STATUS_BY_KEY[resolveStatusKey(rawStatus)];
}
