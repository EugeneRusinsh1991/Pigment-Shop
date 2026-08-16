# Engineering Standard: Responsive Architecture & Viewport System

> [!NOTE]
> This engineering standard defines the multi-breakpoint responsive layout engine, visual viewport measurement logic, and grid scaling rules applied across PigmentShop.

---

## 1. Core Engineering Principles

### 1.1 Fluid & Adaptive Scaling
PigmentShop targets iOS, Android, and Web browsers on Mobile, Tablet, and Desktop. The application must scale gracefully without hardcoded horizontal pixel boundaries. 

- **Mobile First:** Default logic optimizes for narrow touch-targets and 1-2 column grids.
- **Tablet/Desktop Scaling:** Wide viewports automatically upgrade grid densities and enforce maximum container bounds to prevent stretched interfaces.

### 1.2 The Visual Viewport Chrome Problem
On mobile web browsers, native browser UI chrome (address bars, tab bars) can dynamically show or hide during scroll, changing the exact pixel dimensions of the `100vh` space.
- Components relying on exact screen heights MUST use `useVisualViewportDimensions` to read the true active viewport and avoid elements bleeding beneath browser chrome.

---

## 2. Standard Architecture & Implementation

```
src/
├── theme/
│   └── layout.js                        # Breakpoint constants and grid specs
├── hooks/
│   ├── useVisualViewportDimensions.js   # Dynamic viewport height tracking
│   ├── useCardDimensions.js             # Aspect ratio math for item cards
│   ├── useCatalogLayout.js              # Viewport-aware layout grid for catalogs
│   └── useGridLayout.js                 # Core grid scaling algorithm
```

---

## 3. Breakpoint & Max-Width Standards

All scaling dimensions and breakpoint triggers are defined centrally in `src/theme/layout.js`.

| Breakpoint Tier | Width Trigger | Primary Target | UI Behavior |
| :--- | :--- | :--- | :--- |
| **`narrow`** | `< 768px` | Mobile Phones | 1-2 Grid Columns, Bottom Tab Navigation. |
| **`wide`** | `>= 768px` | Tablets & Small Laptops | 3-4 Grid Columns, Side Drawer / Enhanced headers. |
| **`maxContent`** | `> 1200px` | Large Desktop Monitors | Enforces `maxContentWidth`, centers the container, leaving gutters on left/right. |

---

## 4. Grid System & Hook Architecture

UI lists and catalogs rely on automated grid mathematics rather than manual flex percentages.

### 4.1 The Grid Algorithm (`useGridLayout`)
When resolving how many items to show in a row:
1. `useGridLayout` checks current `windowWidth`.
2. Resolves against layout tokens (e.g., `layout.grid.gap`).
3. Determines ideal column count (`cols`) based on minimum acceptable item width.
4. Returns an exact `itemWidth` percentage to the UI primitive (e.g., `UnifiedCardGrid`).

### 4.2 Aspect Ratio Locking (`useCardDimensions`)
Images and product cards compute their height fluidly in proportion to the responsive column width derived by `useGridLayout`. This prevents irregular rows or jumping content.

---

## 5. Compliance Checklist

- [ ] Page-level containers wrap content in `StorefrontPageContainer` or enforce `maxContentWidth`.
- [ ] Grids use `useGridLayout` or `useCatalogLayout` instead of static `numColumns` props.
- [ ] Full-screen Modals or absolute overlays utilize `useVisualViewportDimensions` for exact height.
