# Feature Specification: Orders Module (`src/features/orders/`)

> [!NOTE]
> Specification for customer order placement, checkout forms, order history listing, and order status tracking screens.

---

## 1. Domain Responsibility

The **Orders Feature** handles the purchase completion and order tracking workflow:
- **Checkout Process (`CheckoutPage.js`, `ShippingForm.js`, `PaymentSelector.js`)**: Multi-step checkout form collecting shipping addresses and payment choices.
- **Order History (`OrderHistoryPage.js`, `OrderCard.js`)**: List of past orders with status badges (Pending, Processing, Completed, Cancelled).
- **Order Details (`OrderDetailView.js`)**: Full invoice view, purchased line items, delivery tracking link.

---

## 2. Directory Layout

```text
src/features/orders/
├── CheckoutPage.js          # Checkout flow root screen
├── OrderHistoryPage.js      # Customer order history screen
├── OrderDetailView.js       # Detailed order view / receipt screen
├── ShippingForm.js          # Customer delivery address form
├── PaymentSelector.js       # Payment method selection component
├── OrderCard.js             # Order summary item card
├── useOrders.js             # Order fetching & status polling hook
└── index.js                 # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as CheckoutPage } from './CheckoutPage';
export { default as OrderHistoryPage } from './OrderHistoryPage';
export { default as OrderDetailView } from './OrderDetailView';
```
