# Phase 5: Hook Creation - Product Feature

**Model Recommendation:** 🔴 G 3.1 P (H) — 3d | 6f | +3ctx  
**Priority:** High (Core Features)  
**Status:** ⏳ PENDING

## Overview
Extract complex product page logic into multiple hooks. This is the most complex phase.

---

## Tasks

### 5.1 Create useProductActions Hook (audit #4)
- [ ] Create `src/hooks/useProductActions.js`
- [ ] Extract `useProductActions` function from `ProductPage.js` (lines 17-25)
- [ ] Extract add to cart logic
- [ ] Extract favorite toggle logic
- [ ] Extract quantity management logic
- [ ] Add error handling with ToastContext
- [ ] Test hook independently

**Source file:** `src/features/product/ProductPage.js`  
**Target file:** `src/hooks/useProductActions.js`

### 5.2 Create useProductNavigation Hook (audit #5)
- [ ] Create `src/hooks/useProductNavigation.js`
- [ ] Extract `useBackHandler` function from `ProductPage.js` (lines 76-86)
- [ ] Extract navigation logic from `ProductPageHeader` (lines 27-39)
- [ ] Test hook independently

**Source file:** `src/features/product/ProductPage.js`  
**Target file:** `src/hooks/useProductNavigation.js`

### 5.3 Create useProductPageState Hook (audit #6)
- [ ] Create `src/hooks/useProductPageState.js`
- [ ] Extract `useProductPageState` function from `ProductPage.js` (lines 88-122)
- [ ] Extract `resolveProduct` function from `ProductPage.js` (lines 71-86)
- [ ] Extract product page state management
- [ ] Test hook independently

**Source file:** `src/features/product/ProductPage.js`  
**Target file:** `src/hooks/useProductPageState.js`

### 5.4 Move useReviewsState Hook (audit relocation #3)
- [ ] Move `src/features/product/useReviewsState.js` → `src/hooks/useReviewsState.js`
- [ ] Update imports in `ProductPage.js` and `ProductReviews.js`
- [ ] Ensure error handling uses ToastContext (replace console.error at line 71)
- [ ] Test hook independently

**Source:** `src/features/product/useReviewsState.js`  
**Target:** `src/hooks/useReviewsState.js`

### 5.5 Extract getTabData Utility (audit #5)
- [ ] Extract `getTabData` function from `ProductReviews.js` (lines 24-32)
- [ ] Move to utility file or hook
- [ ] Update imports in `ProductReviews.js`

**Source file:** `src/features/product/ProductReviews.js`

### 5.6 Refactor Product Components
- [ ] Refactor `ProductPage.js` to use `useProductActions`
- [ ] Refactor `ProductPage.js` to use `useProductNavigation`
- [ ] Refactor `ProductPage.js` to use `useProductPageState`
- [ ] Remove inline action logic
- [ ] Remove inline state management
- [ ] Verify product functionality still works

**Target file:** `src/features/product/ProductPage.js`

---

## Notes
- ProductPage.js has the most inline logic of any component
- Three separate hooks needed to properly separate concerns
- This phase requires high-tier model due to complexity
