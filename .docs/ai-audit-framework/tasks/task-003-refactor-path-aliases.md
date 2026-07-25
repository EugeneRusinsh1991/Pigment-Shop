# Task Spec: [TASK-003] Refactor Deep Relative Imports to `@/` Path Aliases

## Metadata & Model Recommendation
- **Task ID**: TASK-003
- **Complexity Rating**: 3 / 5 (+20% safety margin -> 🟠 **Gemini 3.6 Flash High**)
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: None
- **Dependent Tasks**: None
- **Target Files**:
  - `app/_layout.js`
  - `app/admin/index.js`
  - `app/(store)/index.js`
  - `app/(store)/cart.js`
  - `app/(store)/contact.js`
  - `app/(store)/favorites.js`
  - `app/(store)/login.js`
  - `app/(store)/order-confirmation.js`
  - `app/(store)/orders.js`
  - `app/(store)/profile.js`
  - `app/(store)/catalog/index.js`
  - `app/(store)/catalog/[categoryId].js`
  - `app/(store)/products/index.js`
  - `app/(store)/product/[id].js`

## Light Model Prompt Instruction
"Refactor all relative imports starting with `../../` or `../../../` in all route files under `app/` to use the `@/` module alias (e.g. `@/context/ThemeContext`, `@/components/CatalogView`)."

## 🧪 Manual UI Verification Guide
- **App Screen**: App-wide navigation (Catalog, Cart, Orders, Admin)
- **User Action**: Navigate across 5 different routes
- **Expected Result**: All modules import cleanly without module resolution errors or missing dependency crashes.
