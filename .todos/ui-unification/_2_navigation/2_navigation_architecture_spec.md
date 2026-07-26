# Navigation System Architecture Specification

## Target Directory Structure

```
src/components/Navigation/
├── index.js                     # Public API barrel export
├── Breadcrumbs/
│   ├── index.js                 # Barrel export for Breadcrumbs
│   ├── Breadcrumb.js            # Core presentational breadcrumb navigation
│   ├── BreadcrumbStyles.js      # Dynamic style map factory
│   └── useBreadcrumbTheme.js    # Theme resolution hook
└── Pagination/
    ├── index.js                 # Barrel export for Pagination
    ├── PageNavigation.js        # Core page navigation component
    ├── PaginationStyles.js      # Pagination style map factory
    └── usePaginationTheme.js    # Theme resolution hook
```

## Public API Contract

### Breadcrumbs (`src/components/Navigation/Breadcrumbs/`)
- `items`: `Array<{ label: string, href?: string, active?: boolean }>`
- `onItemPress`: `(item: BreadcrumbItem) => void`
- `separator`: `ReactNode` (default: `'/'`)

### Pagination (`src/components/Navigation/Pagination/`)
- `currentPage`: `number`
- `totalPages`: `number`
- `onPageChange`: `(page: number) => void`
- `showFirstLast`: `boolean`
