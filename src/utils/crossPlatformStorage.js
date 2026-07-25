import { Platform } from 'react-native';

/**
 * In-memory fallback cache for native environments or platforms without sessionStorage.
 */
const memoryStore = new Map();

/**
 * Universal cross-platform synchronous storage adapter.
 * Serves sessionStorage on Web and a persistent module-level session memory store on Native.
 */
function readWebStorage(key) {
  try {
    const localVal = window.localStorage?.getItem(key);
    if (localVal !== null && localVal !== undefined) return localVal;
    const sessionVal = window.sessionStorage?.getItem(key);
    if (sessionVal !== null && sessionVal !== undefined) return sessionVal;
  } catch (e) {
    console.warn(`[crossPlatformStorage] storage read failed for key "${key}":`, e);
  }
  return null;
}

export const crossPlatformStorage = {
  getItem(key) {
    const isWebEnv = Platform.OS === 'web' && typeof window !== 'undefined';
    if (isWebEnv) {
      const webValue = readWebStorage(key);
      if (webValue !== null) return webValue;
    }
    return memoryStore.get(key) ?? null;
  },

  setItem(key, value) {
    memoryStore.set(key, value);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem(key, value);
        window.sessionStorage?.setItem(key, value);
      } catch (e) {
        console.warn(`[crossPlatformStorage] storage write failed for key "${key}":`, e);
      }
    }
  },

  removeItem(key) {
    memoryStore.delete(key);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      try {
        window.localStorage?.removeItem(key);
        window.sessionStorage?.removeItem(key);
      } catch (e) {
        console.warn(`[crossPlatformStorage] storage remove failed for key "${key}":`, e);
      }
    }
  },
};
