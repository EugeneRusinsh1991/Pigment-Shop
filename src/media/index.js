/**
 * index.js – Public API for the media module.
 *
 * UI components import from here, not from individual files.
 * This keeps the internal structure flexible without breaking consumers.
 */
export { MEDIA_CATEGORY } from './mediaTypes';
export { listAllMedia, isManifestGenerated } from './mediaService';
export { resolveMediaUrl, fromMediaRef } from './mediaAdapter';
export { default as MediaRenderer } from './MediaRenderer';
