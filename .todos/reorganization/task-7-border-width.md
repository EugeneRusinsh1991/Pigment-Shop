# Task 7: Standardize Border Width Usage

🔴 G 3.1 P (H) — 8d | 50f | +30r

## Overview
Replace hardcoded `borderWidth: 1` with `layout.borderWidth.thin` token across 50+ style files.

## Subtasks

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

## Notes
- Ensure `layout.borderWidth.thin` token exists in tokens.js before starting
- Use search and replace carefully to avoid breaking other borderWidth values
- Run visual regression tests to ensure no visual changes
- Consider using automated refactoring tools for consistency
