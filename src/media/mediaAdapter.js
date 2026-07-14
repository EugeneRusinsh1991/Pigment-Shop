/**
 * mediaAdapter.js
 *
 * Storage boundary layer for media references.
 *
 * The admin data model stores a MediaRef (a stable relative path string)
 * rather than an absolute local path or a data URL.
 * This keeps the data model portable: switching to cloud storage only
 * requires updating `resolveMediaUrl` here, not the admin UI or data model.
 *
 * MediaRef format: "<category>/<filename>"  e.g. "images/hero-banner.jpg"
 */

/** Base URL where the local media folder is served from (development). */
const LOCAL_MEDIA_BASE = '/media';

/**
 * Converts a MediaRef (relative path) to a displayable URL.
 * In local development, assets are served from the /media base path.
 *
 * @param {string} mediaRef - Relative path, e.g. "images/hero.jpg"
 * @returns {string} Full URL usable in an <Image> source
 */
export function resolveMediaUrl(mediaRef) {
  if (!mediaRef) return '';
  // Already an absolute URL or data URL – return as-is
  if (mediaRef.startsWith('http') || mediaRef.startsWith('data:')) {
    return mediaRef;
  }
  // Already prefixed with local media path
  if (mediaRef.startsWith(LOCAL_MEDIA_BASE)) {
    return mediaRef;
  }
  return `${LOCAL_MEDIA_BASE}/${mediaRef}`;
}



/**
 * Converts a stored MediaRef back into a display URL.
 * Alias for resolveMediaUrl to make intent clear at call sites.
 *
 * @param {string} mediaRef
 * @returns {string}
 */
export function fromMediaRef(mediaRef) {
  return resolveMediaUrl(mediaRef);
}
