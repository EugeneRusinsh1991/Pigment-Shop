# Task Spec: [TASK-002] Unify Input & Form Primitives

## Metadata & Model Recommendation
- **Task ID**: TASK-002
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: `task-001-unify-buttons.md`
- **Dependent Tasks**: `task-003-standardize-modals.md`
- **Target Files**: 
  - `src/features/profile/ProfileFormCard.js`
  - `src/features/contact/ContactQuestionForm.js`
  - `src/features/auth/LoginPageComponents.js`
  - `src/features/contact/ContactPageStyles.js`
  - `src/features/auth/LoginPage.js`
  - `src/components/SearchBar.js`
  - `src/components/SearchToolbar.js`
  - `src/components/SearchBar/SearchInput.js`
  - `src/components/ProductPage/ProductReviewsStyles.js`
  - `src/components/ProductPage/ProductReviewSubcomponents.js`
  - `src/components/Admin/Users/UsersManager.js`
  - `src/components/Admin/Users/UserNoteSection.js`
  - `src/components/Admin/SharedFormComponents.js`
  - `src/components/Admin/Products/ProductsManager.js`
  - `src/components/Admin/Products/ProductFormStyles.js`
  - `src/components/Admin/Products/ProductFormFields.js`
  - `src/components/Admin/Orders/AdminNoteSection.js`
  - `src/components/Catalog/SidebarUIComponents.js`
  - `src/components/Admin/Categories/CategoryFormStyles.js`
  - `src/components/Admin/Categories/CategoryFormFields.js`
  - `src/components/CartSummary.js`

## Light Model Prompt Instruction
"Consolidate `SearchToolbar` and `SearchInput` into a single global `<GlobalSearchInput>` component. Replace all raw `<TextInput>` instantiations in Storefront screens (CartSummary, SidebarUIComponents, ProfileFormCard, LoginPage) with the standardized `<FieldInput>` or `<FieldTextarea>` from `SharedFormComponents.js`. Ensure Storefront inputs support the `error` state highlighting prop and resolve divergent multi-line padding and `numberOfLines` heights across all 21 target files."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Cart Page (Promo Code), Catalog Page (Sidebar Filters), Login Page & Admin Form Modals
- **User Action**: Type into the Promo Code input and trigger an invalid state. Type into Catalog Search.
- **Expected Result**: All inputs feature unified focus rings, matching padding, identical border-radii, and correctly render red border highlights when in an error state across every form in Storefront and Admin.
