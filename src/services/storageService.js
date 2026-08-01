/**
 * storageService.js
 *
 * High-level domain service for image and media storage operations.
 * Async functions are wrapped with `withServiceContract` per project standard.
 */
import { withServiceContract } from './serviceContract.js';
import { storageRepository } from './repositories/storageRepository.js';

/**
 * Internal async upload implementation.
 *
 * @param {File|Blob|string} file
 * @param {import('./storage/providers/baseStorageProvider').StorageUploadOptions} [options]
 * @returns {Promise<import('./storage/providers/baseStorageProvider').StorageUploadResult>}
 */
async function _uploadImage(file, options = {}) {
  if (!file) {
    throw new Error('No file provided for upload');
  }
  return storageRepository.uploadFile(file, options);
}

/**
 * Internal async delete implementation.
 *
 * @param {string} publicIdOrUrl
 * @returns {Promise<{ success: boolean }>}
 */
async function _deleteImage(publicIdOrUrl) {
  if (!publicIdOrUrl) {
    throw new Error('No target provided for deletion');
  }
  return storageRepository.deleteFile(publicIdOrUrl);
}

export const uploadImage = withServiceContract(_uploadImage, 'Failed to upload image');
export const deleteImage = withServiceContract(_deleteImage, 'Failed to delete image');

/**
 * Synchronously resolves an image reference, public ID, or URL to a displayable source URL.
 *
 * @param {string} publicIdOrUrl
 * @param {Object} [options] - Optional transformations (width, height, quality)
 * @returns {string}
 */
export function resolveImageUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl) return '';
  return storageRepository.resolveUrl(publicIdOrUrl, options);
}

export const storageService = {
  uploadImage,
  deleteImage,
  resolveImageUrl,
};
