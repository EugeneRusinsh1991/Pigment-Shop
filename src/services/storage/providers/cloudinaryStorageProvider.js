/**
 * cloudinaryStorageProvider.js
 *
 * Cloudinary image storage provider implementation using REST API and unsigned upload presets.
 */
import { BaseStorageProvider } from './baseStorageProvider.js';
import { getCloudinaryConfig } from '../storageConfig.js';

const CLOUDINARY_UPLOAD_URL = (cloudName) =>
  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export class CloudinaryStorageProvider extends BaseStorageProvider {
  constructor() {
    super();
    this.config = getCloudinaryConfig();
  }

  /**
   * Uploads an image to Cloudinary via POST /image/upload using FormData.
   *
   * @param {File|Blob|string} file - File object, Blob, or base64 Data URI string.
   * @param {import('./baseStorageProvider').StorageUploadOptions} [options]
   * @returns {Promise<import('./baseStorageProvider').StorageUploadResult>}
   */
  async uploadImage(file, options = {}) {
    const { cloudName, uploadPreset, apiKey } = this.config;
    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary cloudName or uploadPreset is not configured');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    if (apiKey) {
      formData.append('api_key', apiKey);
    }

    if (options.folder) {
      formData.append('folder', options.folder);
    }
    if (options.tags && typeof options.tags === 'object') {
      const tagsStr = Object.entries(options.tags)
        .map(([k, v]) => `${k}_${v}`)
        .join(',');
      formData.append('tags', tagsStr);
    }

    const response = await fetch(CLOUDINARY_UPLOAD_URL(cloudName), {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      url: data.secure_url || data.url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes,
      provider: 'cloudinary',
    };
  }

  /**
   * Deletes an image resource from Cloudinary.
   * Note: Client-side deletion requires admin token or server signature; safe no-op fallback on client.
   *
   * @param {string} publicIdOrUrl
   * @returns {Promise<{ success: boolean }>}
   */
  async deleteImage(publicIdOrUrl) {
    if (!publicIdOrUrl) return { success: false };
    return { success: true };
  }

  /**
   * Resolves a publicId or existing URL into an image source URL.
   *
   * @param {string} publicIdOrUrl
   * @param {Object} [options]
   * @returns {string}
   */
  resolveUrl(publicIdOrUrl, options = {}) {
    if (!publicIdOrUrl) return '';
    if (publicIdOrUrl.startsWith('http') || publicIdOrUrl.startsWith('data:') || publicIdOrUrl.startsWith('/media')) {
      return publicIdOrUrl;
    }
    if (publicIdOrUrl.startsWith('images/') || publicIdOrUrl.startsWith('gifs/') || publicIdOrUrl.startsWith('videos/')) {
      return `/media/${publicIdOrUrl}`;
    }
    const { cloudName } = this.config;
    const transforms = [];
    if (options.width) transforms.push(`w_${options.width}`);
    if (options.height) transforms.push(`h_${options.height}`);
    if (options.quality) transforms.push(`q_${options.quality}`);
    const transformStr = transforms.length > 0 ? `${transforms.join(',')}/` : '';
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}${publicIdOrUrl}`;
  }
}
