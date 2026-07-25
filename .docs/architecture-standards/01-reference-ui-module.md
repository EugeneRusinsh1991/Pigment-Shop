# Engineering Standard: Reference UI Module Architecture

> [!NOTE]
> This standard defines the mandatory architectural specification, module structure, decomposition rules, and design token integration patterns for all UI primitives across PigmentShop (e.g., Button, Modal, Card, Drawer, SearchBar, Input, Row).

---

## 1. Core Engineering Principles

### 1.1 Semantic First
UI primitives are defined strictly by their **domain responsibility and interaction semantics**, not by visual appearance alone.
- **Button**: Action or command trigger.
- **Card**: Grouped content container.
- **Row**: Data list or grid display item.
- **Chip / Tag**: Selectable filter or metadata indicator.

*Rule*: Never reuse or merge distinct semantic primitives simply because they share visual properties.

### 1.2 Composition Before Proliferation
Solve UI variations through configuration props and composition before introducing new primitives.
- **Prefer**: `<Card variant="elevated" clickable loading />`
- **Avoid**: `ElevatedCard`, `ClickableCard`, `LoadingCard`

*Rule*: A new component primitive file is justified ONLY when it introduces distinct accessibility, gesture, or state semantics.

### 1.3 The 200-Line & Decomposition Rule
To prevent monolithic components and control cyclomatic complexity:
- No component or hook file should exceed **~200 lines of code**.
- **Rendering Logic**: Kept pure inside `[ModuleName].js`.
- **Style Definitions**: Isolated in `[ModuleName]Styles.js` via token factories.
- **Theme Resolution**: Extracted into `use[ModuleName]Theme.js`.
- **Animation & Gestures**: Extracted into `use[ModuleName]Animation.js`.

---

## 2. Standard Reference Module Architecture

Every standard UI module must follow this canonical directory structure:

```
src/components/[ModuleName]/
├── index.js                     # Public API barrel export
├── [ModuleName].js              # Core presentational component (< 200 lines)
├── [ModuleName]Styles.js        # Dynamic token-driven style map factory
├── use[ModuleName]Theme.js      # Extracted hook: Theme & dark mode resolution
├── use[ModuleName]Animation.js  # Extracted hook: Gesture & animation drivers
└── [SpecializedSubPrimitive].js # Specialized variant primitive (if distinct semantics require it)
```

### File Responsibilities:

1. **`index.js` (Public Barrel Export)**:
   - Exposes the public API interface (`default`, named exports, hooks, tokens).
   - Shields internal refactoring from breaking application consumers.

2. **`[ModuleName].js` (Core Component)**:
   - Contains JSX rendering and props validation.
   - Delegates state/gestures to `use[ModuleName]Animation` and styling to `use[ModuleName]Theme`.
   - Must remain strictly under ~200 lines.

3. **`[ModuleName]Styles.js` (Style Factory)**:
   - Uses `StyleSheet.create` and token utilities from `src/theme/tokens.js`.
   - Generates flat style maps for light/dark themes and visual variants (`sm`, `md`, `lg`).

4. **`use[ModuleName]Theme.js` (Theme Hook)**:
   - Resolves context dark mode (`ThemeContext`) and variant prop fallbacks.
   - Returns combined container and text style objects.

5. **`use[ModuleName]Animation.js` (Animation Hook)**:
   - Manages `Animated.Value` instances (`scaleAnim`, `opacityAnim`).
   - Drives gesture timing and spring sequences using central `motion` tokens.

---

## 3. Design Token & Theme Integration

No UI component may hardcode colors, border radii, heights, font sizes, or animation parameters. All visual properties must reference [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):

- **Colors**: `colors.accent`, `colors.surfaceDark`, `colors.borderLight`, etc.
- **Radii**: `layout.radii.xs` (6), `layout.radii.sm` (8), `layout.radii.md` (16), `layout.radii.full` (50).
- **Motion**: `motion.press.scale` (1.1), `motion.press.duration` (90ms), `motion.press.friction` (4).
- **Typography**: `fonts.sans`, `fonts.serif`.

---

## 4. Module Lifecycle & Evolution Matrix

| Complexity Level | Examples | Required Architecture | Decomposition Justification |
| :--- | :--- | :--- | :--- |
| **Simple Primitive** | `FieldError`, `Badge` | Single file (`Badge.js`) | Under 100 lines, static styling, no state or gesture handling. |
| **Standard Primitive** | `Card`, `Drawer` | `ModuleName.js`, `ModuleNameStyles.js` | Decouples render logic from style objects exceeding 80 lines. |
| **Full Reference Module** | `Button`, `Modal`, `Input` | Full 5-file architecture (`index`, `Component`, `Styles`, `Theme`, `Animation`) | Handles variants, gestures, dark mode, and spring animations cleanly under 200-line limits. |

---

## 5. Compliance Checklist for Future Primitives

When creating or refactoring a UI module (e.g., `Card`, `Row`, `Modal`):
- [ ] Export contract established in `index.js`.
- [ ] Render component `[ModuleName].js` is under 200 lines.
- [ ] Styles encapsulated in `[ModuleName]Styles.js` referencing `tokens.js`.
- [ ] Theme resolution logic extracted to `use[ModuleName]Theme.js`.
- [ ] Animation drivers extracted to `use[ModuleName]Animation.js` (if interactive).
- [ ] Zero hardcoded hex colors, radii, or pixel offsets.
