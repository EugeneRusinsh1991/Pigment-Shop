# Feature Specification: Cart Module (`src/features/cart/`)

> [!NOTE]
> Specification for shopping cart management, item quantity controls, pricing summary calculations, and checkout preparation.

---

## 1. Domain Responsibility

The **Cart Feature** provides shopping cart functionality for store visitors:
- **Cart Line Items (`CartItem.js`)**: Item thumbnail, variant title, unit price, quantity increment/decrement, remove control.
- **Cart Summary (`CartSummary.js`)**: Subtotal, estimated shipping, tax calculations, promo code application, checkout CTA button.
- **Cart Drawer / View (`CartView.js`)**: Slide-over drawer and full page cart layout.
- **Checkout Preparation (`cartCheckoutLogic.js`)**: Cart payload validation before handing off to order creation.

---

## 2. Directory Layout

```text
src/features/cart/
├── CartView.js              # Main cart container (drawer or standalone page)
├── CartViewContent.js       # Inner content layout for cart items and summary
├── CartItem.js              # Individual cart line item component
├── CartSummary.js           # Subtotal & checkout action card
├── CartViewStyles.js        # Cart styling definitions
├── cartCheckoutLogic.js     # Checkout preparation & validation helpers
└── index.js                 # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as CartView } from './CartView';
export { default as CartSummary } from './CartSummary';
```
