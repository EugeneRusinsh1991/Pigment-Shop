# Catalog Cards 100% Verified Research Results

## 1. Research Overview

This document presents the 100% verified root-cause analysis for why catalog cards collapse to a green horizontal bar on Web (as captured in [S_15-23-20_Catalog.jpg](file:///d:/Magazine/_PigmentShop/.docs/manual-browser-log/screenshots/S_15-23-20_Catalog.jpg)).

---

## 2. Evidence from Screenshot Analysis

- **Screenshot**: [S_15-23-20_Catalog.jpg](file:///d:/Magazine/_PigmentShop/.docs/manual-browser-log/screenshots/S_15-23-20_Catalog.jpg)
- **Visual Symptom**: A category card (`Category 1 EN`) renders as a tiny green horizontal bar (`[DIV] div.css-view-g5y9jx`) with almost 0px height, clipping all image and text content.

---

## 3. Verified Root Causes (Exact Files & Line Numbers)

### 3.1. Primary Cause: `flex: 1` on Card Container Styles
- **Files**:
  - [categoryCardStyles.js:L6](file:///d:/Magazine/_PigmentShop/src/features/catalog/categoryCardStyles.js#L6): `catCard: { flex: 1, ... }`
  - [ProductCardStyles.js:L6](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCardStyles.js#L6): `prodCard: { flex: 1, ... }`
- **Why It Fails**: In React Native Web (`react-native-web`), setting `flex: 1` on an element inside a flex container whose parent height is unconstrained translates to CSS `flex: 1 1 0%` (`flex-basis: 0%`). Because the FlatList column cell wrapper `<div>` does not have an explicit pixel height on Web, `flex-basis: 0%` forces the card height to collapse to 0px.

### 3.2. Secondary Cause: `flex: 1` on Grid Item Wrappers
- **Files**:
  - [ProductGrid.js:L20](file:///d:/Magazine/_PigmentShop/src/features/catalog/ProductGrid.js#L20): `<View style={{ flex: 1, maxWidth }}>`
- **Why It Fails**: Adding `flex: 1` to the wrapper `<View>` around `<ProductCard>` inside `renderItem` compounds the web flexbox collapse by forcing the item cell container itself to `flex-basis: 0%`.

### 3.3. Tertiary Cause: Sparse Grid Item Stretching
- **Files**:
  - [CatalogView.js:L39](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js#L39): `<View style={{ width: maxWidth }}>`
- **Why It Fails**: When `depth > 0` or when fewer items exist than `numColumns`, subcategory cards automatically trigger `isBanner` mode (`width: 100%`) or stretch to fill empty column slots in Flexbox row-wrap layouts.

---

## 4. Required Solution Summary

1. **Remove `flex: 1`** from [categoryCardStyles.js:L6](file:///d:/Magazine/_PigmentShop/src/features/catalog/categoryCardStyles.js#L6) and [ProductCardStyles.js:L6](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCardStyles.js#L6).
2. **Remove `flex: 1`** from the `renderItem` wrapper in [ProductGrid.js:L20](file:///d:/Magazine/_PigmentShop/src/features/catalog/ProductGrid.js#L20).
3. **Use Explicit Heights / Min-Heights** (`minHeight: 280` on desktop, `minHeight: 200` on mobile) so web flex containers never collapse to 0px.
