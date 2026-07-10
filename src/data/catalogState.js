/**
 * catalogState.js
 *
 * Pure in-memory state container for catalog data (products, categories, banners).
 *
 * This module has NO Firestore, auth, or persistence imports.
 * All state mutations call notify() so any registered listener
 * (e.g. React's useSyncExternalStore) is informed immediately.
 *
 * Public API
 * ----------
 * subscribe(fn) / unsubscribe(fn)      – listener registration
 * getProducts() / setProducts(arr)     – product array
 * getCategories() / setCategories(arr) – category array (raw, no Firestore write)
 * getBanners() / setBanners(arr)       – banner array (no persistence)
 */

import { SEED_PRODUCTS } from './seedProducts';
import { SEED_BANNERS, loadInitialBanners, persistBanners } from './bannerStorage';

// ---------------------------------------------------------------------------
// Listener registry
// ---------------------------------------------------------------------------

const _listeners = new Set();

/** Register a callback that fires after every store mutation. */
export function subscribe(fn) {
  _listeners.add(fn);
  return () => _listeners.delete(fn); // convenience unsubscribe
}


function notify() {
  _listeners.forEach((fn) => fn());
}

// ---------------------------------------------------------------------------
// Internal mutable state
// ---------------------------------------------------------------------------

let _products = SEED_PRODUCTS.map((p) => ({ ...p }));
let _categories = []; // Populated externally by catalogSync.js
let _banners = loadInitialBanners();

// ---------------------------------------------------------------------------
// Product accessors
// ---------------------------------------------------------------------------

/**
 * Returns the canonical product array reference.
 * useSyncExternalStore requires a stable reference between calls;
 * callers that need a mutable copy must spread at the call site.
 */
export function getProducts() {
  return _products;
}

/**
 * Replace the entire product array and notify all listeners.
 * @param {Array} products
 */
export function setProducts(products) {
  _products = products;
  notify();
}

// ---------------------------------------------------------------------------
// Category accessors
// ---------------------------------------------------------------------------

/**
 * Returns the canonical category array reference.
 * useSyncExternalStore requires a stable reference between calls;
 * callers that need a mutable copy must spread at the call site.
 */
export function getCategories() {
  return _categories;
}

/**
 * Replace the entire category array in memory and notify all listeners.
 * Does NOT write to Firestore — persistence is handled by adminCatalogBoundary.
 * @param {Array} categories
 */
export function setCategories(categories) {
  _categories = categories;
  notify();
}

// ---------------------------------------------------------------------------
// Banner accessors
// ---------------------------------------------------------------------------

/** Returns the canonical banner array reference. */
export function getBanners() {
  return _banners;
}

/** Replace the entire banner array, persist to localStorage, and notify listeners. */
export function setBanners(banners) {
  _banners = banners;
  persistBanners(banners);
  notify();
}

/** Resets banners to seed data. */
export function resetBanners() {
  _banners = [...SEED_BANNERS];
  persistBanners(_banners);
  notify();
}

/**
 * Resets the category array to empty and notifies listeners.
 * Provided for backward compatibility with legacy shims.
 * The live sync (catalogSync.js) will repopulate from Firestore when authenticated.
 */
