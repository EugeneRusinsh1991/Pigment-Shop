/**
 * baseStorageProvider.js
 *
 * Abstract base contract for all storage providers (Cloudinary, Firebase Storage, Local).
 */

/**
 * @typedef {Object} StorageUploadOptions
 * @property {string} [folder] - Target folder/category (e.g. 'products', 'categories', 'banners')
 * @property {string} [filename] - Optional custom file name identifier
 * @property {Object} [tags] - Metadata key-value pairs
 */

/**
 * @typedef {Object} StorageUploadResult
 * @property {string} url - Public access URL (HTTPS or local path)
 * @property {string} publicId - Provider-specific unique resource identifier
 * @property {number} [width] - Image width in pixels
 * @property {number} [height] - Image height in pixels
 * @property {string} [format] - Image format (jpg, png, webp)
 * @property {number} [bytes] - File size in bytes
 * @property {string} provider - Identifier of the active provider ('cloudinary' | 'firebase' | 'local')
 */

export class BaseStorageProvider {
  /**
   * Uploads an image file to the storage backend.
   *
   * @param {File|Blob|string} file - The file object, blob, or data URI to upload.
   * @param {StorageUploadOptions} [options]
   * @returns {Promise<StorageUploadResult>}
   */
  async uploadImage(file, options = {}) {
    throw new Error('uploadImage() not implemented');
  }

  /**
   * Deletes an image from the storage backend by its unique public identifier or URL.
   *
   * @param {string} publicIdOrUrl
   * @returns {Promise<{ success: boolean }>}
   */
  async deleteImage(publicIdOrUrl) {
    throw new Error('deleteImage() not implemented');
  }

  /**
   * Resolves a public ID or URL into a displayable, optionally optimized URL.
   *
   * @param {string} publicIdOrUrl
   * @param {Object} [options] - Transformation options (width, height, quality, format)
   * @returns {string}
   */
  resolveUrl(publicIdOrUrl, options = {}) {
    throw new Error('resolveUrl() not implemented');
  }
}
