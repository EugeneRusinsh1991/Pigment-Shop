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

import { colors } from '../theme/tokens';

/**
 * All four canonical order statuses with their display locale keys,
 * badge colors, and background colors.
 *
 * @type {Array<{key: string, localeKey: string, color: string, bg: string, rowBg: string}>}
 */
const ORDER_STATUSES = [
  { key: 'pending',    localeKey: 'orderStatusPending',    color: colors.infoStrong,  bg: colors.infoBgMid,    rowBg: colors.infoBgLight },
  { key: 'processing', localeKey: 'orderStatusProcessing', color: colors.warningDark, bg: colors.warningBgMid, rowBg: colors.warningBgStrong },
  { key: 'completed',  localeKey: 'orderStatusCompleted',  color: colors.successMid,  bg: colors.successBgMid, rowBg: colors.successBgSoft },
  { key: 'cancelled',  localeKey: 'orderStatusCancelled',  color: colors.danger,      bg: colors.dangerBgLight, rowBg: colors.dangerSoftLightBg },
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
const STATUS_RAW_TO_KEY = {
  // pending
  'Новый заказ':      'pending',
  'Нове замовлення':  'pending',
  'Новий замовлення': 'pending',
  'Новий':            'pending',
  'New':              'pending',
  'Pending':          'pending',
  'pending':          'pending',
  // processing
  'В обработке':      'processing',
  'В обробці':        'processing',
  'Processing':       'processing',
  // completed
  'Выполнен':         'completed',
  'Виконано':         'completed',
  'Completed':        'completed',
  // cancelled
  'Отменён':          'cancelled',
  'Отменен':          'cancelled',
  'Скасовано':        'cancelled',
  'Cancelled':        'cancelled',
};

/**
 * Maps every known raw status string to its canonical English selector value
 * (used when writing back to Firestore via OrderStatusSelector).
 */
const STATUS_RAW_TO_CANONICAL = {
  'Новый заказ':      'New',
  'Нове замовлення':  'New',
  'В обработке':      'Processing',
  'В обробці':        'Processing',
  'Выполнен':         'Completed',
  'Виконано':         'Completed',
  'Отменён':          'Cancelled',
  'Отменен':          'Cancelled',
  'Скасовано':        'Cancelled',
};

// ---------------------------------------------------------------------------
// Keyword-based matching (fallback for unknown raw values)
// ---------------------------------------------------------------------------

/**
 * Substring keywords used to classify a raw status string when it is not
 * found in STATUS_RAW_TO_KEY.
 */
const STATUS_KEYWORDS = {
  completed:  ['complet', 'выполн', 'викон'],
  cancelled:  ['cancel',  'отмен', 'скас'],
  processing: ['process', 'обработ', 'оброб'],
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
