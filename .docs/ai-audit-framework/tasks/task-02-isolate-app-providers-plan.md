# Task 02 — Isolate App Providers Plan

## Goal
Reduce coupling in `src/context/AppProviders.js` by moving feature provider composition closer to feature boundaries.

## Step-by-Step Plan

1. Inspect current provider composition.
   - Open `src/context/AppProviders.js`.
   - Open `src/features/cart/CartContext.js`.
   - Open `src/features/favorites/FavoritesContext.js`.
   - Open `src/features/catalog/CatalogContext.js`.
   - Open `src/features/auth/AuthProvider.js` or the equivalent authentication provider module.

2. Identify the provider responsibilities.
   - Determine which providers in `AppProviders.js` are truly infrastructure-level (theme, language, auth, toast, bootstrap).
   - Identify feature-specific providers that can be isolated to feature modules.

3. Define feature-local provider wrappers.
   - For each feature provider (`CartContext`, `FavoritesContext`, `CatalogContext`, `AuthProvider`), verify whether a feature-specific wrapper exists or should be introduced.
   - If needed, add a `FeatureProviders` or `ProviderWrapper` component inside each feature directory to compose only that feature’s provider(s).

4. Refactor `AppProviders.js` composition.
   - Remove feature provider imports from `AppProviders.js`.
   - Keep only infrastructure providers in `AppProviders.js`: theme, language, toast, auth, bootstrap, and any global app services.
   - Ensure `AppProviders.js` still exports a single provider tree used by the app.

5. Move feature providers closer to feature boundaries.
   - Ensure the app entrypoint or root-level layout wraps feature routes/screens with the new feature provider wrappers where required.
   - If feature pages already import their own providers, validate that no new global provider shell is needed.

6. Confirm dependencies and ordering.
   - Verify that feature providers still receive any necessary upstream context from infrastructure providers.
   - Ensure provider order remains correct where feature providers depend on auth, theme, or bootstrap.

7. Validate the feature provider isolation.
   - Confirm `CartContext` is still available to cart UI.
   - Confirm `FavoritesContext` is still available to favorites UI.
   - Confirm `CatalogContext` is still available to catalog UI.
   - Confirm auth context/provider behavior remains intact.

8. Prepare verification checklist.
   - App initializes without provider tree errors.
   - Cart, favorites, and catalog features render correctly with their respective contexts.
   - `AppProviders.js` contains only infrastructure-level providers and no feature provider imports.

9. Optional cleanup.
   - Remove any stale feature provider composition from `AppProviders.js` once feature-local wrappers are verified.
   - Document the new composition pattern in `src/context/README.md` or `architecture-standards/features` if applicable.
