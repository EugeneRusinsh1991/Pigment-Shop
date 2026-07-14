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

import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const VISITOR_EMAIL = 'visitor@pigment-shop.com';
const VISITOR_PASSWORD = 'visitor123456';

/**
 * Attempt to sign in as the shared visitor account.
 * If the account does not exist, attempt to create it first.
 *
 * This is an optional startup step — the caller must handle both outcomes
 * and must NOT treat failure as a critical error.
 *
 * @returns {Promise<{ success: true } | { success: false, error: Error }>}
 */
export async function bootstrapVisitorSession() {
  try {
    await signInWithEmailAndPassword(auth, VISITOR_EMAIL, VISITOR_PASSWORD);
    return { success: true };
  } catch (signInErr) {
    // Account may not exist yet — attempt one-time creation.
    try {
      await createUserWithEmailAndPassword(auth, VISITOR_EMAIL, VISITOR_PASSWORD);
      return { success: true };
    } catch (createErr) {
      console.warn('[visitorBootstrap] Visitor session could not be established:', createErr);
      return { success: false, error: createErr };
    }
  }
}
