# Structure Audit Roadmap

Based on `.todos/reorganization/_structure-audit.md` discussion items.

**Overall:** 🔴 G 3.1 P (H) — 8d | 65f | +0ctx

## High Priority

- [ ] Move Domain Hooks to Feature Modules
🟢 G 3.6 F (H) — 6d | 8f | +0ctx
**Files:** `useCart.js`, `useCartViewForm.js`, `useCatalogViewData.js`, `useLoginForm.js`, `useFavorites.js`, `useOrders.js`, `useProfile.js`, `useCrudWorkflow.js`
**From:** `src/hooks/`
**To:** `src/features/<Feature>/`

- [ ] Move Feature Contexts to Feature Modules
🟠 G 3.6 F (H) — 4d | 3f | +0ctx
**Files:** `CartContext.js`, `FavoritesContext.js`, `CatalogContext.js`
**From:** `src/context/`
**To:** `src/features/<Feature>/`

## Medium Priority

- [ ] Consolidate Domain Layer
🟢 G 3.6 F (L) — 2d | 1f | +0ctx
**File:** `catalogEntityContract.ts`
**From:** `src/domain/`
**To:** `src/services/` (merge with service contracts)

- [ ] Move Admin Icons
🟢 G 3.6 F (L) — 2d | 1f | +0ctx
**File:** `AdminIcons.js`
**From:** `src/components/Icons/`
**To:** `src/features/admin/` (if used exclusively by admin)

- [ ] Fix Button Colors Anti-Pattern
🟢 G 3.6 F (L) — 1d | 1f | +0ctx
**File:** `buttonCommon.js`
**Action:** Remove re-export indirection or consolidate into `tokens.js`

## Low Priority

- [ ] Add Letter Spacing Tokens
🟢 G 3.6 F (L) — 1d | 1f | +0ctx
**File:** `tokens.js`
**Action:** Add `typography.letterSpacing` scale (tight, normal, wide, widest)

- [ ] Standardize Border Width Usage
🔴 G 3.1 P (H) — 1d | 50f | +0ctx
**Scope:** 50+ style files
**Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`

- [ ] Tokenize Badge Font Sizes
🟢 G 3.6 F (L) — 1d | 1f | +0ctx
**File:** `Badge.js`
**Action:** Map `badgeFontSizes` to `typography.sizes` tokens or move to `badgeTokens` in `tokens.js`
