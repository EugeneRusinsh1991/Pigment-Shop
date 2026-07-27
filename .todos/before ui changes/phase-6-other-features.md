# Phase 6: Hook Creation - Other Features

**Model Recommendation:** 🟡 G 3.6 F (M) — 3d | 3f | +1ctx  
**Priority:** Medium (Validation & Forms)  
**Status:** ⏳ PENDING

## Overview
Extract form logic from profile and orders features, plus style calculations from carousel.

---

## Tasks

### 6.1 Create useProfileForm Hook (audit #8)
- [ ] Create `src/hooks/useProfileForm.js`
- [ ] Extract `useProfileForm` function from `ProfilePage.js` (lines 27-56)
- [ ] Extract `getVal` function from `ProfilePage.js` (lines 13-15)
- [ ] Extract `mapProfileToForm` function from `ProfilePage.js` (lines 17-25)
- [ ] Extract form state and save logic
- [ ] Add error handling with ToastContext (already uses it)
- [ ] Test hook independently

**Source file:** `src/features/profile/ProfilePage.js`  
**Target file:** `src/hooks/useProfileForm.js`

### 6.2 Create useOrdersPagination Hook (audit #10 - Low Priority)
- [ ] Create `src/hooks/useOrdersPagination.js`
- [ ] Extract pagination calculation from `OrdersPage.js` (lines 62-63)
- [ ] Extract pagination logic from `OrdersList` component (lines 17-52)
- [ ] Test hook independently

**Source file:** `src/features/orders/OrdersPage.js`  
**Target file:** `src/hooks/useOrdersPagination.js`

### 6.3 Extract HeroCarousel Style Calculations (Low Priority)
- [ ] Extract style calculation functions from `HeroCarousel.js` (lines 35-50)
- [ ] Move to utility file or hook
- [ ] Update imports in `HeroCarousel.js`

**Source file:** `src/features/home/components/HeroCarousel.js`  
**Target:** `src/utils/carouselStyles.js` or `src/hooks/useCarouselStyles.js`

### 6.4 Refactor Other Feature Components
- [ ] Refactor `ProfilePage.js` to use `useProfileForm`
- [ ] Refactor `OrdersPage.js` to use `useOrdersPagination`
- [ ] Refactor `HeroCarousel.js` to use style utility
- [ ] Verify other features functionality still works

**Target files:**
- `src/features/profile/ProfilePage.js`
- `src/features/orders/OrdersPage.js`
- `src/features/home/components/HeroCarousel.js`

---

## Notes
- ProfilePage already uses ToastContext for errors
- FavoritesPage needs no extraction (already well-structured)
- OrdersPage has simple pagination logic
- HeroCarousel style calculations are low priority
