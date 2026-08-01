# Investigation Report: Homepage Search Overlay Issue

**Date**: 2026-08-01  
**Target Component**: [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js) & [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)  
**Document Path**: `.to-dos/homepage-search-overlay-investigation.md`

---

## 1. Problem Summary

When typing into the search input on the storefront homepage:
1. As soon as a single character is entered, a full-width search overlay pops up covering almost the entire screen.
2. The user is trapped: they cannot edit the query, continue typing, click clear, dismiss the overlay by tapping outside, or scroll the underlying page.
3. Page refresh is currently the only recovery option.
4. Single-character queries return up to 20 products instantly, expanding the overlay height to its maximum (300px+) and cluttering the UI.

---

## 2. Root Cause Analysis

After auditing [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js), [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js), and [SearchStyles.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchStyles.js), four key contributing root causes were identified:

### 1. Misuse of React Native `<Modal>` Component
In [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js#L82-L84):
```javascript
<Modal transparent visible={dropdownVisible} animationType="none">
  <SearchResultDropdown results={results} query={query} isDark={isDark} onSelect={handleSelect} />
</Modal>
```
* **Viewport Portal Interception**: In React Native Web, `<Modal>` creates a top-level document portal container spanning `100vw x 100vh`. This overlay sits on top of all DOM nodes, blocking pointer and touch events to elements behind it — including the `SearchInput` itself!
* **Detached Dropdown Positioning**: `SearchStyles.dropdownOverlay` uses `position: 'absolute', top: 40, left: 0, right: 0`. When rendered inside `autocompleteContainer`, `top: 40` places the dropdown directly below the 36px search input. However, when wrapped inside `<Modal>`, the dropdown attaches to the viewport window root, positioning itself 40px from the top of the browser screen across the entire window width.

### 2. Missing Backdrop / Tap-Outside Dismissal Logic
* The `<Modal>` component has no backdrop click handler or `onRequestClose` handler attached.
* Because the transparent modal portal intercepts clicks outside the dropdown, tapping on the page content does not trigger an `onBlur` or clear event on the input. `isActive` remains `true` indefinitely.

### 3. Overly Aggressive Single-Character Matching
In `filterSearchResults` ([AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js#L13-L21)):
* Search filters trigger on queries as short as 1 character without a minimum length threshold or debounce.
* Matching logic (`pWord.startsWith(qWord)`) matches every single product token starting with letters like "a" or "s", returning dozens or hundreds of items.

### 4. Excessive Initial Results Display Limit
In [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js#L12):
* `MAX_RESULTS` is set to `20`.
* Returning 20 product items in the `ScrollView` immediately expands the dropdown container to its maximum specified height (`maxHeight: 300` in `SearchStyles.js`), overwhelming the header on the very first keystroke.

---

## 3. Comparison with Other Search Components (Systemic vs. Isolated)

| Component / Area | Implementation Pattern | Uses `<Modal>`? | Affected by Overlay Bug? |
| :--- | :--- | :--- | :--- |
| **Homepage / Store Header** ([StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)) | Uses `AutocompleteSearch` with `SearchDropdown` | **YES** | ❌ **YES (Broken)** |
| **Admin Products Manager** ([ProductsManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsManager.js#L108)) | Uses `SearchInput` directly as inline table/grid filter | **NO** | ✅ **NO (Works correctly)** |
| **Admin Users Manager** ([UsersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UsersManager.js#L170)) | Uses `SearchInput` directly as inline list filter | **NO** | ✅ **NO (Works correctly)** |

**Conclusion**: The issue is **isolated to `AutocompleteSearch`** (used in `StoreSearchHeader.js` for storefront search). The Admin Panel components use `SearchInput` as a direct controlled filter over inline page state and do not instantiate `SearchDropdown` or `<Modal>`.

---

## 4. Recommended Implementation Roadmap

**Overall Task Complexity**: `◕ FH — 1d 4f +8r`

### Phase 1: Fix Overlay Architecture & Interaction (High Priority) — `◐ FM — 1d 2f +4r`
1. **Remove `<Modal>` Wrapper**:
   * Replace the `<Modal>` in [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js) with standard relative/absolute positioning inside `autocompleteContainer`.
   * Ensure `autocompleteContainer` has proper `zIndex` handling so the dropdown layer floats above header/banner content without creating a viewport-wide event blocker.
2. **Add Tap-Outside / Backdrop Dismissal**:
   * Implement a light transparent overlay or web document click/blur handler that sets `isFocused(false)` and dismisses the dropdown when clicking anywhere outside the search container.
   * Ensure `SearchInput` remains interactive while dropdown is open so users can continue typing, backspacing, or clicking the clear button.

### Phase 2: Optimize Search Triggers & Result Presentation (Medium Priority) — `◐ FM — 1d 2f +3r`
1. **Minimum Character Threshold & Debounce**:
   * Require a minimum of 2 characters (or configurable `minSearchLength`) before triggering `filterSearchResults`.
   * Add a 150ms-200ms debounce to prevent excessive calculations during rapid typing.
2. **Cap Initial Dropdown Height**:
   * Reduce `MAX_RESULTS` in [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js) from `20` to `5-8` preview items.
   * Add a clear "+ X more results (press Enter to view catalog)" footer action or hint.

### Phase 3: Verification & UX Validation (Quality Assurance) — `○ FL — 1d 0f +4r`
1. **Interactive Testing**:
   * Verify typing single and multiple characters on Homepage.
   * Confirm search input remains focused and editable while typing.
   * Confirm tapping outside the search dropdown closes it smoothly.
   * Test keyboard navigation (`Enter` key submit to navigate to product page).
2. **Cross-Device & Theme Check**:
   * Verify layout behavior in Light & Dark modes.
   * Test responsiveness on desktop and mobile web viewports.

