# Task Spec: [TASK-003d4] Admin Banners, Orders & Media Modals

## Metadata & Model Recommendation
- **Task ID**: TASK-003d4
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-003d3-admin-products-categories-modals.md`
- **Dependent Tasks**: `task-004-centralize-cards.md`
- **Target Files**:
  - `src/components/Admin/Banners/BannersManager.js`
  - `src/components/Admin/Banners/BannersStyles.js`
  - `src/components/Admin/Banners/useBannersWorkflow.js`
  - `src/components/Admin/Orders/OrderDetails.js`
  - `src/components/Admin/Orders/OrdersStyles.js`
  - `src/components/Admin/Media/MediaBrowser.js`
  - `src/components/Admin/Media/MediaBrowserComponents.js`

## Light Model Prompt Instruction
"Refactor Admin Banners, Orders, and Media Browser modals and dialogs to use standardized `FormModalLayout`, themed backdrop scrims, `layout.zIndices` design tokens, and `<ConfirmationDialog>` for media and banner deletions."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Admin Banners, Admin Orders, Media Browser
- **User Action**: Open banner modal, media browser dialog, and order details views; delete a banner or media item.
- **Expected Result**: Standardized modal overlays, smooth transitions, and themed confirmation dialogs across Banners, Orders, and Media components.
