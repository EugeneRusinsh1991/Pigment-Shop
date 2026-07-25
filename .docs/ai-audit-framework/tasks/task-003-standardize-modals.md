# Task Spec: [TASK-003] Standardize Modals & Remove Native Browser Dialogs

## Metadata & Model Recommendation
- **Task ID**: TASK-003
- **Complexity Rating**: 4 / 5
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: `task-001-unify-buttons.md`, `task-002-unify-inputs.md`
- **Dependent Tasks**: None
- **Target Files**: 
  - `src/hooks/useSlideAnimation.js`
  - `src/hooks/useFormModal.js`
  - `src/hooks/useDeleteConfirmation.js`
  - `src/hooks/useCrudWorkflow.js`
  - `src/features/shell/NavMenu.js`
  - `src/features/profile/ProfilePage.js`
  - `src/components/SideDrawer.js`
  - `src/components/Catalog/CatalogFilterSidebar.js`
  - `src/components/CartView/cartCheckoutLogic.js`
  - `src/components/Admin/SharedFormComponents.js`
  - `src/components/Admin/Products/ProductFormStyles.js`
  - `src/components/Admin/Orders/OrderDetails.js`
  - `src/components/Admin/Products/useProductsWorkflow.js`
  - `src/components/Admin/Orders/OrdersStyles.js`
  - `src/components/Admin/Products/ProductsManager.js`
  - `src/components/Admin/Products/ProductFormModal.js`
  - `src/components/Admin/Banners/BannersStyles.js`
  - `src/components/Admin/Banners/useBannersWorkflow.js`
  - `src/components/Admin/Categories/CategoryFormFooter.js`
  - `src/components/Admin/Categories/categoryFormLogic.js`
  - `src/components/Admin/Categories/CategoryFormModal.js`
  - `src/components/Admin/Categories/CategoryFormStyles.js`
  - `src/components/Admin/Categories/useCategoriesWorkflow.js`
  - `src/components/Admin/Banners/BannersManager.js`
  - `src/components/Admin/Media/MediaBrowserComponents.js`
  - `src/components/Admin/Categories/CategoriesManager.js`
  - `src/components/Admin/Media/MediaBrowser.js`

## Light Model Prompt Instruction
"Implement a global `<GlobalToastProvider>` to replace ad-hoc inline notification alerts (`ProfileSaveAlert`) and `window.alert` calls. Replace `window.confirm` and `Alert.alert` calls with a cross-platform themed `<ConfirmationDialog>` component across all 27 listed files. Unify the backdrop scrim opacity (e.g. `rgba(0,0,0,0.6)`) and modal open/close transitions between `SideDrawer.js` and `SharedFormComponents.js` Modal. Finally, migrate all hardcoded z-index overlays to consume `layout.zIndices` design tokens."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Admin Category/Product/Banner Managers, Cart Checkout & Side Navigation Drawer
- **User Action**: Trigger entity deletion (should open themed ConfirmationDialog). Place an order (should trigger a Toast notification). Toggle side filter drawer.
- **Expected Result**: Zero native web browser dialog popups (`window.alert`, `window.confirm`). Uniform backdrop darkness across all modals and drawers, with clean z-index layering.
