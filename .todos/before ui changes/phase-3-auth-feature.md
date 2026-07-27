# Phase 3: Hook Creation - Auth Feature

**Model Recommendation:** 🟡 G 3.6 F (M) — 2d | 3f | +1ctx  
**Priority:** Medium (Validation & Forms)  
**Status:** ⏳ PENDING

## Overview
Extract auth validation logic and enhance error handling with ToastContext integration.

---

## Tasks

### 3.1 Create useAuthValidation Hook (from audit #7)
- [x] Create `src/hooks/useAuthValidation.js`
- [x] Extract email validation logic from `useLoginForm.js` (lines 56-59)
- [x] Extract password validation logic from `useLoginForm.js` (lines 29-38)
- [x] Extract confirm password matching logic from `useLoginForm.js` (lines 35-38)
- [x] Add error handling with ToastContext
- [ ] Test hook independently

**Source file:** `src/hooks/useLoginForm.js`  
**Target file:** `src/hooks/useAuthValidation.js`

### 3.2 Enhance useLoginForm Hook
- [x] Review existing `src/hooks/useLoginForm.js`
- [x] Remove debug functions (lines 47-59) to separate file
- [x] Ensure error handling uses ToastContext (currently inline state)
- [x] Move error message mapping from `LoginPageComponents.js` (lines 80-90)
- [ ] Test hook independently

**Files to modify:**
- `src/hooks/useLoginForm.js`
- `src/features/auth/LoginPageComponents.js`

### 3.3 Refactor Auth Components
- [x] Refactor `LoginPage.js` to use `useAuthValidation`
- [x] Remove inline validation logic
- [x] Remove inline error handling
- [ ] Verify auth functionality still works

**Target file:** `src/features/auth/LoginPage.js`

---

## Notes
- Debug functions should be separated to `src/utils/debugAuth.js` or similar
- Error message mapping currently in `LoginPageComponents.js` should move to hook or utility
- ToastContext integration needed for consistent error handling
