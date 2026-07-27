# Task 2: Move Feature Contexts to Feature Modules

🟠 G 3.6 F (H) — 4d | 3f | +9r

## Overview
Move feature-specific contexts from `src/context/` to their respective feature modules in `src/features/<Feature>/`.

## Files to Move
- `CartContext.js` → `src/features/cart/`
- `FavoritesContext.js` → `src/features/favorites/`
- `CatalogContext.js` → `src/features/catalog/`

## Subtasks

- [ ] **2.1.** Move CartContext.js
  🟢 G 3.6 F (L) — 1d | 1f | +3r
  **From:** `src/context/CartContext.js`
  **To:** `src/features/cart/`
  **View changes:** Check `src/context/CartContext.js` (removed) and `src/features/cart/CartContext.js` (added)
  **UI impact:** No visual changes - file reorganization only

- [ ] **2.2.** Move FavoritesContext.js
  🟢 G 3.6 F (L) — 1d | 1f | +3r
  **From:** `src/context/FavoritesContext.js`
  **To:** `src/features/favorites/`
  **View changes:** Check `src/context/FavoritesContext.js` (removed) and `src/features/favorites/FavoritesContext.js` (added)
  **UI impact:** No visual changes - file reorganization only

- [ ] **2.3.** Move CatalogContext.js
  🟢 G 3.6 F (L) — 1d | 1f | +3r
  **From:** `src/context/CatalogContext.js`
  **To:** `src/features/catalog/`
  **View changes:** Check `src/context/CatalogContext.js` (removed) and `src/features/catalog/CatalogContext.js` (added)
  **UI impact:** No visual changes - file reorganization only

## Notes
- Update all import statements that reference these contexts
- Update Context Provider usage in app entry points
- Run tests to ensure no breaking changes
