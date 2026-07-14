/**
 * appBootstrap.js
 *
 * Central startup orchestrator — the ONLY entry point for application initialization.
 *
 * Lifecycle contract (see src/bootstrap/startupContract.js):
 *   idle     → startup has not been initiated.
 *   starting → initialization is in progress.
 *   ready    → all required steps completed; optional steps may have failed gracefully.
 *   failed   → a required step failed critically; the app renders in a degraded state.
 *
 * Usage:
 *   Call startAppBootstrap({ isAuthenticated, user }) once after auth has resolved.
 *   Subscribe to status changes with onBootstrapStatusChange(listener).
 *   Read current status synchronously with getBootstrapStatus().
 *
 * Design constraints:
 *   - Framework-agnostic: no React imports.
 *   - Idempotent: startAppBootstrap() is safe to call multiple times.
 *   - All startup steps run in declared order; required steps block readiness.
 *   - Optional steps that fail do not block readiness (graceful fallback).
 */

import {
  STARTUP_STATES,
  GRACEFUL_FALLBACK_SEMANTICS,
  CRITICAL_FAILURE_SEMANTICS,
} from './startupContract';
import { initCatalogSync } from '../data/catalogSync';
import { bootstrapVisitorSession } from '../services/visitorBootstrap';

// ─── Internal State ────────────────────────────────────────────────────────────

/** @type {'idle' | 'starting' | 'ready' | 'failed'} */
let _status = STARTUP_STATES.IDLE;
let _error = null;
let _hasStarted = false;

/** @type {Array<(status: string, error: Error|null) => void>} */
const _listeners = [];

// ─── Subscription API ─────────────────────────────────────────────────────────

/**
 * Subscribe to startup status changes.
 * Immediately delivers the current status to the new subscriber.
 * Returns an unsubscribe function.
 *
 * @param {(status: string, error: Error|null) => void} listener
 * @returns {() => void}
 */
export function onBootstrapStatusChange(listener) {
  _listeners.push(listener);
  listener(_status, _error);
  return () => {
    const idx = _listeners.indexOf(listener);
    if (idx !== -1) _listeners.splice(idx, 1);
  };
}

/**
 * Returns the current startup status synchronously.
 * Useful for initial reads without subscribing.
 *
 * @returns {{ status: string, error: Error|null }}
 */
export function getBootstrapStatus() {
  return { status: _status, error: _error };
}

// ─── Internal Helpers ─────────────────────────────────────────────────────────

function _notify() {
  _listeners.forEach((fn) => fn(_status, _error));
}

function _setStatus(status, error = null) {
  _status = status;
  _error = error;
  _notify();
}

// ─── Startup Steps ────────────────────────────────────────────────────────────

/**
 * Step 1 (required): Initialize catalog sync.
 * Starts auth-aware Firestore listeners for categories and banners.
 * Failure here is critical and transitions the lifecycle to 'failed'.
 * Post-init listener errors are forwarded to console but do not stop the app.
 */
function _runCatalogSync() {
  initCatalogSync({
    onListenerError: (source, err) => {
      console.warn(`[appBootstrap] Catalog sync listener error (${source}):`, err);
    },
  });
}

/**
 * Step 2 (optional): Bootstrap visitor session.
 * Only runs when no real user is authenticated.
 * Failure is non-fatal — the app continues in an unauthenticated state.
 *
 * @param {{ isAuthenticated: boolean, user: object|null }} authState
 */
async function _runVisitorSession({ isAuthenticated, user }) {
  if (isAuthenticated || user) return;

  const { success, error } = await bootstrapVisitorSession();
  if (!success) {
    console[GRACEFUL_FALLBACK_SEMANTICS.loggingLevel](
      `[appBootstrap] ${GRACEFUL_FALLBACK_SEMANTICS.description} (visitor-session):`,
      error
    );
  }
}

// ─── Public Orchestrator ──────────────────────────────────────────────────────

/**
 * Start the application startup sequence.
 * Safe to call multiple times — only the first call has any effect.
 *
 * Startup order:
 *   1. catalog-sync  (required) — starts Firestore listeners.
 *   2. visitor-session (optional) — runs when no real user is present.
 *
 * @param {{ isAuthenticated: boolean, user: object|null }} authState
 * @returns {Promise<void>}
 */
export async function startAppBootstrap({ isAuthenticated, user }) {
  if (_hasStarted) return;
  _hasStarted = true;

  _setStatus(STARTUP_STATES.STARTING);

  try {
    _runCatalogSync();
    await _runVisitorSession({ isAuthenticated, user });
    _setStatus(STARTUP_STATES.READY);
  } catch (err) {
    console[CRITICAL_FAILURE_SEMANTICS.loggingLevel](
      `[appBootstrap] ${CRITICAL_FAILURE_SEMANTICS.description}:`,
      err
    );
    _setStatus(STARTUP_STATES.FAILED, err);
  }
}
