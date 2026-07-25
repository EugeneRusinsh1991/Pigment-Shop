# Task Spec: [TASK-004C] Dynamic Card Dimensions & Fluid Layout Grids

## Metadata & Model Recommendation
- **Task ID**: TASK-004C
- **Complexity Rating**: 3 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: TASK-004A
- **Dependent Tasks**: None
- **Target Files**: 
  - `src/utils/layout.js`
  - `src/utils/breadcrumbResolver.js`
  - `src/hooks/useGridLayout.js`
  - `src/hooks/useCardDimensions.js`
  - `src/features/profile/ProfilePageStyles.js`
  - `src/features/profile/ProfilePage.js`
  - `src/features/shell/NavMenu.js`
  - `src/features/contact/ContactQuestionForm.js`
  - `src/features/contact/ContactPageStyles.js`
  - `src/features/favorites/FavoritesPageStyles.js`
  - `src/features/orders/OrderConfirmationPage.js`
  - `src/components/OrdersPageStyles.js`
  - `src/components/Catalog/CatalogFilterSidebarStyles.js`
  - `src/components/ProductPage/ProductReviewsStyles.js`
  - `src/components/ProductPage/ProductReviewSubcomponents.js`
  - `src/components/ProductPage/ProductReviews.js`
  - `src/components/FeaturedSections.js`
  - `src/components/DiscountsSection.js`
  - `src/components/NewArrivalsFooter.js`
  - `src/components/DataTable/DataTable.js`

## Light Model Prompt Instruction
"Convert hardcoded fixed pixel card dimensions (`250px`, `220px`) in `useGridLayout.js`, `useCardDimensions.js`, and `layout.js` to fluid layout percentage/flex-basis rules across grid layouts."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Catalog Grid, Contact Page, Profile Page, Orders Table
- **User Action**: Resize browser window across tablet and desktop breakpoints.
- **Expected Result**: Cards flex smoothly without horizontal scrollbars or fixed-width cutoffs.
