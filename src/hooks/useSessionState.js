import { useEffect, useState } from 'react';
import { crossPlatformStorage } from '../utils/crossPlatformStorage';

/**
 * useSessionState.js
 * 
 * A cross-platform hook that behaves like useState but persists state
 * across navigations and reloads on both Web and Native mobile targets.
 */
function getStoredJson(key) {
  try {
    const stored = crossPlatformStorage.getItem(key);
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn(`Error reading storage key "${key}":`, e);
  }
  return null;
}

function extractDataAndVersion(parsed) {
  const isObject = parsed !== null && typeof parsed === 'object';
  if (isObject && '__v' in parsed) {
    return { data: parsed.data, version: parsed.__v, isVersioned: true };
  }
  return { data: parsed, version: 0, isVersioned: false };
}

function migrateData(parsed, key, migrate) {
  if (!migrate) return null;
  const { data, version } = extractDataAndVersion(parsed);
  try {
    return { value: migrate(data, version) };
  } catch (err) {
    console.warn(`Migration failed for key "${key}":`, err);
  }
  return null;
}

function loadSessionState(key, version, migrate) {
  const parsed = getStoredJson(key);
  if (parsed === null) return null;

  const { data, version: storedVersion, isVersioned } = extractDataAndVersion(parsed);
  if (isVersioned && storedVersion === version) {
    return { value: data };
  }

  return migrateData(parsed, key, migrate);
}

export default function useSessionState(key, defaultValue, options = {}) {
  const version = typeof options === 'number' ? options : (options?.version ?? 1);
  const migrate = options?.migrate;

  const [state, setState] = useState(() => {
    const loaded = loadSessionState(key, version, migrate);
    if (loaded !== null) return loaded.value;
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    try {
      if (state === undefined) {
        crossPlatformStorage.removeItem(key);
      } else {
        const envelope = { __v: version, data: state };
        crossPlatformStorage.setItem(key, JSON.stringify(envelope));
      }
    } catch (e) {
      console.warn(`Error setting storage key "${key}":`, e);
    }
  }, [key, state, version]);

  return [state, setState];
}

