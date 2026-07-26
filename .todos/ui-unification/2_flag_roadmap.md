# Roadmap: Unification of Flag Elements to Centralized Flag Module

Based on [.docs/architecture-standards/04-flag-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/04-flag-module-spec.md) and [.todos/ui-unification/1_flag.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/1_flag.md).

## Phase 1: Core Flag Module Implementation

### P1.1: Architecture & Hooks
- **P1.1.1**: Theme resolution hook `src/components/Flag/useFlagTheme.js` for active, inactive, and disabled token resolution.
- **P1.1.2**: Dynamic style factory `src/components/Flag/FlagStyles.js` supporting `chip`, `switch`, and `checkbox` variants.

### P1.2: Core Components & Barrel Export
- **P1.2.1**: Core presentational primitive `src/components/Flag/Flag.js` and container `src/components/Flag/FlagGroup.js`.
- **P1.2.2**: Public API barrel export `src/components/Flag/index.js`.

---

## Phase 2: Core Primitives & Shared Wrappers Refactoring

### P2.1: Admin Products Filter Bar
- **P2.1.1**: Refactor Discount and New Arrivals filter chips in `src/components/Admin/Products/ProductsFilterBar.js` using `<Flag variant="chip">`.

### P2.2: Admin Product Form Checkboxes
- **P2.2.1**: Refactor "Is New" and "Is Active" form checkboxes in `src/components/Admin/Products/ProductFormFields.js` using `<Flag variant="checkbox">`.

---

## Phase 3: Consumer Screens & Feature Modules Refactoring

### P3.1: Product Badges & Status Indicators
- **P3.1.1**: Refactor product attribute badges in `src/features/product/ProductBadges.js` using `<Flag variant="chip">`.
- **P3.1.2**: Refactor product row status badges in `src/components/Admin/Products/ProductRowComponents.js` using `<Flag variant="chip">`.

### P3.2: Category Type Selectors & Badges
- **P3.2.1**: Refactor Category Type toggle chips in `src/components/Admin/Categories/CategoryFormFields.js`.
- **P3.2.2**: Refactor Category Type display badges in `src/components/Admin/Categories/CategoryRow.js`.

### P3.3: Order Status Badges & Selectors
- **P3.3.1**: Refactor interactive status trigger in `src/components/Admin/Orders/OrderStatusSelector.js`.
- **P3.3.2**: Refactor read-only order status badges in `src/components/Admin/Orders/OrderRow.js` and `src/components/OrderCard.js`.

---

## Phase 4: Verification & Integration Testing

### P4.1: Quality & Visual Verification
- **P4.1.1**: Verify touch targets, active state colors, variant layouts, and dark mode theme consistency across all screens.
