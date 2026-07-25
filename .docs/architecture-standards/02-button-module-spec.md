# Button Module Architectural Specification

> [!NOTE]
> This specification defines the concrete module architecture, component model, public API, and evolutionary rules for the `Button` UI primitive, implementing [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md).

---

## 1. Purpose & Semantic Scope

The `Button` primitive represents an **action trigger** (executing a command, submitting a form, or opening a modal). 

### Non-Button Primitives (Out of Scope):
- **Tabs**: View navigation panels $\rightarrow$ `Tab` module.
- **Carousel Indicators**: Slide navigation $\rightarrow$ `Carousel` module.
- **Banner Selectors**: Banner pagination $\rightarrow$ `Banner` module.

Visual clickability alone does not make an element a `Button`. Non-action elements must use their respective semantic primitives.

---

## 2. Public API Strategy (`index.js`)

All consumers must import button components exclusively from `src/components/Button/index.js`.

### Export Contract:
```javascript
export { default, default as Button } from './Button';
export { ChipButton } from './ChipButton';
export { IconButton } from './IconButton';
```

- **Backward Compatibility**: Refactoring internal file layouts must never alter this export contract or break consumer imports.

---

## 3. Component Model

The module consists of a base action primitive and two specialized semantic components:

1. **`Button`** (Base Primitive): Standard action button with icon, text, loading spinner, and press animation support.
2. **`ChipButton`**: Compact pill/rectangular tag primitive representing toggleable selection states or filters.
3. **`IconButton`**: Square/circular hit-target primitive for standalone visual actions without text labels.

*Rule*: New component primitives within the `Button` module are allowed **only** when introducing distinct accessibility, structural, or state management semantics.

---

## 4. Visual Variants vs. Behaviors

### 4.1 Visual Variants (`variant` prop)
Appearance options belong to the `variant` prop and do **NOT** spawn separate files:
- `primary`, `secondary`, `outline`, `ghost`, `text`, `unstyled`

### 4.2 Behaviors (Composable Props)
Interaction states and gesture feedback compose seamlessly across all visual variants:
- `loading`: Replaces/complements text with an activity indicator.
- `animated`: Enables scale/opacity feedback on press.
- `disabled`: Inhibits interaction events and applies muted theme opacity.

*Rule*: Never create composite components like `LoadingButton` or `OutlinedButton`. Use `<Button variant="outline" loading />`.

---

## 5. Target File Structure & Responsibility Matrix

```
src/components/Button/
├── index.js          # Public API exports
├── Button.js         # Core Base Button implementation
├── ChipButton.js     # Specialized ChipButton component & chipStyles
└── IconButton.js     # Specialized IconButton component & iconStyles
```

### Responsibility Allocation:
- **`Button.js`**: Owns base action rendering, animation drivers (`scaleAnim`, `opacityAnim`), hitSlop calculation, and `Pressable` handling.
- **`ChipButton.js`**: Owns tag selection styling (`chipStyles`), pill/rect shape toggling, and chip icon color resolving.
- **`IconButton.js`**: Owns dimension-to-radius calculation (`iconStyles`) and icon color cloning.

---

## 6. Evolutionary Rules

When new requirements emerge for the `Button` primitive:
1. **First Choice**: Add a new prop or behavioral flag to `Button.js`.
2. **Second Choice**: Define a new visual `variant` option.
3. **Last Resort**: Create a new component file inside `src/components/Button/` **only if** the new primitive possesses distinct semantic behavior and cannot be cleanly expressed via props.
