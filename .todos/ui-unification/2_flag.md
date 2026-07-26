# Task Plan: Unification of Flag Elements to Centralized Flag Module

Based on [.docs/architecture-standards/04-flag-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/04-flag-module-spec.md) and [.todos/ui-unification/1.5_flag.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/1.5_flag.md).

## Phase 1: Core Flag Primitive Implementation

### P1.1: Foundation & Theme Hooks
- [x] **P1.1.1**: Create `src/components/Flag/useFlagTheme.js` for theme token resolution. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P1.1.2**: Create `src/components/Flag/FlagStyles.js` for variant & state style factory (`chip`, `switch`, `checkbox`). `[Model: 🟠 Gemini 3.6 Flash (High)]`

### P1.2: Core Components & Barrel Export
- [x] **P1.2.1**: Create `src/components/Flag/Flag.js` presentational primitive supporting `chip`, `switch`, `checkbox`. `[Model: 🟠 Gemini 3.6 Flash (High)]`
- [x] **P1.2.2**: Create `src/components/Flag/FlagGroup.js` multi-flag container. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P1.2.3**: Create `src/components/Flag/index.js` public API barrel export. `[Model: 🟢 Gemini 3.6 Flash (Low)]`

---

## Phase 2: Target Elements Refactoring

### P2.1: Admin Attribute Filters
- [x] **P2.1.1**: Refactor `adminProductsFilterDiscount` in `ProductsManager.js` to use `<Flag variant="chip">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P2.1.2**: Refactor `adminProductsFilterNew` in `ProductsManager.js` to use `<Flag variant="chip">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P2.1.3**: Wrap admin product attribute filters with `<FlagGroup>`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`

### P2.2: Theme & Preference Switcher
- [x] **P2.2.1**: Refactor theme/preference toggles in `AppHeaderControls.js` to use `<Flag variant="switch">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P2.3: Form Checkboxes
- [x] **P2.3.1**: Refactor `FieldCheckbox` in `ProductFormFields.js` to wrap `<Flag variant="checkbox">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

---

## Phase 3: Verification & Integration Test

### P3.1: Visual & Interactive Verification
- [x] **P3.1.1**: Test active/inactive state visual fidelity and hitSlop (44x44px target). `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.1.2**: Run smoke tests / manual UI verification across theme changes. `[Model: 🟠 Gemini 3.6 Flash (High)]`

### P3.2: Accessibility & Cleanup
- [x] **P3.2.1**: Ensure ARIA roles (`switch`, `checkbox`, `button`) match spec requirements. `[Model: 🟢 Gemini 3.6 Flash (Low)]`
