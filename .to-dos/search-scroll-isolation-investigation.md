Created At: 2026-08-01T23:36:00Z
Completed At: 2026-08-01T23:36:00Z
File Path: `file:///d:/Magazine/_PigmentShop/.to-dos/search-scroll-isolation-investigation.md`

# Investigation Report: Search Scroll Isolation

**Date**: 2026-08-01  
**Target Component**: [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js), [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js), & [SearchStyles.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchStyles.js)  
**Document Path**: `.to-dos/search-scroll-isolation-investigation.md`

---

## 1. Problem Summary

When the search results dropdown is open, users can scroll through search results. However, reaching the boundary (top or bottom) of the dropdown list causes scroll events to propagate to the underlying page, causing unintended page scrolling.

### Key Issues:
1. **Scroll Propagation (Overscroll Chaining)**: Mouse wheel and touch swipe events chain to parent layout containers when `ScrollView` reaches scroll boundaries.
2. **Lack of Body Scroll Locking**: Background page scrolling is not locked on web viewports when the search dropdown overlay is active.
3. **Backdrop Visual Feedback**: The backdrop is currently fully transparent, missing dimming feedback to demarcate active search focus.

---

## 2. Root Cause Analysis

### 1. Web Overscroll Chaining
In `SearchDropdown.js`, the dropdown results list renders within a `<ScrollView style={SearchStyles.scrollView}>`.
By default on web engines (React Native Web), scroll events at container boundaries trigger browser overscroll chaining, bubbling scroll delta to the page document body.

### 2. Absence of Body Overflow Locking
While `StoreSearchHeader` disables pull-to-refresh (`setDisabled(isSearchActive)`), it does not prevent standard wheel/touch document scrolling on `document.body` while `dropdownVisible` is `true`.

### 3. Backdrop Styling
In `SearchStyles.js`, `backdrop` uses absolute/fixed positioning with z-index, but lacks background dimming (`backgroundColor: 'transparent'`), offering no visual cue that background scrolling is disabled.

---

## 3. Evaluated Solutions

### Option A: CSS `overscrollBehavior: 'contain'` & Web Wheel Trapping
* **Approach**: Add `overscrollBehavior: 'contain'` to `SearchStyles.scrollView` style object and dropdown container.
* **Pros**: Native browser prevention of overscroll chaining without heavy event listeners.
* **Cons**: Works on browser scroll containers, but on mobile touch devices may need `onTouchMove` propagation stopping.

### Option B: Body Scroll Lock Hook on Web
* **Approach**: Implement a `useBodyScrollLock(dropdownVisible)` hook in `AutocompleteSearch.js` that toggles `document.body.style.overflow = 'hidden'` when search dropdown is active.
* **Pros**: Completely locks underlying page scroll across desktop and mobile web.
* **Cons**: Requires cleanup on unmount to prevent permanent body lock.

### Option C: Semi-Transparent Dimmed Backdrop
* **Approach**: Update `SearchStyles.backdrop` to include a semi-transparent dark overlay (e.g., `rgba(0, 0, 0, 0.4)` on dark mode, `rgba(0, 0, 0, 0.25)` on light mode).
* **Pros**: Provides clear visual contrast and immediate feedback that search is focused.

---

## 4. Recommended Implementation Roadmap

**Overall Task Complexity**: `◐ FM — 1d 3f +4r`

### Phase 1: Implement Overscroll Containment & Style Updates — `◐ FM — 1d 2f +2r`
1. Update [SearchStyles.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchStyles.js):
   - Add `overscrollBehavior: 'contain'` to `scrollView` style block.
   - Add semi-transparent dimmed background color to `backdrop` for light/dark themes.
2. Update [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js):
   - Pass overscroll isolation props / web dataset attributes to `ScrollView`.

### Phase 2: Web Body Scroll Lock & Touch Event Isolation — `○ FL — 1d 1f +2r`
1. Add body scroll lock effect in [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js) when `dropdownVisible` is `true`.
2. Ensure touch and mouse wheel events on backdrop do not trigger document scrolling.

### Phase 3: Verification & Test Plan — `○ FL — 1d 0f +2r`
1. Test scrolling search results to top and bottom boundaries; verify page does not scroll.
2. Test mouse wheel scrolling on dimmed backdrop; verify page stays static.
3. Test dismissing search via backdrop tap or clear button; verify page scrolling resumes immediately.
4. Verify appearance across Light & Dark themes on desktop and mobile web viewports.
