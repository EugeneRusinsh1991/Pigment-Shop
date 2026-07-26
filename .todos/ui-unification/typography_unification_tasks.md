# Typography & Heading Primitive Unification Task Plan

## Overview
Unify text, screen headers, subheadings, and captions across the codebase by creating centralized typography primitives (`Text`, `Heading`) and predefined style presets. This ensures consistent font rendering, sizes, weights, line heights, and colors across both dark and light themes.

## Current State Analysis
- **`src/theme/commonStyles.js`**: Contains partial, uncoordinated global text style definitions.
- **`src/theme/tokens.js`**: Defines raw design tokens for fonts, sizes, and weights.
- **`src/features/` & `src/components/`**: Inline text styling, custom `StyleSheet` text definitions, and manual theme color wiring scattered across screens.

---

## Step 1: Design Typography Architecture & Tokens Integration
- **Objective**: Establish the typography scale, variants, and theme mapping.
- **Key Tasks**:
  - Define standard typography variants: `h1`, `h2`, `h3`, `h4`, `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`, `overline`.
  - Ensure theme-awareness (supporting active light/dark theme tokens for color hierarchy).

---

## Step 2: Implement Typography Components Primitives
- **Objective**: Create reusable React Native typography primitives.
- **Location**: `src/components/Typography/` (or `src/components/Text/`)
- **Components to Create**:
  - `Text.js`: Core primitive supporting variant props, color overrides, and theme scaling.
  - `Heading.js`: Specialized component for screen and section titles (`h1`-`h4`).
  - `Typography.styles.js` / `TypographyStyles.js`: Dynamic style factory mapping tokens & variants.
  - `index.js`: Barrel export for clean consumption.

---

## Step 3: Migration Phase & Standardization
- **Objective**: Refactor existing components to use the new typography primitives.
- **Key Files/Modules to Update**:
  - Deprecate ad-hoc text styles in `src/theme/commonStyles.js`.
  - Refactor feature components in `src/features/` (Catalog, Cart, Auth, Profile, Admin) to use `<Text>` and `<Heading>`.
  - Refactor shared components in `src/components/`.

---

## Step 4: Verification & Audit
- **Objective**: Validate visual consistency and test across themes.
- **Tasks**:
  - Verify light and dark mode text contrast & dynamic theme switching.
  - Audit remaining hardcoded `fontSize` / `lineHeight` in `src/` to prevent regression.

---

## Discovered Text & Typography Locations

### 1. Theme Foundations
- [tokens.js](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js)
- [commonStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/commonStyles.js)

### 2. Feature-Specific Text Styles (`src/features/`)
- **Catalog**:
  - [ProductGrid.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/ProductGrid.js)
  - [categoryCardStyles.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/categoryCardStyles.js)
  - [CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js)
  - [CatalogSortBar.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogSortBar.js)
  - [CatalogPagination.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogPagination.js)
  - [CatalogFilterSidebarStyles.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogFilterSidebarStyles.js)
- **Product Details & Cards**:
  - [ProductInfoSubcomponents.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductInfoSubcomponents.js)
  - [ProductPageStyles.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductPageStyles.js)
  - [ProductReviewsStyles.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductReviewsStyles.js)
  - [ProductReviewSubcomponents.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductReviewSubcomponents.js)
  - [ProductCardStyles.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCardStyles.js)
- **Cart & Orders**:
  - [CartViewStyles.js](file:///d:/Magazine/_PigmentShop/src/features/cart/CartViewStyles.js)
  - [CartItem.js](file:///d:/Magazine/_PigmentShop/src/features/cart/CartItem.js)
  - [OrderRows.js](file:///d:/Magazine/_PigmentShop/src/features/orders/OrderRows.js)
  - [OrderHeader.js](file:///d:/Magazine/_PigmentShop/src/features/orders/OrderHeader.js)
  - [OrderDetailsCard.js](file:///d:/Magazine/_PigmentShop/src/features/orders/OrderDetailsCard.js)
- **Shell, Navigation & Header**:
  - [LanguageSelector.js](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/LanguageSelector.js)
  - [NavMenuStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/NavMenuStyles.js)
  - [MainMenuContent.js](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/MainMenuContent.js)
  - [AppHeaderStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderStyles.js)
  - [UserDropdown.js](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/UserDropdown.js)
  - [AppHeaderLogo.js](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderLogo.js)
- **Profile, Auth & Contact**:
  - [ProfilePageStyles.js](file:///d:/Magazine/_PigmentShop/src/features/profile/ProfilePageStyles.js)
  - [FavoritesPageStyles.js](file:///d:/Magazine/_PigmentShop/src/features/favorites/FavoritesPageStyles.js)
  - [SocialButtons.js](file:///d:/Magazine/_PigmentShop/src/features/contact/SocialButtons.js)
  - [ContactQuestionForm.js](file:///d:/Magazine/_PigmentShop/src/features/contact/ContactQuestionForm.js)
  - [ContactPageStyles.js](file:///d:/Magazine/_PigmentShop/src/features/contact/ContactPageStyles.js)
  - [LoginPageStyles.js](file:///d:/Magazine/_PigmentShop/src/features/auth/LoginPageStyles.js)

### 3. Shared Components Text Styles (`src/components/`)
- [DiscountsSection.js](file:///d:/Magazine/_PigmentShop/src/components/DiscountsSection.js)
- [EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/EmptyState.js)
- [FieldError.js](file:///d:/Magazine/_PigmentShop/src/components/FieldError.js)
- [Footer.js](file:///d:/Magazine/_PigmentShop/src/components/Footer.js)
- [OrdersPageStyles.js](file:///d:/Magazine/_PigmentShop/src/components/OrdersPageStyles.js)
- [ToggleStyles.js](file:///d:/Magazine/_PigmentShop/src/components/Toggle/ToggleStyles.js)
- [TextFieldStyles.js](file:///d:/Magazine/_PigmentShop/src/components/TextField/TextFieldStyles.js)
- [SearchStyles.js](file:///d:/Magazine/_PigmentShop/src/components/Search/SearchStyles.js)
- [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/Search/SearchDropdown.js)
- [ToastView.js](file:///d:/Magazine/_PigmentShop/src/components/ToastView.js)
- [PageNavigation.js](file:///d:/Magazine/_PigmentShop/src/components/PageNavigation.js)
- [carouselStyles.js](file:///d:/Magazine/_PigmentShop/src/components/HeroCarousel/carouselStyles.js)
- [NewArrivalsFooter.js](file:///d:/Magazine/_PigmentShop/src/components/NewArrivalsFooter.js)
- [ConfirmationModal.js](file:///d:/Magazine/_PigmentShop/src/components/Modal/ConfirmationModal.js)

