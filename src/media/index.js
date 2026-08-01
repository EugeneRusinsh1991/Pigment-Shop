/**
 * index.js – Public API for the media module.
 *
 * UI components import from here, not from individual files.
 * This keeps the internal structure flexible without breaking consumers.
 */
export { MEDIA_CATEGORY } from './mediaTypes.js';
export { listAllMedia, isManifestGenerated } from './mediaService.js';
export { resolveMediaUrl, fromMediaRef } from './mediaAdapter.js';
