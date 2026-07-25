# Task Spec: [TASK-004] Decouple UI Presentation from ToastContext

## Metadata & Model Recommendation
- **Task ID**: TASK-004
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: None
- **Dependent Tasks**: None
- **Target Files**:
  - `src/context/ToastContext.js`
  - `src/components/ToastView.js`

## Light Model Prompt Instruction
"Extract the presentational `<Animated.View>` toast rendering and StyleSheet definitions from `src/context/ToastContext.js` into a separate UI presentation component (`src/components/ToastView.js`), keeping `ToastContext.js` strictly focused on state orchestration."

## 🧪 Manual UI Verification Guide
- **App Screen**: Cart / Add to Cart action
- **User Action**: Click "Add to Cart" to trigger a toast message
- **Expected Result**: Toast message slides down smoothly with proper background color and fades out after 3 seconds.
