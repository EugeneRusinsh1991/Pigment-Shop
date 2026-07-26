# Flag Primitive Unification: All-Chips Roadmap

## Overview
Standardize all interactive and display flags/switches across the application to use the `chip` variant instead of `checkbox` or legacy controls.

---

## Phase 1: Catalog Sidebar & Category Filters Alignment `[Recommended Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **1.1 Catalog Sidebar Checkboxes to Chips**
  - File: [SidebarUIComponents.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/SidebarUIComponents.js)
  - Update `Checkbox` component to render `<Flag variant="chip">`.

- [x] **1.2 Category Filter Tree**
  - File: [CategoryFilterList.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryFilterList.js)
  - Ensure category hierarchy items render interactive chip flags.

---

## Phase 2: Admin Form Controls Alignment `[Recommended Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **2.1 Admin Product Form Flags**
  - File: [ProductFormFields.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductFormFields.js)
  - Refactor `FieldCheckbox` to render `<Flag variant="chip">` for `Is Active` and `Is New` product form fields.

---

## Phase 3: Verification & Visual Harmonization Audit `[Recommended Model: 🟢 Gemini 3.6 Flash (Low)]`
- [x] **3.1 Visual & Interactive Verification**
  - Verify chip rendering across Catalog Sidebar, Admin Forms, Admin Filter Bars, Product Cards, and Order Tables.
