/**
 * catalogSync.js
 *
 * Firestore integration adapter for the catalog domain.
 *
 * ── Role ─────────────────────────────────────────────────────────────────────
 * This module is a REACTIVE ADAPTER, not a mutation owner.
 * It bridges the Firestore real-time listeners to the catalog in-memory state.
 *
 * It intentionally calls setCategories() and setBanners() directly on
 * catalogState — bypassing adminDomain — because Firestore-driven
 * updates are reads from the remote source of truth, not admin mutations.
 * adminDomain owns admin-initiated writes; this module handles
 * the reactive push from Firestore back into local state.
 *
 * ── Admin edit protection ────────────────────────────────────────────────────
 * The admin UI (CategoriesManager) guards against sync overwrites using an
 * isDirty flag. When the admin has unsaved local edits, incoming Firestore
 * snapshots are intentionally ignored by the UI. This module still calls
 * setCategories() so that any non-admin subscriber (e.g. storefront context)
 * stays up to date, but the admin's staged changes are not discarded because
 * CategoriesManager only reads from the store when !isDirty.
 *
 * ── Startup integration ──────────────────────────────────────────────────────
 * initCatalogSync() is invoked by the central startup orchestrator
 * (src/bootstrap/appBootstrap.js) as the 'catalog-sync' startup step.
 *
 * The internal auth subscription is intentional: catalog sync must react
 * to sign-in and sign-out events dynamically throughout the session lifetime,
 * not just at startup. This is a reactive session concern, not a startup
 * sequencing concern, and is therefore kept local to this module.
 *
 * Errors from the initial setup are thrown so the orchestrator can catch them.
 * Errors from Firestore snapshot listeners (post-init) are reported via the
 * optional onListenerError callback to keep the orchestrator informed.
 *
 * ── Lifecycle ────────────────────────────────────────────────────────────────
 * This is the ONLY module in the catalog domain that imports firebase/auth.
 * The listener is started lazily by calling initCatalogSync() from the app
 * bootstrap. It stops category and banner listeners automatically on sign-out.
 */

import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { setBanners, setCategories, setProducts } from './catalogState';

let _unsubscribeCategories = null;
let _unsubscribeBanners = null;
let _unsubscribeAuth = null;
let _unsubscribeProducts = null;
let _initialized = false;

/**
 * Start the auth-aware Firestore catalog sync.
 * Safe to call multiple times — subsequent calls are no-ops.
 *
 * On sign-in:  Starts real-time listeners for categories and banners.
 * On sign-out: Stops all listeners and clears categories from memory.
 *
 * @param {{ onListenerError?: (source: string, err: Error) => void }} [options]
 *   onListenerError — optional callback invoked when a Firestore snapshot
 *   listener encounters an error after initialization. The orchestrator can
 *   use this to log or surface listener degradation without crashing the app.
 */
export function initCatalogSync({ onListenerError } = {}) {
  if (_initialized) return;
  _initialized = true;

  // Throws on setup failure so the orchestrator can catch and handle it.
  const categoriesCol = collection(db, 'categories');
  const productsCol = collection(db, 'products');
  const bannersDoc = doc(db, 'settings', 'banners');

  _unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!_unsubscribeCategories) {
        _unsubscribeCategories = onSnapshot(
          categoriesCol,
          (snapshot) => {
            if (snapshot.empty) {
              setCategories([]);
              return;
            }

            const list = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              delete data.image; // Ignore image field during load
              list.push({ id: docSnap.id, ...data });
            });

            // Sort alphabetically by ID to preserve hierarchy/depth order.
            list.sort((a, b) => a.id.localeCompare(b.id));

            // Reactive adapter: push Firestore snapshot into canonical state.
            // Admin UI (CategoriesManager) guards against overwrites via isDirty.
            setCategories(list);
          },
          (err) => {
            console.error('[catalogSync] Category snapshot listener failed:', err);
            if (onListenerError) onListenerError('categories', err);
          }
        );
      }

      if (!_unsubscribeProducts) {
        _unsubscribeProducts = onSnapshot(
          productsCol,
          (snapshot) => {
            if (snapshot.empty) {
              setProducts([]);
              return;
            }

            const list = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({ id: docSnap.id, ...data });
            });

            // Sort by ID for stable ordering
            list.sort((a, b) => a.id.localeCompare(b.id));
            setProducts(list);
          },
          (err) => {
            console.error('[catalogSync] Products snapshot listener failed:', err);
            if (onListenerError) onListenerError('products', err);
          }
        );
      }

      if (!_unsubscribeBanners) {
        _unsubscribeBanners = onSnapshot(
          bannersDoc,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              if (data.items && Array.isArray(data.items)) {
                setBanners(data.items);
              }
            }
          },
          (err) => {
            console.error('[catalogSync] Banners snapshot listener failed:', err);
            if (onListenerError) onListenerError('banners', err);
          }
        );
      }
    } else {
      // Sign-out: stop all listeners and clear categories from memory.
      if (_unsubscribeCategories) {
        _unsubscribeCategories();
        _unsubscribeCategories = null;
      }
      if (_unsubscribeBanners) {
        _unsubscribeBanners();
        _unsubscribeBanners = null;
      }
        if (_unsubscribeProducts) {
          _unsubscribeProducts();
          _unsubscribeProducts = null;
        }
      setCategories([]);
        setProducts([]);
    }
  });
}
