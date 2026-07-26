# Unification Catalog: Flag Elements

Based on [.docs/architecture-standards/04-flag-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/04-flag-module-spec.md).

## Complete Catalog of Flag Elements Across Codebase

### 1. Admin Products Filter Chips
- **`ProductsFilterBar` Filter Chips** (`src/components/Admin/Products/ProductsFilterBar.js`): Filter chips (`variant="chip"`) for "Discount" and "New" toggle filters.

### 2. Admin Form Checkboxes
- **`FieldCheckbox` / `FlagsSection`** (`src/components/Admin/Products/ProductFormFields.js`): Form checkboxes (`variant="checkbox"`) for "Is New" and "Is Active" product settings.

### 3. Product Badges & Status Indicators
- **`ProductBadges` (New / Discount Badges)** (`src/features/product/ProductBadges.js`): Product attribute badges (`[ New ]`, `[ -X% ]`).
- **`NewBadge` & `StatusBadge` in Product Rows** (`src/components/Admin/Products/ProductRowComponents.js`): Product status indicators (`[ Active ]`, `[ Inactive ]`, `[ New ]`).

### 4. Category Type Selectors & Badges
- **`CategoryTypeSelect` Toggle Chips** (`src/components/Admin/Categories/CategoryFormFields.js`): Type selection toggle buttons (`[ Category Holder ]`, `[ Product Holder ]`).
- **`CategoryTypeDisplay` & Category Row Badges** (`src/components/Admin/Categories/CategoryFormFields.js` & `src/components/Admin/Categories/CategoryRow.js`): Category type status badges.

### 5. Order Status Badges & Selectors
- **`OrderStatusSelector` Status Trigger** (`src/components/Admin/Orders/OrderStatusSelector.js`): Interactive order status badge selector (`[ New ]`, `[ Processing ]`, `[ Completed ]`, `[ Cancelled ]`).
- **`StatusBadge` in Order Rows & Cards** (`src/components/Admin/Orders/OrderRow.js` & `src/components/OrderCard.js`): Read-only order status badges.
