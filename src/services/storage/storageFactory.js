/**
 * storageFactory.js
 *
 * Factory for resolving and caching storage provider instances based on environment configuration.
 */
import { STORAGE_PROVIDERS, getActiveStorageProviderName } from './storageConfig.js';
import { CloudinaryStorageProvider } from './providers/cloudinaryStorageProvider.js';
import { FirebaseStorageProvider } from './providers/firebaseStorageProvider.js';
import { LocalStorageProvider } from './providers/localStorageProvider.js';

const providerInstances = new Map();

/**
 * Returns a cached instance of the requested or active storage provider.
 *
 * @param {string} [providerName] - Optional provider override ('cloudinary' | 'firebase' | 'local')
 * @returns {import('./providers/baseStorageProvider').BaseStorageProvider}
 */
export function getStorageProvider(providerName) {
  const name = providerName || getActiveStorageProviderName();

  if (!providerInstances.has(name)) {
    let instance;
    switch (name) {
      case STORAGE_PROVIDERS.FIREBASE:
        instance = new FirebaseStorageProvider();
        break;
      case STORAGE_PROVIDERS.LOCAL:
        instance = new LocalStorageProvider();
        break;
      case STORAGE_PROVIDERS.CLOUDINARY:
      default:
        instance = new CloudinaryStorageProvider();
        break;
    }
    providerInstances.set(name, instance);
  }

  return providerInstances.get(name);
}
