# Pull-to-Refresh Subsystem: Deep Regression Root Cause Analysis

> **Document Type:** Regression Root Cause Analysis  
> **Target Subsystem:** Pull-to-Refresh (`usePullToRefresh.js`, Layouts, Domain Callbacks)  
> **Status:** Deep Investigation Complete (No Code Changes Implemented)

---

## 1. Executive Summary

This deep-dive investigation re-evaluates the Pull-to-Refresh (PTR) regression on mobile browsers following the recent architectural integration. The analysis traces the complete gesture lifecycle, scroll ownership, and component state transitions to identify the *true* underlying causes.

The regression is not merely a styling issue; it is a fundamental architectural disconnect caused by the migration from imperative, globally-mutating page-level hooks to declarative, layout-bound hooks. When the hook was stripped of its imperative DOM manipulation (Phase 1) and moved to layout primitives (Phase 2), critical state variables (`pullDistance`, `refreshing`) were discarded by the layout wrappers, and non-standard page branches were left completely un-instrumented.

---

## 2. Complete Gesture Lifecycle & Event Flow Analysis

To understand the failure, we must trace the exact execution flow of a PTR gesture on mobile web:

### Step 1: Touch Start & Handler Resolution
When a user touches the screen, `document.addEventListener('touchstart')` fires globally. `usePullToRefresh.js` calls `getActiveHandler()` to fetch the most recently mounted hook from a global LIFO stack.
* **Why it fails on Home & Profile:** During Phase 3 ("Feature Domain Wiring & Cleanup"), the "orphan" `usePullToRefresh` calls were deleted from `CatalogView` and `AccountLayout`. The new architecture mandated PTR be handled by `PageScrollLayout` or `UnifiedCardGrid`. 
  * However, Home renders `CatalogView` with `showCategoryGrid={false}`, which outputs a raw `<View>` instead of `UnifiedCardGrid`.
  * Profile renders `AccountLayout`, which imports the hook but *never calls it* and does not use `PageScrollLayout`.
  * **Result:** `getActiveHandler()` returns `null`. The event is ignored. No state transitions occur. No haptic feedback fires.

### Step 2: Scroll Ownership & Top Detection
For pages that *do* mount the hook (Product, Catalog Grid), `getScrollTop()` is invoked.
* Because `PageScrollLayout` and `UnifiedCardGrid` (on Web) use standard `<View>` containers without `overflow: auto`, they do not own the scroll context.
* The DOM traversal fallback in `usePullToRefresh.js` iterates up to `document.body` and correctly defaults to `window.scrollY`.
* If `window.scrollY === 0`, `globalState.canPull` becomes `true`.

### Step 3: Touch Move & Visual Feedback (The Disconnect)
As the user drags downwards, `touchmove` fires and calculates a `delta`. `handler.setPullDistance(delta)` is called, updating the hook's internal React state.
* **Why there is no indicator displayed:** Prior to the refactor, the hook imperatively appended a loading spinner directly to `document.body`. Phase 1 removed this in favor of a declarative `PullToRefreshIndicator`.
* However, `PageScrollLayout` only executes `usePullToRefresh(onRefresh)`—it **fails to destructure or pass down** `pullDistance`. `UnifiedCardGrid` also ignores it. 
* **Result:** The state updates, but the React render tree has no component attached to visualize the `pullDistance`. The gesture is completely invisible to the user.

### Step 4: Touch End & Refetch Execution
Upon release (`touchend`), if `delta >= PULL_THRESHOLD`, `handler.onRefresh()` is invoked.
* The hook sets `refreshing = true` and fires `Haptics.impactAsync()` (which explains why Product and Catalog pages *do* vibrate).
* It then awaits the passed `customRefresh` callback (e.g., `refreshCatalog`).
* **Why no visible refresh occurs:** 
  1. **Discarded State:** `PageScrollLayout` discards the `refreshing` boolean entirely. `UnifiedCardGrid` passes it to React Native's `<RefreshControl>`, which is a non-rendering stub on Web platforms. Thus, no visual spinner or overlay is triggered.
  2. **Stubbed Domain Logic:** The `refreshCatalog` function in `CatalogContext.js` is merely a mock (`await new Promise(r => setTimeout(r, 600))`). It does not refetch data, update state, or trigger a re-render of the product list.

---

## 3. Challenging Previous Assumptions

* **Previous Assumption:** `UnifiedCardGrid` correctly integrates PTR for catalog pages.
  * **Correction:** `UnifiedCardGrid` uses `disableRefreshControl` when rendered by `CatalogView`, explicitly disabling the native refresh prop. Furthermore, even if enabled, it fails to render the web-specific `PullToRefreshIndicator` overlay, completely ignoring the `pullDistance` state required for Web.
* **Previous Assumption:** `PageScrollLayout` correctly handles PTR for the Product page.
  * **Correction:** While it mounts the hook (enabling gesture detection and haptics), it acts as a black box that consumes the callback but throws away all visual state returns (`refreshing`, `pullDistance`), breaking the declarative rendering contract established in Phase 1.

---

## 4. Final Root Causes Identified

1. **State Isolation in Layout Primitives (Primary Root Cause):** Layout wrappers (`PageScrollLayout`, `UnifiedCardGrid`) act as sinks for the `usePullToRefresh` hook but fail to act as providers for the `PullToRefreshIndicator` UI, destroying the visual feedback loop on Web.
2. **Bypassed Architectural Wrappers (Secondary Root Cause):** Non-standard layout branches (Home's `showCategoryGrid=false` path) and bespoke wrappers (`AccountLayout`) bypass the standardized layout primitives entirely, resulting in unmounted hooks and dead gesture zones.
3. **Mocked Domain Refetching (Tertiary Cause):** The underlying domain data contexts (`CatalogContext`) utilize mock `setTimeout` stubs for refetching, meaning even if the UI showed a spinner, the application data would never actually refresh.

---

## 5. Actionable Remediation Blueprint

> **Overall Remediation Complexity:** `◕ FH — 1d 5f +4r`

To systematically resolve the regression in the upcoming implementation phase, execute the following steps precisely:

### Step 1: Render the Indicator in Layout Primitives `◐ FM — 1d 2f +2r — Step 1 [Parallel with Step 2]`
* **Target 1:** `src/features/shell/PageScrollLayout/PageScrollLayout.js`
  * **Action:** Destructure `{ pullDistance, refreshing } = usePullToRefresh(onRefresh)`.
  * **Action:** Import and render `<PullToRefreshIndicator pullDistance={pullDistance} refreshing={refreshing} />` at the top of the container. 
* **Target 2:** `src/components/ui/Grid/UnifiedCardGrid.js`
  * **Action:** Destructure `{ pullDistance, refreshing }` from the hook.
  * **Action:** Import and conditionally render `<PullToRefreshIndicator>` when `Platform.OS === 'web'` to bridge the gap left by the native `RefreshControl`.

### Step 2: Restore Missing Hook Invocations `◐ FM — 1d 2f +2r — Step 2 [Parallel with Step 1]`
* **Target 3:** `src/features/profile/components/AccountLayout.js`
  * **Action:** Delegate the outer wrapper to `PageScrollLayout` (passing `onRefresh`) instead of a raw `<View>`, or explicitly invoke `usePullToRefresh()` and render the indicator natively within `AccountLayout`.
* **Target 4:** `src/features/catalog/CatalogView.js`
  * **Action:** In the `showCategoryGrid === false` branch (used by Home route), wrap the standard `<View>` in a `PageScrollLayout` passing `onRefresh={refreshCatalog}`.

### Step 3: Enable Native Web Refresh Control on Catalog Grid `◐ FM — 1d 1f +1r — Step 3`
* **Target 5:** `src/features/catalog/CatalogView.js`
  * **Action:** Remove or appropriately parameterize the `disableRefreshControl` prop passed to `UnifiedCardGrid` to ensure the gesture isn't artificially disabled on the grid itself.

### Step 4: Resolve Domain Stub (Deferred / Optional) `◐ FM — 1d 1f +1r — Step 4`
* **Target 6:** `src/features/catalog/CatalogContext.js`
  * **Action:** Acknowledge that `refreshCatalog` is a mock. While fixing this is strictly outside the scope of resolving the *UI gesture* regression, real data will not reload until this stub is replaced with an actual data refetch.
