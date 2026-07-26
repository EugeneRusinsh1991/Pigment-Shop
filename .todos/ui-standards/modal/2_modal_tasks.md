# Migration Tasks: Modal

## Model Recommendations
- **Overall Parent Task:** 🟡 Gemini 3.6 Flash (Medium) - 5 files
- **Step 1:** 🟢 Gemini 3.6 Flash (Low) - 1 file
- **Step 2:** 🟢 Gemini 3.6 Flash (Low) - 1 file
- **Step 3:** 🟡 Gemini 3.6 Flash (Medium) - 3 files
- **Step 4:** 🟢 Gemini 3.6 Flash (Low) - 0 files

## Step 1: Extract Modal Styles
- Create `ModalStyles.js` in `src/components/Modal/` with standard token-bound styles for backdrop, overlay, card container, title, message, and footer.

## Step 2: Create Theme Hook
- Create `useModalTheme.js` in `src/components/Modal/` for backdrop overlay color and card background state based on `useTheme`.

## Step 3: Refactor Components & Exports
- Update `Modal.js` and `ConfirmationModal.js` to use `useModalTheme` and `ModalStyles.js`.
- Update `index.js` to export `Modal`, `ConfirmationModal`, `useModalTheme`, and `modalStyles`.

## Step 4: Verification
- Run UI audit and health checks (`npm run audit:ui`, `npm run health`)
