/**
 * startupContract.js
 *
 * Single source of truth for the application startup lifecycle contract.
 *
 * This module defines:
 *   - The lifecycle states and their meanings.
 *   - The required startup steps and their dependency order.
 *   - The optional startup steps and their failure semantics.
 *   - The expected behavior on success, graceful fallback, and critical failure.
 *
 * Design constraints:
 *   - Framework-agnostic: no React imports, no hooks.
 *   - Safe to import from both React components and plain JS modules.
 *   - All constants are immutable — consumers must not mutate them.
 */

// ─── Lifecycle States ─────────────────────────────────────────────────────────

/**
 * The complete set of startup lifecycle states.
 *
 * @type {Object.<string, string>}
 *
 * State transitions:
 *   idle → starting → ready
 *   idle → starting → failed
 *
 *   'idle'     The startup process has not been initiated.
 *              No startup work has begun. This is the initial state.
 *
 *   'starting' The startup process is in progress.
 *              One or more startup steps are executing. The app shell
 *              should display a loading indicator.
 *
 *   'ready'    All required startup steps completed successfully.
 *              Optional steps may have failed gracefully.
 *              The app shell may render.
 *
 *   'failed'   A required startup step failed critically.
 *              The app did not reach a usable state. The app shell should
 *              render an error or degraded state — it must NOT remain
 *              stuck in the loading state indefinitely.
 */
export const STARTUP_STATES = Object.freeze({
  IDLE: 'idle',
  STARTING: 'starting',
  READY: 'ready',
  FAILED: 'failed',
});

// ─── Startup Step Descriptors ─────────────────────────────────────────────────

/**
 * Descriptors for each startup step.
 *
 * Each descriptor specifies:
 *   - id:        Unique identifier used for logging and observability.
 *   - required:  If true, failure causes the lifecycle to enter 'failed'.
 *                If false, failure is logged and the lifecycle continues.
 *   - condition: Human-readable description of when this step runs.
 *
 * Dependency order:
 *   1. CATALOG_SYNC   — runs first; auth-aware, no async resolution required.
 *   2. VISITOR_SESSION — runs only when no real user is authenticated; optional.
 *
 * @type {Readonly<{ id: string, required: boolean, condition: string }[]>}
 */
export const STARTUP_STEPS = Object.freeze([
  Object.freeze({
    id: 'catalog-sync',
    required: true,
    condition: 'Always. Starts Firestore listeners for catalog data.',
  }),
  Object.freeze({
    id: 'visitor-session',
    required: false,
    condition:
      'Only when no authenticated user is present. ' +
      'Establishes a shared visitor session as a fallback.',
  }),
]);

// ─── Success Semantics ────────────────────────────────────────────────────────

/**
 * The startup sequence is considered successful when:
 *   1. All required steps have completed without a critical error.
 *   2. Optional steps may have failed — they are logged but do not block readiness.
 *
 * When the sequence is successful:
 *   - Status transitions to STARTUP_STATES.READY.
 *   - The app shell is allowed to render.
 */
export const SUCCESS_SEMANTICS = Object.freeze({
  description:
    'All required steps passed. Optional steps may have failed gracefully.',
  resultState: STARTUP_STATES.READY,
});

// ─── Graceful Fallback Semantics ──────────────────────────────────────────────

/**
 * Graceful fallback occurs when an optional step fails.
 *
 * Current optional steps:
 *   - visitor-session: failure means the app runs fully unauthenticated.
 *     The storefront is still usable; features requiring auth will be unavailable.
 *
 * When graceful fallback occurs:
 *   - The failure is logged with console.warn.
 *   - The startup sequence continues and ultimately resolves as READY.
 *   - No user-visible error is required, but the UI may reflect limited functionality.
 */
export const GRACEFUL_FALLBACK_SEMANTICS = Object.freeze({
  description:
    'An optional step failed. The app continues in a degraded but usable state.',
  resultState: STARTUP_STATES.READY,
  loggingLevel: 'warn',
});

// ─── Critical Failure Semantics ───────────────────────────────────────────────

/**
 * Critical failure occurs when a required step throws an unhandled exception.
 *
 * When critical failure occurs:
 *   - The error is logged with console.error.
 *   - Status transitions to STARTUP_STATES.FAILED.
 *   - The app shell must still render — it MUST NOT remain in a loading state.
 *   - The app shell should present an error or minimal degraded shell.
 *   - The error object is passed to all status subscribers.
 */
export const CRITICAL_FAILURE_SEMANTICS = Object.freeze({
  description:
    'A required startup step failed. The app enters a defined failed state.',
  resultState: STARTUP_STATES.FAILED,
  loggingLevel: 'error',
  appBehavior:
    'The app shell must render. It must not remain in a loading state indefinitely.',
});

// ─── UI Gating Contract ───────────────────────────────────────────────────────

/**
 * The app shell gate MUST block rendering while status is IDLE or STARTING.
 * The gate MUST pass through when status is READY or FAILED.
 *
 * The gate MUST NOT depend on any auth loading flag from AuthContext.
 * Auth readiness is implicitly satisfied because startup only begins after
 * auth has resolved.
 *
 * States in which the gate should show a loading indicator:
 */
export const GATING_PENDING_STATES = Object.freeze([
  STARTUP_STATES.IDLE,
  STARTUP_STATES.STARTING,
]);

/**
 * States in which the gate should render the app shell:
 */
export const GATING_PASS_STATES = Object.freeze([
  STARTUP_STATES.READY,
  STARTUP_STATES.FAILED,
]);
