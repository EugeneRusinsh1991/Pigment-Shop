/**
 * catalogSync.js
 *
 * Manages the Firestore category snapshot listener and auth-driven lifecycle.
 *
 * This is the ONLY module in the catalog domain that imports firebase/auth.
 * It reads and writes to catalogState, keeping the core state container free
 * of any external side effects.
 *
 * The listener is started lazily by calling initCatalogSync() from the app
 * bootstrap (AppProviders or similar). It stops automatically on sign-out.
 */

import { db, auth } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { setCategories } from './catalogState';

let _unsubscribeCategories = null;
let _unsubscribeAuth = null;
let _initialized = false;

/**
 * Start the auth-aware Firestore category sync.
 * Safe to call multiple times — subsequent calls are no-ops.
 */
export function initCatalogSync() {
  if (_initialized) return;
  _initialized = true;

  try {
    const categoriesCol = collection(db, 'categories');

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
              snapshot.forEach((doc) => {
                const data = doc.data();
                delete data.image; // Ignore image field during load
                list.push({ id: doc.id, ...data });
              });

              // Sort alphabetically by ID to preserve hierarchy/depth order
              list.sort((a, b) => a.id.localeCompare(b.id));

              setCategories(list);
            },
            (err) => {
              console.error('Category snapshot listener failed:', err);
            }
          );
        }
      } else {
        if (_unsubscribeCategories) {
          _unsubscribeCategories();
          _unsubscribeCategories = null;
        }
        setCategories([]);
      }
    });
  } catch (err) {
    console.error('Failed to start Firestore categories listener:', err);
  }
}
