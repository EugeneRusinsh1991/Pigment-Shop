# UI Module Migration Plan: Drawer

> Based on the development standard [`drawer-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/drawer-module-spec.md) and reference module spec [`_reference-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/_reference-module-spec.md).

---

## 1. Current State Overview
- **Current Directory:** [`src/components/Drawer/`](file:///d:/Magazine/_PigmentShop/src/components/Drawer/)
- **Current Files:**
  - `Drawer.js` (monolithic component mixing rendering, `Animated.Value`, gestures/timings, and local `StyleSheet.create` styles)
  - `index.js` (base export)

---

## 2. Step-by-Step Refactoring Tasks

### Step 1: Create style factory `DrawerStyles.js`
- **Recommended Model:** 🟡 Gemini 3.6 Flash (Medium) - 2 files
- [ ] Create file `src/components/Drawer/DrawerStyles.js`.
- [ ] Extract `StyleSheet.create` from `Drawer.js`.
- [ ] Replace hardcoded values (colors, sizes, radiuses, zIndex) with tokens from [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js).
- [ ] Add dynamic style calculations based on `position` prop (`left`, `right`, `top`, `bottom`).

### Step 2: Extract theme logic into `useDrawerTheme.js`
- **Recommended Model:** 🟡 Gemini 3.6 Flash (Medium) - 2 files
- [ ] Create hook `src/components/Drawer/useDrawerTheme.js`.
- [ ] Implement `ThemeContext` resolution (light/dark theme).
- [ ] Return prepared styles for container, overlay (`OverlayBackdrop`), and borders.

### Step 3: Extract animation and gestures into `useDrawerAnimation.js`
- **Recommended Model:** 🟡 Gemini 3.6 Flash (Medium) - 2 files
- [ ] Create hook `src/components/Drawer/useDrawerAnimation.js`.
- [ ] Move `Animated.Value` initialization (`slideAnim`, `backdropOpacity`).
- [ ] Implement open/close functions using `motion.drawer` parameters from `tokens.js`.
- [ ] Safely trigger `onClose` callback only after slide-out animation completes.

### Step 4: Refactor primary component `Drawer.js`
- **Recommended Model:** 🟠 Gemini 3.6 Flash (High) - 4 files
- [ ] Clean up animation logic and inline styles from `Drawer.js`.
- [ ] Integrate `useDrawerTheme` and `useDrawerAnimation`.
- [ ] Retain pure markup layout (Overlay + Animated Container + Children).

### Step 5: Update public API `index.js`
- **Recommended Model:** 🟢 Gemini 3.6 Flash (Low) - 1 file
- [ ] Verify exports in `src/components/Drawer/index.js`.
- [ ] Add exports for `useDrawerTheme` and `useDrawerAnimation` hooks as needed.

---

## 3. Definition of Done
- [ ] Module consists of 5 files following the architectural standard.
- [ ] Zero hardcoded colors, px spacings, or magic animation durations.
- [ ] No console warnings during open/close actions.
- [ ] 100% backward compatibility preserved for existing `<Drawer />` calls.
