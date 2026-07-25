# Phase 4: Storefront & Product Overlays

## Goal
Standardize filter checkbox touchables, product quantity selectors, card wrappers, and auth link buttons.

---

## Tasks

### 4.1 Refactor Catalog Filter Checkbox Rows
- [ ] **Task 4.1.1**: Refactor checkbox row container in [`SidebarUIComponents.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/SidebarUIComponents.js) to use tokenized `AnimatedButton`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 4.1.2**: Ensure proper `accessibilityRole="checkbox"` and touch target padding in [`SidebarUIComponents.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/SidebarUIComponents.js). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 4.2 Standardize Product Quantity Selector
- [ ] **Task 4.2.1**: Refactor `-` decrease quantity button in `ProductQuantitySelector.js` to central `IconButton` (`size="sm"`). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 4.2.2**: Refactor `+` increase quantity button in `ProductQuantitySelector.js` to central `IconButton` (`size="sm"`). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 4.3 Standardize Card Touch Wrappers
- [ ] **Task 4.3.1**: Standardize card press scale animation in [`InteractiveCard.js`](file:///d:/Magazine/_PigmentShop/src/components/Card/InteractiveCard.js) using central `motion.press.scale`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 4.3.2**: Standardize favorite heart button overlay in [`InteractiveCard.js`](file:///d:/Magazine/_PigmentShop/src/components/Card/InteractiveCard.js) using central `IconButton`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 4.4 Standardize Auth Text Links
- [ ] **Task 4.4.1**: Refactor "Forgot password" link in [`LoginPageComponents.js`](file:///d:/Magazine/_PigmentShop/src/features/auth/LoginPageComponents.js) to use `Button` `ghost` variant. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 4.4.2**: Refactor "Sign up / Sign in" mode toggle link in [`LoginPage.js`](file:///d:/Magazine/_PigmentShop/src/features/auth/LoginPage.js) to use `Button` `ghost` variant. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
