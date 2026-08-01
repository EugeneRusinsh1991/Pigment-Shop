# Pull-to-Refresh UX & Browser Refresh Behavior Audit

> **Document Type:** UX Audit & Architectural Investigation  
> **Target Subsystem:** Pull-to-Refresh (`usePullToRefresh.js`, `PullToRefreshIndicator.js`, Layout Primitives, App Shell)  
> **Status:** Architecture Decided & Execution Plan Defined (No Code Changes Implemented)

---

## 1. Executive Summary

This document defines the final architectural decision and implementation execution plan for the Pull-to-Refresh (PTR) subsystem. 

Following user feedback and architectural review, the target behavior for Web platforms has been established: **completing a Pull-to-Refresh gesture on Web will trigger an actual browser page reload (`window.location.reload()`)**, exactly replicating the visual confirmation and data freshness of a native browser refresh.

To support this behavior without visual clipping, the `<PullToRefreshIndicator>` UI will be elevated from nested feature layouts to a top-level App Shell overlay layer, ensuring it floats cleanly above all sticky headers and navigation components.

---

## 2. Root Cause Analysis & Technical Realignment

### 2.1 Resolving the Feedback Deficit via Browser Page Reload
* **Previous Defect:** In-app client-side soft refetches relied on mock stubs (`setTimeout`) and silent React state updates, leaving the user with zero visual confirmation that a paint/reload cycle had occurred.
* **Resolved Architecture:** Triggering `window.location.reload()` on Web upon gesture completion provides definitive visual confirmation through standard browser paint cycles, asset re-validation, and browser progress indication, matching user expectations across mobile browsers.

### 2.2 Resolving the Indicator Placement Defect via App Shell Elevation
* **Previous Defect:** `<PullToRefreshIndicator>` was rendered inside body layout primitives (`PageScrollLayout`, `UnifiedCardGrid`, `AccountLayout`), causing CSS z-index clipping underneath elevated sticky headers (`AppHeader`, `StoreSearchHeader`).
* **Resolved Architecture:** The visual indicator is elevated to a global App Shell overlay layer (`zIndex: 999999`), mounting outside feature body bounds while listening to gesture distance from active scroll containers via a lightweight global PTR context/bridge.

---

## 3. Recommended Architectural Direction

The application adopts a **Browser Reload & App Shell Overlay** model:

1. **Gesture Detection & Lock:** `usePullToRefresh.js` handles touch gesture tracking, ancestor scroll detection, and top-of-scroll locking (`window.scrollY === 0`).
2. **Global Indicator Overlay:** `<PullToRefreshIndicator>` is rendered once within the top-level `AppShell` root layer. It reads `pullDistance` and `refreshing` state from a central `PullToRefreshContext` to float above headers and search bars.
3. **Execution Behavior:** 
   * **Web Platform (`Platform.OS === 'web'`):** Upon reaching `PULL_THRESHOLD` on `touchend`, trigger haptics and execute `window.location.reload()`.
   * **Native Mobile Platforms (`Platform.OS !== 'web'`):** Retain async domain refetch callbacks.

---

## 4. Sequential Implementation Execution Plan

> **Overall Plan Complexity:** `◕ FH — 1d 8f +4r`

The following sequential tasks define the exact implementation workflow for execution in a subsequent task session.

---

### Task 1: Create Global PullToRefresh Context Bridge & Elevate Shell Overlay `◐ FM — 1d 3f +2r — Task 1`

* **Objective:** Establish a lightweight global context (`PullToRefreshContext`) and elevate `<PullToRefreshIndicator>` to the root `AppShell` container layer above `AppHeader`.
* **Affected Files:**
  * `src/features/shell/PullToRefreshContext.js` (NEW)
  * `src/features/shell/AppLayout.js` (or Root Shell Layout)
  * `src/components/ui/Feedback/PullToRefreshIndicator.js`
* **Dependencies:** None.
* **Expected Outcome:** `<PullToRefreshIndicator>` is rendered in top-level DOM with `zIndex: 999999`, decoupled from local body container CSS stacking contexts.
* **Verification:** Touch-drag top of page on Web; verify indicator floats explicitly *above* sticky `AppHeader` and `StoreSearchHeader`.

---

### Task 2: Wire Web Browser Page Reload in `usePullToRefresh` Hook `◐ FM — 1d 1f +1r — Task 2`

* **Objective:** Update `usePullToRefresh.js` to execute `window.location.reload()` when a gesture completes on Web.
* **Affected Files:**
  * `src/hooks/usePullToRefresh.js`
* **Dependencies:** Task 1.
* **Expected Outcome:** Reaching `PULL_THRESHOLD` on Web triggers `window.location.reload()`, executing a native browser page refresh.
* **Verification:** Perform PTR gesture on any route; confirm browser reloads the page upon release.

---

### Task 3: Refactor Layout Primitives & Remove Local Indicator Instances `◕ FH — 1d 4f +2r — Task 3`

* **Objective:** Remove nested `<PullToRefreshIndicator>` instances from local layout components, delegating distance reporting to `PullToRefreshContext`.
* **Affected Files:**
  * `src/features/shell/PageScrollLayout/PageScrollLayout.js`
  * `src/components/ui/Grid/UnifiedCardGrid.js`
  * `src/features/profile/components/AccountLayout.js`
  * `src/features/catalog/CatalogView.js`
* **Dependencies:** Task 1 & Task 2.
* **Expected Outcome:** Layout primitives are cleaned of visual overlay code while maintaining scroll-lock detection.
* **Verification:** Code audit confirms zero duplicate indicator tags; PTR gesture functions cleanly across Home, Catalog, Product, and Account layouts.

---

### Task 4: End-to-End Verification & Route Audit `○ FL — 1d 0f +4r — Task 4`

* **Objective:** Validate PTR behavior across dynamic routes (`/product/[id]`), catalog sub-categories, and mobile viewports.
* **Affected Files:** All application pages.
* **Dependencies:** Tasks 1–3.
* **Expected Outcome:** Consistent browser page reload on Web without dynamic route 404 errors or visual z-index clipping.
* **Verification:** Execute manual/automated mobile emulation checks on dynamic routes to verify error-free browser reloading.
