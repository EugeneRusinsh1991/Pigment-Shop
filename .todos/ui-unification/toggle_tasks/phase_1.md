# Phase 1: Core Module Creation (`src/components/Toggle/`)

Based on [03-toggle-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/03-toggle-module-spec.md).

---

## Tasks

### Task 1.1: Module Barrel Export & Structure
- **Recommended Model:** 🟢 **Gemini 3.6 Flash (Low)**
- **Complexity:** Trivial/Simple (1/5)
- **File:** `src/components/Toggle/index.js`
- **Goal:** Create public API barrel export for `Toggle`.

### Task 1.2: Base Presentational Primitive
- **Recommended Model:** 🟡 **Gemini 3.6 Flash (Medium)**
- **Complexity:** Low/Medium (2/5)
- **File:** `src/components/Toggle/Toggle.js`
- **Goal:** Build core presentational component accepting `options`, `value`, `onChange`, and `size`. Ensure min 44x44px touch targets.

### Task 1.3: Style Factory & Tokens
- **Recommended Model:** 🟡 **Gemini 3.6 Flash (Medium)**
- **Complexity:** Low/Medium (2/5)
- **File:** `src/components/Toggle/ToggleStyles.js`
- **Goal:** Map theme tokens from `src/theme/tokens.js` and `src/theme/buttonCommon.js`. Zero raw hex or hardcoded pixel offsets.

### Task 1.4: Animations & Theme Hooks
- **Recommended Model:** 🟠 **Gemini 3.6 Flash (High)**
- **Complexity:** Medium/High (3/5)
- **Files:** `src/components/Toggle/useToggleAnimation.js`, `src/components/Toggle/useToggleTheme.js`
- **Goal:** Implement smooth active slider transition hook and theme resolution (Light/Dark support).
