# Task Plan: Unification of Flag Elements to Centralized Flag Module

Based on [.todos/ui-unification/2_flag_roadmap.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/2_flag_roadmap.md) and [.docs/architecture-standards/04-flag-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/04-flag-module-spec.md).

## Phase 1: Core Flag Module Implementation

### P1.1: Architecture & Hooks
- [x] **P1.1.1**: Create `src/components/Flag/useFlagTheme.js` for active, inactive, and disabled token resolution. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P1.1.2**: Create `src/components/Flag/FlagStyles.js` style factory supporting `chip`, `switch`, and `checkbox` variants. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P1.2: Core Components & Barrel Export
- [x] **P1.2.1**: Create `src/components/Flag/Flag.js` core presentational primitive and `src/components/Flag/FlagGroup.js`. `[Model: 🟠 Gemini 3.6 Flash (High)]`
- [x] **P1.2.2**: Create `src/components/Flag/index.js` public API barrel export. `[Model: 🟢 Gemini 3.6 Flash (Low)]`

---

## Phase 2: Core Primitives & Shared Wrappers Refactoring

### P2.1: Admin Products Filter Bar
- [x] **P2.1.1**: Refactor `ProductsFilterBar` in `src/components/Admin/Products/ProductsFilterBar.js` using `<Flag variant="chip">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P2.2: Admin Product Form Checkboxes
- [x] **P2.2.1**: Refactor `FieldCheckbox` in `src/components/Admin/Products/ProductFormFields.js` using `<Flag variant="checkbox">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

---

## Phase 3: Consumer Screens & Feature Modules Refactoring

### P3.1: Product Badges & Status Indicators
- [x] **P3.1.1**: Refactor product attribute badges in `src/features/product/ProductBadges.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.1.2**: Refactor product row status badges in `src/components/Admin/Products/ProductRowComponents.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P3.2: Category Type Selectors & Badges
- [x] **P3.2.1**: Refactor Category Type toggle chips in `src/components/Admin/Categories/CategoryFormFields.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.2.2**: Refactor Category Type display badges in `src/components/Admin/Categories/CategoryRow.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P3.3: Order Status Badges & Selectors
- [x] **P3.3.1**: Refactor interactive status trigger in `src/components/Admin/Orders/OrderStatusSelector.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.3.2**: Refactor read-only order status badges in `src/components/Admin/Orders/OrderRow.js` and `src/components/OrderCard.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

---

## Phase 4: Verification & Integration Testing

### P4.1: Quality & Visual Verification
- [x] **P4.1.1**: Verify touch targets, active state colors, variant layouts, and dark mode theme consistency across all screens. `[Model: 🟠 Gemini 3.6 Flash (High)]`
