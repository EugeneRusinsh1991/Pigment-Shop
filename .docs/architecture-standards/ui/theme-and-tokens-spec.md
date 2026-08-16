# Engineering Standard: Theme & Design Tokens System

> [!NOTE]
> This engineering standard defines the architecture for the central Design Token system, color semantic mapping, typography scales, dynamic style factories, and the automated token replacement script across PigmentShop.

---

## 1. Core Engineering Principles

### 1.1 Single Source of Truth
All visual properties—including colors, spacing, typography scales, border radii, shadows, and animation parameters—must originate from a single foundational layer in `src/theme/`. Hardcoding hex codes, arbitrary padding values (e.g., `padding: 15`), or exact font sizes in UI components is strictly prohibited.

### 1.2 Semantic Mapping over Literal Naming
Tokens must be defined by their semantic intent in the UI, rather than their literal physical properties:
- **Prefer**: `colors.statusError`, `colors.borderLight`, `colors.surfaceDark`
- **Avoid**: `colors.red500`, `colors.gray200`, `colors.black`

---

## 2. Standard Architecture & Directory Layout

```
src/theme/
├── tokens.js                # Core token aggregator and export barrel
├── colors.js                # Semantic color maps (light & dark) and brand scales
├── typography.js            # Font families, weight mapping, and line-height scaling
├── layout.js                # Breakpoints, border radii, icon sizes, and z-indices
├── shadows.js               # Elevation dropshadow specifications
├── haptics.js               # Semantic haptic feedback tiers
├── appStyles.js             # Global layout containers
├── commonStyles.js          # Shared utility styles
└── useThemeUtils.js         # Hooks for theme resolution and context matching
```

---

## 3. The `tokens.js` Contract

`tokens.js` acts as the definitive design system registry, exporting all atomic values and motion physics needed for component style factories.

### Core Export Contract:
```javascript
export const colors = { ... };
export const typography = { ... };
export const layout = { ... };
export const motion = {
  press: { scale: 0.96, duration: 120, friction: 5 },
  toast: { slideDuration: 250, springFriction: 8 }
};
```

---

## 4. Dynamic Style Factories

To prevent React component re-render overhead from inline styles, component authors must use the **Dynamic Style Factory Pattern**.

1. Component styles are defined as a function accepting design tokens and theme states in `[Primitive]Styles.js`.
2. The component resolves the style using `use[Primitive]Theme()`.

**Example:**
```javascript
// ButtonStyles.js
import { StyleSheet } from 'react-native';
import { layout, typography } from '../../../theme/tokens';

export const createButtonStyles = (colors, variant) => StyleSheet.create({
  container: {
    borderRadius: layout.radii.md,
    backgroundColor: variant === 'primary' ? colors.primary : colors.surfaceCard,
    paddingHorizontal: layout.spacing.lg,
  },
  text: {
    fontFamily: typography.fonts.sans,
    fontSize: typography.sizes.body1,
  }
});
```

---

## 5. Token Replacement Automation

PigmentShop utilizes an automated token replacement script (`replace_tokens.js`) in the repository root.

- **Purpose:** To rapidly re-theme the application for new storefronts by injecting new brand colors and border radii into `colors.js` and `layout.js` without manual search-and-replace operations.
- **Workflow:** Modifies specific JSON-like blocks inside the theme files. Code within `src/theme/colors.js` and `src/theme/layout.js` must adhere to the formatting expected by `replace_tokens.js` to ensure script safety.

---

## 6. Compliance Checklist

- [ ] All `StyleSheet.create` calls reference `tokens.js`.
- [ ] No hardcoded hex color values in component JSX or specific feature files.
- [ ] Theme switching logic uses `useThemeUtils.js` to resolve current colors dynamically.
