# Bootstrap System & Application Lifecycle

## Purpose
The Bootstrap System manages the application startup sequence, coordinating authentication resolution with required initialization steps. It ensures the app only renders when critical dependencies are ready, while gracefully handling optional step failures.

## Architecture

### 1. State Machine (`startupContract.js`)
Defines the startup lifecycle states and valid transitions:
- **idle**: Startup has not been initiated
- **starting**: Initialization is in progress
- **ready**: All required steps completed; optional steps may have failed gracefully
- **failed**: A required step failed critically; app renders in degraded state

### 2. Central Orchestrator (`appBootstrap.js`)
The ONLY entry point for application initialization. Responsibilities:
- Manages startup state machine transitions
- Coordinates execution of startup steps in declared order
- Provides subscription API for status changes
- Ensures idempotency (safe to call multiple times)
- Separates required vs optional step semantics

### 3. Auth Coordination (`authBootstrapCoordinator.js`)
Decouples authentication resolution from bootstrap execution:
- Accepts auth state (loading, user, isAuthenticated)
- Determines if auth has resolved sufficiently to start app
- Returns explicit bootstrap decision (shouldStart, isAuthenticated, user)

### 4. Auth Service (`authService.js`)
Firebase Auth adapter providing:
- Email/password login and registration
- Google sign-in with deduplication
- Auth state subscription
- Service contract wrapping for error handling

## Execution Flow

1. **Auth Resolution**: App subscribes to Firebase auth changes via `authService.subscribeToAuthChanges()`
2. **Bootstrap Decision**: `authBootstrapCoordinator.resolveBootstrapDecision()` determines if auth state is resolved
3. **Startup Trigger**: `startAppBootstrap({ isAuthenticated, user })` called once auth resolves
4. **Step Execution**: `executeStartupSteps()` runs declared startup steps sequentially
5. **State Transition**: System transitions through `idle → starting → ready/failed`
6. **Status Notification**: Subscribers receive status updates via `onBootstrapStatusChange()`

## Important Design Decisions

- **Framework-Agnostic**: Bootstrap logic contains no React imports, making it testable in isolation
- **Graceful Degradation**: Optional step failures don't block app readiness (e.g., non-critical sync)
- **Critical Failure Semantics**: Required step failures transition to `failed` state with appropriate logging
- **Idempotency**: Multiple calls to `startAppBootstrap()` are safe after first invocation
- **Clean Teardown**: `stopAppBootstrap()` and `resetAppBootstrap()` support HMR and test scenarios

## Known Assumptions

- Authentication must resolve before app bootstrap begins
- All required startup steps are declared in `bootstrapOrchestrator.js`
- Optional steps implement their own fallback logic
- Subscribers handle status changes asynchronously

## Current State
- Bootstrap system is fully implemented with state machine, orchestrator, and auth coordination
- Service contract wrapping provides consistent error handling across auth operations
- Ready for additional startup steps to be registered in `bootstrapOrchestrator.js`

## Recommended Next Steps
- Document specific startup steps in `bootstrapOrchestrator.js` if they grow complex
- Consider adding startup step timeout handling for long-running operations
- Add telemetry/metrics for startup performance monitoring
