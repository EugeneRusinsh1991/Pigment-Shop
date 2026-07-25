# Task Spec: [TASK-004B] Global Empty States & Skeleton Loaders

## Metadata & Model Recommendation
- **Task ID**: TASK-004B
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: None
- **Dependent Tasks**: None
- **Target Files**: 
  - `src/components/EmptyState.js`
  - `src/components/SkeletonLoader.js`
  - `src/components/DataTable/EmptyState.js`
  - `src/components/Catalog/ProductGrid.js`
  - `src/components/Catalog/GridHeaderFooter.js`
  - `src/components/Catalog/CatalogPagination.js`
  - `src/features/favorites/FavoritesPage.js`
  - `src/features/orders/OrdersPage.js`
  - `src/features/orders/OrderRows.js`
  - `src/components/ProductPage.js`

## Light Model Prompt Instruction
"Extract a global `<EmptyState>` and `<SkeletonLoader>` component to replace unstyled text placeholders and raw loading text in empty catalog, empty cart, favorites list, and loading state views."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Empty Cart Page, Empty Favorites Page, Product Loading State
- **User Action**: Navigate to empty lists and trigger loading states.
- **Expected Result**: Empty lists display standardized icon/text placeholders and animated skeleton loaders.
