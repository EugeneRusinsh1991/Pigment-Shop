# Engineering Standard: Reference UI Module Architecture

> [!NOTE]
> This engineering standard defines the overarching architectural specification, canonical directory layout, module decomposition rules, API contract standards, and design token integration patterns for all UI primitives across PigmentShop (e.g., [`Button`](file:///d:/Magazine/_PigmentShop/architecture-standards/ui/button-module-spec.md), [`Toggle`](file:///d:/Magazine/_PigmentShop/architecture-standards/ui/toggle-module-spec.md), [`Flag`](file:///d:/Magazine/_PigmentShop/architecture-standards/ui/flag-module-spec.md)).

---

## 1. Core Engineering Principles

### 1.1 Semantic Purpose
UI primitives are defined strictly by their **domain responsibility and interaction semantics**, not by visual appearance alone. Every specification MUST contain an explicit semantic definition clarifying its state behavior and execution model.

- **Button** ([`button-module-spec.md`](file:///d:/Magazine/_PigmentShop/architecture-standards/ui/button-module-spec.md)): Single-action trigger (executing commands, submitting forms, opening modals). Does not persist toggle state.
- **Toggle** ([`toggle-module-spec.md`](file:///d:/Magazine/_PigmentShop/architecture-standards/ui/toggle-module-spec.md)): Multi-option view or mode selection switcher (tabs, sort orders, date ranges). Persists active selected option.
- **Flag** ([`flag-module-spec.md`](file:///d:/Magazine/_PigmentShop/architecture-standards/ui/flag-module-spec.md)): Binary state switcher or boolean attribute input (status badges, checkboxes, feature toggles). Persists standalone boolean state.

*Rule*: Never reuse or merge distinct semantic primitives simply because they share visual properties.

### 1.2 Composition Before Proliferation
Solve UI variations through configuration props and composition before introducing new primitives.
- **Prefer**: `<Card variant="elevated" clickable loading />`
- **Avoid**: `ElevatedCard`, `ClickableCard`, `LoadingCard`

*Rule*: A new component primitive file is justified ONLY when it introduces distinct accessibility, gesture, or state semantics.

### 1.3 Decomposition Rule
To prevent monolithic components and control cyclomatic complexity:
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
├── [ModuleName].js              # Core presentational component
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

3. **`[ModuleName]Styles.js` (Style Factory)**:
   - Uses `StyleSheet.create` and token utilities from `src/theme/tokens.js` (or specific sub-modules `colors.js`, `layout.js`, `typography.js`, `shadows.js`).
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
| **Simple Primitive** | `FieldError`, `Badge` | Single file (`Badge.js`) | Static styling, no state or gesture handling. |
| **Standard Primitive** | [`Toggle`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/toggle-module-spec.md), [`Flag`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/flag-module-spec.md) | `ModuleName.js`, `ModuleNameStyles.js`, `useModuleNameTheme.js` | Decouples render logic from style factories and theme hooks. |
| **Full Reference Module** | [`Button`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/button-module-spec.md) | Full 5-file architecture (`index`, `Component`, `Styles`, `Theme`, `Animation`) | Handles variants, gestures, dark mode, and spring animations cleanly. |

---

## 5. Compliance Checklist for Future Primitives

When creating or refactoring a UI module (e.g., `Card`, `Row`, `Modal`):
- [ ] Explicit semantic definition and state model established in Section 1.1.
- [ ] Export contract established in `index.js`.
- [ ] Render component `[ModuleName].js` focuses on presentation.
- [ ] Styles encapsulated in `[ModuleName]Styles.js` referencing `tokens.js`.
- [ ] Theme resolution logic extracted to `use[ModuleName]Theme.js`.
- [ ] Animation drivers extracted to `use[ModuleName]Animation.js` (if interactive).
- [ ] Zero hardcoded hex colors, radii, or pixel offsets.
