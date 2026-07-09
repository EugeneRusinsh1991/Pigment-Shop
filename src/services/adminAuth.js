/**
 * adminAuth.js
 *
 * Temporary in-memory authentication service for the admin panel.
 * Credentials: login=111111, password=111111
 */

const ADMIN_LOGIN = '111111';
const ADMIN_PASSWORD = '111111';

let _authenticated = false;

/**
 * Attempt login. Returns true on success, false on failure.
 * @param {string} login
 * @param {string} password
 * @returns {boolean}
 */
export function login(login, password) {
  if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    _authenticated = true;
    return true;
  }
  return false;
}

/**
 * Log out the current admin session.
 */
export function logout() {
  _authenticated = false;
}

/**
 * Returns whether an admin session is active.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return _authenticated;
}
