# Task Spec: [TASK-004] Centralize Cards, Empty States & Layout Grids

## Metadata & Model Recommendation
- **Task ID**: TASK-004
- **Complexity Rating**: 4 / 5
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: None
- **Dependent Tasks**: None
- **Target Files**: 
  - `src/utils/layout.js`
  - `src/utils/breadcrumbResolver.js`
  - `src/hooks/useGridLayout.js`
  - `src/hooks/useCardDimensions.js`
  - `src/features/profile/ProfilePageStyles.js`
  - `src/features/shell/NavMenu.js`
  - `src/features/profile/ProfilePage.js`
  - `src/features/profile/ProfileFormCard.js`
  - `src/features/orders/OrdersPage.js`
  - `src/features/orders/OrderRows.js`
  - `src/features/orders/OrderDetailsCard.js`
  - `src/features/orders/OrderConfirmationPage.js`
  - `src/features/favorites/FavoritesPageStyles.js`
  - `src/features/contact/ContactQuestionForm.js`
  - `src/features/contact/ContactPageStyles.js`
  - `src/features/favorites/FavoritesPage.js`
  - `src/components/PlaceholderCard.js`
  - `src/components/ProductCard.js`
  - `src/components/ProductCardStyles.js`
  - `src/components/ProductPage.js`
  - `src/components/StaticCard.js`
  - `src/components/OrdersPageStyles.js`
  - `src/components/OrderCard.js`
  - `src/components/ProductPage/ProductReviewsStyles.js`
  - `src/components/ProductPage/ProductReviewSubcomponents.js`
  - `src/components/ProductPage/ProductReviews.js`
  - `src/components/OrderCard.helpers.js`
  - `src/components/NewArrivalsFooter.js`
  - `src/components/NavigationCard.js`
  - `src/components/InteractiveCard.js`
  - `src/components/Catalog/ProductGrid.js`
  - `src/components/FeaturedSections.js`
  - `src/components/Catalog/GridHeaderFooter.js`
  - `src/components/DiscountsSection.js`
  - `src/components/CategoryCard.js`
  - `src/components/DataTable/DataTable.js`
  - `src/components/DataTable/EmptyState.js`
  - `src/components/Catalog/CatalogPagination.js`
  - `src/components/Catalog/CatalogFilterSidebarStyles.js`

## Light Model Prompt Instruction
"Refactor `ProductCard`, `CategoryCard`, `OrderDetailsCard`, `InteractiveCard`, `NavigationCard`, `PlaceholderCard`, and `ProfileFormCard` to inherit from the core `<BaseCard>` primitive, unifying elevation shadows and border-radii across all 39 target files. Extract a global `<EmptyState>` and `<SkeletonLoader>` component to replace unstyled text placeholders in empty catalog, empty cart, and loading states. Convert hardcoded fixed pixel card dimensions (`250px`, `220px`) in `useGridLayout.js` and `layout.js` to fluid layout percentage/flex-basis rules."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Catalog Grid, Empty Cart Page, Favorites Page, Order Details & Profile Edit Card
- **User Action**: Resize browser window across tablet and desktop breakpoints. Clear cart and favorites list.
- **Expected Result**: Cards flex smoothly without horizontal scrollbars or fixed-width cutoffs. Empty lists display standardized icon/text placeholders. All card surfaces use uniform border-radius and shadow depth.
