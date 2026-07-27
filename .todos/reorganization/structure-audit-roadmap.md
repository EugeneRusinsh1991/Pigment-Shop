# Structure Audit Roadmap

Based on `.todos/reorganization/_structure-audit.md` discussion items.

**Overall:** 🔴 G 3.1 P (H) — 25d | 65f | +67r

## High Priority

- [ ] **1.** Move Domain Hooks to Feature Modules
🔴 G 3.1 P (H) — 6d | 8f | +16r
**Calculation:** f=8 (hooks) + r=16 (8 hooks + 8 feature dirs) = S=12 → G 3.1 P (H)
**Files:** `useCart.js`, `useCartViewForm.js`, `useCatalogViewData.js`, `useLoginForm.js`, `useFavorites.js`, `useOrders.js`, `useProfile.js`, `useCrudWorkflow.js`
**From:** `src/hooks/`
**To:** `src/features/<Feature>/`
**View changes:** Check `src/hooks/` (files removed) and `src/features/<Feature>/` (files added)
**UI impact:** No visual changes - file reorganization only

  - [ ] **1.1.** Move cart hooks
  🟡 G 3.6 F (M) — 1d | 2f | +4r
  **Files:** `useCart.js`, `useCartViewForm.js`
  **From:** `src/hooks/`
  **To:** `src/features/cart/`
  **View changes:** Check `src/hooks/` (files removed) and `src/features/cart/` (files added)
  **UI impact:** No visual changes - file reorganization only

  - [ ] **1.2.** Move catalog hooks
  🟡 G 3.6 F (M) — 1d | 1f | +3r
  **File:** `useCatalogViewData.js`
  **From:** `src/hooks/`
  **To:** `src/features/catalog/`
  **View changes:** Check `src/hooks/useCatalogViewData.js` (removed) and `src/features/catalog/useCatalogViewData.js` (added)
  **UI impact:** No visual changes - file reorganization only

  - [ ] **1.3.** Move auth hooks
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

- [ ] **2.** Move Feature Contexts to Feature Modules
🟠 G 3.6 F (H) — 4d | 3f | +9r
**Files:** `CartContext.js`, `FavoritesContext.js`, `CatalogContext.js`
**From:** `src/context/`
**To:** `src/features/<Feature>/`
**View changes:** Check `src/context/` (files removed) and `src/features/<Feature>/` (files added)
**UI impact:** No visual changes - file reorganization only

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

## Medium Priority

- [ ] **3.** Consolidate Domain Layer
🟡 G 3.6 F (M) — 2d | 1f | +3r
**File:** `catalogEntityContract.ts`
**From:** `src/domain/`
**To:** `src/services/` (merge with service contracts)
**View changes:** Check `src/domain/catalogEntityContract.ts` (removed) and `src/services/` (merged content)
**UI impact:** No visual changes - file reorganization only

- [ ] **4.** Move Admin Icons
🟡 G 3.6 F (M) — 2d | 1f | +4r
**File:** `AdminIcons.js`
**From:** `src/components/Icons/`
**To:** `src/features/admin/` (if used exclusively by admin)
**View changes:** Check `src/components/Icons/AdminIcons.js` (removed) and `src/features/admin/AdminIcons.js` (added)
**UI impact:** No visual changes - file reorganization only

- [ ] **5.** Fix Button Colors Anti-Pattern
🟡 G 3.6 F (M) — 1d | 1f | +2r
**File:** `buttonCommon.js`
**Action:** Remove re-export indirection or consolidate into `tokens.js`
**View changes:** Check `buttonCommon.js` (refactored) and `tokens.js` (if consolidated)
**UI impact:** Check buttons throughout the app (no visual changes expected, only code refactoring)

## Low Priority

- [ ] **6.** Add Letter Spacing Tokens
🟡 G 3.6 F (M) — 1d | 1f | +1r
**File:** `tokens.js`
**Action:** Add `typography.letterSpacing` scale (tight, normal, wide, widest)
**View changes:** Check `tokens.js` (new letterSpacing scale added)
**UI impact:** No visual changes - new tokens added for future use

- [ ] **7.** Standardize Border Width Usage
🔴 G 3.1 P (H) — 8d | 50f | +30r
**Scope:** 50+ style files
**Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
**View changes:** Check all modified style files (borderWidth: 1 replaced with layout.borderWidth.thin)
**UI impact:** Check components with borders (cards, buttons, forms, inputs) - no visual changes expected, only code standardization

  - [ ] **7.1.** Audit and identify all files with `borderWidth: 1`
  🟡 G 3.6 F (M) — 1d | 50f | +13r
  **Action:** Search across codebase and create inventory of affected files
  **View changes:** Check audit report (list of affected files)
  **UI impact:** No visual changes - audit only

  - [ ] **7.2.** Update component style files
  🔴 G 3.1 P (H) — 3d | 30f | +8r
  **Scope:** Component style files in `src/components/`
  **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
  **View changes:** Check `src/components/` style files (borderWidth updated)
  **UI impact:** No visual changes expected - code standardization only

    - [ ] **7.2.1.** Update Button styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `Button/IconButton.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/components/Button/IconButton.js` (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.2.2.** Update Card styles
    🟡 G 3.6 F (M) — 0.5d | 3f | +4r
    **Files:** `Card/CardStyles.js`, `Card/NavigationCard.js`, `Card/StaticCard.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check Card style files (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.2.3.** Update Feedback styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `Feedback/Toast/ToastStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/components/Feedback/Toast/ToastStyles.js` (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.2.4.** Update Flag styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `Flag/FlagStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/components/Flag/FlagStyles.js` (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.2.5.** Update TextField styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `TextField/TextFieldStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/components/TextField/TextFieldStyles.js` (borderWidth updated)
    **UI impact:** No visual changes expected

  - [ ] **7.3.** Update feature style files
  🟠 G 3.6 F (H) — 2d | 15f | +5r
  **Scope:** Feature style files in `src/features/`
  **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
  **View changes:** Check `src/features/` style files (borderWidth updated)
  **UI impact:** No visual changes expected - code standardization only

    - [ ] **7.3.1.** Update shell styles
    🟡 G 3.6 F (M) — 0.5d | 2f | +3r
    **Files:** `shell/AppHeader/AppHeaderStyles.js`, `shell/NavMenu/LanguageSelector.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check shell style files (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.3.2.** Update cart styles
    🟡 G 3.6 F (M) — 0.5d | 2f | +3r
    **Files:** `cart/CartItem.js`, `cart/CartViewStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check cart style files (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.3.3.** Update catalog styles
    🟡 G 3.6 F (M) — 0.5d | 2f | +3r
    **Files:** `catalog/CatalogFilterSidebarStyles.js`, `catalog/CatalogPagination.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check catalog style files (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.3.4.** Update product styles
    🟡 G 3.6 F (M) — 0.5d | 2f | +3r
    **Files:** `product/ProductPageStyles.js`, `product/ProductReviewsStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check product style files (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.3.5.** Update auth styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `auth/LoginPageStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/features/auth/LoginPageStyles.js` (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.3.6.** Update profile styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `profile/ProfilePageStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/features/profile/ProfilePageStyles.js` (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.3.7.** Update home styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `home/components/FeaturedSections.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/features/home/components/FeaturedSections.js` (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.3.8.** Update contact styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `contact/ContactPageStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/features/contact/ContactPageStyles.js` (borderWidth updated)
    **UI impact:** No visual changes expected

    - [ ] **7.3.9.** Update admin styles
    🟡 G 3.6 F (M) — 0.5d | 1f | +2r
    **File:** `admin/Categories/CategoriesStyles.js`
    **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
    **View changes:** Check `src/features/admin/Categories/CategoriesStyles.js` (borderWidth updated)
    **UI impact:** No visual changes expected

  - [ ] **7.4.** Update screen and page style files
  🟡 G 3.6 F (M) — 2d | 5f | +4r
  **Scope:** Screen and page style files
  **Action:** Replace `borderWidth: 1` with `layout.borderWidth.thin`
  **View changes:** Check screen and page style files (borderWidth updated)
  **UI impact:** No visual changes expected - code standardization only

- [ ] **8.** Tokenize Badge Font Sizes
🟡 G 3.6 F (M) — 1d | 1f | +2r
**File:** `Badge.js`
**Action:** Map `badgeFontSizes` to `typography.sizes` tokens or move to `badgeTokens` in `tokens.js`
**View changes:** Check `Badge.js` (refactored) and `tokens.js` (if badgeTokens added)
**UI impact:** Check badges throughout the app - no visual changes expected, only code refactoring
