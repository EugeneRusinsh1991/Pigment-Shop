# Current Button Module Engineering Analysis

> [!NOTE]
> This analysis evaluates the current implementation of `src/components/Button.js` (339 lines) against the approved target architecture in [.docs/architecture-standards/02-button-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/02-button-module-spec.md) prior to refactoring.

---

## 1. Current Public API

`src/components/Button.js` currently exposes the following public interface:

- `default` (`Button`): Primary interactive action button.
- `AnimatedButton`: Unstyled pressable wrapper.
- `ChipButton`: Tag/filter button primitive with active state styles.
- `IconButton`: Circular/square icon button primitive.

---

## 2. Internal Responsibilities & Coupling

### 2.1 Base Button Logic
- Handles `Pressable` / `TouchableOpacity` fallback based on `Platform.OS === 'web'`.
- Drives scale and opacity animation refs (`scaleAnim`, `opacityAnim`).
- Resolves container/text styles via `getContainerStyle()` and `getTextStyle()`.
- Calculates hitSlop dynamically using `calculateHitSlop()`.

### 2.2 ChipButton Logic
- Uses `getButtonStyle()` with state keys (`Active` / `Inactive`).
- Clones icon elements to apply dynamic active/muted colors via `renderChipIcon()`.
- Contains `chipStyles` `StyleSheet` object (lines 252–273).

### 2.3 IconButton Logic
- Calculates width, height, and border radii dynamically based on `size` prop.
- Clones icon elements to pass default theme colors.
- Contains `iconStyles` `StyleSheet` object (lines 328–338).

---

## 3. Extraction Boundaries & Migration Risks

### Safe Extractions:
1. **`ChipButton` + `chipStyles`**: Self-contained component and styling; zero internal state dependency on `Button.js`.
2. **`IconButton` + `iconStyles`**: Self-contained component and dimension calculation; zero internal state dependency on `Button.js`.

### High-Cohesion Logic (Keep Together):
1. **`Button` + `AnimatedButton`**: `AnimatedButton` is a 3-line wrapper around `Button` (`variant="unstyled"`). It should remain inside `Button.js`.
2. **Shared Theme Dependencies**: All components depend on `useTheme()` and helpers from `src/theme/buttonCommon.js`.

### Potential Migration Risks:
- **Default Import Mismatches**: Ensuring consumers importing `{ Button }` vs `import Button` experience zero breaking changes during `index.js` creation.
