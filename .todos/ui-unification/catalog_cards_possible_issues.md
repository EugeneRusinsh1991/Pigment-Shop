# Catalog Cards Possible Issues Analysis

## 1. Executive Summary

This document identifies potential bugs, layout anomalies, runtime errors, and structural risks within catalog cards ([CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js), [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js), [PlaceholderCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/PlaceholderCard.js), and [NavigationCard.js](file:///d:/Magazine/_PigmentShop/src/components/Card/NavigationCard.js)).

---

## 2. Identified Potential Problem Areas

### 2.1. Require Cycle & Circular Imports
- **Location**: [PlaceholderCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/PlaceholderCard.js#L4-L6)
- **Risk**: `PlaceholderCard` directly imports `CategoryCard`, `ProductCard`, and `NavigationCard`. If any of these feature components import primitives or barrel exports from `components/Card`, a circular dependency loop occurs during Metro/Webpack bundle evaluation.

### 2.2. Event Bubbling in Expo Router `<Link asChild>` Wrappers
- **Location**: [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js#L53-L64), [PlaceholderCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/PlaceholderCard.js#L30-L32)
- **Risk**: Favorite (`HeartIcon`) and Cart (`CartIcon`) buttons inside `ProductCard` execute `preventDefault()` and `stopPropagation()`. On React Native Web, nested interactive buttons inside `Link asChild` wrappers can still trigger navigation if synthetic event cancellation is bypassed by Expo Router touch handlers.

### 2.3. Hardcoded Fixed Heights vs Dynamic Content
- **Location**: [CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js#L74-L79), [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js#L72)
- **Risk**: `CategoryCard` sets fixed heights (`CATEGORY_GRID_HEIGHTS`: 280px / 250px / 200px) and `ProductCard` relies on `useCardDimensions(depth)`. If localized category titles or product descriptions wrap onto 3+ lines, text gets clipped by `maxHeight` constraints or causes overflow outside card boundaries.

### 2.4. Localization & Missing Data Fallbacks
- **Location**: [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js#L102), [CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js#L86)
- **Risk**: `getLocalizedValue(item.label, lang)` expects `item.label` to be either a localized object (`{ uk, en, ru }`) or a string. Missing titles or malformed data shapes will render `undefined` or crash if null checks fail.

### 2.5. Remote Image Failure & Network Fallbacks
- **Location**: [CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js#L102), [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js#L76)
- **Risk**: If remote image URIs fail to load or timeout, `<Image>` components lack onError state handlers to swap broken URLs with local `PRODUCT_PLACEHOLDER` assets.

### 2.6. Responsive Image Container Height Discrepancy
- **Location**: [ProductCard.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductCard.js#L21)
- **Risk**: `imageContainer` style overrides dynamically assign `{ height: imgHeight }`. In dynamic grid layouts where screen resize events re-evaluate `depth` or window width, image height calculations might desynchronize with card total container height.

---

## 3. Mitigation Recommendations

1. **Decouple Barrel Exports**: Ensure `PlaceholderCard` imports feature cards directly rather than via barrel index files.
2. **Add Remote Image Error Handling**: Implement `onError` fallbacks on `<Image>` elements for missing remote assets.
3. **Enforce `numberOfLines` Safety**: Add `numberOfLines={2}` and ellipsis text truncation across all localized card titles.
4. **Standardize Action Button Event Hooks**: Wrap action buttons in custom press handlers that prevent Expo Router parent link navigation explicitly.
