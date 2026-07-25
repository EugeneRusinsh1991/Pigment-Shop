# Task Spec: [TASK-001d4] Admin Categories & Banners Buttons

## Metadata & Model Recommendation
- **Task ID**: TASK-001d4
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-001d3-admin-orders-buttons.md`
- **Dependent Tasks**: `task-002-unify-inputs.md`
- **Target Files**:
  - `src/components/Admin/Categories/CategoryFormFooter.js`
  - `src/components/Admin/Categories/CategoryProductSection.js`
  - `src/components/Admin/Categories/CategoryRow.js`
  - `src/components/Admin/Categories/CategoryTree.js`
  - `src/components/Admin/Categories/CategoryFormFields.js`
  - `src/components/Admin/Banners/BannersManager.js`
  - `src/components/Admin/Categories/CategoriesManager.js`

## Light Model Prompt Instruction
"Refactor raw touchable elements in Category Tree expanders, row actions, category form footers, and Banners Manager controls to use `<IconButton>` and `<Button>` primitives."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Admin Categories & Banners
- **User Action**: Expand/collapse category tree nodes, click category action icons, edit banners, and submit form footers.
- **Expected Result**: Standardized category tree toggle and button controls with tokenized colors and spring press animations.
