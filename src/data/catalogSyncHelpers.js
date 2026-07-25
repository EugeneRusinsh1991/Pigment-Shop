import { onSnapshot } from 'firebase/firestore';

export function attachSnapshotListener(ref, sourceName, onData, onError) {
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

export function mapSnapshotToList(snapshot) {
  if (snapshot.empty) return [];
  const list = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    list.push({ id: docSnap.id, ...data });
  });
  list.sort((a, b) => a.id.localeCompare(b.id));
  return list;
}

export class SyncRetryController {
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

export function createCatalogSyncHandshake(options, connectProducts, connectCategories, connectBanners) {
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
