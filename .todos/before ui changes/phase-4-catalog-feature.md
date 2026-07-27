# Phase 4: Hook Creation - Catalog Feature

**Model Recommendation:** 🟠 G 3.6 F (H) — 2d | 5f | +2ctx  
**Priority:** High (Core Features)  
**Status:** ⏳ PENDING

## Overview
Move existing catalog hooks to proper location and extract layout calculations.

---

## Tasks

### 4.1 Move useCatalogFilters Hook (audit relocation #1)
**Model Recommendation:** 🟢 G 3.6 F (L) — 1d | 2f | +1ctx

- [ ] 4.1.1 Move file `src/features/catalog/useCatalogFilters.js` → `src/hooks/useCatalogFilters.js`
- [ ] 4.1.2 Update imports in `CatalogPage.js`
- [ ] 4.1.3 Update imports in other consumers (search for usage)
- [ ] 4.1.4 Replace console.error with ToastContext at line 97
- [ ] 4.1.5 Test hook independently

**Source:** `src/features/catalog/useCatalogFilters.js`  
**Target:** `src/hooks/useCatalogFilters.js`

### 4.2 Move usePaginatedCatalog Hook (audit relocation #2)
**Model Recommendation:** 🟢 G 3.6 F (L) — 1d | 2f | +1ctx

- [ ] 4.2.1 Move file `src/features/catalog/usePaginatedCatalog.js` → `src/hooks/usePaginatedCatalog.js`
- [ ] 4.2.2 Update imports in `CatalogPage.js`
- [ ] 4.2.3 Update imports in other consumers (search for usage)
- [ ] 4.2.4 Replace console.error with ToastContext at lines 97, 153
- [ ] 4.2.5 Test hook independently

**Source:** `src/features/catalog/usePaginatedCatalog.js`  
**Target:** `src/hooks/usePaginatedCatalog.js`

### 4.3 Create useCatalogLayout Hook (audit #3)
**Model Recommendation:** 🟢 G 3.6 F (L) — 1d | 2f | +0ctx

- [ ] 4.3.1 Create `src/hooks/useCatalogLayout.js`
- [ ] 4.3.2 Extract `computeCols` function from `CatalogPage.js` (lines 29-31)
- [ ] 4.3.3 Extract `computeCardWidth` function from `CatalogPage.js` (lines 33-35)
- [ ] 4.3.4 Extract `useCatalogLayout` function from `CatalogPage.js` (lines 37-48)
- [ ] 4.3.5 Extract responsive logic and grid calculations
- [ ] 4.3.6 Test hook independently

**Source file:** `src/features/catalog/CatalogPage.js`  
**Target file:** `src/hooks/useCatalogLayout.js`

### 4.4 Create usePriceRangeSlider Hook (audit #9 - Low Priority)
**Model Recommendation:** 🟢 G 3.6 F (L) — 1d | 2f | +0ctx

- [ ] 4.4.1 Create `src/hooks/usePriceRangeSlider.js`
- [ ] 4.4.2 Extract `useSliderPanResponders` from `PriceRangeSlider.js` (lines 12-52)
- [ ] 4.4.3 Extract slider pan responder logic
- [ ] 4.4.4 Test hook independently

**Source file:** `src/features/catalog/PriceRangeSlider.js`  
**Target file:** `src/hooks/usePriceRangeSlider.js`

### 4.5 Refactor Catalog Components
**Model Recommendation:** 🟡 G 3.6 F (M) — 1d | 2f | +2ctx

- [ ] 4.5.1 Refactor `CatalogPage.js` to use `useCatalogLayout`
- [ ] 4.5.2 Refactor `PriceRangeSlider.js` to use `usePriceRangeSlider`
- [ ] 4.5.3 Remove inline layout logic from `CatalogPage.js`
- [ ] 4.5.4 Remove memoized list header/footer logic (lines 125-148)
- [ ] 4.5.5 Verify catalog functionality still works

**Target files:**
- `src/features/catalog/CatalogPage.js`
- `src/features/catalog/PriceRangeSlider.js`

---

## Notes
- Two existing hooks need relocation from features to hooks directory
- console.error calls need replacement with ToastContext
- Layout calculations are currently inline in CatalogPage.js
