# Enter Key Behavior Fix — Detailed Handoff Specification

## Executive Summary

This document provides a self-contained, implementation-ready technical specification for resolving the **Enter Key Behavior** issue within the search input and autocomplete modal system (`AutocompleteSearch.js` and `SearchInput.js`).

---

## 1. Problem Description

Currently, pressing **Enter** (or "Search" / "Go" on mobile soft keyboards) automatically navigates to the first search result (`results[0]`) and closes the search dropdown, preventing users from reviewing results manually.

---

## 2. Current Behavior

In [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js#L61-L65):
```javascript
const handleSubmit = () => {
  if (results.length === 0) return;
  router.push({ pathname: '/product/[id]', params: { id: results[0].id } });
  handleSelect();
};
```
* `onSubmitEditing={handleSubmit}` triggers immediate navigation to `results[0]`.
* Dropdown visibility relies directly on input focus (`isFocused`), so blurring input closes dropdown.

---

## 3. Expected Behavior

* Pressing **Enter** MUST dismiss the soft keyboard (`Keyboard.dismiss()`) and blur the search field (`inputRef.current?.blur()`).
* The search results dropdown MUST **remain visible** on screen.
* No automatic navigation should occur.
* Dropdown remains visible until user explicitly selects a result, taps the backdrop, or clears text.

---

## 4. Root Cause

* `handleSubmit` directly executes `router.push`.
* `dropdownVisible` relies strictly on `isFocused && query.trim().length >= 2`. Blur timeout removes dropdown.

---

## 5. Affected Components & Files

* **Component**: [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js)
* **Component**: [SearchInput.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchInput.js)
* **Context**: [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)

---

## 6. Execution Flow

1. User enters query ("pigment"). `query` length >= 2, `isFocused` = true. Dropdown opens.
2. User presses **Enter**.
3. `onSubmitEditing` calls `inputRef.current?.blur()`, `Keyboard.dismiss()`, and sets `isSubmitted = true`.
4. Field blurs, keyboard hides, but dropdown remains visible (`(isFocused || isSubmitted) && query.length >= 2`).
5. User scrolls results and taps item -> triggers `handleSelect()`, navigating to product and closing dropdown.

---

## 7. Edge Cases & Regressions

* **Backdrop Tap After Enter**: Tapping outside clears `isSubmitted` state and closes dropdown.
* **Text Clear After Enter**: Tapping clear (`X`) resets query and closes dropdown.
* **Pull to Refresh**: Pull-to-refresh MUST remain disabled while `isSubmitted` keeps dropdown open.

---

## 8. Recommended Implementation Approach: Explicit `isSubmitted` / Persistent Query State

* **Description**:
  * Introduce `const [isSubmitted, setIsSubmitted] = useState(false);`.
  * Update visibility rule: `const dropdownVisible = (isFocused || isSubmitted) && query.trim().length >= 2;`.
  * In `handleSubmit`: blur input, call `Keyboard.dismiss()`, set `isSubmitted(true)`.
  * Reset `isSubmitted(false)` on text edit, clear button tap, backdrop tap, or item selection.
* **Advantages**: Elegant cross-platform fix, fulfills keyboard dismissal requirements, preserves dropdown inspection.
* **Disadvantages**: Requires managing reset triggers for `isSubmitted`.
* **Justification**: Decouples keyboard focus from dropdown visibility seamlessly across Web, iOS, and Android.

---

## 9. Dependencies & Pre-Implementation Review Checklist

1. Review `StoreSearchHeader.js` `setDisabled` interaction with `PullToRefreshContext`.
2. Check `onActiveChange` callback propagation to parent containers.

---

## 10. Task Breakdown

`◐ FM — 1d 2f +2r`

1. Add `isSubmitted` state to `AutocompleteSearch.js`.
2. Refactor `handleSubmit` to blur input and invoke `Keyboard.dismiss()` without triggering `router.push`.
3. Update `dropdownVisible` visibility formula to incorporate `isSubmitted`.
4. Ensure `isSubmitted` is reset to `false` when text changes, clear button is pressed, backdrop is tapped, or item is selected.
5. Test behavior on mobile keyboard dismiss and desktop Enter key press.
