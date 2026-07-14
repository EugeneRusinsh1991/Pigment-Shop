/**
 * mediaTypes.js
 *
 * Defines the shape of a MediaItem used throughout the admin UI and media service.
 * Components and services depend on this shape, not on raw file-system details.
 *
 * MediaItem {
 *   id       string  – unique identifier (relative path used as stable key)
 *   name     string  – file name without directory (e.g. "hero-banner.jpg")
 *   path     string  – relative path from media root (e.g. "images/hero-banner.jpg")
 *   type     'image' | 'gif' | 'video'
 *   category string  – sub-folder name ('images', 'gifs', 'videos')
 * }
 */

/** @typedef {'image' | 'gif' | 'video'} MediaType */

/** @enum {string} */
export const MEDIA_CATEGORY = {
  IMAGES: 'images',
  GIFS:   'gifs',
  VIDEOS: 'videos',
};

/**
 * Maps a MEDIA_CATEGORY value to its MediaType.
 * @type {Record<string, MediaType>}
 */
const CATEGORY_TYPE_MAP = {
  [MEDIA_CATEGORY.IMAGES]: 'image',
  [MEDIA_CATEGORY.GIFS]:   'gif',
  [MEDIA_CATEGORY.VIDEOS]: 'video',
};

/**
 * Creates a MediaItem object from raw file details.
 *
 * @param {string} category - One of MEDIA_CATEGORY values.
 * @param {string} fileName - The file's base name (e.g. "hero.jpg").
 * @returns {object} MediaItem
 */
export function createMediaItem(category, fileName) {
  const path = `${category}/${fileName}`;
  return {
    id:       path,
    name:     fileName,
    path,
    type:     CATEGORY_TYPE_MAP[category] ?? 'image',
    category,
  };
}
