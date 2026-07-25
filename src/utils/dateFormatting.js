/**
 * dateFormatting.js
 *
 * Authoritative date formatting utility.
 * All locale-aware date formatting and locale resolution live here;
 * no other file should instantiate Intl.DateTimeFormat directly.
 */

/**
 * Maps application language codes to BCP-47 locale strings for Intl APIs.
 * Defined in exactly one place — import from here wherever a locale tag is needed.
 */
export const LANG_TO_LOCALE = {
  uk: 'uk-UA',
  en: 'en-US',
  ru: 'ru-RU',
};

/** Resolve a BCP-47 locale string from a language code, defaulting to 'ru-RU'. */
function resolveLocale(lang) {
  return LANG_TO_LOCALE[lang] || LANG_TO_LOCALE.ru;
}

/**
 * Safely converts a raw Firestore Timestamp or native Date/string to a JS Date.
 * Returns null if the value is absent or unparseable.
 *
 * @param {any} raw - Firestore Timestamp, JS Date, ISO string, or null/undefined.
 * @returns {Date|null}
 */
export function toDate(raw) {
  if (!raw) return null;
  try {
    return raw.toDate ? raw.toDate() : new Date(raw);
  } catch {
    return null;
  }
}

/**
 * Format a date as a long human-readable string.
 * Example (en-US): "July 22, 2026"
 *
 * @param {any} raw - Firestore Timestamp, JS Date, ISO string, or null/undefined.
 * @param {string} lang - Application language code.
 * @param {string} [fallback='—'] - Value returned when date is absent or invalid.
 * @returns {string}
 */
export function formatDateLong(raw, lang, fallback = '—') {
  const date = toDate(raw);
  if (!date) return fallback;
  try {
    return new Intl.DateTimeFormat(resolveLocale(lang), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return fallback;
  }
}

/**
 * Format a date as a long human-readable string including time.
 * Example (en-US): "July 22, 2026, 13:45"
 *
 * @param {any} raw - Firestore Timestamp, JS Date, ISO string, or null/undefined.
 * @param {string} lang - Application language code.
 * @param {string} [fallback='—'] - Value returned when date is absent or invalid.
 * @returns {string}
 */
export function formatDateLongWithTime(raw, lang, fallback = '—') {
  const date = toDate(raw);
  if (!date) return fallback;
  try {
    return new Intl.DateTimeFormat(resolveLocale(lang), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return fallback;
  }
}

/**
 * Format a date as a short date string followed by the time.
 * Example (en-US): "Jul 22, 2026 13:45"
 *
 * @param {any} raw - Firestore Timestamp, JS Date, ISO string, or null/undefined.
 * @param {string} lang - Application language code.
 * @param {string} [fallback='—'] - Value returned when date is absent or invalid.
 * @returns {string}
 */
export function formatDateShortWithTime(raw, lang, fallback = '—') {
  const date = toDate(raw);
  if (!date) return fallback;
  try {
    const locale = resolveLocale(lang);
    const dateStr = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
    const timeStr = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
    return `${dateStr} ${timeStr}`;
  } catch {
    return fallback;
  }
}

/**
 * Format a date as a compact "D Mon" label (e.g. "22 Jul").
 * Language-independent; always uses English month abbreviations.
 * Suitable for axis labels and date-range picker chips.
 *
 * @param {Date|null|undefined} date - A native JS Date.
 * @returns {string}
 */
export function formatDateCompact(date) {
  if (!date) return '';
  const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${MONTH_ABBR[date.getMonth()]}`;
}

/**
 * Format a date as a zero-padded "MM.DD" numeric label (e.g. "07.22").
 * Locale-independent; used for analytics chart axis labels.
 *
 * @param {Date} date - A native JS Date.
 * @returns {string}
 */
export function formatDateNumeric(date) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}
