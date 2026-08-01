# Investigation Report: Search Dismiss Behavior

**Date**: 2026-08-01  
**Target Component**: [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js) & [SearchInput.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchInput.js)  
**Document Path**: `.to-dos/search-dismiss-behavior-investigation.md`

---

## 1. Problem Summary

After resolving the search overlay layout and pull-to-refresh issues, the search results dropdown cannot be dismissed:
1. **Tapping Outside**: Tapping anywhere outside the search container or backdrop fails to close the search dropdown results.
2. **Clear / Close Button**: Pressing the `✕` clear icon clears the text input string, but does not close the active search state or blur the input field.
3. The search UI remains continuously open until page refresh or manual item selection.

---

## 2. Root Cause Analysis

Detailed code inspection of [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js) revealed two primary bugs causing the non-dismissable behavior:

### 1. Faulty Active / Visible State Calculation
In [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js#L40-L67):
```javascript
const isActive = isFocused || query.trim().length >= 2;
...
const dropdownVisible = isActive && query.trim().length >= 2;
```
* **The Logic Bug**: `isActive` is evaluated with `OR` (`||`). Whenever `query.trim().length >= 2` (e.g., query is `"red"`), `isActive` remains `true` regardless of whether `isFocused` is `true` or `false`!
* **Result**: When a user taps outside on the backdrop, `isFocused` is updated to `false`, but `isActive` stays `true` because `query` still contains 2+ characters. Consequently, `dropdownVisible` evaluates to `true && true = true`, leaving the dropdown visible indefinitely.

### 2. Incomplete Clear Button Action Handler
In [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js#L89):
```javascript
onClear={() => setQuery('')}
```
* Pressing the clear icon (`✕`) only updates `query` to `''`.
* It does not call `setIsFocused(false)` or `inputRef.current?.blur()`, leaving the search header in an active state.

---

## 3. Recommended Implementation Roadmap

**Overall Task Complexity**: `◐ FM — 1d 2f +4r`

### Phase 1: Fix Active/Visibility Logic & Clear Action Handler — `◐ FM — 1d 1f +2r`
1. Update `dropdownVisible` condition in [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js):
   ```javascript
   const dropdownVisible = isFocused && query.trim().length >= 2;
   ```
2. Update `onClear` handler:
   ```javascript
   onClear={() => {
     setQuery('');
     setIsFocused(false);
     if (inputRef.current) inputRef.current.blur();
   }}
   ```
3. Update `isActive` prop sent to `onActiveChange` so `StoreSearchHeader` lowers its z-index when focus is lost.

### Phase 2: Optimize Backdrop & Touch Interaction — `○ FL — 1d 1f +2r`
1. Ensure backdrop `Pressable` in `AutocompleteSearch.js` explicitly invokes `inputRef.current?.blur()` and `setIsFocused(false)`.
2. Tune `onBlur` timeout (150ms-200ms) to ensure result row taps navigate cleanly before focus state resets.

### Phase 3: Verification & Test Plan — `○ FL — 1d 0f +2r`
1. Test tapping outside search input to confirm dropdown closes instantly.
2. Test pressing `✕` clear icon to confirm query resets and dropdown closes.
3. Verify clicking search result row still navigates to product detail page.
4. Verify Light & Dark theme appearance and desktop/mobile web viewports.
