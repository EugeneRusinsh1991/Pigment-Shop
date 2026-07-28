# Task 02 — Isolate App Providers

## Goal
Reduce the central coupling in `src/context/AppProviders.js` by moving feature provider composition closer to feature boundaries.

## Target Files
- src/context/AppProviders.js
- src/features/cart/CartContext.js
- src/features/favorites/FavoritesContext.js
- src/features/catalog/CatalogContext.js
- src/features/auth/AuthProvider.js (or equivalent)

## Description
- Keep `AppProviders.js` responsible for app-level providers only (theme, language, toast, auth, bootstrap).
- Move feature provider registration to feature-specific composition wrappers if needed.
- Avoid importing new feature providers directly into the shared provider shell.

## Verification
- The app initializes without provider tree errors.
- Cart, favorites, and catalog contexts are still available in the UI.
- `AppProviders.js` contains only infrastructure-level provider composition.
