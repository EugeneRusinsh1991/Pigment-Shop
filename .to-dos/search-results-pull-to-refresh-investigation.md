# Investigation Report: Pull-to-Refresh While Scrolling Search Results

**Date**: 2026-08-01  
**Target Subsystems**: [usePullToRefresh.js](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js), [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js), & [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js)  
**Document Path**: `.to-dos/search-results-pull-to-refresh-investigation.md`

---

## 1. Problem Description

While scrolling through search results inside the search overlay:
1. Scrolling down inside the search dropdown works normally.
2. However, scrolling back up to the top of the search results list can accidentally trigger the global page pull-to-refresh.
3. On Web, pulling down at the top of the search dropdown triggers `window.location.reload()`, causing an unexpected page refresh while the user is actively interacting with search results.

---

## 2. Root Cause Analysis

Analysis of [usePullToRefresh.js](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js) revealed the following mechanisms causing the issue:

### 1. Global Document Touch Event Interception
In [usePullToRefresh.js](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js#L87-L93):
* `bindGlobalListeners()` registers global `touchstart`, `touchmove`, and `touchend` listeners on the web `document` object.
* Every touch gesture anywhere on the screen (including inside `SearchDropdown`) is intercepted by `handleTouchStart`.

### 2. Flawed Target Scroll Top Calculation (`getScrollTopFromTarget`)
In `getScrollTopFromTarget` ([usePullToRefresh.js](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js#L140-L161)):
```javascript
function getScrollTopFromTarget(options, target) {
  // Checks parent elements for scrollTop > 0
  if (target && target instanceof Element) {
    let curr = target;
    while (curr && curr !== document.body && curr !== document.documentElement) {
      if (curr.scrollTop > 0) {
        parentScrollTop = curr.scrollTop;
        break;
      }
      curr = curr.parentElement;
    }
  }
  const windowScrollTop = typeof window !== 'undefined' ? (window.scrollY || document.documentElement?.scrollTop || 0) : 0;
  return Math.max(nodeScrollTop, parentScrollTop, windowScrollTop);
}
```
* When the user scrolls to the top of the `SearchDropdown` list, the `ScrollView` container inside `SearchDropdown` has `scrollTop = 0`.
* If `window.scrollY` is also `0` (at the top of the page), `getScrollTopFromTarget` returns `0`.
* `usePullToRefresh` assumes `scrollTop === 0` means the user is pulling down the main page, ignoring the fact that the touch originated inside an active search dropdown overlay!

### 3. Missing Active Overlay Exemption
* Neither `usePullToRefresh.js` nor `PullToRefreshContext.js` checks whether search is active or if the touch target belongs to an open overlay.

---

## 3. Evaluation of Solution Strategies

| Strategy | Technical Mechanism | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Strategy A: DOM Overlay Exclusion in `getScrollTopFromTarget`** | Check if `target.closest('[data-no-pull="true"]')` or search dropdown parent exists during touch start. | Simple, self-contained inside `usePullToRefresh.js`. Zero API changes required for components. | Web-specific DOM check (must handle native fallback gracefully). |
| **Strategy B: Dynamic Context Disabling** | Expose `setDisabled(boolean)` in `PullToRefreshContext` so `AutocompleteSearch` disables pull-to-refresh when open. | Clean state-driven React pattern across web and native. | Requires connecting `AutocompleteSearch` / `StoreSearchHeader` to `PullToRefreshContext`. |
| **Strategy C: Combined Target Check & Context Flag** | Implement both target-based DOM exemption and context-level search active flag. | Maximum robustness, prevents edge cases on both Web and Mobile. | Slight addition in context wiring. |

---

## 4. Recommended Implementation Roadmap

**Overall Task Complexity**: `◕ FH — 1d 3f +6r`

### Phase 1: Implement Target Exclusion & Overlay Safeguard — `◐ FM — 1d 1f +3r`
1. Update `getScrollTopFromTarget` in [usePullToRefresh.js](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js) to inspect target ancestors for search dropdown / overlay containers (`data-no-pull` or dropdown class).
2. If the touch target is inside an overlay element, immediately return `canPull = false` to suppress page pull-to-refresh.

### Phase 2: Add Search Overlay Exemption Attribute & Context Wiring — `◐ FM — 1d 2f +3r`
1. Tag `SearchDropdown` container in [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js) with `dataSet={{ noPull: 'true' }}` (or `data-no-pull="true"`).
2. Optional: Connect `usePullToRefreshContext` to disable pull-to-refresh when `isSearchActive` is true.

### Phase 3: Verification & UX Testing — `○ FL — 1d 0f +3r`
1. Test scrolling down and back up inside search dropdown results.
2. Confirm pull-to-refresh does NOT activate while search dropdown is open.
3. Confirm pull-to-refresh works normally on the main page when search dropdown is closed.
