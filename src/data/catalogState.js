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
 * The store accepts changes only through explicit intent-driven commands:
 *   - Remote snapshots (from Firestore sync) are applied via:
 *       applyRemoteProducts(products)
 *       applyRemoteCategories(categories)
 *       applyRemoteBanners(banners)
 *   - Local admin mutations (from admin experience) are applied via:
 *       applyAdminProducts(products)
 *       applyAdminCategories(categories)
 *       applyAdminBanners(banners)
 *
 * ── Read access ──────────────────────────────────────────────────────────────
 * Storefront consumers use CatalogContext (which subscribes via useSyncExternalStore)
 * and never import from this module directly.
 *
 * ── Notification ─────────────────────────────────────────────────────────────
 * All state mutations call notify() so any registered listener is informed
 * immediately and consistently.
 */

import { normalizeProductEntity, normalizeCategoryEntity } from '../services/catalogEntityContract';

class CatalogStore {
  constructor(initialData = {}) {
    this._listeners = new Set();
    this._products = (initialData.products || []).map(normalizeProductEntity);
    this._categories = (initialData.categories || []).map(normalizeCategoryEntity);
    this._banners = initialData.banners ?? null;
    this._isLoading = true;
  }

  subscribe = (fn) => {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  };

  notify() {
    this._listeners.forEach((fn) => fn());
  }

  getProducts = () => this._products;
  getCategories = () => this._categories;
  getBanners = () => this._banners;
  getIsLoading = () => this._isLoading;

  execute(command) {
    if (!command?.type) {
      throw new Error(`[CatalogStore] Invalid command: ${JSON.stringify(command)}`);
    }

    const handlers = {
      UPDATE_PRODUCTS: (payload) => {
        this._products = (payload || []).map(normalizeProductEntity);
        this._isLoading = false;
      },
      UPDATE_CATEGORIES: (payload) => {
        this._categories = (payload || []).map(normalizeCategoryEntity);
        this._isLoading = false;
      },
      UPDATE_BANNERS: (payload) => {
        this._banners = payload;
      },
    };

    const handler = handlers[command.type];
    if (!handler) {
      throw new Error(`[CatalogStore] Unknown command: ${command.type}`);
    }

    handler(command.payload);
    this.notify();
  }
}

export const catalogStore = new CatalogStore();

// Backwards-compatible legacy exports (read-only)
export const subscribe = (fn) => catalogStore.subscribe(fn);
export const getProducts = () => catalogStore.getProducts();
export const getCategories = () => catalogStore.getCategories();
export const getBanners = () => catalogStore.getBanners();
export const getIsLoading = () => catalogStore.getIsLoading();



