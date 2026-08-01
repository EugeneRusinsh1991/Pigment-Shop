# Pull-to-Refresh Scroll Position & Gesture Scope — Investigation

## 1. Problem Statement

- **Current Behavior**:
  - Pull-to-Refresh (PTR) can be triggered from any vertical scroll position on the page.
  - As soon as a user performs a pull gesture, a refresh may be triggered even when the scroll container or page is not at the top (`scrollTop > 0`).
  - Normal vertical scrolling interactions anywhere on the page can accidentally trigger a refresh.
- **Expected Behavior**:
  - Pull-to-Refresh should only become available when the page/container is already fully scrolled to the top (`scrollTop === 0`) before the gesture begins.
  - Normal upward/downward scrolling anywhere else on the page must never trigger a refresh.
  - The interaction should strictly mimic native mobile pull-to-refresh behavior.

---

## 2. Components and Files Involved

1. **`src/hooks/usePullToRefresh.js`**:
   - Core custom hook managing web touch listeners (`touchstart`, `touchmove`, `touchend`), indicator DOM updates, scroll position evaluation, and refresh callbacks.
2. **Page & Layout Components**:
   - `src/features/catalog/ProductGrid.js`
   - `src/features/catalog/CatalogView.js`
   - `src/features/product/ProductPage.js`
   - `src/features/shell/PageScrollLayout/PageScrollLayout.js`
   - `src/features/profile/components/AccountLayout.js`
   - `src/features/contact/ContactPage.js`
   - `src/components/ui/Grid/UnifiedCardGrid.js`
   - `src/features/cart/CartDrawer/CartDrawerList.js`

---

## 3. Execution Flow & Root Cause Analysis

### Flow 1: Touch Initiation (`handleTouchStart`)
1. User touches the screen (`touchstart` event on `document`).
2. `handleTouchStart` calls `handler.getScrollTop()`.
3. `getScrollTop()` checks `options.scrollViewRef` if provided; otherwise, it falls back to `window.scrollY || document.documentElement.scrollTop`.
4. If `getScrollTop()` returns `0`, `globalState.pulling` is set to `true`, and `globalState.startY` records `e.touches[0].clientY`.

### Flow 2: Touch Dragging (`handleTouchMove`)
1. User drags finger (`touchmove` event).
2. If `globalState.pulling` is `true`, `delta = currentY - startY` is calculated.
3. If `delta > 0` (downward drag), `updateIndicator(delta)` translates and rotates the pull indicator.
4. `handleTouchMove` continuously checks `handler.getScrollTop() > 0`. If `getScrollTop()` returns `> 0`, it sets `globalState.pulling = false`.

### Flow 3: Touch Release (`handleTouchEnd`)
1. User releases touch (`touchend` event).
2. If `globalState.pulling` was `true`, `delta >= PULL_THRESHOLD` (80px), and `getScrollTop() === 0`, `handler.onRefresh()` is executed.

---

### Key Root Causes Identified

#### 1. Unreliable Scroll Position Detection (`window.scrollY` vs. Internal Scroll Containers)
- In React Native Web / Expo Router applications, pages and components (e.g., `FlatList`, `ScrollView`, or wrapper `View` elements) frequently scroll inside an internal DOM container (`overflow-y: auto/scroll`) rather than on `window` / `document.body`.
- When `options.scrollViewRef` is omitted (which is the case in almost all page components), `getScrollTop()` checks `window.scrollY`, which stays `0` even when the internal container is scrolled down by hundreds of pixels.
- Because `getScrollTop()` falsely reports `0`, `usePullToRefresh` assumes the user is at the top of the page regardless of their actual scroll position.

#### 2. Absence of Initial Gesture Locking
- A native PTR gesture requires that the scroll position **must already be `0` at the moment `touchstart` occurs**.
- If a user begins touching at `scrollTop > 0` and drags downward (scrolling the page up towards `0`), `usePullToRefresh` does not permanently disqualify the gesture. If the page reaches `0` during the drag, PTR activates mid-gesture.

#### 3. Global Document Event Binding without Target Scoping
- Touch event listeners in `usePullToRefresh.js` are attached globally to `document`.
- Without checking whether the touch target belongs to an active scrollable container or locking the gesture at `touchstart`, any vertical touch movement across the application can trigger the global PTR state.

---

## 4. Recommended Implementation Approach

1. **Strict Pre-Touch Qualification (Initial Scroll Lock)**:
   - Introduce a `canPull` boolean in `globalState`.
   - Require `handler.getScrollTop(target) === 0` at `touchstart`. If `getScrollTop() > 0` when the user first touches down, flag `canPull = false` until the user lifts their finger and starts a new touch.

2. **Automatic Ancestor Scroll Container Detection**:
   - Enhance `getScrollTop(target)` so that when `scrollViewRef` is not provided, it walks up the DOM tree from `e.target` up to `document.body` to check if any ancestor element has `scrollTop > 0`.

3. **Mid-Gesture Disqualification**:
   - Instantly cancel `globalState.canPull` and `globalState.pulling`, and hide the indicator if `getScrollTop()` exceeds `0` at any point during `handleTouchMove`.

4. **Component-Level Scroll Reference Standard**:
   - Pass `scrollViewRef` to `usePullToRefresh` in components rendering scrollable lists (`FlatList`, `ScrollView`, `UnifiedCardGrid`).

---

## 5. Implementation Plan

The following tasks break the recommended approach into sequential, concrete steps for implementation.

### Task List

- [x] **Task 1: Implement Gesture Lock & Ancestor Scroll Detection in `usePullToRefresh.js`** `◐ FM — 1d 1f +1r`
  - **File**: `src/hooks/usePullToRefresh.js`
  - **Action**:
    1. Update `globalState` to include `canPull: false`.
    2. Update `getScrollTop(target)`: if `options.scrollViewRef` is not present, inspect `target` and its parent elements up to `document.body` for `node.scrollTop > 0`. If any ancestor has `scrollTop > 0`, return that `scrollTop`.
    3. Update `handleTouchStart(e)`:
       - Compute `const scrollTop = handler.getScrollTop(e.target)`.
       - If `scrollTop > 0`, set `globalState.canPull = false` and `globalState.pulling = false`.
       - If `scrollTop === 0`, set `globalState.canPull = true`, `globalState.pulling = true`, and store `globalState.startY = e.touches[0].clientY`.
    4. Update `handleTouchMove(e)`:
       - Immediately return if `!globalState.canPull || !globalState.pulling`.
       - If `handler.getScrollTop(e.target) > 0`, set `globalState.canPull = false`, `globalState.pulling = false`, and call `hideIndicator()`.
    5. Update `handleTouchEnd(e)`:
       - Check `globalState.canPull` in addition to `globalState.pulling`.
       - Reset `globalState.canPull = false` and `globalState.pulling = false`.

- [x] **Task 2: Standardize `scrollViewRef` Usage in List Containers** `◐ FM — 1d 2f +2r`
  - **Files**:
    - `src/components/ui/Grid/UnifiedCardGrid.js`
    - `src/features/catalog/ProductGrid.js`
  - **Action**:
    - Pass `scrollViewRef` options parameter to `usePullToRefresh` where `FlatList` or `ScrollView` elements are rendered, ensuring `getScrollTop()` has direct access to the scrollable ref when available.

- [x] **Task 3: Verification & Manual Touch Gesture Testing** `○ FL — 1d 0f +1r`
  - **Action**:
    1. Test on mobile view / touch simulation in Chrome DevTools / Playwright.
    2. Scroll down mid-page on `/catalog`, `/product/[id]`, and homepage.
    3. Perform a pull down gesture while scrolled down — verify that normal scrolling occurs and NO pull indicator appears.
    4. Scroll back to top (`scrollTop === 0`) and perform a pull down gesture — verify that PTR indicator appears and triggers refresh upon release.
