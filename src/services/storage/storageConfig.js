/**
 * storageConfig.js
 *
 * Centralized configuration and environment validation for the storage provider layer.
 */

export const STORAGE_PROVIDERS = {
  CLOUDINARY: 'cloudinary',
  FIREBASE: 'firebase',
  LOCAL: 'local',
};

/**
 * Returns the active storage provider name from environment variables.
 * Defaults to 'cloudinary' if not explicitly configured.
 *
 * @returns {string} 'cloudinary' | 'firebase' | 'local'
 */
export function getActiveStorageProviderName() {
  const provider = process.env.EXPO_PUBLIC_STORAGE_PROVIDER;
  if (provider && Object.values(STORAGE_PROVIDERS).includes(provider)) {
    return provider;
  }
  return STORAGE_PROVIDERS.CLOUDINARY;
}

/**
 * Returns Cloudinary configuration settings.
 *
 * @returns {{ cloudName: string, apiKey: string, uploadPreset: string }}
 */
export function getCloudinaryConfig() {
  return {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME || 'iayng29j',
    apiKey: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY || '243111452156969',
    uploadPreset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'pigment_shop',
  };
}
