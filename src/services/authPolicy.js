/**
 * authPolicy.js
 *
 * Exposes identity policy rules to decouple user contexts from business policies.
 */

export const VISITOR_EMAIL = 'visitor@pigment-shop.com';
export const VISITOR_PASSWORD = 'visitor123456';

/**
 * Returns true if the user corresponds to a guest or anonymous visitor session.
 * @param {object|null} user
 * @returns {boolean}
 */
function isVisitorUser(user) {
  if (!user) return false;
  return Boolean(
    user.isAnonymous ||
    user.isGuest ||
    (typeof user.uid === 'string' && user.uid.startsWith('visitor_')) ||
    user.email === VISITOR_EMAIL
  );
}

/**
 * Returns true if the user is considered authenticated from a storefront policy standpoint.
 * Real registered users are authenticated, while technical visitors are not.
 * @param {object|null} user
 * @returns {boolean}
 */
export function shouldTreatAsAuthenticated(user) {
  return !!user && !isVisitorUser(user);
}

/**
 * Resolves the user session to expose to the storefront.
 * Technical visitor account sessions should not be exposed as a real user.
 * @param {object|null} user
 * @returns {object|null}
 */
export function resolveUserSession(user) {
  return isVisitorUser(user) ? null : user;
}
