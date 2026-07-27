# Task 1: Move Domain Hooks to Feature Modules

🔴 G 3.1 P (H) — 6d | 8f | +16r
**Calculation:** f=8 (hooks) + r=16 (8 hooks + 8 feature dirs) = S=12 → G 3.1 P (H)

## Overview
Move domain-specific hooks from `src/hooks/` to their respective feature modules in `src/features/<Feature>/`.

## Files to Move
- `useCart.js` → `src/features/cart/`
- `useCartViewForm.js` → `src/features/cart/`
- `useCatalogViewData.js` → `src/features/catalog/`
- `useLoginForm.js` → `src/features/auth/`
- `useFavorites.js` → `src/features/favorites/`
- `useOrders.js` → `src/features/orders/`
- `useProfile.js` → `src/features/profile/`
- `useCrudWorkflow.js` → `src/features/admin/` (or shared location)

## Subtasks

- [x] **1.1.** Move cart hooks
  🟡 G 3.6 F (M) — 1d | 2f | +4r
  **Files:** `useCart.js`, `useCartViewForm.js`
  **From:** `src/hooks/`
  **To:** `src/features/cart/`
  **View changes:** Check `src/hooks/` (files removed) and `src/features/cart/` (files added)
  **UI impact:** No visual changes - file reorganization only

- [x] **1.2.** Move catalog hooks
  🟡 G 3.6 F (M) — 1d | 1f | +3r
  **File:** `useCatalogViewData.js`
  **From:** `src/hooks/`
  **To:** `src/features/catalog/`
  **View changes:** Check `src/hooks/useCatalogViewData.js` (removed) and `src/features/catalog/useCatalogViewData.js` (added)
  **UI impact:** No visual changes - file reorganization only

- [x] **1.3.** Move auth hooks
  🟡 G 3.6 F (M) — 1d | 1f | +3r
  **File:** `useLoginForm.js`
  **From:** `src/hooks/`
  **To:** `src/features/auth/`
  **View changes:** Check `src/hooks/useLoginForm.js` (removed) and `src/features/auth/useLoginForm.js` (added)
  **UI impact:** No visual changes - file reorganization only

- [ ] **1.4.** Move favorites hooks
  🟡 G 3.6 F (M) — 1d | 1f | +3r
  **File:** `useFavorites.js`
  **From:** `src/hooks/`
  **To:** `src/features/favorites/`
  **View changes:** Check `src/hooks/useFavorites.js` (removed) and `src/features/favorites/useFavorites.js` (added)
  **UI impact:** No visual changes - file reorganization only

- [ ] **1.5.** Move orders hooks
  🟡 G 3.6 F (M) — 1d | 1f | +3r
  **File:** `useOrders.js`
  **From:** `src/hooks/`
  **To:** `src/features/orders/`
  **View changes:** Check `src/hooks/useOrders.js` (removed) and `src/features/orders/useOrders.js` (added)
  **UI impact:** No visual changes - file reorganization only

- [ ] **1.6.** Move profile hooks
  🟡 G 3.6 F (M) — 1d | 1f | +3r
  **File:** `useProfile.js`
  **From:** `src/hooks/`
  **To:** `src/features/profile/`
  **View changes:** Check `src/hooks/useProfile.js` (removed) and `src/features/profile/useProfile.js` (added)
  **UI impact:** No visual changes - file reorganization only

- [ ] **1.7.** Move crud workflow hook
  🟡 G 3.6 F (M) — 1d | 1f | +3r
  **File:** `useCrudWorkflow.js`
  **From:** `src/hooks/`
  **To:** `src/features/admin/` (or keep in shared location)
  **View changes:** Check `src/hooks/useCrudWorkflow.js` (removed) and destination (file added)
  **UI impact:** No visual changes - file reorganization only

## Notes
- Update all import statements that reference these hooks
- Run tests to ensure no breaking changes
- Consider if `useCrudWorkflow.js` should be shared across multiple features
