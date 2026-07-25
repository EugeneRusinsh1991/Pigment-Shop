# Button Inventory & Project-Wide Standardization Audit

## Executive Summary
This document provides a comprehensive inventory of all main action buttons across the PigmentShop application. The primary objective is ensuring **100% visual and geometric consistency** across all main screen action buttons (height, border radius, padding, typography, hover opacity, and spring press animations).

---

## Design System Tokens & Standard Specifications

All standard action buttons must derive their geometry, typography, and motion from central theme tokens in [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):

| Size Token | Height | Border Radius (Standard) | Border Radius (Pill) | Padding Horizontal | Font Size | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `lg` | **48px** | `16px` (`layout.radii.md`) | `24px` | `24px` | `14px` | Main CTA / Hero / Page Submit / Checkout |
| `md` | **40px** | `8px` (`layout.radii.sm`) | `20px` | `16px` | `13px` | Form Actions / Modal Controls / Filter Apply |
| `sm` | **32px** | `6px` (`layout.radii.xs`) | `16px` | `12px` | `12px` | Compact Admin Rows / Inline Table Actions |

### Motion & Interactions
- **Press Animation**: `Animated.sequence([Animated.timing(scaleTo: 1.1), Animated.spring(friction: 4, tension: 40)])`
- **Active Opacity**: `0.85`

---

## Comprehensive Button Inventory Across Project

### 1. Storefront & Primary Pages
- **Home Page Hero ("Go to Catalog" / `heroBtn`)**:
  - **File**: [`src/features/catalog/CatalogHeader.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogHeader.js)
  - **Previous State**: Custom `AnimatedButton` bypassing `Button` primitive (`borderRadius: 50`, `paddingVertical: 14`).
  - **Target Standard**: `<Button title={t.heroBtn} variant="accent" size="lg" />` (Height: 48px, Radius: 16px, Accent fill, spring animation).
- **Product Detail ("Add to Cart" / "Go to Cart")**:
  - **File**: [`src/features/product/ProductInfoSubcomponents.js`](file:///d:/Magazine/_PigmentShop/src/features/product/ProductInfoSubcomponents.js)
  - **Status**: Standardized via `<Button variant={isInCart ? 'accent' : 'primary'} size="lg" />`.
- **Product Detail Review Form ("Submit Review" / "Leave Comment")**:
  - **File**: [`src/features/product/ProductReviewSubcomponents.js`](file:///d:/Magazine/_PigmentShop/src/features/product/ProductReviewSubcomponents.js)
  - **Previous State**: Custom `AnimatedButton` with inline `styles.submitBtn` (`height: 44px`, `borderRadius: 50px`).
  - **Target Standard**: `<Button title={config.submitLabel} variant="accent" size="lg" fullWidth />` (Height: 48px, Radius: 16px, Accent fill).
- **Cart Summary ("Checkout")**:
  - **File**: [`src/features/cart/CartSummary.js`](file:///d:/Magazine/_PigmentShop/src/features/cart/CartSummary.js)
  - **Status**: Standardized via `<Button variant="primary" size="lg" />`.
- **Order Confirmation ("Back to Catalog" / "OK")**:
  - **File**: [`src/features/orders/OrderConfirmationPage.js`](file:///d:/Magazine/_PigmentShop/src/features/orders/OrderConfirmationPage.js)
  - **Status**: Standardized via `<Button variant="primary" size="lg" />`.
- **Contact Form ("Send Question")**:
  - **File**: [`src/features/contact/ContactQuestionForm.js`](file:///d:/Magazine/_PigmentShop/src/features/contact/ContactQuestionForm.js)
  - **Status**: Standardized via `<Button variant="accent" size="lg" />`.
- **Social Contact Buttons (Instagram, Telegram)**:
  - **File**: [`src/features/contact/SocialButtons.js`](file:///d:/Magazine/_PigmentShop/src/features/contact/SocialButtons.js)
  - **Status**: Standardized via `<Button variant="outline" size="lg" />`.
- **Auth Page ("Sign in with Google", "Log in", "Register")**:
  - **File**: [`src/features/auth/LoginPage.js`](file:///d:/Magazine/_PigmentShop/src/features/auth/LoginPage.js)
  - **Status**: Standardized via `<Button variant="outline" size="md" />` and `<Button variant="primary" size="lg" />`.
- **Profile Form ("Save Profile")**:
  - **File**: [`src/features/profile/ProfileFormCard.js`](file:///d:/Magazine/_PigmentShop/src/features/profile/ProfileFormCard.js)
  - **Status**: Standardized via `<Button variant="primary" size="md" />`.

### 2. Modals & Overlay Drawers
- **Confirmation Dialogs ("Cancel" / "Confirm")**:
  - **File**: [`src/components/Modal/ConfirmationModal.js`](file:///d:/Magazine/_PigmentShop/src/components/Modal/ConfirmationModal.js)
  - **Status**: Standardized via `<Button variant="secondary" size="md" />` and `<Button variant={confirmVariant} size="md" />`.
- **Filter Drawer ("Apply Filter" / "Reset Filter")**:
  - **File**: [`src/features/catalog/SidebarUIComponents.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/SidebarUIComponents.js)
  - **Status**: Standardized via `<Button variant="accent" size="md" />` and `<Button variant="primary" size="md" />`.

### 3. Admin Workspace
- **Save Changes Footer**: [`src/components/Admin/shared/AdminSaveFooter.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/shared/AdminSaveFooter.js) -> `<Button variant="accent" size="md" />`
- **Product Edit Modal**: [`src/components/Admin/Products/ProductFormModal.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductFormModal.js) -> `<Button variant="accent" size="md" />`
- **Category Footer**: [`src/components/Admin/Categories/CategoryFormFooter.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryFormFooter.js) -> `<Button variant="accent" size="md" />`
- **Add Product Button**: [`src/components/Admin/Products/ProductsFilterBar.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductsFilterBar.js) -> `<Button variant="accent" size="md" />`
- **Media Upload Button**: [`src/components/Admin/Media/MediaBrowserComponents.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Media/MediaBrowserComponents.js) -> `<Button variant="accent" size="md" />`

---

## Action Plan & Modifications

1. **Standardize `CatalogHeader.js`**: Refactor `heroBtn` to use central `<Button variant="accent" size="lg" title={t.heroBtn} />`.
2. **Standardize `ProductReviewSubcomponents.js`**: Refactor `submitBtn` to use central `<Button variant="accent" size="lg" title={config.submitLabel} fullWidth />`.
