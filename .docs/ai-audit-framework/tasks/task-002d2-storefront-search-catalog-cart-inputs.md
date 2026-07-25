# Task Spec: [TASK-002d2] Storefront Search, Catalog, Cart & Reviews Inputs

## Metadata & Model Recommendation
- **Task ID**: TASK-002d2
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-002d1-storefront-auth-profile-contact-inputs.md`
- **Dependent Tasks**: `task-002d3-admin-products-categories-inputs.md`
- **Target Files**:
  - `src/components/SearchBar.js`
  - `src/components/SearchToolbar.js`
  - `src/components/SearchBar/SearchInput.js`
  - `src/components/Catalog/SidebarUIComponents.js`
  - `src/components/CartSummary.js`
  - `src/components/ProductPage/ProductReviewsStyles.js`
  - `src/components/ProductPage/ProductReviewSubcomponents.js`

## Light Model Prompt Instruction
"Consolidate `SearchToolbar` and `SearchInput` into a single global `<GlobalSearchInput>` component. Refactor promo code input in `CartSummary`, price/search inputs in `SidebarUIComponents`, and product review inputs to standard input primitives with unified focus and error states."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Cart Page (Promo Code), Catalog Sidebar Filters, Global Search, Product Page Reviews
- **User Action**: Enter search terms in header search, type promo code in cart, set price filters in catalog sidebar, submit review.
- **Expected Result**: Standardized search and filter inputs with tokenized borders, icons, and error states across Storefront screens.
