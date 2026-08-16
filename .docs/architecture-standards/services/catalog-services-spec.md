# Service Specification: Catalog Services

> [!NOTE]
> Specification for catalog pagination, database regenerator, DTO transformations, and view models.

---

## 1. Catalog Page Service (`catalogPageService.js`)

Responsible for retrieving paginated product lists and evaluating server-side pagination rules:
- **Constants**: `PAGE_SIZE` (15 items), `SORT_KEYS`.
- **Pagination Rule Evaluation**: `canUseServerPagination(filters, sortKey)` calculates if the current query can be processed efficiently on the server (e.g., limits multiple inequality filters) or if it must be handled client-side.
- **Exports**: Exposes repository functions like `fetchProductPage` and `fetchProductCount`.

## 2. Catalog View Model (`catalogViewModel.js`)

Handles data transformations between raw backend entities and localized client representations:
- **Normalization**: `buildNormalizedProducts` and `buildNormalizedCategories` strip out relation fields (e.g., `productIds`) and assign proper references.
- **Localization**: `buildFlatList` applies localized labels and descriptions, merging category hierarchies.
- **Tree Assembly**: `buildCategoryTree` constructs a nested tree of categories and children nodes used by navigation and category displays.
- **Subtree Mapping**: `buildCategorySubtreeMap` calculates descendant relations.

## 3. Database Regenerator (`catalogDatabaseRegenerator.js`)

Utility service for bootstrapping and resetting the catalog state (usually invoked via Admin controls):
- Wipes and seeds categories, products, and banners from `catalogSeedData.js`.

## 4. Data Transfer Objects (`catalogEntityContract.ts`)

Defines the core TS/JS entity structures for products and categories:
- Validates shapes via schema normalizers.
