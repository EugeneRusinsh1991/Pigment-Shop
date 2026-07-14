/**
 * catalogState.js
 *
 * The canonical in-memory store for all catalog domain data.
 *
 * ── Role ─────────────────────────────────────────────────────────────────────
 * This module is the single source of truth for in-memory catalog state.
 * It has NO Firestore, auth, or persistence imports.
 *
 * ── Write access ─────────────────────────────────────────────────────────────
 * The setters (setProducts, setCategories, setBanners) are low-level primitives.
 * Admin mutations MUST go through adminCatalogBoundary, which calls these setters
 * after any required persistence step.
 * Firestore sync (catalogSync.js) calls them directly as a reactive read adapter.
 *
 * ── Read access ──────────────────────────────────────────────────────────────
 * Storefront consumers use CatalogContext (which subscribes via useSyncExternalStore)
 * and never import from this module directly.
 *
 * ── Notification ─────────────────────────────────────────────────────────────
 * All state mutations call notify() so any registered listener is informed
 * immediately and consistently.
 *
 * Public API
 * ----------
 * subscribe(fn)                        – listener registration; returns unsubscribe fn
 * getProducts() / setProducts(arr)     – product array (in-memory only)
 * getCategories() / setCategories(arr) – category array (Firestore-backed via sync)
 * getBanners() / setBanners(arr)       – banner array (Firestore-backed via sync)
 */

import { SEED_PRODUCTS } from './seedProducts.js';

export const SEED_BANNERS = [
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
];

function loadInitialBanners() {
  return [...SEED_BANNERS];
}

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

const DEFAULT_PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop'
];

function sanitizeProduct(p) {
  const { category, subcategory, categoryId, ...rest } = p;
  const images = rest.images && rest.images.length > 0 ? rest.images : [
    rest.image || DEFAULT_PRODUCT_IMAGES[0],
    DEFAULT_PRODUCT_IMAGES[1],
    DEFAULT_PRODUCT_IMAGES[2]
  ];
  return { ...rest, images };
}

function buildInitialCategories(products) {
  const categoryMap = new Map();
  products.forEach((product) => {
    const rawCategory = product.category;
    const categoryName = typeof rawCategory === 'object'
      ? (rawCategory.ru || rawCategory.en || rawCategory.uk || 'Другое')
      : (rawCategory || 'Другое');
    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, {
        id: `cat-${categoryName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
        parentId: null,
        type: 'product_holder',
        name: {
          ru: categoryName,
          uk: categoryName,
          en: categoryName,
        },
        productIds: [],
      });
    }
    categoryMap.get(categoryName).productIds.push(product.id);
  });
  return Array.from(categoryMap.values());
}

let _products = SEED_PRODUCTS.map(sanitizeProduct);
let _categories = buildInitialCategories(SEED_PRODUCTS); // Seeded from existing products until Firestore sync arrives
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
  _products = (products || []).map(sanitizeProduct);
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

/** Replace the entire banner array and notify listeners. */
export function setBanners(banners) {
  _banners = banners;
  notify();
}

