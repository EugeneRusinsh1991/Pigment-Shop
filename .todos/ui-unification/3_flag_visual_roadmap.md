# Flag UI Standardization & Visual Harmonization Roadmap

## Overview
Standardize all flag variants (chips, filter items, product/order status badges) to match the visually unified aesthetic demonstrated on the Admin page.

---

## Phase 1: Core Token & Style Alignment `[Recommended Model: 🔴 Gemini 3.1 Pro (High)]`
- [x] **1.1 Flag Primitive Styling Adjustments**
  - File: [FlagStyles.js](file:///d:/Magazine/_PigmentShop/src/components/Flag/FlagStyles.js)
  - Align active/inactive background, border radii, padding, and text colors to Admin chip design tokens.

- [x] **1.2 Color Schemes Harmonization**
  - File: [FlagStyles.js](file:///d:/Magazine/_PigmentShop/src/components/Flag/FlagStyles.js)
  - Update `colorSchemes` (sale, new, featured, active, inactive, pending, cancelled) to match cohesive design hierarchy.

---

## Phase 2: Component Integration & Refactoring `[Recommended Model: 🟠 Gemini 3.6 Flash (High)]`
- [x] **2.1 Product Catalog Badges**
  - File: [ProductBadges.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductBadges.js)
  - Ensure product badges rely on the updated `colorScheme` tokens from `Flag`.

- [x] **2.2 Catalog & Admin Filter Bars**
  - Files:
    - [ProductsFilterBar.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductsFilterBar.js)
    - [SidebarUIComponents.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/SidebarUIComponents.js)
  - Replace legacy custom checkboxes/labels with `Flag` components using unified `chip` or `checkbox` variants.

- [x] **2.3 Admin Product & Order Tables**
  - Files:
    - [ProductRowComponents.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRowComponents.js)
    - [OrderRow.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Orders/OrderRow.js)
    - [OrderStatusSelector.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Orders/OrderStatusSelector.js)
  - Standardize status badges using unified `Flag` with matching `colorScheme`.

---

## Phase 3: Visual Verification `[Recommended Model: 🟢 Gemini 3.6 Flash (Low)]`
- [x] **3.1 Cross-Page Consistency Check**
  - Verify layout across Catalog, Product Detail, and Admin pages for visual alignment.
