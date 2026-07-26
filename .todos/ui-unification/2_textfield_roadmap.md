# TextField Architecture Standard & Migration Roadmap

This document serves as the self-contained specification and step-by-step migration roadmap for unifying all input fields across PigmentShop into a standardized `TextField` UI module.

---

## 1. Architectural Standard (From Reference UI Specification)

Following [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md):

### 1.1 Canonical Directory Layout
```
src/components/TextField/
├── index.js                     # Public API barrel export
├── TextField.js                 # Core presentational component
├── TextFieldStyles.js           # Dynamic token-driven style map factory
├── useTextFieldTheme.js         # Theme & dark mode token resolution hook
└── useTextFieldAnimation.js     # Focus border/scale gesture driver hook
```

### 1.2 Design Tokens & Flexible Configuration
No hardcoded colors, border radii, heights, or paddings. All parameters map to `src/theme/tokens.js`:
- **Variants**: `default`, `outlined`, `filled`
- **Flexibility Props**:
  - `width`: Support explicit pixels (`width={200}`) or container flex fill (`width="100%"`).
  - `multiline` & `numberOfLines`: Support single-line inputs or variable row textareas.
  - `leadingIcon` & `trailingIcon`: Support left/right adornments (search icon, clear button).
  - `error`: Field error message rendering via `FieldError`.

---

## 2. All Target Elements Catalog

Every input field location identified in the project:

1. **Global Search Bar**: `SearchInput` (`src/components/Search/SearchInput.js`)
2. **Catalog Filters**: Price Range Min/Max Inputs (`src/features/catalog/SidebarUIComponents.js`)
3. **Product Details**: Review & Question Textarea (`src/features/product/ProductReviewSubcomponents.js`)
4. **Cart & Checkout**: Promo Code & Order Note Inputs (`src/features/cart/CartSummary.js`)
5. **Contact Page**: Contact Us Message Textarea (`src/features/contact/ContactQuestionForm.js`)
6. **Profile Page**: Name, Email, Phone Inputs (`src/features/profile/ProfileFormCard.js`)
7. **Address & Security**: Shipping Address & Password Inputs (`src/components/Profile/*`)
8. **Auth Pages**: Login & Register Input Fields (`src/features/auth/LoginPage.js`, `LoginPageComponents.js`)
9. **Admin Shared Inputs**: `FieldTextInput` & `FieldTextArea` (`src/components/Admin/SharedFormComponents.js`)
10. **Admin Categories**: Category Form Title & Description (`src/components/Admin/Categories/CategoryFormFields.js`)
11. **Admin Products**: Product Title, Price, SKU, Stock, Description (`src/components/Admin/Products/ProductFormFields.js`)
12. **Admin Tables**: Product Search & User Search Filters (`src/components/Admin/Products/ProductsManager.js`, `UsersManager.js`)

---

## 3. High-Level Migration Roadmap

### Stage 1: Build Core Primitive (`src/components/TextField/`)
- Establish `useTextFieldTheme.js` to resolve surface, border, and text tokens for light/dark modes.
- Build `TextFieldStyles.js` style factory handling single line, multiline textareas, flex/width overrides, leading/trailing icons, and error states.
- Implement `TextField.js` render component with focus state animation.
- Export public API in `index.js`.

### Stage 2: Migrate Core Primitives & Shared Wrappers
- Refactor `SharedFormComponents.js` (`FieldTextInputCore`, `FieldTextAreaCore`) to wrap `<TextField>`.
- Refactor `SearchInput.js` to use `<TextField leadingIcon={...}>`.

### Stage 3: Refactor Consumer Forms & Screens
- Migrate Catalog Price Filters (`SidebarUIComponents.js`).
- Migrate Auth Screens (`LoginPage.js`, `LoginPageComponents.js`).
- Migrate User Profile & Address Forms (`ProfileFormCard.js`, `src/components/Profile/*`).
- Migrate Cart & Checkout Inputs (`CartSummary.js`).
- Migrate Product Reviews & Contact Forms (`ProductReviewSubcomponents.js`, `ContactQuestionForm.js`).
- Migrate Admin Specific Form Fields (`CategoryFormFields.js`, `ProductFormFields.js`, filter bars).

### Stage 4: Quality & Visual Verification
- Verify focus animations, dark mode colors, error text alignments, hit targets, and multiline text heights across all screens.
