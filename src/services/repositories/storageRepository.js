/**
 * storageRepository.js
 *
 * Repository layer for storage operations.
 * Throws raw exceptions on failure without wrapping in standard contracts.
 */
import { getStorageProvider } from '../storage/storageFactory.js';

/**
 * Uploads an image file via the active storage provider.
 *
 * @param {File|Blob|string} file
 * @param {import('../storage/providers/baseStorageProvider').StorageUploadOptions} [options]
 * @returns {Promise<import('../storage/providers/baseStorageProvider').StorageUploadResult>}
 */
export async function uploadFile(file, options = {}) {
  const provider = getStorageProvider();
  return provider.uploadImage(file, options);
}

/**
 * Deletes an image resource via the active storage provider.
 *
 * @param {string} publicIdOrUrl
 * @returns {Promise<{ success: boolean }>}
 */
export async function deleteFile(publicIdOrUrl) {
  const provider = getStorageProvider();
  return provider.deleteImage(publicIdOrUrl);
}

/**
 * Resolves a public ID or URL via the active storage provider.
 *
 * @param {string} publicIdOrUrl
 * @param {Object} [options]
 * @returns {string}
 */
export function resolveUrl(publicIdOrUrl, options = {}) {
  const provider = getStorageProvider();
  return provider.resolveUrl(publicIdOrUrl, options);
}

export const storageRepository = {
  uploadFile,
  deleteFile,
  resolveUrl,
};
