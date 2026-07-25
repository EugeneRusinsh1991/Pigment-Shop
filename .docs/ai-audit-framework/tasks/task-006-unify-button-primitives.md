# Task Spec: [TASK-006] Consolidate Button & Touchable Primitives

## Metadata & Model Recommendation
- **Task ID**: TASK-006
- **Complexity Rating**: 4 / 5 (+20% safety margin -> 🟠 **Gemini 3.6 Flash High**)
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: TASK-005
- **Dependent Tasks**: None
- **Target Files**:
  - `src/components/Button.js`
  - `src/components/AnimatedButton.js`
  - `src/components/ChipButton.js`
  - `src/components/IconButton.js`
  - `src/theme/buttonCommon.js`

## Light Model Prompt Instruction
"Consolidate `AnimatedButton.js`, `ChipButton.js`, and `IconButton.js` onto the central `Button.js` primitive base, ensuring unified touch target sizing (minimum 44x44px), standard press animations, and shared style tokens from `src/theme/buttonCommon.js`."

## 🧪 Manual UI Verification Guide
- **App Screen**: Product Details, Catalog Filters, Admin Controls
- **User Action**: Tap buttons across catalog and product screens
- **Expected Result**: All button interactions deliver consistent press feedback, smooth scale micro-animations, and unified touch padding.
