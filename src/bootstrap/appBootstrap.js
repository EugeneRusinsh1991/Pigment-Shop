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
  STARTUP_TRANSITIONS,
  GRACEFUL_FALLBACK_SEMANTICS,
  CRITICAL_FAILURE_SEMANTICS,
} from './startupContract';
import { executeStartupSteps, stopStartupSteps } from './bootstrapOrchestrator';

// ─── Internal State ────────────────────────────────────────────────────────────

/** @type {'idle' | 'starting' | 'ready' | 'failed'} */
let _status = STARTUP_STATES.IDLE;
let _error = null;

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

// ─── State Machine Transition Engine ───────────────────────────────────────────

function _transition(event, payload = null) {
  const nextState = STARTUP_TRANSITIONS[_status]?.[event];
  if (!nextState) {
    console.warn(`[appBootstrap] Invalid transition event "${event}" in state "${_status}"`);
    return;
  }

  _status = nextState;
  if (event === 'FAILURE') {
    _error = payload;
  }

  // Notify all active status subscribers
  _listeners.forEach((fn) => fn(_status, _error));
}

// ─── Public Orchestrator ──────────────────────────────────────────────────────

/**
 * Start the application startup sequence.
 * Safe to call multiple times — only the first call has any effect.
 *
 * Startup transitions:
 *   idle     -> starting (via 'START' event)
 *   starting -> ready    (via 'SUCCESS' event)
 *   starting -> failed   (via 'FAILURE' event)
 *
 * @param {{ isAuthenticated: boolean, user: object|null }} authState
 * @returns {Promise<void>}
 */
export async function startAppBootstrap({ isAuthenticated, user }) {
  if (_status !== STARTUP_STATES.IDLE) return;

  _transition('START');

  try {
    await executeStartupSteps({ 
      isAuthenticated, 
      user,
    });

    _transition('SUCCESS');
  } catch (err) {
    console[CRITICAL_FAILURE_SEMANTICS.loggingLevel](
      `[appBootstrap] ${CRITICAL_FAILURE_SEMANTICS.description}:`,
      err
    );
    _transition('FAILURE', err);
  }
}

/**
 * Stop the application startup sequence, tear down active sync listeners, and reset status.
 */
function stopAppBootstrap() {
  _status = STARTUP_STATES.IDLE;
  _error = null;
  stopStartupSteps();
  _listeners.forEach((fn) => fn(_status, _error));
}

/**
 * Resets the bootstrap state and clears all listener subscriptions.
 * Useful for development Fast Refresh / HMR reloads and test teardowns.
 */
function resetAppBootstrap() {
  _status = STARTUP_STATES.IDLE;
  _error = null;
  stopStartupSteps();
  _listeners.length = 0;
}
