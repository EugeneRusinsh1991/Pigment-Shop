# Catalog Cards Fix Tasks (100% Resolution Plan)

## 1. Overview & Goal

This document details the action plan to completely resolve all issues where catalog cards are not showing properly, stretch horizontally across sparse grids, or collapse to 0px height in React Native Web.

---

## 2. Targeted Action Tasks

### Task 1: Fix 0px Web Flex Height Collapse in `ProductGrid` & `CatalogView` [x] Completed
- **Recommended Model**: 🟡 **3.6 Flash (Medium)** *(Complexity: 2/5, 2 files)*
- **Target Files**:
  - [ProductGrid.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/ProductGrid.js#L19-L33)
  - [CatalogView.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js#L35-L50)
- **Problem**: `<View style={{ flex: 1, maxWidth }}>` inside `FlatList.renderItem` causes web flex height collapse to 0px when parent container height is unconstrained.
- **Action**:
  1. Remove `flex: 1` from the item wrapper `View`.
  2. Apply explicit percentage width: `width: `${(100 / cols).toFixed(4)}%`` with `alignSelf: 'stretch'`.
  3. Ensure parent `FlatList` container has `minHeight: '100%'` or explicit container flex bounds.

### Task 2: Correct Subcategory Card Over-Stretching & Banner Mode [x] Completed
- **Recommended Model**: 🟡 **3.6 Flash (Medium)** *(Complexity: 2/5, 2 files)*
- **Target Files**:
  - [CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js#L88-L98)
  - [CatalogView.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js#L35-L50)
- **Problem**: Subcategory items (`depth > 0`) automatically forced `bannerMode` (`width: 100%`), stretching cards across full screen width when item count < grid columns.
- **Action**:
  1. Restrict `isBanner` mode strictly to top-level single subcategory highlights (`item.isBanner` or `item.isSingleSubcategory`).
  2. Maintain consistent grid column width (`maxWidth` / `width: 100% / cols`) for all grid depth levels.

### Task 3: Break Circular Dependency Require Cycles [x] Completed
- **Recommended Model**: 🟢 **3.6 Flash (Low)** *(Complexity: 1/5, 2 files - straightforward import refactoring)*
- **Target Files**:
  - [PlaceholderCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/PlaceholderCard.js#L1-L7)
  - [index.js](file:///d:/Magazine/_PigmentShop/src/components/Card/index.js)
- **Problem**: Require cycle warnings during bundle evaluation between barrel exports and feature card imports.
- **Action**:
  1. Standardize direct relative imports for `CategoryCard`, `ProductCard`, and `NavigationCard`.
  2. Avoid importing `Card` primitive through barrel `index.js`.

### Task 4: Prevent Text Overflow Clipping & Fix Dynamic Heights [x] Completed
- **Recommended Model**: 🟢 **3.6 Flash (Low)** *(Complexity: 1/5, 2 files - style/CSS property tweaks)*
- **Target Files**:
  - [CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js#L98)
  - [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js#L72)
- **Problem**: Fixed pixel `height` constraints cause multi-line localized product/category titles to clip or overflow.
- **Action**:
  1. Replace rigid `height` with `minHeight` where appropriate or ensure `numberOfLines={2}` is combined with flex space distribution.
  2. Verify text line heights across desktop, tablet, and mobile viewports.

### Task 5: Add Image Load Error Fallbacks [x] Completed
- **Recommended Model**: 🟡 **3.6 Flash (Medium)** *(Complexity: 2/5, 2 files - state & onError prop additions)*
- **Target Files**:
  - [CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js#L102)
  - [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js#L76)
- **Problem**: Broken remote image URLs render blank image slots without fallback indicators.
- **Action**:
  1. Add local `imgError` state to `<CategoryCard>` and `<ProductCard>`.
  2. Trigger `onError={() => setImgError(true)}` to dynamically render `CATEGORY_PLACEHOLDER` / `PRODUCT_PLACEHOLDER` local assets.

### Task 6: Isolate Action Button Touch Events in Link Contexts [x] Completed
- **Recommended Model**: 🟢 **3.6 Flash (Low)** *(Complexity: 1/5, 1 file - simple event handler update)*
- **Target Files**:
  - [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js#L53-L64)
- **Problem**: Pressing Favorite or Cart buttons inside `<Link asChild>` cards triggers unwanted page navigation on web.
- **Action**:
  1. Call `e.stopPropagation()` and `e.preventDefault()` on button press handlers.
  2. Add `pointerEvents="auto"` to action button container overlays.

---

## 4. Verification & Testing Steps

1. Run catalog view on desktop, tablet, and mobile breakpoints (`npm run dev`).
2. Verify subcategories with 1, 2, or 3 items maintain fixed column widths.
3. Test empty/broken image fallback handling.
4. Confirm Favorite/Cart clicks do not trigger page navigation.
