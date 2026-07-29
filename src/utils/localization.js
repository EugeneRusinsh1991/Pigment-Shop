/**
 * Authoritative language fallback priority order.
 * The active UI language is prepended at resolution time; this array defines
 * the static fallback chain that follows it.
 *
 * Defined in exactly one place — import from here wherever fallback order is needed.
 */
const LANGUAGE_FALLBACK = ['en', 'ru', 'uk'];

/**
 * Resolves localized text from a potentially multilingual object or simple string.
 *
 * @param {string|object|null|undefined} value - The raw value to translate (e.g. { uk: 'Матеріал', en: 'Material' }).
 * @param {string} lang - The current user/UI language code (e.g. 'uk', 'en', 'ru').
 * @param {any} defaultValue - Fallback if no translation or string is resolved.
 * @returns {any} Localized string value or defaultValue.
 */
export function getLocalizedValue(value, lang, defaultValue = '') {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'object') {
    const keys = [lang, ...LANGUAGE_FALLBACK];
    const match = keys.reduce((found, key) => {
      if (found !== undefined) return found;
      const v = value[key];
      return v !== undefined && v !== null && v !== '' ? v : undefined;
    }, undefined);
    return match !== undefined ? match : defaultValue;
  }
  return value !== '' ? value : defaultValue;
}

