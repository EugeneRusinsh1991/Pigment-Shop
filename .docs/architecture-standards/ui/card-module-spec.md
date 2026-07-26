# Engineering Standard: Card Primitive Specification

> [!NOTE]
> This engineering standard defines the concrete module architecture, component model, public API, design tokens, hook extractions, and evolutionary rules for the **`Card`** UI primitive across PigmentShop, implementing [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md).

---

## 1. Purpose & Semantic Scope

The `Card` primitive serves as the **foundational visual container** for grouping related content, images, typography, badges, and actions across the application (e.g., product items on Home, Catalog, and Products screens).

### Key Responsibilities:
- Standardized container bounds, background elevations, border radii, shadows, and hover/press interactions.
- Modular composition allowing sub-components (`Card.Image`, `Card.Content`, `Card.Title`, `Card.Badge`, `Card.Actions`) or preset variants (`product`, `category`, `list`).

---

## 2. Standard Architecture & Directory Layout

Following the standard reference module architecture, the Card primitive is structured as:

```
src/components/Card/
├── index.js             # Public API barrel export
├── Card.js              # Core presentational component & sub-components
├── CardStyles.js        # Dynamic token-driven style map factory
├── useCardTheme.js      # Extracted hook: Theme & dark mode resolution
└── useCardAnimation.js  # Extracted hook: Hover/press gesture drivers
```

---

## 3. Public API Strategy (`index.js`)

All consumers must import card elements exclusively from `src/components/Card/index.js`.

### Export Contract:
```javascript
export { default, default as Card } from './Card';
export { useCardTheme } from './useCardTheme';
export { useCardAnimation } from './useCardAnimation';
```

---

## 4. Design Tokens & Variant Integration

All dimensions, radii, surface colors, elevations, and motion feedback must derive from [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):

- **Elevations / Borders**: `colors.surfaceDark`, `colors.borderLight`, `colors.surfaceCard`.
- **Radii**: `layout.radii.md` (16px), `layout.radii.sm` (8px).
- **Motion**: `motion.press.scale`, hover elevation transitions.
- **Variants**: `grid` (default product card), `compact` (home showcase), `list` (wide horizontal view).

---

## 5. Composition Model

Instead of creating monolithic specialized files like `HomeProductCard` or `CatalogProductCard`, variations are handled via:
1. Preset variants: `<Card variant="grid" data={product} />`
2. Slot-based composition:
```jsx
<Card onClick={handlePress}>
  <Card.Image src={item.image} />
  <Card.Content>
    <Card.Badge label={item.badge} />
    <Card.Title>{item.title}</Card.Title>
    <Card.Price value={item.price} />
  </Card.Content>
  <Card.Actions>
    <Button size="sm">Add to Cart</Button>
  </Card.Actions>
</Card>
```
