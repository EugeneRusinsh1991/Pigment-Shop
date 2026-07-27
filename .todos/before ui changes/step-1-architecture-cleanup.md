# Step 1: Architecture Cleanup - Detailed Roadmap

This roadmap breaks down Step 1 (Architecture Stabilization) into small, manageable tasks for systematic execution.

---

## Dependency Overview

### Parallel Execution Opportunities

**Phase 1 (Audit & Analysis)** - ✅ **FULLY PARALLEL**
- All 5 subsections (1.1-1.5) can be executed simultaneously
- No dependencies between feature analyses
- Each feature analysis is independent

**Phase 2-5 (Hook Creation by Feature)** - ✅ **PARALLEL ACROSS FEATURES**
- Phase 2 (Cart), Phase 3 (Auth), Phase 4 (Catalog), Phase 5 (Product) can run in parallel
- Each feature is independent from others
- Within each phase: Hook creation must complete before component refactoring

**Phase 6 (Error Handling)** - ⚠️ **PARTIALLY PARALLEL**
- 6.1 (Audit) can run in parallel with Phase 2-5
- 6.2 (Create useErrorHandler) must wait for 6.1
- 6.3 (Update features) must wait for Phase 2-5 completion
- 6.4 (Verify) must wait for 6.3

**Phase 7-8 (Validation & Documentation)** - ⚠️ **SEQUENTIAL**
- Must wait for all previous phases to complete
- Phase 7 must complete before Phase 8

### Critical Path
1. Phase 1 (any order, all parallel)
2. Phase 2-5 (parallel across features, sequential within each)
3. Phase 6.2-6.4 (sequential)
4. Phase 7 (sequential)
5. Phase 8 (sequential)

---

## Phase 1: Audit & Analysis ✅ **COMPLETED**
**Model Recommendation:** 🟠 G 3.6 F (H) — 8d | 0f | +2ctx
**Findings Document:** `phase-1-audit-findings.md`

### 1.1 Analyze Cart Feature Logic ✅
- [x] Review `src/features/cart/CartView.js` - identify business logic mixed with UI
- [x] Review `src/features/cart/cartCheckoutLogic.js` - assess if extraction needed
- [x] Review `src/features/cart/CartItem.js` - identify logic to extract
- [x] Review `src/features/cart/CartSummary.js` - identify logic to extract
- [x] Document all logic patterns found in cart feature

### 1.2 Analyze Auth Feature Logic ✅  
- [x] Review `src/features/auth/LoginPage.js` - identify business logic mixed with UI
- [x] Review `src/features/auth/LoginPageComponents.js` - identify logic to extract
- [x] Check existing `src/hooks/useLoginForm.js` - assess completeness
- [x] Document all logic patterns found in auth feature

### 1.3 Analyze Catalog Feature Logic ✅
- [x] Review `src/features/catalog/CatalogPage.js` - identify business logic mixed with UI
- [x] Review `src/features/catalog/CatalogFilterSidebar.js` - identify logic to extract
- [x] Review `src/features/catalog/PriceRangeSlider.js` - identify logic to extract
- [x] Check existing `src/hooks/useCatalogFilters.js` - assess completeness
- [x] Check existing `src/hooks/usePaginatedCatalog.js` - assess completeness
- [x] Document all logic patterns found in catalog feature

### 1.4 Analyze Product Feature Logic ✅
- [x] Review `src/features/product/ProductPage.js` - identify business logic mixed with UI
- [x] Review `src/features/product/ProductInfoPanel.js` - identify logic to extract
- [x] Review `src/features/product/ProductReviews.js` - identify logic to extract
- [x] Check existing `src/hooks/useReviewsState.js` - assess completeness
- [x] Document all logic patterns found in product feature

### 1.5 Analyze Other Features (if needed) ✅
- [x] Review `src/features/home/` - identify logic to extract
- [x] Review `src/features/favorites/` - identify logic to extract
- [x] Review `src/features/profile/` - identify logic to extract
- [x] Review `src/features/orders/` - identify logic to extract
- [x] Document all logic patterns found in other features

---

## Phase 2: Hook Creation - Cart Feature
**Model Recommendation:** 🟠 G 3.6 F (H) — 2d | 4f | +2ctx

### 2.1 Create useCartLogic Hook ✅
- [x] Create `src/hooks/useCartLogic.js`
- [x] Extract cart operations (add, remove, update quantity)
- [x] Extract cart calculations (totals, counts)
- [x] Extract cart validation logic
- [x] Add error handling with ToastContext
- [x] Test hook independently

### 2.2 Create useCheckoutLogic Hook ✅
- [x] Create `src/hooks/useCheckoutLogic.js`
- [x] Extract checkout process from `cartCheckoutLogic.js`
- [x] Extract form validation logic
- [x] Extract order submission logic
- [x] Add error handling with ToastContext
- [x] Test hook independently

### 2.3 Refactor Cart Components ✅
- [x] Refactor `CartView.js` to use `useCartLogic`
- [x] Refactor `CartView.js` to use `useCheckoutLogic`
- [x] Remove inline logic from `CartItem.js`
- [x] Remove inline logic from `CartSummary.js`
- [x] Verify cart functionality still works

---

## Phase 3: Hook Creation - Auth Feature
**Model Recommendation:** 🟡 G 3.6 F (M) — 2d | 3f | +1ctx
**Priority:** Medium (Validation & Forms)

### 3.1 Create useAuthValidation Hook (from audit #7)
- [ ] Create `src/hooks/useAuthValidation.js`
- [ ] Extract email validation logic from `useLoginForm.js` (lines 56-59)
- [ ] Extract password validation logic from `useLoginForm.js` (lines 29-38)
- [ ] Extract confirm password matching logic from `useLoginForm.js` (lines 35-38)
- [ ] Add error handling with ToastContext
- [ ] Test hook independently

### 3.2 Enhance useLoginForm Hook
- [ ] Review existing `src/hooks/useLoginForm.js`
- [ ] Remove debug functions (lines 47-59) to separate file
- [ ] Ensure error handling uses ToastContext (currently inline state)
- [ ] Move error message mapping from `LoginPageComponents.js` (lines 80-90)
- [ ] Test hook independently

### 3.3 Refactor Auth Components
- [ ] Refactor `LoginPage.js` to use `useAuthValidation`
- [ ] Remove inline validation logic
- [ ] Remove inline error handling
- [ ] Verify auth functionality still works

---

## Phase 4: Hook Creation - Catalog Feature
**Model Recommendation:** 🟠 G 3.6 F (H) — 2d | 5f | +2ctx
**Priority:** High (Core Features)

### 4.1 Move useCatalogFilters Hook (audit relocation #1)
- [ ] Move `src/features/catalog/useCatalogFilters.js` → `src/hooks/useCatalogFilters.js`
- [ ] Update imports in `CatalogPage.js` and other consumers
- [ ] Ensure error handling uses ToastContext (replace console.error at line 97)
- [ ] Test hook independently

### 4.2 Move usePaginatedCatalog Hook (audit relocation #2)
- [ ] Move `src/features/catalog/usePaginatedCatalog.js` → `src/hooks/usePaginatedCatalog.js`
- [ ] Update imports in `CatalogPage.js` and other consumers
- [ ] Ensure error handling uses ToastContext (replace console.error at lines 97, 153)
- [ ] Test hook independently

### 4.3 Create useCatalogLayout Hook (audit #3)
- [ ] Create `src/hooks/useCatalogLayout.js`
- [ ] Extract `computeCols` function from `CatalogPage.js` (lines 29-31)
- [ ] Extract `computeCardWidth` function from `CatalogPage.js` (lines 33-35)
- [ ] Extract `useCatalogLayout` function from `CatalogPage.js` (lines 37-48)
- [ ] Extract responsive logic and grid calculations
- [ ] Test hook independently

### 4.4 Create usePriceRangeSlider Hook (audit #9 - Low Priority)
- [ ] Create `src/hooks/usePriceRangeSlider.js`
- [ ] Extract `useSliderPanResponders` from `PriceRangeSlider.js` (lines 12-52)
- [ ] Extract slider pan responder logic
- [ ] Test hook independently

### 4.5 Refactor Catalog Components
- [ ] Refactor `CatalogPage.js` to use `useCatalogLayout`
- [ ] Refactor `PriceRangeSlider.js` to use `usePriceRangeSlider`
- [ ] Remove inline layout logic from `CatalogPage.js`
- [ ] Remove memoized list header/footer logic (lines 125-148)
- [ ] Verify catalog functionality still works

---

## Phase 5: Hook Creation - Product Feature
**Model Recommendation:** � G 3.1 P (H) — 3d | 6f | +3ctx
**Priority:** High (Core Features)

### 5.1 Create useProductActions Hook (audit #4)
- [ ] Create `src/hooks/useProductActions.js`
- [ ] Extract `useProductActions` function from `ProductPage.js` (lines 17-25)
- [ ] Extract add to cart logic
- [ ] Extract favorite toggle logic
- [ ] Extract quantity management logic
- [ ] Add error handling with ToastContext
- [ ] Test hook independently

### 5.2 Create useProductNavigation Hook (audit #5)
- [ ] Create `src/hooks/useProductNavigation.js`
- [ ] Extract `useBackHandler` function from `ProductPage.js` (lines 76-86)
- [ ] Extract navigation logic from `ProductPageHeader` (lines 27-39)
- [ ] Test hook independently

### 5.3 Create useProductPageState Hook (audit #6)
- [ ] Create `src/hooks/useProductPageState.js`
- [ ] Extract `useProductPageState` function from `ProductPage.js` (lines 88-122)
- [ ] Extract `resolveProduct` function from `ProductPage.js` (lines 71-86)
- [ ] Extract product page state management
- [ ] Test hook independently

### 5.4 Move useReviewsState Hook (audit relocation #3)
- [ ] Move `src/features/product/useReviewsState.js` → `src/hooks/useReviewsState.js`
- [ ] Update imports in `ProductPage.js` and `ProductReviews.js`
- [ ] Ensure error handling uses ToastContext (replace console.error at line 71)
- [ ] Test hook independently

### 5.5 Extract getTabData Utility (audit #5)
- [ ] Extract `getTabData` function from `ProductReviews.js` (lines 24-32)
- [ ] Move to utility file or hook
- [ ] Update imports in `ProductReviews.js`

### 5.6 Refactor Product Components
- [ ] Refactor `ProductPage.js` to use `useProductActions`
- [ ] Refactor `ProductPage.js` to use `useProductNavigation`
- [ ] Refactor `ProductPage.js` to use `useProductPageState`
- [ ] Remove inline action logic
- [ ] Remove inline state management
- [ ] Verify product functionality still works

---

## Phase 6: Hook Creation - Other Features
**Model Recommendation:** 🟡 G 3.6 F (M) — 3d | 3f | +1ctx
**Priority:** Medium (Validation & Forms)

### 6.1 Create useProfileForm Hook (audit #8)
- [ ] Create `src/hooks/useProfileForm.js`
- [ ] Extract `useProfileForm` function from `ProfilePage.js` (lines 27-56)
- [ ] Extract `getVal` function from `ProfilePage.js` (lines 13-15)
- [ ] Extract `mapProfileToForm` function from `ProfilePage.js` (lines 17-25)
- [ ] Extract form state and save logic
- [ ] Add error handling with ToastContext (already uses it)
- [ ] Test hook independently

### 6.2 Create useOrdersPagination Hook (audit #10 - Low Priority)
- [ ] Create `src/hooks/useOrdersPagination.js`
- [ ] Extract pagination calculation from `OrdersPage.js` (lines 62-63)
- [ ] Extract pagination logic from `OrdersList` component (lines 17-52)
- [ ] Test hook independently

### 6.3 Extract HeroCarousel Style Calculations (Low Priority)
- [ ] Extract style calculation functions from `HeroCarousel.js` (lines 35-50)
- [ ] Move to utility file or hook
- [ ] Update imports in `HeroCarousel.js`

### 6.4 Refactor Other Feature Components
- [ ] Refactor `ProfilePage.js` to use `useProfileForm`
- [ ] Refactor `OrdersPage.js` to use `useOrdersPagination`
- [ ] Refactor `HeroCarousel.js` to use style utility
- [ ] Verify other features functionality still works

---

## Phase 7: Error Handling Standardization
**Model Recommendation:** 🔴 G 3.1 P (H) — 8d | 6f | +3ctx

### 7.1 Audit Error Handling Patterns
- [ ] Search for all `try/catch` blocks in features
- [ ] Search for all `console.error` calls (already found in audit)
- [ ] Search for all inline error displays
- [ ] Document current error handling patterns (already in audit)

### 7.2 Create useErrorHandler Hook
- [ ] Create `src/hooks/useErrorHandler.js`
- [ ] Standardize API error handling
- [ ] Standardize validation error handling
- [ ] Integrate with ToastContext
- [ ] Add fallback error messages
- [ ] Test hook independently

### 7.3 Update All Features with Standard Error Handling
- [ ] Update cart feature to use `useErrorHandler`
- [ ] Update auth feature to use `useErrorHandler`
- [ ] Update catalog feature to use `useErrorHandler` (replace console.error)
- [ ] Update product feature to use `useErrorHandler` (replace console.error)
- [ ] Update other features to use `useErrorHandler`

### 7.4 Verify No Unhandled Errors
- [ ] Test all API calls trigger proper error messages
- [ ] Test all form validations show proper errors
- [ ] Test network errors are handled gracefully
- [ ] Ensure no `Unhandled Rejection` errors
- [ ] Ensure no `TypeError` leaks to UI

---

## Phase 8: Validation & Testing
**Model Recommendation:** 🔴 G 3.1 P (H) — 10d | 0f | +5ctx

### 8.1 Build Verification
- [ ] Run build command
- [ ] Fix any build errors
- [ ] Ensure no missing imports
- [ ] Ensure no circular dependencies

### 8.2 Functional Testing
- [ ] Test cart flow (add, remove, checkout)
- [ ] Test auth flow (login, register, logout)
- [ ] Test catalog flow (filters, pagination, sorting)
- [ ] Test product flow (view, add to cart, favorites)
- [ ] Test error scenarios (network failure, invalid inputs)

### 8.3 Code Quality Check
- [ ] Verify all hooks are in `src/hooks/`
- [ ] Verify no logic remains in UI components
- [ ] Verify consistent error handling
- [ ] Verify consistent naming conventions

---

## Phase 9: Documentation
**Model Recommendation:** � G 3.6 F (M) — 2d | 2f | +0ctx

### 9.1 Update Documentation
- [ ] Document all new hooks created
- [ ] Document hook usage patterns
- [ ] Document error handling strategy
- [ ] Update any relevant README files

### 9.2 Cleanup
- [ ] Remove any unused utility files
- [ ] Remove any commented-out code
- [ ] Ensure consistent file naming
- [ ] Final code review

---

## Success Criteria

✅ All business logic extracted from UI components into hooks
✅ All hooks located in `src/hooks/` directory
✅ Consistent error handling via ToastContext across all features
✅ No technical errors visible to users
✅ Build compiles without errors
✅ All features function correctly after refactoring
