# Task Spec: [TASK-003d3] Admin Products & Categories Modals

## Metadata & Model Recommendation
- **Task ID**: TASK-003d3
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-003d2-storefront-drawers-modals.md`
- **Dependent Tasks**: `task-003d4-admin-banners-orders-media-modals.md`
- **Target Files**:
  - `src/components/Admin/Products/ProductsManager.js`
  - `src/components/Admin/Products/ProductFormModal.js`
  - `src/components/Admin/Products/ProductFormStyles.js`
  - `src/components/Admin/Products/useProductsWorkflow.js`
  - `src/components/Admin/Categories/CategoriesManager.js`
  - `src/components/Admin/Categories/CategoryFormModal.js`
  - `src/components/Admin/Categories/CategoryFormFooter.js`
  - `src/components/Admin/Categories/CategoryFormStyles.js`
  - `src/components/Admin/Categories/categoryFormLogic.js`
  - `src/components/Admin/Categories/useCategoriesWorkflow.js`

## Light Model Prompt Instruction
"Standardize modal styles, backdrops, z-indices, and confirmation dialogs across Admin Products and Admin Categories management modules. Replace native alerts/confirms in `useProductsWorkflow` and `useCategoriesWorkflow` with themed confirmation dialogs."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Admin Products, Admin Categories
- **User Action**: Open product and category form modals; click delete on product/category items.
- **Expected Result**: Unified modal overlays and standardized themed confirmation popups when deleting products or categories.
