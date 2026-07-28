# Task 01 — Refactor Favorites Service

## Goal
Introduce a higher-level favorites service and refactor `useFavorites` to depend on it instead of direct repository imports.

## Target Files
- src/features/favorites/useFavorites.js
- src/services/repositories/favoritesRepository.js
- src/services/favoritesService.js (new)
- src/context/AppProviders.js (if provider registration changes are needed)

## Description
- Create `src/services/favoritesService.js` that exposes favorites-related operations:
  - `getFavorites(userId)`
  - `subscribeFavorites(userId, callback)`
  - `toggleFavorite(userId, product)`
- Keep `favoritesRepository.js` as a low-level Firestore adapter.
- Refactor `useFavorites` to call the service instead of repository functions directly.

## Verification
- App still loads and authenticates correctly.
- Favorites toggle works and persists correctly for signed-in users.
- No direct imports of `favoritesRepository` remain in feature hooks.
