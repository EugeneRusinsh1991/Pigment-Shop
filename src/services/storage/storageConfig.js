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
  const env = typeof process !== 'undefined' && process.env ? process.env : {};
  const provider = env.EXPO_PUBLIC_STORAGE_PROVIDER;
  if (provider && Object.values(STORAGE_PROVIDERS).includes(provider)) {
    return provider;
  }
  return STORAGE_PROVIDERS.CLOUDINARY;
}

/**
 * Returns Cloudinary configuration settings.
 * Safe for CLI scripts and browser runtime without DOM dependencies.
 *
 * @returns {{ cloudName: string, apiKey: string, apiSecret: string, uploadPreset: string }}
 */
export function getCloudinaryConfig() {
  const env = typeof process !== 'undefined' && process.env ? process.env : {};
  return {
    cloudName: env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME || 'iayng29j',
    apiKey: env.EXPO_PUBLIC_CLOUDINARY_API_KEY || '727263237727468',
    apiSecret: env.CLOUDINARY_API_SECRET || 'NSjhtV3VaI7Da_cLl9RSLtWL4G8',
    uploadPreset: env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'pigment_shop',
  };
}

