# Implementation Plan: Decouple Context Boundaries & Optimize Catalog (TASK-004)

Decouple `useLanguage()` from `useTheme()` in `ThemeContext.js` to eliminate re-render cascades across theme consumers on language changes, add cross-platform local storage persistence to theme and language preferences, and optimize/memoize the catalog normalization pipeline in `CatalogContext.js`.

## User Review Required

> [!IMPORTANT]
> Decoupling `useLanguage()` from `useTheme()` removes proxy exports (`t`, `lang`, `selectLanguage`) from `useTheme()`. Components extracting translation methods will consume `useLanguage()` directly.

## Open Questions

None.

## Proposed Changes

### Core Contexts

#### [MODIFY] [ThemeContext.js](file:///d:/Magazine/_PigmentShop/src/context/ThemeContext.js)
- Remove `useLanguage()` dependency and proxy exports (`t`, `lang`, `selectLanguage`).
- Add storage persistence using `crossPlatformStorage` under key `'app_theme'`.
- Memoize context value strictly around `{ theme, isDark, toggleTheme, setTheme, ic }`.

#### [MODIFY] [LanguageContext.js](file:///d:/Magazine/_PigmentShop/src/context/LanguageContext.js)
- Add storage persistence using `crossPlatformStorage` under key `'app_language'`.
- Initialize `lang` state from persistent storage, falling back to default `'ru'`.

#### [MODIFY] [CatalogContext.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogContext.js)
- Optimize `searchIndex` lookup by creating an $O(1)$ item lookup Map from `flatList` instead of performing linear array scans (`flatList.find`) on uncached gets.
- Ensure strict multi-tier memoization boundaries: catalog structural mappings (`productCategoryMap`, `normalizedProducts`, `normalizedCategories`, `categoryLookup`) depend only on raw products/categories, while localized views (`flatList`, `categoryTree`, `searchIndex`, `categorySubtreeMap`) depend on language and normalized state.

---

### Consumer Refactoring (Decouple Theme & Language Usages)

Replace `useTheme()` with `useLanguage()` (or split destructured imports) in all consumer files extracting `t`, `lang`, or `selectLanguage`:

#### [MODIFY] [useReviewsState.js](file:///d:/Magazine/_PigmentShop/src/hooks/useReviewsState.js)
#### [MODIFY] [FavoritesPage.js](file:///d:/Magazine/_PigmentShop/src/features/favorites/FavoritesPage.js)
#### [MODIFY] [CartItem.js](file:///d:/Magazine/_PigmentShop/src/features/cart/CartItem.js)
#### [MODIFY] [LoginPageComponents.js](file:///d:/Magazine/_PigmentShop/src/features/auth/LoginPageComponents.js)
#### [MODIFY] [AdminSaveFooter.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminSaveFooter.js)
#### [MODIFY] [TopProductsChart.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/TopProductsChart.js)
#### [MODIFY] [useCrudWorkflow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/useCrudWorkflow.js)
#### [MODIFY] [OrderStatusChart.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/OrderStatusChart.js)
#### [MODIFY] [DateRangePicker.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/DateRangePicker.js)
#### [MODIFY] [UserDetails.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserDetails.js)
#### [MODIFY] [UserOrdersList.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserOrdersList.js)
#### [MODIFY] [ProductFormModal.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormModal.js)
#### [MODIFY] [ProductRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRow.js)
#### [MODIFY] [MobileProductRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/MobileProductRow.js)
#### [MODIFY] [ProductsManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsManager.js)
#### [MODIFY] [UserNoteSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserNoteSection.js)
#### [MODIFY] [ProductsTable.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsTable.js)
#### [MODIFY] [useProductsWorkflow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/useProductsWorkflow.js)
#### [MODIFY] [DateRangeCalendar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/DateRangeCalendar.js)
#### [MODIFY] [AdminNoteSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/AdminNoteSection.js)
#### [MODIFY] [OrdersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersManager.js)
#### [MODIFY] [OrderRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderRow.js)
#### [MODIFY] [OrderItemsList.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderItemsList.js)
#### [MODIFY] [OrderDetails.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderDetails.js)
#### [MODIFY] [OrderCustomerCard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderCustomerCard.js)
#### [MODIFY] [FormModalLayout.js](file:///d:/Magazine/_PigmentShop/src/features/admin/FormModalLayout.js)
#### [MODIFY] [AnalyticsDashboard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/AnalyticsDashboard.js)
#### [MODIFY] [AdminPanel.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminPanel.js)
#### [MODIFY] [CategoriesManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoriesManager.js)
#### [MODIFY] [useBannersWorkflow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Banners/useBannersWorkflow.js)
#### [MODIFY] [BannersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Banners/BannersManager.js)
#### [MODIFY] [CategoryFormModal.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormModal.js)
#### [MODIFY] [CategoryRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryRow.js)
#### [MODIFY] [CategoryRowElements.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryRowElements.js)
#### [MODIFY] [useCategoriesWorkflow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/useCategoriesWorkflow.js)
#### [MODIFY] [CategoryTree.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryTree.js)
#### [MODIFY] [ConfirmationModal.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Modal/ConfirmationModal.js)
#### [MODIFY] [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchDropdown.js)
#### [MODIFY] [useNavigationTheme.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Navigation/useNavigationTheme.js)

## Verification Plan

### Automated Tests
- Run unit/integration test suites if available to confirm context behavior.

### Manual Verification
- Toggle light/dark mode and switch languages in the UI, then refresh the page to verify settings persist across reloads.
- Verify changing language does not trigger re-render cascades in theme-only components.
