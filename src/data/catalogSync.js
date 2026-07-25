/**
 * catalogSync.js
 *
 * Firestore integration adapter for the catalog domain.
 *
 * ── Role ─────────────────────────────────────────────────────────────────────
 * This module is a REACTIVE ADAPTER, not a mutation owner.
 * It bridges the Firestore real-time listeners to the catalog in-memory state.
 */

import { collection, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { COLLECTIONS } from '../services/collections';
import { catalogStore } from './catalogState';
import {
  attachSnapshotListener,
  mapSnapshotToList,
  SyncRetryController,
  createCatalogSyncHandshake,
} from './catalogSyncHelpers';

class CatalogSyncService {
  constructor() {
    this._unsubscribeCategories = null;
    this._unsubscribeBanners = null;
    this._unsubscribeProducts = null;
    this._active = false;
    this._options = {};
    this._retry = new SyncRetryController();
  }

  start(options = {}) {
    if (this._active) return Promise.resolve();
    this._active = true;
    this._options = options;

    return createCatalogSyncHandshake(
      options,
      (cb) => this._connectProducts(cb),
      (cb) => this._connectCategories(cb),
      () => this._connectBanners(),
    );
  }

  stop() {
    this._active = false;
    this._retry.clearAll();

    if (this._unsubscribeProducts) {
      this._unsubscribeProducts();
      this._unsubscribeProducts = null;
    }
    if (this._unsubscribeCategories) {
      this._unsubscribeCategories();
      this._unsubscribeCategories = null;
    }
    if (this._unsubscribeBanners) {
      this._unsubscribeBanners();
      this._unsubscribeBanners = null;
    }
  }

  isActive() {
    return this._active;
  }

  _createListenerCallbacks(key, actionType, initialCallbacks, reconnectFn) {
    let hasLoadedOnce = false;

    const onData = (snapshot) => {
      this._retry.resetDelay(key);
      catalogStore.execute({ type: actionType, payload: mapSnapshotToList(snapshot) });
      if (!hasLoadedOnce) {
        hasLoadedOnce = true;
        initialCallbacks.onFirstLoad?.();
      }
    };

    const onError = (err) => {
      if (!hasLoadedOnce && initialCallbacks.onError) {
        initialCallbacks.onError(err);
      } else if (this._options.onListenerError) {
        this._options.onListenerError(key, err);
      }
      if (err?.code !== 'permission-denied') {
        this._retry.schedule(key, this._active, reconnectFn);
      }
    };

    return { onData, onError };
  }

  _connectProducts(initialCallbacks = {}) {
    if (!this._active) return;

    if (this._unsubscribeProducts) {
      this._unsubscribeProducts();
      this._unsubscribeProducts = null;
    }

    const productsCol = collection(db, COLLECTIONS.PRODUCTS);
    const { onData, onError } = this._createListenerCallbacks(
      'products',
      'UPDATE_PRODUCTS',
      initialCallbacks,
      () => this._connectProducts(initialCallbacks),
    );

    this._unsubscribeProducts = attachSnapshotListener(productsCol, 'Products', onData, onError);
  }

  _connectCategories(initialCallbacks = {}) {
    if (!this._active) return;

    if (this._unsubscribeCategories) {
      this._unsubscribeCategories();
      this._unsubscribeCategories = null;
    }

    const categoriesCol = collection(db, COLLECTIONS.CATEGORIES);
    const { onData, onError } = this._createListenerCallbacks(
      'categories',
      'UPDATE_CATEGORIES',
      initialCallbacks,
      () => this._connectCategories(initialCallbacks),
    );

    this._unsubscribeCategories = attachSnapshotListener(categoriesCol, 'Category', onData, onError);
  }

  _connectBanners() {
    if (!this._active) return;

    if (this._unsubscribeBanners) {
      this._unsubscribeBanners();
      this._unsubscribeBanners = null;
    }

    const bannersDoc = doc(db, COLLECTIONS.SETTINGS, COLLECTIONS.BANNERS);

    this._unsubscribeBanners = attachSnapshotListener(
      bannersDoc,
      'Banners',
      (snapshot) => {
        this._retry.resetDelay('banners');
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.items && Array.isArray(data.items)) {
            catalogStore.execute({ type: 'UPDATE_BANNERS', payload: data.items });
          }
        }
      },
      (err) => {
        if (this._options.onListenerError) {
          this._options.onListenerError('banners', err);
        }
        if (err?.code !== 'permission-denied') {
          this._retry.schedule('banners', this._active, () => this._connectBanners());
        }
      },
    );
  }
}

export const catalogSyncService = new CatalogSyncService();

/**
 * Start the Firestore catalog sync.
 * Backwards-compatible facade for catalogSyncService.start().
 */
function initCatalogSync(options) {
  catalogSyncService.start(options);
}
