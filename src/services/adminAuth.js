/**
 * adminAuth.js
 *
 * Temporary in-memory authentication service for the admin panel.
 * Credentials: login=111111, password=111111
 *
 * Firebase is used purely to establish an admin-level session so that
 * Firestore security rules can verify the caller is an admin.
 * The admin@pigment-shop.com account must already exist in the Firebase project;
 * account creation is not performed here (unlike the old visitor bootstrap pattern).
 */

import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

const ADMIN_LOGIN = '111111';
const ADMIN_PASSWORD = '111111';

let _authenticated = false;

/**
 * Attempt login. Returns true on success, false on failure.
 * @param {string} userLogin
 * @param {string} password
 * @returns {Promise<boolean>}
 */
export async function login(userLogin, password) {
  if (userLogin === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    try {
      await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
    } catch (err) {
      console.warn('[adminAuth] Could not sign in to Firebase as admin:', err);
      // Do not block the admin UI session even if Firebase sign-in fails.
    }
    _authenticated = true;
    return true;
  }
  return false;
}

/**
 * Log out the current admin session.
 */
export async function logout() {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    // Ignore — sign-out failure should not prevent local state reset.
  }
  _authenticated = false;
}

/**
 * Returns whether an admin session is active.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return _authenticated;
}
