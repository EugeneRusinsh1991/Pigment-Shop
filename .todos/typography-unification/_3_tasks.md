# Typography Unification Tasks

Execution guide for AI agents migrating legacy text instances to the unified typography architecture (`Text` and `Heading` primitives).
*Note: All recommendations include mandatory +20% buffer for unexpected side-effects.*

---

## Task 1.1a: Migrate Admin Product Forms (Completed)
**Recommendation**: 🟡 Gemini 3.6 Flash (Medium) - 2 files
**Goal**: Replace RN `Text` with unified `Text`/`Heading` primitives in Product Admin forms.

### Execution Scope:
- `src/components/Admin/Products/ProductFormFields.js`
- `src/components/Admin/FormModalLayout.js`

---

## Task 1.1b: Migrate Admin Media Browser & Shell
**Recommendation**: 🟠 Gemini 3.6 Flash (High) - 3 files
**Goal**: Replace RN `Text` with unified primitives in Media Browser and Admin Panel shell.

### Execution Scope:
- `src/components/Admin/Media/MediaBrowserItem.js`
- `src/components/Admin/Media/MediaBrowserComponents.js`
- `src/components/Admin/AdminPanel.js`

---

## Task 1.2a: Migrate Analytics SVG Charts
**Recommendation**: 🔴 Gemini 3.1 Pro (High) - 3 files
**Goal**: Migrate text rendering inside Analytics SVG charts (`OrderStatusChart`, `RevenueChart`, `TopProductsChart`).

### Execution Scope:
- `src/components/Admin/Analytics/OrderStatusChart.js`
- `src/components/Admin/Analytics/RevenueChart.js`
- `src/components/Admin/Analytics/TopProductsChart.js`

---

## Task 1.2b: Migrate Analytics Calendar & Dashboard Shell
**Recommendation**: 🟠 Gemini 3.6 Flash (High) - 3 files
**Goal**: Migrate text rendering in Analytics Date Picker and Dashboard shell.

### Execution Scope:
- `src/components/Admin/Analytics/DateRangeCalendar.js`
- `src/components/Admin/Analytics/CalendarDayCell.js`
- `src/components/Admin/Analytics/AnalyticsDashboard.js`

---

## Task 1.3: Migrate UI Primitives (Badge)
**Recommendation**: 🟢 Gemini 3.6 Flash (Low) - 1 file
**Goal**: Replace RN `Text` in Badge primitive component.

### Execution Scope:
- `src/components/Badge/Badge.js`

---

## Task 2.1: Clean Up Hardcoded Font Overrides in Shell & Navigation
**Recommendation**: 🟠 Gemini 3.6 Flash (High) - 3 files
**Goal**: Remove inline `fontSize`, `lineHeight`, and `fontFamily` from `StyleSheet` objects in Shell/Nav components.

### Execution Scope:
- `src/features/shell/AppHeader/AppHeaderStyles.js`
- `src/features/shell/NavMenu/NavMenuStyles.js`
- `src/features/shell/AppHeader/UserDropdown.js`

---

## Task 2.2: Clean Up Font Overrides in Catalog & Filter Views
**Recommendation**: 🟠 Gemini 3.6 Flash (High) - 2 files
**Goal**: Remove hardcoded font sizes in Catalog and Filter view styles.

### Execution Scope:
- `src/features/catalog/categoryCardStyles.js`
- `src/features/catalog/CatalogFilterSidebarStyles.js`

---

## Task 2.3: Clean Up Font Overrides in Product Views
**Recommendation**: 🟠 Gemini 3.6 Flash (High) - 2 files
**Goal**: Remove hardcoded font sizes in Product detail and card styles.

### Execution Scope:
- `src/features/product/ProductPageStyles.js`
- `src/features/product/ProductCardStyles.js`

---

## Task 2.4: Clean Up Font Overrides in Cart & Orders Views
**Recommendation**: 🟠 Gemini 3.6 Flash (High) - 3 files
**Goal**: Remove hardcoded font sizes in Cart view, Order headers, and details cards.

### Execution Scope:
- `src/features/cart/CartViewStyles.js`
- `src/features/orders/OrderHeader.js`
- `src/features/orders/OrderDetailsCard.js`

---

## Task 2.5: Clean Up Font Overrides in Reviews & Profile Views
**Recommendation**: 🟠 Gemini 3.6 Flash (High) - 2 files
**Goal**: Remove hardcoded font sizes in Product Reviews and Profile views.

### Execution Scope:
- `src/features/product/ProductReviewsStyles.js`
- `src/features/profile/ProfilePageStyles.js`

---

## Task 3.1: Color Palette Standardization
**Recommendation**: 🟡 Gemini 3.6 Flash (Medium) - 3 files
**Goal**: Eliminate raw hex color strings for text and standardize color tokens.

### Execution Scope:
- `src/utils/orderStatus.js`
- `src/features/cart/CartViewStyles.js`
- `src/features/product/ProductCardStyles.js`
