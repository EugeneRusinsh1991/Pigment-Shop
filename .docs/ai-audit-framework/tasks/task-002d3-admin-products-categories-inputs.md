# Task Spec: [TASK-002d3] Admin Products & Categories Inputs

## Metadata & Model Recommendation
- **Task ID**: TASK-002d3
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-002d2-storefront-search-catalog-cart-inputs.md`
- **Dependent Tasks**: `task-002d4-admin-users-orders-shared-inputs.md`
- **Target Files**:
  - `src/components/Admin/Products/ProductsManager.js`
  - `src/components/Admin/Products/ProductFormStyles.js`
  - `src/components/Admin/Products/ProductFormFields.js`
  - `src/components/Admin/Categories/CategoryFormStyles.js`
  - `src/components/Admin/Categories/CategoryFormFields.js`

## Light Model Prompt Instruction
"Refactor raw inputs in Admin Products form (title, price, sku, description) and Category form (localized name, description) to use `<FieldInput>` and `<FieldTextarea>` primitives with standardized error highlighting and vertical multi-line padding."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Admin Products & Admin Categories
- **User Action**: Open Product Create/Edit Modal and Category Create/Edit Modal, type into text inputs, trigger validation errors.
- **Expected Result**: Unified field spacing, error outline colors, and multiline text padding across Admin Products and Category form fields.
