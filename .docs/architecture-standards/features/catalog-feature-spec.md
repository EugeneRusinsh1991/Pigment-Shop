# Feature Specification: Catalog Module (`src/features/catalog/`)

> [!NOTE]
> Specification for product browsing, category filtering, search input parameters, sorting bars, and paginated product grids.

---

## 1. Domain Responsibility

The **Catalog Feature** powers product discovery and category browsing:
- **Product Grid (`ProductGrid.js`, `CategoryCard.js`)**: Responsive product list display, loading placeholders, empty states.
- **Filtering System (`CatalogFilterSidebar.js`, `PriceRangeSlider.js`)**: Faceted category selection, price range sliders, multi-attribute filter reset.
- **Sorting & View Controls (`CatalogSortBar.js`, `CatalogPagination.js`)**: Grid vs list layout switchers, sort order dropdowns (Price, Popularity, Newest), page pagination.
- **Hooks & State (`usePaginatedCatalog.js`, `useCatalogFilters.js`)**: URL parameters synchronization, catalog search state, paginated fetch logic.

---

## 2. Directory Layout

```text
src/features/catalog/
├── CatalogPage.js           # Root catalog page component
├── CatalogView.js           # Responsive layout container (sidebar + grid)
├── ProductGrid.js           # Product cards grid layout
├── CategoryCard.js          # Individual product/category card presentation
├── CatalogFilterSidebar.js  # Faceted sidebar container
├── PriceRangeSlider.js      # Interactive price range filter
├── CatalogSortBar.js        # Sort order and view switcher bar
├── CatalogPagination.js     # Page navigation controls
├── usePaginatedCatalog.js   # Product fetching & pagination hook
├── useCatalogFilters.js     # Filter state management hook
├── catalogParamsUtils.js    # URL search parameters encoder/decoder
└── index.js                 # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as CatalogPage } from './CatalogPage';
```
