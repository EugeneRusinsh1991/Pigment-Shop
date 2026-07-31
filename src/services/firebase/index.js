/**
 * src/services/firebase/index.js
 *
 * Firebase infrastructure — canonical module.
 *
 * Initializes the Firebase app and exports the `auth` and `db` instances
 * used throughout the application.
 *
 * All modules should import from this path:
 *   import { auth, db } from '../services/firebase';
 *
 * The legacy shim at src/firebase.js re-exports from here for backward
 * compatibility while imports are gradually updated.
 */
import { initializeApp, setLogLevel } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

setLogLevel('silent');

const firebaseConfig = {
  apiKey: 'AIzaSyCbiYIQqsi60MxBf4bf-aGgJ_qgDI1_r3w',
  authDomain: 'pgmt-shop.firebaseapp.com',
  projectId: 'pgmt-shop',
  storageBucket: 'pgmt-shop.firebasestorage.app',
  messagingSenderId: '772088828282',
  appId: '1:772088828282:web:9305b7fc4e1277988d46c3',
  measurementId: 'G-9KF92KFGEF',
};

const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = getAuth(app);
} catch (e) {
  auth = initializeAuth(app, {
    persistence: inMemoryPersistence,
  });
}

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { auth, db };
