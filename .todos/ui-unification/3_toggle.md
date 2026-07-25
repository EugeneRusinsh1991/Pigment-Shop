# Actionable Tasks: Refactoring & Unification to Toggle UI Standard (`3_toggle.md`)

Based on [2_toggle.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/2_toggle.md) and engineering standard [03-toggle-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/03-toggle-module-spec.md).

---

## Phase 1: Core Module Creation (`src/components/Toggle/`)

### Task 1.1: Module Barrel Export & Structure
- **Files:** `src/components/Toggle/index.js`
- **Goal:** Create public API barrel export for `Toggle`.

### Task 1.2: Base Presentational Primitive (`Toggle.js`)
- **Files:** `src/components/Toggle/Toggle.js`
- **Goal:** Build core presentational component accepting `options`, `value`, `onChange`, and `size`. Ensure 44x44px touch targets.

### Task 1.3: Style Factory & Tokens (`ToggleStyles.js`)
- **Files:** `src/components/Toggle/ToggleStyles.js`
- **Goal:** Map theme tokens from `src/theme/tokens.js` and `src/theme/buttonCommon.js`. Zero raw hex or hardcoded pixel offsets.

### Task 1.4: Animations & Theme Hooks (`useToggleAnimation.js`, `useToggleTheme.js`)
- **Files:** `src/components/Toggle/useToggleAnimation.js`, `src/components/Toggle/useToggleTheme.js`
- **Goal:** Implement smooth active slider transition hook and theme resolution (Light/Dark support).

---

## Phase 2: Refactoring Existing Codebase Elements

Phase 2 scale is high, so it is decomposed into three sub-phases grouped by component complexity and subsystem domain:

### Phase 2.1: Storefront Core Controls (Low Complexity)
- **Task 2.1.1: Catalog Price Sorting Refactor**
  - **Target:** `src/components/Catalog/CatalogFilterSidebar.js` / Catalog Header
  - **Actions:** Replace `catalogSortPriceAsc` / `catalogSortPriceDesc` buttons with unified `<Toggle />`.
- **Task 2.1.2: Product Content View Selector Refactor**
  - **Target:** Product Detail View (`ProductReviewSubcomponents.js` / parent view)
  - **Actions:** Replace `toggleCustomerReviews` / `toggleCustomerQuestions` with unified `<Toggle />`.

### Phase 2.2: Admin Panel Filters & Controls (Medium Complexity)
- **Task 2.2.1: Admin Analytics Date Range Selector Refactor**
  - **Target:** `src/components/Admin/Analytics/DateRangeCalendar.js`
  - **Actions:** Replace preset buttons (`adminAnalyticsDateLast7`, `adminAnalyticsDateLast30`, `adminAnalyticsDateCustom`) with unified `<Toggle />`.
- **Task 2.2.2: Admin Order Status Filter Refactor**
  - **Target:** `src/components/Admin/Orders/OrdersManager.js`
  - **Actions:** Replace status filter pills (`orderStatusPending`, etc.) with unified `<Toggle />`.

### Phase 2.3: Admin Root Navigation Shell (High Complexity / Critical Path)
- **Task 2.3.1: Admin Header Navigation Tabs Refactor**
  - **Target:** `src/components/Admin/AdminTabBar.js`
  - **Actions:**
    - Isolate tab switching routing logic from UI presentation.
    - Replace custom navigation tab bar with unified `<Toggle />`.
    - Verify module tab switching across all admin views.

---

## Phase 3: QA & Compliance Verification


### Task 3.1: Architectural Verification
- Verify compliance with all items in [03-toggle-module-spec.md Compliance Checklist](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/03-toggle-module-spec.md#4-compliance-checklist).

### Task 3.2: Visual & Interaction Audit
- Confirm active indicator animations, touch target hitSlops, and light/dark theme contrast across all 5 integrated components.
