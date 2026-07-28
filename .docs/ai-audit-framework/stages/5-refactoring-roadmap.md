# Stage 5 — Refactoring Roadmap

## Objective
Translate the architecture audit findings into a practical refactoring roadmap for the PigmentShop project.

## Top Priority

### 1. Introduce a higher-level domain service layer
- Create a service abstraction for user-facing features such as favorites, cart, and auth interactions.
- Feature hooks (`useFavorites`, `useCart`, etc.) should depend on this service layer instead of importing repositories directly.
- This will reduce direct repository coupling and make the app more resilient to backend changes.

### 2. Strengthen the provider shell boundary
- Keep `src/context/AppProviders.js` focused on application-level composition.
- Consider moving feature provider registration into feature-specific composition modules where possible.
- Avoid making `AppProviders.js` the central wiring point for growing business logic.

### 3. Preserve the startup contract while making it extensible
- Keep the explicit lifecycle states in `src/bootstrap/startupContract.js`.
- Add structured metadata or logging if additional startup steps are introduced.
- Ensure new startup services are registered through the orchestrator rather than being started directly in UI components.

## Secondary Improvements

### 4. Avoid direct Firestore primitives in feature logic
- Route persistence through repository/service wrappers.
- Keep Firestore-specific imports limited to `src/services/firebase/` and repository adapters.
- This reduces infrastructure leakage into UI and feature-level code.

### 5. Improve feature hook separation
- Ensure hooks like `useFavorites` and `useCart` own only UI-related state logic.
- Keep persistence side effects in service or repository layers and make hook updates reactive to domain events if possible.

## Suggested Tasks

- `task-01-refactor-favorites-service.md`: Create a favorites service and refactor `useFavorites` to use it.
- `task-02-isolate-app-providers.md`: Refactor `AppProviders.js` so feature provider registration is less centralized.
- `task-03-audit-startup-extensions.md`: Add lifecycle metadata and validate startup step observability.
- `task-04-enforce-storage-boundaries.md`: Replace direct Firestore use in feature hooks with repository/service wrappers.

## Manual Verification Guide

1. Run the app and verify global startup behavior after refactoring the service layer.
2. Confirm favorites and cart functionality still works with user auth and session persistence.
3. Ensure the app shell still renders correctly after startup state reaches `READY` or `FAILED`.
4. Validate that `AppProviders.js` no longer directly imports new feature-specific provider logic if refactored.
