# Task Plan: Unification of Toggle Elements to Centralized Toggle Module (`2_toggle.md`)

## Overview
This document outlines the detailed plan to migrate all existing Toggle elements identified across the codebase to the unified **`Toggle`** architectural primitive specified in [03-toggle-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/03-toggle-module-spec.md).

---

## 1. Goal & Architecture Targets

Create a shared, reusable `Toggle` module located at `src/components/Toggle/`:
- `src/components/Toggle/index.js` (Public API export)
- `src/components/Toggle/Toggle.js` (Core Presentational Toggle component)
- `src/components/Toggle/ToggleStyles.js` (Style factory mapping theme tokens)
- `src/components/Toggle/useToggleTheme.js` (Theme resolution hook)
- `src/components/Toggle/useToggleAnimation.js` (Active pill indicator animation hook)

---

## 2. Identified Toggle Elements for Migration

Based on [1.5_toggle.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/1.5_toggle.md) and [1_interactive_switchers_catalog.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/1_interactive_switchers_catalog.md):

### 2.1 Catalog Price Sorting Mode (Catalog Filter / Header)
- **Source Files:** `src/components/Catalog/CatalogFilterSidebar.js` / Catalog Header
- **Current Pattern:** Custom buttons (`catalogSortPriceAsc`, `catalogSortPriceDesc`).
- **Target Pattern:** Single `<Toggle options={[{ label: 'Low to High', value: 'asc' }, { label: 'High to Low', value: 'desc' }]} ... />`.

### 2.2 Admin Analytics Date Range Selector
- **Source Files:** `src/components/Admin/Analytics/DateRangeCalendar.js`
- **Current Pattern:** Individual preset buttons (`adminAnalyticsDateLast7`, `adminAnalyticsDateLast30`, `adminAnalyticsDateCustom`).
- **Target Pattern:** `<Toggle options={[{ label: '7 Days', value: '7d' }, { label: '30 Days', value: '30d' }, { label: 'Custom', value: 'custom' }]} ... />`.

### 2.3 Product Content View Selector
- **Source Files:** Product Detail View / Review Components (`toggleCustomerReviews`, `toggleCustomerQuestions`)
- **Current Pattern:** Segmented buttons (`toggleCustomerReviews`, `toggleCustomerQuestions`).
- **Target Pattern:** `<Toggle options={[{ label: 'Customer Reviews', value: 'reviews' }, { label: 'Customer Questions', value: 'questions' }]} ... />`.

### 2.4 Admin Header Module Navigation Tabs
- **Source Files:** `src/components/Admin/AdminTabBar.js`
- **Current Pattern:** Custom navigation tabs (`adminTabAnalytics`, `adminTabOrders`, `adminTabProducts`, `adminTabCategories`, `adminTabBanners`, `adminTabUsers`).
- **Target Pattern:** `<Toggle options={adminTabOptions} value={activeTab} onChange={handleTabChange} />`.

### 2.5 Admin Order Status Filter
- **Source Files:** `src/components/Admin/Orders/OrdersManager.js`
- **Current Pattern:** Status pills (`orderStatusPending`, `orderStatusProcessing`, `orderStatusCompleted`, `orderStatusCancelled`).
- **Target Pattern:** `<Toggle options={statusFilterOptions} value={selectedStatus} onChange={setSelectedStatus} />`.

---

## 3. Execution Checklist

- [ ] **Step 1: Create Centralized Toggle Module**
  - Implement `Toggle.js`, `ToggleStyles.js`, `useToggleTheme.js`, `useToggleAnimation.js`, and `index.js` in `src/components/Toggle/`.
  - Connect strictly to `src/theme/tokens.js` and `src/theme/buttonCommon.js`.
- [ ] **Step 2: Replace Catalog Price Sorting Mode**
- [ ] **Step 3: Replace Admin Analytics Date Range Selector**
- [ ] **Step 4: Replace Product Content View Selector**
- [ ] **Step 5: Replace Admin Header Module Navigation Tabs**
- [ ] **Step 6: Replace Admin Order Status Filter**
- [ ] **Step 7: Verification**
  - Test all interactive toggle controls in Customer Storefront and Admin Panel.
