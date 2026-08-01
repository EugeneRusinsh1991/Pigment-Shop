/**
 * mediaAdapter.js
 *
 * Storage boundary layer for media references.
 *
 * Delegates URL resolution to the centralized Storage Service (`src/services/storageService.js`)
 * so that switching to cloud storage (Cloudinary, Firebase Storage) requires zero changes
 * across admin UI, storefront components, or data models.
 *
 * MediaRef format: "<category>/<filename>" e.g. "images/hero-banner.jpg" or Cloudinary public_id
 */
import { resolveImageUrl } from '../services/storageService.js';

/** Base URL where the local media folder is served from (development). */
const LOCAL_MEDIA_BASE = '/media';

/**
 * Converts a MediaRef (relative path or publicId) to a displayable URL.
 * Delegates to the centralized `storageService.resolveImageUrl`.
 *
 * @param {string} mediaRef - Relative path, publicId, or existing URL
 * @param {Object} [options] - Optional transformations (width, height, quality)
 * @returns {string} Full URL usable in an <Image> source
 */
export function resolveMediaUrl(mediaRef, options = {}) {
  if (!mediaRef) return '';
  return resolveImageUrl(mediaRef, options);
}

/**
 * Converts a stored MediaRef back into a display URL.
 * Alias for resolveMediaUrl to make intent clear at call sites.
 *
 * @param {string} mediaRef
 * @param {Object} [options]
 * @returns {string}
 */
export function fromMediaRef(mediaRef, options = {}) {
  return resolveMediaUrl(mediaRef, options);
}
