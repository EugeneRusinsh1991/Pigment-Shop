# Phase 4: Hook Creation - Catalog Feature

**Model Recommendation:** 🟠 G 3.6 F (H) — 2d | 5f | +2ctx  
**Priority:** High (Core Features)  
**Status:** ⏳ PENDING

## Overview
Move existing catalog hooks to proper location and extract layout calculations.

---

## Tasks

### 4.1 Move useCatalogFilters Hook (audit relocation #1)
- [ ] Move `src/features/catalog/useCatalogFilters.js` → `src/hooks/useCatalogFilters.js`
- [ ] Update imports in `CatalogPage.js` and other consumers
- [ ] Ensure error handling uses ToastContext (replace console.error at line 97)
- [ ] Test hook independently

**Source:** `src/features/catalog/useCatalogFilters.js`  
**Target:** `src/hooks/useCatalogFilters.js`

### 4.2 Move usePaginatedCatalog Hook (audit relocation #2)
- [ ] Move `src/features/catalog/usePaginatedCatalog.js` → `src/hooks/usePaginatedCatalog.js`
- [ ] Update imports in `CatalogPage.js` and other consumers
- [ ] Ensure error handling uses ToastContext (replace console.error at lines 97, 153)
- [ ] Test hook independently

**Source:** `src/features/catalog/usePaginatedCatalog.js`  
**Target:** `src/hooks/usePaginatedCatalog.js`

### 4.3 Create useCatalogLayout Hook (audit #3)
- [ ] Create `src/hooks/useCatalogLayout.js`
- [ ] Extract `computeCols` function from `CatalogPage.js` (lines 29-31)
- [ ] Extract `computeCardWidth` function from `CatalogPage.js` (lines 33-35)
- [ ] Extract `useCatalogLayout` function from `CatalogPage.js` (lines 37-48)
- [ ] Extract responsive logic and grid calculations
- [ ] Test hook independently

**Source file:** `src/features/catalog/CatalogPage.js`  
**Target file:** `src/hooks/useCatalogLayout.js`

### 4.4 Create usePriceRangeSlider Hook (audit #9 - Low Priority)
- [ ] Create `src/hooks/usePriceRangeSlider.js`
- [ ] Extract `useSliderPanResponders` from `PriceRangeSlider.js` (lines 12-52)
- [ ] Extract slider pan responder logic
- [ ] Test hook independently

**Source file:** `src/features/catalog/PriceRangeSlider.js`  
**Target file:** `src/hooks/usePriceRangeSlider.js`

### 4.5 Refactor Catalog Components
- [ ] Refactor `CatalogPage.js` to use `useCatalogLayout`
- [ ] Refactor `PriceRangeSlider.js` to use `usePriceRangeSlider`
- [ ] Remove inline layout logic from `CatalogPage.js`
- [ ] Remove memoized list header/footer logic (lines 125-148)
- [ ] Verify catalog functionality still works

**Target files:**
- `src/features/catalog/CatalogPage.js`
- `src/features/catalog/PriceRangeSlider.js`

---

## Notes
- Two existing hooks need relocation from features to hooks directory
- console.error calls need replacement with ToastContext
- Layout calculations are currently inline in CatalogPage.js
