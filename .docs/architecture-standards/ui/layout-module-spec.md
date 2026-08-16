# Engineering Standard: Layout Module Architecture

> [!NOTE]
> This engineering standard defines the architectural specification, directory layout, and design token integration for the **Layout** UI primitives (e.g., `StorefrontPageContainer`).

---

## 1. Semantic Purpose

`Layout` primitives provide foundational boundaries and screen-level structural wrappers ensuring that the application adapts cleanly to different viewport sizes. They act as the root coordinate space for page content, standardizing maximum widths and centering behaviors.

### Key Responsibilities:
- Ensuring ultra-wide screens (large desktops) do not stretch content indefinitely.
- Applying uniform outer edge paddings across all feature modules.
- Standardizing the `maxContentWidth` across the Storefront domain.

---

## 2. Module Architecture

```
src/components/ui/Layout/
├── index.js                     # Public API export barrel
└── StorefrontPageContainer.js   # Container component for maximum width locking
```

---

## 3. Design Token & Utility Integration

- **Token Reference**: Uses `layout.maxContentWidth` from `src/theme/tokens.js` to bound the content container.
- **Utility Resolution**: Defers width calculations to the `getContentGridWidth()` helper from `src/utils/layoutUtils.js` which dynamically determines margins based on the `useWindowDimensions` hook.

---

## 4. Component Interface

### `StorefrontPageContainer`
A responsive wrapper component replacing raw `<View>` tags at the root of a Storefront page/screen.

```typescript
interface StorefrontPageContainerProps {
  children: React.ReactNode;
  style?: object | object[];        // Applied to the outermost full-width wrapper
  contentStyle?: object | object[]; // Applied to the inner centered content wrapper
}
```

---

## 5. Compliance Checklist

- [ ] All top-level Storefront feature screens wrap their content in `StorefrontPageContainer`.
- [ ] No feature module defines custom `maxWidth` limits on its root containers.
- [ ] Responsive logic correctly centers the `innerContent` when `windowWidth > layout.maxContentWidth`.
