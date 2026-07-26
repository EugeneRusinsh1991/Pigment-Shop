# Phase 2: Navigation System Migration & Audit Plan

## Audit Results: Current File Usage

- **`Breadcrumb`**:
  - `src/features/catalog/CatalogView.js`
  - `src/features/product/ProductPage.js`
  - `src/utils/breadcrumbResolver.js`
- **`PageNavigation`**:
  - `src/features/catalog/CatalogView.js`

## Migration Plan Steps

1. Create target module structure under `src/components/Navigation/`.
2. Extract `Breadcrumbs` to `src/components/Navigation/Breadcrumbs/` and `Pagination` to `src/components/Navigation/Pagination/`.
3. Update imports in `CatalogView.js`, `ProductPage.js`, and `breadcrumbResolver.js`.
4. Delete legacy root files `src/components/Breadcrumb.js` and `src/components/PageNavigation.js`.
