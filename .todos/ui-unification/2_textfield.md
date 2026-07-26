# Task Plan: Unification of Text Fields to Centralized TextField Module

Based on [.todos/ui-unification/2_textfield_roadmap.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/2_textfield_roadmap.md) and [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md).

## Phase 1: Core TextField Module Implementation

### P1.1: Architecture & Hooks
- [x] **P1.1.1**: Create `src/components/TextField/useTextFieldTheme.js` for dynamic surface, text, border, and dark mode token resolution. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P1.1.2**: Create `src/components/TextField/useTextFieldAnimation.js` for focus state border scaling and transition drivers. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P1.1.3**: Create `src/components/TextField/TextFieldStyles.js` style factory supporting configurable widths, heights, multiline textareas (`numberOfLines`), leading/trailing icons, error text, and theme states. `[Model: 🟠 Gemini 3.6 Flash (High)]`

### P1.2: Core Components & Barrel Export
- [x] **P1.2.1**: Create `src/components/TextField/TextField.js` core presentational primitive combining theme hook, animation driver, and style factory. `[Model: 🟠 Gemini 3.6 Flash (High)]`
- [x] **P1.2.2**: Create `src/components/TextField/index.js` public API barrel export. `[Model: 🟢 Gemini 3.6 Flash (Low)]`

---

## Phase 2: Core Primitives & Shared Wrappers Refactoring

### P2.1: Admin Shared Form Components
- [x] **P2.1.1**: Refactor `FieldTextInputCore` / `FieldTextInput` in `src/components/Admin/SharedFormComponents.js` to wrap `<TextField>`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P2.1.2**: Refactor `FieldTextAreaCore` / `FieldTextArea` in `src/components/Admin/SharedFormComponents.js` to wrap `<TextField multiline>`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P2.2: Global Search Bar
- [x] **P2.2.1**: Refactor `SearchInput` in `src/components/Search/SearchInput.js` to use `<TextField leadingIcon={...}>`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

---

## Phase 3: Consumer Screens & Feature Modules Refactoring

### P3.1: Catalog & Filters
- [x] **P3.1.1**: Refactor Price Range Min/Max Inputs in `src/features/catalog/SidebarUIComponents.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P3.2: Authentication & User Profile
- [x] **P3.2.1**: Refactor Login / Register inputs in `src/features/auth/LoginPage.js` and `src/features/auth/LoginPageComponents.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.2.2**: Refactor Personal Profile inputs in `src/features/profile/ProfileFormCard.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.2.3**: Refactor Address & Security Form inputs in `src/components/Profile/*`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P3.3: Product, Cart, & Contact Forms
- [x] **P3.3.1**: Refactor Promo Code and Order Note inputs in `src/features/cart/CartSummary.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.3.2**: Refactor Question / Review textareas in `src/features/product/ProductReviewSubcomponents.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.3.3**: Refactor Contact message textarea in `src/features/contact/ContactQuestionForm.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

### P3.4: Admin Specific Views & Filters
- [x] **P3.4.1**: Refactor Category Form fields in `src/components/Admin/Categories/CategoryFormFields.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.4.2**: Refactor Product Form fields in `src/components/Admin/Products/ProductFormFields.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
- [x] **P3.4.3**: Refactor Product & User search filters in `ProductsManager.js` and `UsersManager.js`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

---

## Phase 4: Verification & Integration Testing

### P4.1: Quality & Visual Verification
- [x] **P4.1.1**: Verify focus animations, dark mode colors, error text alignments, hit targets, and multiline text heights across all screens. `[Model: 🟠 Gemini 3.6 Flash (High)]`
