# Engineering Standard: Button Primitive Specification

> [!NOTE]
> This engineering standard defines the concrete module architecture, component model, public API, design tokens, hook extractions, and evolutionary rules for the **`Button`** UI primitive across PigmentShop, implementing [architecture-standards/ui/reference-module-spec.md](file:///d:/Magazine/_PigmentShop/architecture-standards/ui/reference-module-spec.md).

---

## 1. Purpose & Semantic Scope

The `Button` primitive represents a **single-action trigger** (executing a command, submitting a form, or opening a modal). It performs a discrete operation and does not store or visually display a persistent toggle state (ON/OFF or active option selection). 

### Non-Button Primitives (Out of Scope):
- **Tabs**: View navigation panels $\rightarrow$ `Tab` module (`AdminTabBar`).
- **Carousel Indicators**: Slide navigation $\rightarrow$ `HeroCarousel` module.
- **Segmented Controls**: View toggles $\rightarrow$ `SegmentedToggle` primitive.

Visual clickability alone does not make an element a `Button`. Non-action elements must use their respective semantic primitives.

---

## 2. Public API Strategy (`index.js`)

All consumers must import button components exclusively from [`src/components/Button/index.js`](file:///d:/Magazine/_PigmentShop/src/components/Button/index.js).

### Export Contract:
```javascript
export { default, default as Button, AnimatedButton } from './Button';
export { ChipButton } from './ChipButton';
export { IconButton } from './IconButton';
export { useButtonTheme } from './useButtonTheme';
export { buttonTokens } from '../../theme/tokens';
```

- **Backward Compatibility**: Refactoring internal hook extractions, file layouts, or style maps must never alter this export contract or break consumer imports.

---

## 3. Design Tokens & Geometry Standards

All button dimensions, radii, font sizes, and press animations derive from centralized design tokens in [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):

| Size Token | Height | Border Radius (Standard) | Border Radius (Pill) | Padding Horizontal | Font Size | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `lg` | **48px** | `16px` (`layout.radii.md`) | `24px` | `24px` | `14px` | Main CTA / Hero / Page Submit / Checkout |
| `md` | **40px** | `8px` (`layout.radii.sm`) | `20px` | `16px` | `13px` | Form Actions / Modal Controls / Filter Apply |
| `sm` | **32px** | `6px` (`layout.radii.xs`) | `16px` | `12px` | `12px` | Compact Admin Rows / Inline Table Actions |

### Motion Tokens (`motion.press`):
- `scale`: `1.1` (or custom `scaleTo`)
- `duration`: `90ms`
- `friction`: `4`, `tension`: `40`

---

## 4. Component Model

The module consists of a base action primitive, helper hook extractions, and specialized semantic components:

1. **`Button`** (Base Primitive): Core action button with icon, text, loading spinner, and spring animation support.
2. **`AnimatedButton`**: Lightweight unstyled variant wrapper for custom layout touchables.
3. **`ChipButton`**: Compact pill/rectangular tag primitive representing toggleable selection states or filters.
4. **`IconButton`**: Hit-target primitive for standalone visual actions without text labels.

---

## 5. Visual Variants vs. Behaviors

### 5.1 Visual Variants (`variant` prop)
Appearance options belong to the `variant` prop and are dynamically resolved via `useButtonTheme`:
- `primary`, `accent`, `secondary`, `outline`, `ghost`, `danger`, `dangerSoft`, `success`, `unstyled`

### 5.2 Behaviors (Composable Props)
Interaction states and gesture feedback compose seamlessly across all visual variants:
- `loading`: Replaces text with ActivityIndicator.
- `animated`: Enables spring scale (`scaleAnim`) and opacity feedback (`opacityAnim`) on press.
- `disabled`: Inhibits touch events and applies muted theme opacity.
- `fullWidth`: Expands button container to fill available width.

---

## 6. Physical File Structure & Decomposition Matrix

Following [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md):

```
src/components/Button/
├── index.js               # Public API export barrel
├── Button.js              # Core Base Button primitive & AnimatedButton shim
├── ButtonStyles.js        # Dynamic token-driven style map factory
├── useButtonAnimation.js  # Extracted hook: Press timing & spring animation drivers
├── useButtonTheme.js      # Extracted hook: Variant & dark mode style resolution
├── ChipButton.js          # Specialized ChipButton component & chipStyles
└── IconButton.js          # Specialized IconButton component & iconStyles
```

### Responsibility Allocation:
- **`Button.js`**: Renders container view (`AnimatedPressable` / `TouchableOpacity`), delegates animations to `useButtonAnimation` and themes to `useButtonTheme`.
- **`ButtonStyles.js`**: Generates flat `StyleSheet` objects from design tokens (`buttonTokens`) and theme colors.
- **`useButtonAnimation.js`**: Manages `scaleAnim` (spring sequence) and `opacityAnim` (timing fade) values.
- **`useButtonTheme.js`**: Resolves dark/light mode and variant fallback mappings.
- **`ChipButton.js`**: Owns tag selection styling (`chipStyles`), pill/rect shape toggling.
- **`IconButton.js`**: Owns dimension-to-radius calculation (`iconStyles`) and icon color cloning.

---

## 7. Evolutionary Rules

When new requirements emerge for the `Button` primitive:
1. **First Choice**: Add a new prop or behavioral flag to `Button.js`.
2. **Second Choice**: Add a new visual variant mapping to `ButtonStyles.js`.
3. **Refactoring Choice**: Extract internal helper hooks (e.g., `useButtonAnimation.js`) when `Button.js` gains complex state logic or additional animation responsibilities.
4. **Last Resort**: Create a new primitive file inside `src/components/Button/` **only if** the primitive possesses distinct semantic behavior (e.g., `ChipButton.js`, `IconButton.js`).
