/**
 * visitorBootstrap.js
 *
 * Dedicated startup module for establishing an anonymous visitor session.
 *
 * This module is intentionally isolated from UI state management:
 *   - It is called explicitly from the BootstrapGate (AppProviders.js).
 *   - It does NOT import React, any context, or any hook.
 *   - It has clear success/failure return values for the caller to handle.
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
 * @returns {Promise<{ success: boolean, error?: Error }>}
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
