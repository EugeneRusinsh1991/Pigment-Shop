# Structure Audit Roadmap

Based on `.todos/reorganization/_structure-audit.md` discussion items.

**Overall:** 🔴 G 3.1 P (H) — 25d | 65f | +67r

## High Priority

- [ ] **1.** Move Domain Hooks to Feature Modules
� G 3.1 P (H) — 6d | 8f | +16r
**Files:** `useCart.js`, `useCartViewForm.js`, `useCatalogViewData.js`, `useLoginForm.js`, `useFavorites.js`, `useOrders.js`, `useProfile.js`, `useCrudWorkflow.js`
**From:** `src/hooks/`
**To:** `src/features/<Feature>/`

- [ ] **2.** Move Feature Contexts to Feature Modules
🟠 G 3.6 F (H) — 4d | 3f | +9r
**Files:** `CartContext.js`, `FavoritesContext.js`, `CatalogContext.js`
**From:** `src/context/`
**To:** `src/features/<Feature>/`

  - [ ] **2.1.** Move CartContext.js
  🟢 G 3.6 F (L) — 1d | 1f | +3r
  **From:** `src/context/CartContext.js`
  **To:** `src/features/cart/`

  - [ ] **2.2.** Move FavoritesContext.js
  🟢 G 3.6 F (L) — 1d | 1f | +3r
  **From:** `src/context/FavoritesContext.js`
  **To:** `src/features/favorites/`

  - [ ] **2.3.** Move CatalogContext.js
  🟢 G 3.6 F (L) — 1d | 1f | +3r
  **From:** `src/context/CatalogContext.js`
  **To:** `src/features/catalog/`

## Medium Priority

- [ ] **3.** Consolidate Domain Layer
� G 3.6 F (M) — 2d | 1f | +3r
**File:** `catalogEntityContract.ts`
**From:** `src/domain/`
**To:** `src/services/` (merge with service contracts)

- [ ] **4.** Move Admin Icons
� G 3.6 F (M) — 2d | 1f | +4r
**File:** `AdminIcons.js`
**From:** `src/components/Icons/`
**To:** `src/features/admin/` (if used exclusively by admin)

- [ ] **5.** Fix Button Colors Anti-Pattern
� G 3.6 F (M) — 1d | 1f | +2r
**File:** `buttonCommon.js`
**Action:** Remove re-export indirection or consolidate into `tokens.js`

## Low Priority

- [ ] **6.** Add Letter Spacing Tokens
� G 3.6 F (M) — 1d | 1f | +1r
**File:** `tokens.js`
**Action:** Add `typography.letterSpacing` scale (tight, normal, wide, widest)

- [ ] **7.** Standardize Border Width Usage
🔴 G 3.1 P (H) — 8d | 50f | +30r
**Scope:** 50+ style files
**Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`

  - [ ] **7.1.** Audit and identify all files with `borderWidth: 1`
  🟡 G 3.6 F (M) — 1d | 50f | +13r
  **Action:** Search across codebase and create inventory of affected files

  - [ ] **7.2.** Update component style files
  🔴 G 3.1 P (H) — 3d | 30f | +8r
  **Scope:** Component style files in `src/components/`
  **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`

  - [ ] **7.3.** Update feature style files
  🟠 G 3.6 F (H) — 2d | 15f | +5r
  **Scope:** Feature style files in `src/features/`
  **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`

  - [ ] **7.4.** Update screen and page style files
  🟡 G 3.6 F (M) — 2d | 5f | +4r
  **Scope:** Screen and page style files
  **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`

- [ ] **8.** Tokenize Badge Font Sizes
� G 3.6 F (M) — 1d | 1f | +2r
**File:** `Badge.js`
**Action:** Map `badgeFontSizes` to `typography.sizes` tokens or move to `badgeTokens` in `tokens.js`
