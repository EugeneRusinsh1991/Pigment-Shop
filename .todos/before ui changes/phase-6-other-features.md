# Phase 6: Hook Creation - Other Features

**Model Recommendation:** 🟡 G 3.6 F (M) — 3d | 3f | +1ctx  
**Priority:** Medium (Validation & Forms)  
**Status:** ⏳ PENDING

## Overview
Extract form logic from profile and orders features, plus style calculations from carousel.

---

## Tasks

### 6.1 Create useProfileForm Hook (audit #8)
**Model Recommendation:** 🟡 G 3.6 F (M) — 2f | +2r
- [x] Create `src/hooks/useProfileForm.js`
- [x] Extract `useProfileForm` function from `ProfilePage.js` (lines 27-56)
- [x] Extract `getVal` function from `ProfilePage.js` (lines 13-15)
- [x] Extract `mapProfileToForm` function from `ProfilePage.js` (lines 17-25)
- [x] Extract form state and save logic
- [x] Add error handling with ToastContext (already uses it)
- [ ] Test hook independently

**Source file:** `src/features/profile/ProfilePage.js`
**Target file:** `src/hooks/useProfileForm.js`

**UI Location:** Profile page (edit profile form)
**What to check:** First name, last name, phone, city fields and save button functionality
**File:** `src/features/profile/ProfilePage.js` lines 88-104

### 6.2 Create useOrdersPagination Hook (audit #10 - Low Priority)
**Model Recommendation:** 🟡 G 3.6 F (M) — 2f | +2r
- [x] Create `src/hooks/useOrdersPagination.js`
- [x] Extract pagination calculation from `OrdersPage.js` (lines 62-63)
- [x] Extract pagination logic from `OrdersList` component (lines 17-52)
- [ ] Test hook independently

**Source file:** `src/features/orders/OrdersPage.js`
**Target file:** `src/hooks/useOrdersPagination.js`

**UI Location:** Orders page (order history list)
**What to check:** Pagination controls (prev/next buttons, page numbers) at bottom of orders list
**File:** `src/features/orders/OrdersPage.js` lines 41-49 (CatalogPagination component)

### 6.3 Extract HeroCarousel Style Calculations (Low Priority)
**Model Recommendation:** 🟡 G 3.6 F (M) — 2f | +1r
- [ ] Extract style calculation functions from `HeroCarousel.js` (lines 35-50)
- [ ] Move to utility file or hook
- [ ] Update imports in `HeroCarousel.js`

**Source file:** `src/features/home/components/HeroCarousel.js`
**Target:** `src/utils/carouselStyles.js` or `src/hooks/useCarouselStyles.js`

**UI Location:** Home page (hero banner carousel)
**What to check:** Carousel width, positioning, and background styling on different screen sizes
**File:** `src/features/home/components/HeroCarousel.js` lines 35-50 (style functions)

### 6.4 Refactor Other Feature Components
**Model Recommendation:** 🟡 G 3.6 F (M) — 3f | +3r
- [x] Refactor `ProfilePage.js` to use `useProfileForm`
- [x] Refactor `OrdersPage.js` to use `useOrdersPagination`
- [ ] Refactor `HeroCarousel.js` to use style utility
- [ ] Verify other features functionality still works

**Target files:**
- `src/features/profile/ProfilePage.js`
- `src/features/orders/OrdersPage.js`
- `src/features/home/components/HeroCarousel.js`

**UI Locations:** All three pages above
**What to check:** Same functionality should work identically after refactoring

---

## Notes
- ProfilePage already uses ToastContext for errors
- FavoritesPage needs no extraction (already well-structured)
- OrdersPage has simple pagination logic
- HeroCarousel style calculations are low priority
