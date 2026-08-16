# Engineering Standard: Grid Module Architecture

> [!NOTE]
> This engineering standard defines the architectural specification, directory layout, and design token integration for the **Grid** UI module (`UnifiedCardGrid`).

---

## 1. Semantic Purpose

The `Grid` primitive provides a standardized, responsive structure for rendering repetitive sets of items (e.g., product cards, category items) across the application. It acts as the canonical array iterator layout ensuring consistent gutters, margins, and column rendering logic.

### Key Responsibilities:
- Support for flat list virtualized scrolling (`variant="flatlist"`) for heavy paginated views.
- Support for static flex-wrap wrapping (`variant="flex"`) for short lists inside ScrollViews.
- Seamless integration with the pull-to-refresh subsystem (`usePullToRefresh`).
- Consistent padding and gap calculation mapped from global tokens.

---

## 2. Module Architecture

```
src/components/ui/Grid/
├── index.js                     # Public API export barrel
└── UnifiedCardGrid.js           # Core presentation and grid iteration component
```

---

## 3. Design Token & Subsystem Integration

- **Layout Context**: Consumes grid width and responsive `cols` parameters from layout hooks like `useGridLayout`.
- **Spacing Math**: Replaces rigid inline margins with a global `gap` parameter mathematically split across children (`itemWidth = 100/cols`, `marginHorizontal: -(gap/2)`).
- **Refresh Intercepts**: Internally bridges `onRefreshProp` into the app-wide `usePullToRefresh` hook when using the `flatlist` variant.

---

## 4. API Contract

All consumers must import the grid primitive from `src/components/ui/Grid/index.js`.

### 4.1 Base Props Interface
```typescript
interface UnifiedCardGridProps {
  data: Array<any>;                    // The data array to render
  renderItem: (props) => ReactNode;    // Render callback for each item
  cols?: number;                       // Number of grid columns (default: 3)
  gap?: number;                        // Pixel gap between columns/rows (default: 8)
  variant?: 'flex' | 'flatlist';       // Rendering engine strategy
  onRefresh?: () => Promise<void>;     // Pull to refresh callback
  disableRefreshControl?: boolean;     // Opt-out flag for nested refreshers
}
```

---

## 5. Compliance Checklist

- [ ] Grid lists do not manually recreate `flexWrap` iteration logic.
- [ ] List views with infinite scroll or heavy performance needs utilize `variant="flatlist"`.
- [ ] Gaps and padding are supplied via layout tokens, not magic numbers.
