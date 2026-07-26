# Engineering Standard: Drawer UI Module Architecture

> [!NOTE]
> This engineering standard defines the semantic purpose, architectural layout, hook breakdown, API props contract, animation mechanics, and design token integration for the **Drawer** UI primitive in PigmentShop.

---

## 1. Semantic Purpose & Interaction Model

### 1.1 Semantic Purpose
The `Drawer` is an interactive modal/sliding container primitive. It renders a panel that slides out from the edge of the viewport (left, right, top, bottom) over a semi-transparent backdrop layer (`Overlay`). 

- **Primary Scope**: Side navigation menus, quick-view filters, mobile action sheets, context-specific detail drawers.
- **State Model**: Holds open/closed visibility state, overlay backdrop interaction handlers, and edge slide position properties.

### 1.2 Primitive Boundaries & Non-Goals
- **Drawer vs Modal**: Modal is centered and blocks main content context entirely for mandatory interaction. Drawer is anchored to a screen edge, serving auxiliary actions/navigation.
- **Drawer vs Toggle/Flag**: Drawer is a spatial overlay primitive, not a state-switching binary input.

---

## 2. Target Reference Module Architecture

The `Drawer` component follows the full 5-file UI module structure:

```
src/components/Drawer/
├── index.js                  # Public API barrel export
├── Drawer.js                 # Presentational container & backdrop layout
├── DrawerStyles.js           # Style factory consuming design tokens
├── useDrawerTheme.js         # Theme & backdrop overlay color resolution hook
└── useDrawerAnimation.js     # Slide & overlay opacity animation drivers hook
```

### File Responsibilities:

1. **`index.js`**:
   - Barrel export exposing `Drawer`, named sub-components (`DrawerHeader`, `DrawerFooter` if applicable), and hooks.

2. **`Drawer.js`**:
   - Presentational structure rendering backdrop overlay (`TouchableWithoutFeedback`/`Pressable`) and animated sliding content container.
   - Delegates animation state to `useDrawerAnimation` and visual styling to `useDrawerTheme`.

3. **`DrawerStyles.js`**:
   - Dynamically builds container positioning styles according to `position` prop (`left`, `right`, `top`, `bottom`) using token radii, elevations, and layout properties.

4. **`useDrawerTheme.js`**:
   - Resolves active theme (`isDark`), surface background colors, overlay backdrop opacity/color, and border styling from `src/theme/tokens.js`.

5. **`useDrawerAnimation.js`**:
   - Controls `Animated.Value` instances (`slideAnim`, `backdropOpacity`).
   - Handles enter/exit spring/timing transitions based on `isOpen` prop.
   - Triggers `onClose` callbacks upon completion of exit animations.

---

## 3. Design Token Integration

All visual and motion parameters MUST strictly reference [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):

- **Background & Overlay Colors**: `colors.surface`, `colors.surfaceDark`, `colors.overlayBackdrop`.
- **Layout & Positioning**: `layout.drawerWidth`, `layout.radii.lg`, z-index overlay stacks.
- **Motion Parameters**: `motion.drawer.slideDuration`, `motion.drawer.easing`, `motion.drawer.springConfig`.

---

## 4. API Props Contract

```typescript
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom'; // Default: 'left'
  width?: number | string;                        // Optional size override
  closeOnOverlayPress?: boolean;                 // Default: true
  children: React.ReactNode;
}
```

---

## 5. Refactoring & Compliance Checklist

When refactoring [`src/components/Drawer/`](file:///d:/Magazine/_PigmentShop/src/components/Drawer/):
- [ ] Create `DrawerStyles.js` for layout and positioning factories.
- [ ] Extract theme and overlay color resolution into `useDrawerTheme.js`.
- [ ] Extract enter/exit timing and slide translation logic into `useDrawerAnimation.js`.
- [ ] Refactor `Drawer.js` into a pure presentational component.
- [ ] Ensure `index.js` exports clean module public surface.
- [ ] Confirm zero hardcoded dimensions, hex colors, or magic animation constants.
