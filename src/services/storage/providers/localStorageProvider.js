/**
 * localStorageProvider.js
 *
 * Local filesystem/dev storage provider fallback.
 * Works seamlessly with existing local /media assets and data URIs.
 */
import { BaseStorageProvider } from './baseStorageProvider.js';

const LOCAL_MEDIA_BASE = '/media';

export class LocalStorageProvider extends BaseStorageProvider {
  /**
   * @param {File|Blob|string} file
   * @param {import('./baseStorageProvider').StorageUploadOptions} [options]
   * @returns {Promise<import('./baseStorageProvider').StorageUploadResult>}
   */
  async uploadImage(file, options = {}) {
    const url = typeof file === 'string' ? file : URL.createObjectURL(file);
    return {
      url,
      publicId: url,
      provider: 'local',
    };
  }

  /**
   * @param {string} publicIdOrUrl
   * @returns {Promise<{ success: boolean }>}
   */
  async deleteImage(publicIdOrUrl) {
    return { success: true };
  }

  /**
   * @param {string} publicIdOrUrl
   * @param {Object} [options]
   * @returns {string}
   */
  resolveUrl(publicIdOrUrl, options = {}) {
    if (!publicIdOrUrl) return '';
    if (publicIdOrUrl.startsWith('http') || publicIdOrUrl.startsWith('data:') || publicIdOrUrl.startsWith(LOCAL_MEDIA_BASE)) {
      return publicIdOrUrl;
    }
    return `${LOCAL_MEDIA_BASE}/${publicIdOrUrl}`;
  }
}
