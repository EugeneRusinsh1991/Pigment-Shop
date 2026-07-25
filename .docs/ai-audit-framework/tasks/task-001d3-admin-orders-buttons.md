# Task Spec: [TASK-001d3] Admin Orders Buttons

## Metadata & Model Recommendation
- **Task ID**: TASK-001d3
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-001d2-admin-products-media-buttons.md`
- **Dependent Tasks**: `task-001d4-admin-categories-banners-buttons.md`
- **Target Files**:
  - `src/components/Admin/Orders/OrderRow.js`
  - `src/components/Admin/Orders/OrdersTableControls.js`
  - `src/components/Admin/Orders/OrderStatusDropdownMenu.js`
  - `src/components/Admin/Orders/OrderStatusSelector.js`
  - `src/components/Admin/Orders/OrderDetails.js`

## Light Model Prompt Instruction
"Refactor raw touchable elements in Admin Orders views (Order Row status selector, dropdown menu items, table controls) to use `<IconButton>` and `<Button>` primitives."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Admin Orders
- **User Action**: Click order status dropdown triggers, status selector options, row action buttons, and table pagination/control buttons.
- **Expected Result**: Standardized button interactions and tokenized status colors across Admin Orders view.
