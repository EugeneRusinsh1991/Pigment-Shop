# Engineering Standard: Badge Primitive Specification (Batches / Chips)

> [!NOTE]
> This engineering standard defines the concrete module architecture, component model, public API, design tokens, hook extractions, and variant taxonomy for the **`Badge`** UI primitive (referred to in project logs as "Batches / Батчи / Badges") across PigmentShop, implementing [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md).

---

## 1. Purpose & Semantic Scope

The `Badge` primitive serves as the **canonical visual status & tag metadata indicator** used throughout the application to label status, highlight attributes (e.g., "NEW", "-34%"), indicate counts (e.g., cart counter), or display status pills (e.g., Order Status, Product Active status, Category level).

### Key Responsibilities:
- Standardized pill/chip geometry, typography, color semantics, and padding.
- Multi-variant design system support:
  - **Product Overlay Badges**: `new` ("NEW"/"НОВИНКА"), `discount` ("-34%"), `featured` ("FEATURED").
  - **Status Badges**: `pending`, `processing`, `completed`, `cancelled` (orders), `active` / `inactive` (admin products).
  - **Hierarchy & Category Chips**: `categoryHolder`, `productHolder` (admin categories).
  - **Notification & Cart Counters**: Floating circular counter badges in `AppHeader`.
  - **Filter & Selection Chips**: Interactive toggle chips (e.g. Analytics period selector, Product filter chips).

---

## 2. Standard Architecture & Directory Layout

Following the standard reference module architecture, the Badge primitive is structured under `src/components/Badge/`:

```
src/components/Badge/
├── index.js              # Public API barrel export
├── Badge.js              # Core presentational badge component & sub-primitives
├── BadgeStyles.js        # Dynamic token-driven style map factory
├── useBadgeTheme.js      # Extracted hook: Theme & variant style resolution
└── useBadgeAnimation.js  # Extracted hook: Counter scale/pulse animation (for dynamic counters & filter chips)
```

---

## 3. Public API Strategy (`index.js`)

All consumers must import badge elements exclusively from `src/components/Badge/index.js`.

### Export Contract:
```javascript
export { default, default as Badge } from './Badge';
export { useBadgeTheme } from './useBadgeTheme';
export { useBadgeAnimation } from './useBadgeAnimation';
```

---

## 4. Design Tokens & Variant Integration

All colors, radii, spacing, typography, and contrast rules must derive directly from [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):

- **Status Colors**: `colors.success`, `colors.warning`, `colors.danger`, `colors.info`.
- **Radii**: `layout.radii.full` (pill shape), `layout.radii.xs` (rounded tag).
- **Typography**: `fonts.sans`, font size `xs` (10-12px), font weight `bold` / `medium`.
- **Variants**: `solid`, `subtle`, `outline`, `counter`, `chip`.

---

## 5. Composition & Usage Examples

### 5.1 Status & Product Overlay Badges
```jsx
// Product Overlay
<Badge variant="new" label="NEW" />
<Badge variant="discount" value={-34} />

// Order Status
<Badge variant="status" status="completed" label="Выполнен" />

// Admin Category Holder
<Badge variant="subtle" color="purple" label="Category Holder" />
```

### 5.2 Interactive Chip / Counter Variant
```jsx
// Header Cart Counter
<Badge variant="counter" count={cartCount} animated />

// Analytics Filter Chip
<Badge variant="chip" selected={activeFilter === '7days'} onClick={() => setFilter('7days')}>
  7 days
</Badge>
```

---

## 6. Audit & Unification Checklist

- [ ] Consolidate `src/features/product/ProductBadges.js` into `<Badge variant="product" />`.
- [ ] Refactor `OrderStatusBadge` in `src/components/OrderCard.js` to use `<Badge variant="status" />`.
- [ ] Replace inline status pills in `Admin/Orders`, `Admin/Products`, and `Admin/Categories` with `<Badge />`.
- [ ] Migrate `AppHeader` cart badge counter to `<Badge variant="counter" />`.
