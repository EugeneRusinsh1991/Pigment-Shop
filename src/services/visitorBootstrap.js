/**
 * visitorBootstrap.js
 *
 * First-class startup step: anonymous visitor session establishment.
 *
 * ── Role in the startup lifecycle ────────────────────────────────────────────
 * This module implements the 'visitor-session' startup step defined in
 * src/bootstrap/startupContract.js.
 *
 * Step classification: OPTIONAL
 *   - Success: the app runs with a visitor session (limited auth scope).
 *   - Failure: the app continues fully unauthenticated. Features requiring
 *     authentication will be unavailable, but the storefront remains usable.
 *
 * ── Return contract ───────────────────────────────────────────────────────────
 * bootstrapVisitorSession() always returns a result object — it never throws.
 *   { success: true }              — session established.
 *   { success: false, error: Error } — session unavailable; app continues.
 *
 * ── Isolation contract ───────────────────────────────────────────────────────
 * This module is intentionally isolated from UI state management:
 *   - It does NOT import React, any context, or any hook.
 *   - It is invoked only from the startup orchestrator (appBootstrap.js).
 *   - It has no module-level state; each call is a fresh attempt.
 *
 * Background: Firebase anonymous auth is disabled for this project, so a
 * shared visitor account (visitor@pigment-shop.com) is used as a technical
 * stand-in. The account creation path is a one-time fallback for when the
 * account does not yet exist in the Firebase project.
 */

import { loginAnonymously, loginWithEmail } from './repositories/authRepository';
import { VISITOR_EMAIL, VISITOR_PASSWORD } from './authPolicy';
import { withServiceContract } from './serviceContract';

/**
 * Generates an isolated session token for guest users as fallback.
 */
function getOrCreateGuestSessionId() {
  if (typeof window !== 'undefined' && window.localStorage) {
    let sid = window.localStorage.getItem('guest_session_id');
    if (!sid) {
      sid = 'visitor_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      window.localStorage.setItem('guest_session_id', sid);
    }
    return sid;
  }
  return 'visitor_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
}

/**
 * Attempt to establish an isolated guest/anonymous session.
 * Uses Firebase Anonymous Authentication, falling back to guest account if anonymous auth is disabled.
 *
 * @returns {Promise<{ success: true } | { success: false, error: Error }>}
 */
async function _bootstrapVisitorSession() {
  try {
    await loginAnonymously();
    return { guest: false };
  } catch (anonErr) {
    try {
      await loginWithEmail(VISITOR_EMAIL, VISITOR_PASSWORD);
      return { guest: false };
    } catch (fallbackErr) {
      const sessionId = getOrCreateGuestSessionId();
      return { guest: true, sessionId };
    }
  }
}

const bootstrapVisitorSession = withServiceContract(_bootstrapVisitorSession, 'Failed to bootstrap visitor session');

/**
 * Lifecycle service for visitor session bootstrap.
 */
export const visitorBootstrapService = {
  async start({ isAuthenticated, user }) {
    if (!isAuthenticated && !user) {
      const result = await bootstrapVisitorSession();
      if (!result.success) {
        throw new Error(result.error);
      }
    }
  },
  stop() {
    // No-op for visitor bootstrap
  },
};

