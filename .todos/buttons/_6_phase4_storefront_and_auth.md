# Phase 4: Storefront & Auth Screens

## 🎯 Objective
Align storefront CTA buttons, product variant selectors, authentication screen buttons, and profile actions with standard design tokens.

---

## 📋 Task List

- [ ] **Task 6.1: Standardize Authentication Screen Buttons** `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
  - Path: [LoginPageStyles.js](file:///d:/Magazine/_PigmentShop/src/features/auth/LoginPageStyles.js)
  - Replace hardcoded `height: 48px` and radius overrides with standard `lg` button token styles.

- [ ] **Task 6.2: Refactor Catalog & Product Action CTAs** `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
  - Paths: [CatalogScreen](file:///d:/Magazine/_PigmentShop/src/features/catalog/), [ProductDetails](file:///d:/Magazine/_PigmentShop/src/features/product/)
  - Standardize "Add to Cart", "Buy Now", and product card buttons to `md` (40px) or `lg` (48px) variants.

- [ ] **Task 6.3: Align Profile Page Action Buttons** `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
  - Path: [ProfilePageStyles.js](file:///d:/Magazine/_PigmentShop/src/features/profile/ProfilePageStyles.js)
  - Replace custom 40px height and radius definitions with tokenized `Button` variants.
