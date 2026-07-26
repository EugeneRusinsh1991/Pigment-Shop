# Card Sizing & Grid Standardization - Revised Implementation Plan

## 1. Executive Summary & Root Cause Analysis

Recent attempts to standardize card heights and grid column calculations resulted in visual layout regressions:
1. **Category Cards Over-stretching & Bad Column Density**: Category cards in root and subcategory views rendered across 1 or 2 wide columns instead of filling a proper 5-column grid on desktop screens ([S_14-58-19](file:///d:/Magazine/_PigmentShop/.docs/manual-browser-log/screenshots/S_14-58-19_Catalog_CatRoot0Sub0.jpg), [S_14-58-27](file:///d:/Magazine/_PigmentShop/.docs/manual-browser-log/screenshots/S_14-58-27_Catalog.jpg)).
2. **Right-Side Blank Space in Filtered Product View**: On desktop views with active filter sidebars, the 4-column product grid rendered left-aligned with a huge empty gap on the right ([S_14-58-22](file:///d:/Magazine/_PigmentShop/.docs/manual-browser-log/screenshots/S_14-58-22_Products.jpg)).
3. **Hardcoded Height Mismatch**: Over-constraining `CategoryCard` height to match `ProductCard` forced banner-style aspect ratio distortion on full-width subcategory items.

---

## 2. Standardized Grid Specifications

### Standard Catalog Grid (Home & Category Browsing)
- **Desktop (>=1024px)**: 5 columns (`flex: 1 1 calc(20% - gap)`, centered grid container)
- **Tablet (>=768px)**: 3 columns (`calc(33.33% - gap)`)
- **Mobile (<768px)**: 2 columns (`calc(50% - gap)`)

### Filtered Catalog Grid (All Products / Search with Sidebar)
- **Desktop (>=1024px)**: 4 columns in content area adjacent to sidebar
- **Tablet (>=768px)**: 2 columns
- **Mobile (<768px)**: 2 columns

---

## 3. Revised Step-by-Step Action Plan

### Step 1: Fix Grid Container Layout & Whitespace Gap
- **Recommended Model**: 🟠 **3.6 Flash (High)**
- **Target Files**: [src/utils/layout.js](file:///d:/Magazine/_PigmentShop/src/utils/layout.js), [src/features/catalog/ProductGrid.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/ProductGrid.js), [src/components/Card/PlaceholderCard.js](file:///d:/Magazine/_PigmentShop/src/components/Card/PlaceholderCard.js)
- **Action**:
  - Replace fixed pixel calculations (`cols * (cardWidth + margin * 2)`) with percentage-based responsive column sizing (`100% / cols`) combined with consistent flex gap/padding.
  - Center grid containers within `CatalogView` and `CatalogPage` content area so desktop views do not leave trailing empty whitespace on the right.

### Step 2: Separate Banner View vs Grid View for Category Cards
- **Recommended Model**: 🟡 **3.6 Flash (Medium)**
- **Target Files**: [src/features/catalog/CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js), [src/features/catalog/categoryCardStyles.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/categoryCardStyles.js)
- **Action**:
  - Distinguish between single subcategory banner mode (e.g. single item rendered at depth > 0) and grid mode.
  - In grid mode, enforce card aspect ratio (e.g., height ~240px-280px depending on screen tier) without forcing rigid fixed pixel height that distorts background images.

### Step 3: Unify Column Map in `useCatalogViewData.js` & `CatalogPage.js`
- **Recommended Model**: 🟡 **3.6 Flash (Medium)**
- **Target Files**: [src/hooks/useCatalogViewData.js](file:///d:/Magazine/_PigmentShop/src/hooks/useCatalogViewData.js), [src/features/catalog/CatalogPage.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogPage.js)
- **Action**:
  - Ensure `COLS_MAP` returns 5 columns for desktop root/subcategory grid views across all non-filtered pages.
  - Ensure filtered views correctly pass `hasFilterSidebar: true` to get 4 columns on desktop, evenly distributed across the available main content width.

### Step 4: Visual Polish & Verification
- **Recommended Model**: 🟢 **3.6 Flash (Low)**
- **Action**:
  - Verify card dimensions and column layout on Desktop (1440px+), Laptop (1024px), Tablet (768px), and Mobile (375px).
  - Confirm alignment between header search bar width and content grid boundaries.
