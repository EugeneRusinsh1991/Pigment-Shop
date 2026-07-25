# Button Height and Radius Consistency Audit & Tasks

## 📌 Executive Summary
Across the application, buttons present inconsistent **heights** and **border radii**. While standard design system tokens exist in `src/components/Button/ButtonStyles.js` and `src/theme/tokens.js`, multiple components and screens introduce ad-hoc inline styles, custom `height` / `minHeight` values, and arbitrary `borderRadius` overrides (e.g. 6px, 8px, 12px, 16px, 20px, 24px).

---

## 🔍 Inconsistency Inventory & Affected Components

### 1. Core Button Primitives (`src/components/Button/`)
- **`ButtonStyles.js`**:
  - `sm`: height: 32px | borderRadius: `radii.xs` (4px)
  - `md`: height: 40px | borderRadius: `radii.sm` (8px)
  - `lg`: height: 48px | borderRadius: `radii.xl` (20px)
- **`IconButton.js`**:
  - `sm`: 32x32px | borderRadius: 16px (full pill)
  - `md`: 40x40px | borderRadius: 20px (full pill)
  - `lg`: 48x48px | borderRadius: 24px (full pill)
- **`ChipButton.js`**:
  - `sm`: height: 28px | borderRadius: 14px
  - `md`: height: 36px | borderRadius: 18px
  - `lg`: height: 44px | borderRadius: 22px

### 2. Admin Interface Components (`src/components/Admin/`)
- **`AdminTable.js`**:
  - Pagination / Action buttons override size with height 36px/32px and custom radii.
- **`AdminFormModal.js`**:
  - Form submit/cancel buttons use custom container height (44px) and radius (8px/12px).
- **`AdminHeader.js`**:
  - Header actions use minHeight 44px or 38px with inconsistent padding.

### 3. Storefront Pages & Features (`src/features/` & `app/`)
- **Product Card / Details (`src/features/catalog/`, `src/features/product/`)**:
  - "Add to Cart" and variant selector buttons vary between 40px, 44px, and 48px height.
  - Border radii range from 8px to 16px on card actions.
- **Auth Screens (`src/features/auth/LoginPageStyles.js`)**:
  - Primary auth action buttons hardcode `height: 48px` and `borderRadius: 12px` or `8px`.
- **Navigation & Dropdowns (`src/features/shell/AppHeader/`)**:
  - `UserDropdown.js` & `HeaderDropdown.js` force `minHeight: 44px` on menu items.
  - Header nav links use hardcoded heights of 36px with 12px/8px radii.
- **Profile & Account (`src/features/profile/ProfilePageStyles.js`)**:
  - Edit/Save buttons use `height: 40px` with `borderRadius: 8px`.

---

## 🎯 Target Standardized Design Tokens

To achieve visual consistency across all screens, all buttons must strictly consume standardized size definitions:

| Size | Height | Border Radius (Standard) | Border Radius (Pill / Round) | Standard Padding |
| :--- | :--- | :--- | :--- | :--- |
| **`sm`** | **32px** | **6px** (`radii.xs` / `radii.sm`) | **16px** | `8px 12px` |
| **`md`** | **40px** | **8px** (`radii.sm`) | **20px** | `10px 16px` |
| **`lg`** | **48px** | **12px** (`radii.md`) | **24px** | `12px 24px` |

---

## 📋 Action Items / Tasks

- [ ] **Task 1: Standardize Core Button Styles (`src/components/Button/ButtonStyles.js`)**
  - Update `ButtonStyles.js` size variants (`sm`, `md`, `lg`) to use consistent heights (32px, 40px, 48px) and matching radii (6px, 8px, 12px).
  - Ensure `IconButton` and `ChipButton` share uniform size scales.

- [ ] **Task 2: Clean Up Hardcoded Overrides in Shell & Navigation**
  - Refactor `UserDropdown.js`, `HeaderDropdown.js`, and `AppHeaderNavLinks.js` to remove inline `minHeight: 44` / `borderRadius` overrides in favor of standardized `Button` component sizes.

- [ ] **Task 3: Refactor Product & Catalog Action Buttons**
  - Standardize "Add to Cart", "Buy Now", and product card buttons across `src/features/catalog/` and `src/features/product/` to standard `md` (40px) or `lg` (48px) variants.

- [ ] **Task 4: Standardize Admin UI Action & Modal Buttons**
  - Refactor buttons in `src/components/Admin/` (`AdminTable.js`, `AdminFormModal.js`, `AdminHeader.js`) to use unified sizes and eliminate custom height/radius styles.

- [ ] **Task 5: Standardize Auth & Profile Screen Buttons**
  - Refactor `LoginPageStyles.js` and `ProfilePageStyles.js` to replace hardcoded button dimensions with standardized `Button` variants.
