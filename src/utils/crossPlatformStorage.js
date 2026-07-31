/**
 * In-memory fallback cache for native environments or platforms without sessionStorage.
 */
const memoryStore = new Map();

const isWeb = typeof window !== 'undefined';

/**
 * Universal cross-platform synchronous storage adapter.
 * Serves sessionStorage on Web and a persistent module-level session memory store on Native.
 */
function readWebStorage(key) {
  if (!isWeb) return null;
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
    if (isWeb) {
      const webValue = readWebStorage(key);
      if (webValue !== null) return webValue;
    }
    return memoryStore.get(key) ?? null;
  },

  setItem(key, value) {
    memoryStore.set(key, value);
    if (isWeb) {
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
    if (isWeb) {
      try {
        window.localStorage?.removeItem(key);
        window.sessionStorage?.removeItem(key);
      } catch (e) {
        console.warn(`[crossPlatformStorage] storage remove failed for key "${key}":`, e);
      }
    }
  },
};
