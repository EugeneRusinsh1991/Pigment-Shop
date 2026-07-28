# Task 03 — Audit Startup Extensions Plan

## Goal
Improve the startup contract to support richer lifecycle observability and extension.

## Step-by-Step Plan

1. Review the current bootstrap architecture.
   - Open `src/bootstrap/startupContract.js`.
   - Open `src/bootstrap/appBootstrap.js`.
   - Open `src/bootstrap/bootstrapOrchestrator.js`.
   - Open `src/bootstrap/BootstrapGate.js`.

2. Understand the current startup step model.
   - Identify how steps are defined and registered in `startupContract.js`.
   - Identify how the orchestrator executes and monitors steps.
   - Identify how UI components consume startup progress and state.

3. Define structured startup metadata.
   - Add `description` to each startup step for human readability.
   - Add `order` to define explicit or inferred execution order.
   - Add `retryable` to mark whether a failed step can retry automatically or manually.
   - Consider adding `id` or `type` if the contract currently lacks a stable identity for each step.

4. Extend the startup contract interface.
   - Update step registration APIs so metadata is accepted alongside the step callback.
   - Ensure new metadata is normalized and validated at registration time.
   - Confirm the contract still supports both existing static steps and future dynamic extension points.

5. Add observability or event hooks.
   - Add startup progress logging within the orchestrator or startup contract.
   - Emit structured events when steps start, succeed, fail, or retry.
   - Consider exposing callbacks or observables for UI components to subscribe to progress changes.

6. Keep startup orchestration decoupled from UI.
   - Ensure steps are still registered through the orchestrator, not directly by UI components.
   - Confirm `BootstrapGate.js` only observes startup state and does not invoke startup step logic.
   - If needed, refactor any direct step invocations into the orchestrator path.

7. Verify startup transition behavior.
   - Confirm startup reaches `READY` or `FAILED` correctly with the new metadata.
   - Confirm startup state transitions remain deterministic and observable.
   - Confirm logging/events do not alter startup timing or error handling semantics.

8. Prepare verification checklist.
   - New metadata fields are present in registered startup steps.
   - The app shell still renders after startup reaches `READY` or `FAILED`.
   - Startup contract supports extension without direct UI step registration.
   - Logs or progress events include structured step metadata.

9. Optional improvement.
   - Add a helper for formatting startup progress summaries.
   - Add a small unit test for the contract metadata normalization and event emission.
