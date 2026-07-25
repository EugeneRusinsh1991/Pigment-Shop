# Task Spec: [TASK-002d4] Admin Users, Orders & Shared Form Inputs

## Metadata & Model Recommendation
- **Task ID**: TASK-002d4
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-002d3-admin-products-categories-inputs.md`
- **Dependent Tasks**: `task-003-standardize-modals.md`
- **Target Files**:
  - `src/components/Admin/Users/UsersManager.js`
  - `src/components/Admin/Users/UserNoteSection.js`
  - `src/components/Admin/Orders/AdminNoteSection.js`
  - `src/components/Admin/SharedFormComponents.js`

## Light Model Prompt Instruction
"Refactor admin search inputs, User notes section, and Order admin notes section to use standardized `<FieldInput>` / `<FieldTextarea>` primitives from `SharedFormComponents.js`. Ensure `SharedFormComponents.js` exposes flexible props for error states, label icons, and height overrides."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Admin Users, Admin Orders
- **User Action**: Type in user search input, edit admin notes in User Details and Order Details screens.
- **Expected Result**: Standardized input borders, focus highlights, and note textarea styling across Admin Users and Orders modules.
