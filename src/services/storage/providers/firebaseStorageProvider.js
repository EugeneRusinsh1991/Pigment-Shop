/**
 * firebaseStorageProvider.js
 *
 * Firebase Storage provider implementation using Firebase Storage SDK.
 * Ready for future provider swap via EXPO_PUBLIC_STORAGE_PROVIDER='firebase'.
 */
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/index.js';
import { BaseStorageProvider } from './baseStorageProvider.js';

export class FirebaseStorageProvider extends BaseStorageProvider {
  /**
   * Uploads an image to Firebase Cloud Storage.
   *
   * @param {File|Blob|string} file - File object, Blob, or base64 Data URI string.
   * @param {import('./baseStorageProvider').StorageUploadOptions} [options]
   * @returns {Promise<import('./baseStorageProvider').StorageUploadResult>}
   */
  async uploadImage(file, options = {}) {
    const folder = options.folder ? `${options.folder}/` : 'uploads/';
    const filename = options.filename || `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const storagePath = `${folder}${filename}`;
    const storageRef = ref(storage, storagePath);

    let blobToUpload = file;
    if (typeof file === 'string' && file.startsWith('data:')) {
      const response = await fetch(file);
      blobToUpload = await response.blob();
    }

    const snapshot = await uploadBytes(storageRef, blobToUpload);
    const url = await getDownloadURL(snapshot.ref);

    return {
      url,
      publicId: storagePath,
      provider: 'firebase',
    };
  }

  /**
   * Deletes an object from Firebase Cloud Storage by its storage path (publicId) or URL.
   *
   * @param {string} publicIdOrUrl
   * @returns {Promise<{ success: boolean }>}
   */
  async deleteImage(publicIdOrUrl) {
    if (!publicIdOrUrl) return { success: false };
    try {
      const storageRef = ref(storage, publicIdOrUrl);
      await deleteObject(storageRef);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
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
    return publicIdOrUrl;
  }
}
