# Phase 7: Error Handling Standardization

**Model Recommendation:** 🔴 G 3.1 P (H) — 8d | 6f | +3ctx  
**Status:** ⏳ PENDING

## Overview
Standardize error handling across all features using ToastContext instead of console.error and inline error states.

---

## Tasks

### 7.1 Audit Error Handling Patterns
- [ ] Search for all `try/catch` blocks in features
- [ ] Search for all `console.error` calls (already found in audit)
- [ ] Search for all inline error displays
- [ ] Document current error handling patterns (already in audit)

**Known console.error locations from audit:**
- `src/features/catalog/usePaginatedCatalog.js` (lines 97, 153)
- `src/features/product/useReviewsState.js` (line 71)

### 7.2 Create useErrorHandler Hook
- [ ] Create `src/hooks/useErrorHandler.js`
- [ ] Standardize API error handling
- [ ] Standardize validation error handling
- [ ] Integrate with ToastContext
- [ ] Add fallback error messages
- [ ] Test hook independently

**Target file:** `src/hooks/useErrorHandler.js`

### 7.3 Update All Features with Standard Error Handling
- [ ] Update cart feature to use `useErrorHandler`
- [ ] Update auth feature to use `useErrorHandler`
- [ ] Update catalog feature to use `useErrorHandler` (replace console.error)
- [ ] Update product feature to use `useErrorHandler` (replace console.error)
- [ ] Update other features to use `useErrorHandler`

**Features to update:**
- Cart (already uses ToastContext in new hooks)
- Auth (currently uses inline error state)
- Catalog (replace console.error)
- Product (replace console.error)
- Profile (already uses ToastContext)
- Orders
- Home

### 7.4 Verify No Unhandled Errors
- [ ] Test all API calls trigger proper error messages
- [ ] Test all form validations show proper errors
- [ ] Test network errors are handled gracefully
- [ ] Ensure no `Unhandled Rejection` errors
- [ ] Ensure no `TypeError` leaks to UI

---

## Notes
- Cart and Profile already use ToastContext partially
- Catalog and Product have console.error calls that need replacement
- Auth uses inline error state instead of ToastContext
- Goal: All errors go through ToastContext for user-friendly messages
