# Search Results Open/Close Animation — Detailed Handoff Specification

## Executive Summary

This document provides a self-contained, implementation-ready technical specification for resolving the **Search Results Open/Close Animation** issue within the search modal system (`AutocompleteSearch.js`, `SearchDropdown.js`, `SearchStyles.js`).

---

## 1. Problem Description

The search results dropdown appears instantly when query criteria are met and disappears abruptly when focus or query text is lost. This instant toggle lacks visual feedback and feels unpolished.

---

## 2. Current Behavior

In [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js#L116-L118):
```javascript
{dropdownVisible && (
  <SearchResultDropdown results={results} query={query} isDark={isDark} onSelect={handleSelect} />
)}
```
* When `dropdownVisible` becomes `true`, `SearchDropdown` mounts instantly.
* When `dropdownVisible` becomes `false`, it unmounts instantly without an exit transition.

---

## 3. Expected Behavior

* **Entrance Transition**: Fades in (opacity `0 -> 1`) and slides down (`translateY: -8px -> 0px`) over `180ms` (`ease-out`).
* **Exit Transition**: Fades out (opacity `1 -> 0`) and slides up (`translateY: 0px -> -6px`) over `150ms` before unmounting.
* **Backdrop Fade**: Backdrop overlay fades in/out synchronously with the modal.

---

## 4. Root Cause

Direct short-circuit rendering `{dropdownVisible && <Component />}` mounts/unmounts components immediately without exit lifecycle handling.

---

## 5. Affected Components & Files

* **Component**: [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js)
* **Component**: [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js)
* **Styles**: [SearchStyles.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchStyles.js)

---

## 6. Execution Flow

1. State change triggers dropdown opening or closing signal (`isOpen`).
2. Animation presence handler receives `isOpen`.
3. Opening: sets `renderMounted = true`, animates opacity `0 -> 1` and translateY `-8 -> 0`.
4. Closing: animates opacity `1 -> 0` and translateY `0 -> -6`. Upon completion, sets `renderMounted = false`.

---

## 7. Edge Cases & Regressions

* **Rapid Typing/Clearing**: Fast typing or clearing must cancel in-flight animations smoothly without getting stuck half-opaque.
* **Web Native Driver**: Native driver (`useNativeDriver: true`) should be enabled for native platforms and gracefully handled on Web.

---

## 8. Recommended Implementation Approach: Lightweight React Native `Animated` Wrapper

* **Description**: Create a presence animation wrapper or custom hook using standard React Native `Animated.Value` to manage `isMounted` state and transition timings.
* **Advantages**: Zero extra dependencies, complete web and mobile compatibility, smooth exit handling.
* **Disadvantages**: Requires completion callback handling for unmounting.
* **Justification**: Standard `Animated` API ensures predictable, crash-free execution across all platforms.

---

## 9. Dependencies & Pre-Implementation Review Checklist

1. Verify backdrop zIndex order (`layout.zIndices.dropdown - 1`).
2. Review timing functions in React Native `Animated`.

---

## 10. Task Breakdown

`◐ FM — 1d 2f +2r`

1. Create a reusable animated presence helper or hook managing `isMounted` and `Animated.Value`.
2. Wrap `SearchDropdown` and backdrop overlay in `Animated.View`.
3. Connect `dropdownVisible` state to triggering entrance (`180ms`) and exit (`150ms`) timing animations.
4. Verify smooth transition on rapid typing, backspacing, and backdrop tapping.
