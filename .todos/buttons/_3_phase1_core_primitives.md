# Phase 1: Core Primitives Refactoring

## 🎯 Objective
Refactor core button primitives (`src/components/Button/`) to consume design system tokens for height, border radius, and width, eliminating hardcoded inline dimensions.

---

## 📋 Task List

### Sub-phase 1.1: Design Tokens & Base Styles
- [x] **Task 3.1.1: Audit and Define Button Geometry Tokens** `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
  - Path: [tokens.js](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js)
  - Define `buttonTokens` schema containing standardized height, border radius, and padding matrices.

- [x] **Task 3.1.2: Connect ButtonStyles to Tokens** `[Recommended Model: 🟠 Gemini 3.6 Flash (High)]`
  - Path: [ButtonStyles.js](file:///d:/Magazine/_PigmentShop/src/components/Button/ButtonStyles.js)
  - Replace magic numbers in `sm`, `md`, `lg` variants with token properties.

---

### Sub-phase 1.2: Primitive Components Alignment
- [x] **Task 3.2.1: Refactor IconButton Primitive** `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
  - Path: [IconButton.js](file:///d:/Magazine/_PigmentShop/src/components/Button/IconButton.js)
  - Align square 1:1 aspect ratio sizing logic (`sm: 32px`, `md: 40px`, `lg: 48px`) and round radii directly with tokens.

- [x] **Task 3.2.2: Refactor ChipButton Primitive** `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
  - Path: [ChipButton.js](file:///d:/Magazine/_PigmentShop/src/components/Button/ChipButton.js)
  - Enforce token-backed chip heights and pill border radius definitions.

---

### Sub-phase 1.3: Container & Width Helpers
- [x] **Task 3.3.1: Add Width & Layout Props to Button Core** `[Recommended Model: 🟠 Gemini 3.6 Flash (High)]`
  - Path: [Button.js](file:///d:/Magazine/_PigmentShop/src/components/Button/Button.js)
  - Implement `fullWidth` prop and standard container flex-layout width bindings.

- [x] **Task 3.3.2: Export and Verify Component Module API** `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
  - Path: [index.js](file:///d:/Magazine/_PigmentShop/src/components/Button/index.js)
  - Ensure clean public interface and token exports for consumer modules.
