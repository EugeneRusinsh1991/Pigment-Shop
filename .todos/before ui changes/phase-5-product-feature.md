# Phase 5: Hook Creation - Product Feature

**Model Recommendation:** 🔴 G 3.1 P (H) — 3d | 6f | +3ctx  
**Priority:** High (Core Features)  
**Status:** ⏳ PENDING

## Overview
Extract complex product page logic into multiple hooks. This is the most complex phase.

---

## Tasks

### 5.1 Create useProductActions Hook (audit #4)
**Model Recommendation:** 🟡 G 3.6 F (M) — 1d | 2f | +1ctx

- [ ] 5.1.1 Create `src/hooks/useProductActions.js`
- [ ] 5.1.2 Extract `useProductActions` function from `ProductPage.js` (lines 17-25)
- [ ] 5.1.3 Extract add to cart logic
- [ ] 5.1.4 Extract favorite toggle logic
- [ ] 5.1.5 Extract quantity management logic
- [ ] 5.1.6 Add error handling with ToastContext
- [ ] 5.1.7 Test hook independently

**Source file:** `src/features/product/ProductPage.js`  
**Target file:** `src/hooks/useProductActions.js`

### 5.2 Create useProductNavigation Hook (audit #5)
**Model Recommendation:** 🟢 G 3.6 F (L) — 1d | 2f | +0ctx

- [ ] 5.2.1 Create `src/hooks/useProductNavigation.js`
- [ ] 5.2.2 Extract `useBackHandler` function from `ProductPage.js` (lines 76-86)
- [ ] 5.2.3 Extract navigation logic from `ProductPageHeader` (lines 27-39)
- [ ] 5.2.4 Test hook independently

**Source file:** `src/features/product/ProductPage.js`  
**Target file:** `src/hooks/useProductNavigation.js`

### 5.3 Create useProductPageState Hook (audit #6)
**Model Recommendation:** 🟢 G 3.6 F (L) — 1d | 2f | +0ctx

- [ ] 5.3.1 Create `src/hooks/useProductPageState.js`
- [ ] 5.3.2 Extract `useProductPageState` function from `ProductPage.js` (lines 88-122)
- [ ] 5.3.3 Extract `resolveProduct` function from `ProductPage.js` (lines 71-86)
- [ ] 5.3.4 Extract product page state management
- [ ] 5.3.5 Test hook independently

**Source file:** `src/features/product/ProductPage.js`  
**Target file:** `src/hooks/useProductPageState.js`

### 5.4 Move useReviewsState Hook (audit relocation #3)
**Model Recommendation:** 🟡 G 3.6 F (M) — 1d | 2f | +1ctx

- [ ] 5.4.1 Move file `src/features/product/useReviewsState.js` → `src/hooks/useReviewsState.js`
- [ ] 5.4.2 Update imports in `ProductPage.js`
- [ ] 5.4.3 Update imports in `ProductReviews.js`
- [ ] 5.4.4 Replace console.error with ToastContext at line 71
- [ ] 5.4.5 Test hook independently

**Source:** `src/features/product/useReviewsState.js`  
**Target:** `src/hooks/useReviewsState.js`

### 5.5 Extract getTabData Utility (audit #5)
**Model Recommendation:** 🟢 G 3.6 F (L) — 1d | 2f | +0ctx

- [ ] 5.5.1 Extract `getTabData` function from `ProductReviews.js` (lines 24-32)
- [ ] 5.5.2 Move to utility file or hook
- [ ] 5.5.3 Update imports in `ProductReviews.js`

**Source file:** `src/features/product/ProductReviews.js`

### 5.6 Refactor Product Components
**Model Recommendation:** 🟡 G 3.6 F (M) — 1d | 1f | +3ctx

- [ ] 5.6.1 Refactor `ProductPage.js` to use `useProductActions`
- [ ] 5.6.2 Refactor `ProductPage.js` to use `useProductNavigation`
- [ ] 5.6.3 Refactor `ProductPage.js` to use `useProductPageState`
- [ ] 5.6.4 Remove inline action logic
- [ ] 5.6.5 Remove inline state management
- [ ] 5.6.6 Verify product functionality still works

**Target file:** `src/features/product/ProductPage.js`

---

## Notes
- ProductPage.js has the most inline logic of any component
- Three separate hooks needed to properly separate concerns
- This phase requires high-tier model due to complexity
