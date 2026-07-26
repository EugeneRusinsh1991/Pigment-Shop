# Phase 3: Motion System Migration & Audit Plan

## Audit Results: Current File Usage

- **`ScrollFadeUp`**:
  - `src/features/home/HomeView.js`
- **`PageTransition`**:
  - `src/components/SharedLayoutWrapper.js`

## Migration Plan Steps

1. Create target module structure under `src/components/Motion/`.
2. Extract `ScrollFadeUp` to `src/components/Motion/ScrollFadeUp/` and `PageTransition` to `src/components/Motion/PageTransition/`.
3. Update imports in `HomeView.js` and `SharedLayoutWrapper.js`.
4. Delete legacy root files `src/components/ScrollFadeUp.js` and `src/components/PageTransition.js`.
