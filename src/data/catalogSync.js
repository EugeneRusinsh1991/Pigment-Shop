/**
 * catalogSync.js
 *
 * Firestore integration adapter for the catalog domain.
 *
 * ── Role ─────────────────────────────────────────────────────────────────────
 * This module is a REACTIVE ADAPTER, not a mutation owner.
 * It bridges the Firestore real-time listeners to the catalog in-memory state.
 */

import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { COLLECTIONS } from '../services/collections';
import { catalogStore } from './catalogState';

function attachSnapshotListener(ref, sourceName, onData, onError) {
  return onSnapshot(
    ref,
    (snapshot) => {
      onData(snapshot);
    },
    (err) => {
      if (err?.code !== 'permission-denied') {
        console.error(`[catalogSync] ${sourceName} snapshot listener failed:`, err);
      }
      onError?.(err);
    },
  );
}

function mapSnapshotToList(snapshot) {
  if (snapshot.empty) return [];
  const list = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    list.push({ id: docSnap.id, ...data });
  });
  list.sort((a, b) => a.id.localeCompare(b.id));
  return list;
}

class SyncRetryController {
  constructor() {
    this._retryTimers = {};
    this.resetDelays();
  }

  resetDelays() {
    this._retryDelays = {
      categories: 1000,
      products: 1000,
      banners: 1000,
    };
  }

  clearAll() {
    Object.keys(this._retryTimers).forEach((key) => {
      if (this._retryTimers[key]) {
        clearTimeout(this._retryTimers[key]);
        this._retryTimers[key] = null;
      }
    });
    this.resetDelays();
  }

  resetDelay(key) {
    this._retryDelays[key] = 1000;
  }

  schedule(key, isActive, connectFn) {
    if (!isActive) return;

    if (this._retryTimers[key]) {
      clearTimeout(this._retryTimers[key]);
    }

    const delay = this._retryDelays[key] || 1000;
    this._retryDelays[key] = Math.min(delay * 2, 30000);

    console.warn(`[CatalogSyncService] Scheduling retry for ${key} in ${delay}ms`);
    this._retryTimers[key] = setTimeout(() => {
      this._retryTimers[key] = null;
      connectFn();
    }, delay);
  }
}

function createCatalogSyncHandshake(options, connectProducts, connectCategories, connectBanners) {
  return new Promise((resolve, reject) => {
    let productsLoaded = false;
    let categoriesLoaded = false;
    let isInitialPending = true;

    const timeoutMs = options.timeoutMs || 10000;
    const timer = setTimeout(() => {
      if (isInitialPending) {
        isInitialPending = false;
        reject(new Error('[CatalogSyncService] Initial catalog connection timed out'));
      }
    }, timeoutMs);

    const checkInitialReady = () => {
      if (isInitialPending && productsLoaded && categoriesLoaded) {
        isInitialPending = false;
        clearTimeout(timer);
        resolve();
      }
    };

    const handleInitialError = (source, err) => {
      if (options.onListenerError) {
        options.onListenerError(source, err);
      }
      if (isInitialPending) {
        isInitialPending = false;
        clearTimeout(timer);
        reject(err);
      }
    };

    connectProducts({
      onFirstLoad: () => {
        productsLoaded = true;
        checkInitialReady();
      },
      onError: (err) => handleInitialError('products', err),
    });

    connectCategories({
      onFirstLoad: () => {
        categoriesLoaded = true;
        checkInitialReady();
      },
      onError: (err) => handleInitialError('categories', err),
    });

    connectBanners();
  });
}

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
