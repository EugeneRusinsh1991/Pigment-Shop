# Feature Module Boundaries & Encapsulation Standard

> [!NOTE]
> This document summarizes the Phase 2 Architecture Migration (Feature Encapsulation) and establishes the canonical standard for organizing future domain features in the PigmentShop codebase.

---

## 1. Architectural Changes Made

Historically, large chunks of application UI (such as the storefront Catalog, Cart, and Product pages) were housed alongside generic primitives in `src/components/`. 

To solve this, we migrated all domain-specific UI components into explicit module boundaries under `src/features/`.

### Migration Impact:
- **`src/features/cart/`**: Extracted all cart logic, views, checkout behaviors, and summary components.
- **`src/features/catalog/`**: Extracted the listing pages, product grids, sorting bars, and category filtering sidebar components.
- **`src/features/product/`**: Extracted the single product view, reviews, interactive image panels, and product badges.
- **Clean `src/components/`**: The core component folder is now reserved strictly for reusable presentation primitives (e.g., Buttons, BaseCards, ToastViews, Text inputs).

---

## 2. The Final Feature Structure

All features across the application (both storefront and shell) now live under the `src/features/` directory:

```
src/features/
├── auth/         # Login, registration, session forms
├── cart/         # Cart drawer, Cart view, checkout logic
├── catalog/      # Main storefront listing, filters, and categories
├── contact/      # Contact us and static content pages
├── favorites/    # Wishlist/Favorites listing
├── orders/       # Order tracking and history
├── product/      # Product detail pages, reviews, product cards
└── shell/        # App-wide wrapping components (navigation, headers)
```

Inside each feature module, files are kept flat (avoiding overly nested `components/` subdirectories unless strictly necessary for scale) to ensure fast file navigation and simple import paths.

---

## 3. Engineering Principles Established

### 3.1 Domain Encapsulation
Features should own their UI, logic, and state adapters. If a component is only used by the Catalog, it belongs in `src/features/catalog/`, not `src/components/`.

### 3.2 Flat Feature Modules
Prefer a flat file structure inside a feature module. Over-nesting (e.g., `src/features/product/components/ProductPage/ProductReviews.js`) causes unnecessary import depth. Component boundaries should remain simple and discoverable at a glance.

### 3.3 Strict Component vs. Feature Split
- `src/components/`: Reserved for **dumb, reusable UI primitives** (Buttons, Inputs, Dialogs). They receive data strictly via props and are unaware of business domains.
- `src/features/`: Reserved for **smart, domain-aware modules**. They can import from `src/components/`, `src/hooks/`, and `src/services/` to orchestrate specific application screens.

---

## 4. Decisions as New Project Standards

1. **New Screens = New Features**: When adding a distinctly new part of the application (e.g., an "Analytics Dashboard"), it must be created as a new feature folder (`src/features/analytics/`).
2. **Never Import Feature to Feature Horizontally**: A file in `src/features/cart/` should rarely, if ever, directly import a UI component from `src/features/catalog/`. If logic is shared, it must be elevated to a generic `src/components/` primitive or a global custom `src/hooks/`.
3. **No Domain Leakage in `app/`**: Route components in the `app/` (Expo Router) directory should remain incredibly thin. Their only job is to import the root component from the corresponding `src/features/` directory and inject route parameters.
