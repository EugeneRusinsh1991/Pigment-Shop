# Phase 2: Hook Creation - Cart Feature

**Model Recommendation:** 🟠 G 3.6 F (H) — 2d | 4f | +2ctx  
**Priority:** High (Core Features)  
**Status:** ✅ COMPLETED

## Overview
Extract cart business logic from UI components into dedicated hooks with proper error handling.

---

## Tasks

### 2.1 Create useCartLogic Hook ✅
- [x] Create `src/hooks/useCartLogic.js`
- [x] Extract cart operations (add, remove, update quantity)
- [x] Extract cart calculations (totals, counts)
- [x] Extract cart validation logic
- [x] Add error handling with ToastContext
- [x] Test hook independently

**Created file:** `src/hooks/useCartLogic.js`  
**Functions extracted:** `increaseQty`, `decreaseQty`, `removeItem`, `addToCart`, `calculateItemSubtotal`, `calculateTotals`

### 2.2 Create useCheckoutLogic Hook ✅
- [x] Create `src/hooks/useCheckoutLogic.js`
- [x] Extract checkout process from `cartCheckoutLogic.js`
- [x] Extract form validation logic
- [x] Extract order submission logic
- [x] Add error handling with ToastContext
- [x] Test hook independently

**Created file:** `src/hooks/useCheckoutLogic.js`  
**Functions extracted:** `handleCheckoutProcess`, `calculateTotals`, `validateCheckoutForm`

### 2.3 Refactor Cart Components ✅
- [x] Refactor `CartView.js` to use `useCartLogic`
- [x] Refactor `CartView.js` to use `useCheckoutLogic`
- [x] Remove inline logic from `CartItem.js`
- [x] Remove inline logic from `CartSummary.js`
- [x] Verify cart functionality still works

**Files modified:**
- `src/features/cart/CartView.js` - Updated imports and hook usage
- `src/features/cart/CartItem.js` - Updated to use `calculateItemSubtotal` from hook
- `src/features/cart/CartSummary.js` - Extracted form field configuration to constant

---

## Notes
- All cart operations now use ToastContext for error handling
- Form validation moved to `useCheckoutLogic` hook
- Subtotal calculations centralized in `useCartLogic`
- Original `cartCheckoutLogic.js` can be removed after verification
