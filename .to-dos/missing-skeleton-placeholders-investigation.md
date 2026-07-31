# Investigation & Architectural Strategy: Missing Skeleton Placeholders During Initial Page Load

## 1. Executive Summary & Problem Description

During initial application startup or route navigation, dynamic product card sections (such as **New Arrivals**, **On Sale**, catalog categories, and search results) experience visual layout collapse and cumulative layout shifts (CLS).

* **Observed Behavior**: Product sections visibly render with `0` height or unreserved empty layout space prior to asynchronous data completion. Once network queries resolve, real cards pop into view abruptly.
* **Scope**: Affects home screen dynamic feeds (**New Arrivals**, **On Sale**), catalog page grids, search result feeds, and any layout loading product card primitives asynchronously.
* **Goal**: Define the architectural foundation and implementation strategy for reserving layout space via animated skeleton placeholders, eliminating layout reflows and improving perceived performance.

---

## 2. Architectural Analysis: Dedicated vs. Existing Solutions

### 2.1 Reusability Evaluation of Existing Codebase Assets
An audit of the codebase reveals that a feedback skeleton foundation **already exists**:
* [`SkeletonLoader.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Feedback/Skeleton/SkeletonLoader.js): Provides `SkeletonItem` with opacity pulsing (`Animated.loop`), as well as helper constructs (`CatalogSkeleton`, `ProductDetailSkeleton`, `ProfileSkeleton`).
* [`useSkeletonTheme.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Feedback/Skeleton/useSkeletonTheme.js): Handles theme context subscription (`isDark`) and resolves colors.
* [`SkeletonStyles.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Feedback/Skeleton/SkeletonStyles.js): Stores layout and positioning definitions.

However, the existing `CatalogSkeleton` is currently decoupled from the primary grid renderer (`UnifiedCardGrid` / `PlaceholderGrid`) and uses legacy inline percentage calculations (`width: Math.floor(100 / cols) - 3%`), causing dimensions to diverge from actual product cards.

### 2.2 Decision: Architecture Reuse with Domain-Specific Card Skeletons
**A new dedicated skeleton engine is NOT required.** 

Instead, the project architecture should **extend the existing UI Feedback primitive (`SkeletonItem`)** and establish a standard **Product Card Skeleton pattern integrated into `UnifiedCardGrid`**.

---

## 3. Core Architectural Foundation & Design System Tokenization

Before adding product card skeletons to sections like **New Arrivals** or **On Sale**, the following architectural foundation must be established:

### 3.1 Design Token Alignment
Skeleton components must strictly consume semantic design tokens from [`colors.js`](file:///d:/Magazine/_PigmentShop/src/theme/colors.js) and [`layout.js`](file:///d:/Magazine/_PigmentShop/src/theme/layout.js):
* **Light Theme Skeleton Base**: `semantic.color.surface.light.subtle` (primitives.slate[100]) or `colors.surfaceSubtleLight`.
* **Dark Theme Skeleton Base**: `semantic.color.surface.dark.subtle` (primitives.slate[900]) or `colors.surfaceSubtleDark`.
* **Skeleton Shimmer / Highlight Token**: Define explicit semantic tokens in `semantic.color.surface` (e.g., `surfaceSkeletonLight`, `surfaceSkeletonDark`) for background opacity state loops.
* **Radii Alignment**: Skeleton card containers and sub-elements must mirror exact radii tokens used in `ProductCard` (`layout.radii.lg`, `layout.radii.sm`).

### 3.2 Layout & Aspect Ratio Synchronization
To prevent any layout shift when switching from skeleton to real content:
* Skeleton cards must match `ProductCard` height, padding, badge slots, title line count, and image aspect ratio.
* Grid skeleton rendering must pass directly through [`UnifiedCardGrid.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Grid/UnifiedCardGrid.js) to inherit identical column math (`cols`), gap spacing (`gap`), and flex/grid rules as the populated grid.

---

## 4. Integration into Project Architecture

The skeleton placeholder feature will integrate across three architectural layers:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Feature Layer (Home / Catalog / Search Views)           │
│    - Handles loading flags (isLoading, isFetching)           │
│    - Renders Section Container with Skeleton Fallback      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 2. Layout Grid Layer (UnifiedCardGrid / PlaceholderGrid)    │
│    - Receives `loading` & `skeletonCount` props             │
│    - Renders exact N ProductCardSkeleton items              │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 3. UI Feedback Layer (SkeletonLoader & Design Tokens)       │
│    - Provides primitive SkeletonItem (Animated loop)        │
│    - Consumes semantic tokens via useSkeletonTheme          │
└─────────────────────────────────────────────────────────────┘
```

1. **UI Component Layer**: Create `ProductCardSkeleton` under `src/features/product/ProductCardSkeleton.js` (or within `src/components/ui/Feedback/Skeleton/`), assembling `SkeletonItem` primitives to match `ProductCard`.
2. **Grid Container Layer**: Update `PlaceholderGrid` ([`PlaceholderCard.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/PlaceholderCard.js)) and `UnifiedCardGrid` to accept standard `loading` and `skeletonCount` props. When `loading === true`, dummy arrays populate the grid seamlessly.
3. **View/Section Layer**: Home sections (**New Arrivals**, **On Sale**) and `CatalogPage` pass query loading states (`isLoading`) down to `PlaceholderGrid` instead of rendering empty views or `null`.

---

## 5. Implementation Strategy on Top of the Foundation

Once the architectural foundation and design token mappings are locked:

1. **Step 1: Refactor UI Skeleton Token Mappings**
   * Standardize `useSkeletonTheme` to consume explicit component-level skeleton tokens from `theme/colors.js`.
2. **Step 2: Construct `ProductCardSkeleton`**
   * Build `ProductCardSkeleton` using `SkeletonItem` blocks:
     * Card Image block (matching product card image height/aspect ratio).
     * Category/Brand text bar.
     * Title text bar (2 lines).
     * Price & Action button pills.
3. **Step 3: Extend `PlaceholderGrid` / `UnifiedCardGrid`**
   * Support seamless loading states:
     ```javascript
     if (loading) {
       return (
         <UnifiedCardGrid cols={cols} gap={gap} variant={variant}>
           {Array.from({ length: skeletonCount }).map((_, i) => (
             <ProductCardSkeleton key={i} />
           ))}
         </UnifiedCardGrid>
       );
     }
     ```
4. **Step 4: Connect Async View Loading States**
   * Connect **New Arrivals**, **On Sale**, Catalog, and Search feeds to feed `loading={isLoading}` into their grid containers.

---

## 6. Recommended Future Investigation & Verification Steps

1. **Performance Profiling**:
   * Verify native driver usage (`useNativeDriver: Platform.OS !== 'web'`) in `SkeletonItem` pulse loops so multiple visible skeleton cards do not degrade FPS on low-end devices.
2. **Cumulative Layout Shift (CLS) Audit**:
   * Measure layout boundaries before and after data load on desktop and mobile web to guarantee zero height jump.
3. **Theme Transition Check**:
   * Test dynamic dark/light mode toggle while skeleton loaders are actively pulsing to ensure smooth color palette updates without visual glitching.
