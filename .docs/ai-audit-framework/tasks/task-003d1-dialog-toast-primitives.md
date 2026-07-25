# Task Spec: [TASK-003d1] Dialog & Toast Primitives and Hooks

## Metadata & Model Recommendation
- **Task ID**: TASK-003d1
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-002d4-admin-users-orders-shared-inputs.md`
- **Dependent Tasks**: `task-003d2-storefront-drawers-modals.md`
- **Target Files**:
  - `src/hooks/useSlideAnimation.js`
  - `src/hooks/useFormModal.js`
  - `src/hooks/useDeleteConfirmation.js`
  - `src/hooks/useCrudWorkflow.js`

## Light Model Prompt Instruction
"Implement cross-platform `<ConfirmationDialog>` and `<GlobalToastProvider>` primitives or update `useDeleteConfirmation.js` and `useCrudWorkflow.js` to replace native `window.confirm`, `window.alert`, and `Alert.alert` calls with custom themed dialogs and toasts. Standardize modal slide/fade animation hooks in `useSlideAnimation.js` and `useFormModal.js`."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: App Root, Confirmation & Notification System
- **User Action**: Trigger delete actions or system notifications.
- **Expected Result**: Custom themed confirmation modal and toast system active without native browser popups.
