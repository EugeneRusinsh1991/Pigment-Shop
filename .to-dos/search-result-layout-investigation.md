# Search Results Layout Improvements — Detailed Handoff Specification

## Executive Summary

This document provides a self-contained, implementation-ready technical specification for resolving the **Search Results Layout** issue within the search dropdown component system (`SearchDropdown.js` and `SearchStyles.js`).

---

## 1. Problem Description

Currently, search results rendered in the dropdown overlay lack explicit single-row height constraints, horizontal divider borders between items, and dedicated dark/light theme hover/pressed highlight states. Long product titles can break layout symmetry or push trailing action icons.

---

## 2. Current Behavior

* `ResultRow` in [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js#L18-L40) uses an `AnimatedButton` wrapping thumbnail/icon, title text, and a right chevron arrow (`›`).
* `resultRowContent` in [SearchStyles.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchStyles.js#L111-L117) specifies `minHeight: 44`, `flexDirection: 'row'`, `alignItems: 'center'`, `paddingHorizontal: 16`, and `gap: 12`.
* Adjacent search result rows lack visual divider lines.
* Product label text does not strictly enforce single-row truncation.

---

## 3. Expected Behavior

* **Strict Single-Row Layout**: Every result item MUST fit strictly on a single horizontal row with a fixed height of `48px` (`layout.spacing.xxl`).
* **Text Truncation**: Product label text MUST use `numberOfLines={1}` with `ellipsizeMode="tail"` and `flex: 1` so long titles never overflow into a second line.
* **Explicit Item Dividers**: Subtle horizontal divider borders (`1px` width) MUST separate each result row (`colors.borderSlateLight` for light mode, `colors.borderSlateDark` for dark mode). The last item in the list must NOT render a bottom border.
* **Visual Spacing & Alignment**:
  * Thumbnail container: Fixed `36px × 36px` container with `borderRadius: radii.xs`, center-aligned image/fallback icon.
  * Spacing gap: `12px` (`layout.spacing.md`) between thumbnail and title text.
  * Padding: `12px` vertical padding, `16px` horizontal padding.
  * Chevron Indicator: `16px` right icon (`›`), vertically centered, muted gray color.

---

## 4. Root Cause

* Lack of item boundary constraints (`borderBottomWidth`, `borderBottomColor`) in `SearchStyles.js`.
* Absence of explicit flex shrinking rules on the container text elements and item wrapper.

---

## 5. Affected Components & Files

* **Component**: [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js)
* **Styles**: [SearchStyles.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchStyles.js)

---

## 6. Execution Flow

1. User enters text into `SearchInput`.
2. `AutocompleteSearch` calculates `results` array using `useMemo` and `filterSearchResults`.
3. `SearchDropdown` receives `visibleResults` (capped at `MAX_RESULTS = 6`).
4. `visibleResults.map(...)` renders each product inside a `Link` wrapped `ResultRow`.
5. `ResultRow` applies single-row container styles with bottom divider line, leading thumbnail, truncated label, and chevron arrow.

---

## 7. Edge Cases & Regressions

* **Very Long Product Names**: E.g. "Pigment Acrylic Paint Ultra Fine Glow Multi-Purpose Set 500ml". `flex: 1` and `numberOfLines={1}` prevent height expansion.
* **Missing Images**: Fallback emoji/icon (`📦`) remains centered inside 36x36 container.
* **Dark Mode Toggle**: Border colors react dynamically to `isDark`.

---

## 8. Recommended Implementation Approach: Standardized Flex Row & Item Dividers

* **Description**:
  * Modify `SearchStyles.js` to add `resultRowBorderLight`, `resultRowBorderDark`, and updated `resultRowContent` (height: 48, paddingHorizontal: 16).
  * Update `SearchDropdown.js` to pass an `isLast` prop to `ResultRow` to conditionally omit the bottom border on the final item.
* **Advantages**: Precise single-row alignment, high performance, zero runtime overhead, visually clean.
* **Disadvantages**: Requires minor prop addition (`isLast`) in loop mapping.
* **Justification**: Extending `ResultRow` styling with explicit row height (`48px`), flex truncation, and conditional border styles (`!isLast && borderStyle`) provides clean single-row presentation with minimal DOM nodes and exact theme integration.

---

## 9. Dependencies & Pre-Implementation Review Checklist

1. Review `SearchStyles.js` tokens for slate borders (`colors.borderSlateLight`, `colors.borderSlateDark`).
2. Verify spacing tokens in `theme/tokens.js`.

---

## 10. Task Breakdown

`◐ FM — 1d 2f +2r`

1. Update `SearchStyles.js` to define strict height (`48px`), thumbnail bounds (`36x36`), and border divider styles (`resultRowBorderLight`, `resultRowBorderDark`).
2. Update `SearchDropdown.js` to calculate item index position and apply conditional divider borders to `ResultRow`.
3. Ensure text props on product title enforce `numberOfLines={1}` and `ellipsizeMode="tail"`.
4. Verify visual presentation in light and dark modes across different viewport sizes.
