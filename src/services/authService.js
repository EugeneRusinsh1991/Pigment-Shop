/**
 * authService.js
 *
 * Firebase Auth adapter module.
 * Exposes named functions and an authService singleton container.
 */

import {
  subscribeToAuthChanges as repoSubscribe,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logoutUser,
} from './repositories/authRepository';
import { withServiceContract } from './serviceContract';

let pendingGoogleSignIn = null;

/**
 * Subscribe to changes in the user's authentication state.
 * @param {(user: Object|null) => void} callback
 * @returns {Function}
 */
function subscribeToAuthChanges(callback) {
  return repoSubscribe(callback);
}

/**
 * Log in with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
async function _login(email, password) {
  return loginWithEmail(email, password);
}

const login = withServiceContract(_login, 'Login failed');

/**
 * Register a new user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
async function _register(email, password) {
  return registerWithEmail(email, password);
}

const register = withServiceContract(_register, 'Registration failed');

/**
 * Log in using Google Provider popup.
 * @returns {Promise<Object>}
 */
async function _signInWithGoogle() {
  if (pendingGoogleSignIn) {
    return pendingGoogleSignIn;
  }
  pendingGoogleSignIn = loginWithGoogle().finally(() => {
    pendingGoogleSignIn = null;
  });
  return pendingGoogleSignIn;
}

const signInWithGoogle = withServiceContract(_signInWithGoogle, 'Google sign-in failed');

/**
 * Log out the current user session.
 * @returns {Promise<void>}
 */
async function _logout() {
  return logoutUser();
}

const logout = withServiceContract(_logout, 'Logout failed');

export const authService = {
  subscribeToAuthChanges,
  login,
  register,
  signInWithGoogle,
  logout,
};
