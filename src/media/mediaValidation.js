/**
 * mediaValidation.js
 *
 * Centralized validation rules for media assets.
 * - Supported file extensions per type.
 * - Validation of MediaItem objects.
 * - Keeps rules in one place so adding a new format is a single-line change.
 */
import { MEDIA_CATEGORY } from './mediaTypes.js';

/** Supported file extensions by category. Lowercase, without leading dot. */
const SUPPORTED_EXTENSIONS = {
  [MEDIA_CATEGORY.IMAGES]: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
  [MEDIA_CATEGORY.GIFS]:   ['gif'],
  [MEDIA_CATEGORY.VIDEOS]: ['mp4', 'webm', 'mov', 'mkv', 'avi'],
};

/**
 * Returns true if the file extension is supported for the given category.
 *
 * @param {string} fileName
 * @param {string} category - One of MEDIA_CATEGORY values
 * @returns {boolean}
 */
function isSupportedExtension(fileName, category) {
  if (!fileName || !category) return false;
  const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
  const allowed = SUPPORTED_EXTENSIONS[category] ?? [];
  return allowed.includes(ext);
}

function hasRequiredFields(item) {
  const fields = ['id', 'name', 'path', 'type', 'category'];
  return fields.every((field) => Boolean(item[field]));
}

/**
 * Returns true if the MediaItem is structurally valid and its file extension
 * matches the declared category.
 *
 * @param {object} item - MediaItem
 * @returns {boolean}
 */
export function isValidMediaItem(item) {
  if (!item || typeof item !== 'object') return false;
  return hasRequiredFields(item) && isSupportedExtension(item.name, item.category);
}

