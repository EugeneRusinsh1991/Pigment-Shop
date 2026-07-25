# Phase 2: Refactoring Existing Codebase Elements

---

## Phase 2.1: Storefront Core Controls (Low Complexity)

### Task 2.1.1: Catalog Price Sorting Refactor
- **Recommended Model:** 🟡 **Gemini 3.6 Flash (Medium)**
- **Complexity:** Low (2/5)
- **Target:** `src/components/Catalog/CatalogFilterSidebar.js` / Catalog Header
- **Actions:** Replace `catalogSortPriceAsc` / `catalogSortPriceDesc` buttons with unified `<Toggle />`.

### Task 2.1.2: Product Content View Selector Refactor
- **Recommended Model:** 🟡 **Gemini 3.6 Flash (Medium)**
- **Complexity:** Low (2/5)
- **Target:** Product Detail View (`ProductReviewSubcomponents.js` / parent view)
- **Actions:** Replace `toggleCustomerReviews` / `toggleCustomerQuestions` with unified `<Toggle />`.

---

## Phase 2.2: Admin Panel Filters & Controls (Medium Complexity)

### Task 2.2.1: Admin Analytics Date Range Selector Refactor
- **Recommended Model:** 🟡 **Gemini 3.6 Flash (Medium)**
- **Complexity:** Medium (3/5)
- **Target:** `src/components/Admin/Analytics/DateRangeCalendar.js`
- **Actions:** Replace preset buttons (`adminAnalyticsDateLast7`, `adminAnalyticsDateLast30`, `adminAnalyticsDateCustom`) with unified `<Toggle />`.

### Task 2.2.2: Admin Order Status Filter Refactor
- **Recommended Model:** 🟡 **Gemini 3.6 Flash (Medium)**
- **Complexity:** Medium (3/5)
- **Target:** `src/components/Admin/Orders/OrdersManager.js`
- **Actions:** Replace status filter pills (`orderStatusPending`, etc.) with unified `<Toggle />`.

---

## Phase 2.3: Admin Root Navigation Shell (High Complexity / Critical Path)

### Task 2.3.1: Admin Header Navigation Tabs Refactor
- **Recommended Model:** 🟠 **Gemini 3.6 Flash (High)**
- **Complexity:** High (4/5)
- **Target:** `src/components/Admin/AdminTabBar.js`
- **Actions:**
  - Isolate tab switching routing logic from UI presentation.
  - Replace custom navigation tab bar with unified `<Toggle />`.
  - Verify module tab switching across all admin views.
