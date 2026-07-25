# Task Spec: [TASK-003d2] Storefront Drawers, NavMenu & Profile Modals

## Metadata & Model Recommendation
- **Task ID**: TASK-003d2
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-003d1-dialog-toast-primitives.md`
- **Dependent Tasks**: `task-003d3-admin-products-categories-modals.md`
- **Target Files**:
  - `src/features/shell/NavMenu.js`
  - `src/features/profile/ProfilePage.js`
  - `src/components/SideDrawer.js`
  - `src/components/Catalog/CatalogFilterSidebar.js`
  - `src/components/CartView/cartCheckoutLogic.js`
  - `src/components/Admin/SharedFormComponents.js`

## Light Model Prompt Instruction
"Refactor `SideDrawer.js`, `CatalogFilterSidebar.js`, `NavMenu.js`, and `SharedFormComponents.js` to use unified backdrop scrim opacity (e.g. `rgba(0,0,0,0.6)`) and `layout.zIndices` design tokens. Replace `window.alert` / `ProfileSaveAlert` in `ProfilePage.js` and `cartCheckoutLogic.js` with the global toast and confirmation dialog system."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Navigation Side Drawer, Catalog Filter Drawer, Profile Page, Cart Checkout
- **User Action**: Open side drawer and filter drawer; save profile details; proceed through checkout.
- **Expected Result**: Consistent dimming backdrop overlay across drawers and modals, with clean z-index stacking and standard toast messages upon saving.
