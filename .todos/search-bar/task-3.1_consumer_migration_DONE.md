# Task 3.1: Migrate Search Consumer Imports

## Recommended Model Tier
🟠 **Gemini 3.6 Flash (High)**

## Objective
Update all consumer import sites across Admin screens and Storefront Header to import directly from `src/components/Search/index.js`.

## Target Files
- [MODIFY] [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)
- [MODIFY] [ProductsManager.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductsManager.js)
- [MODIFY] [UsersManager.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Users/UsersManager.js)
- [MODIFY] [CategoriesManager.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoriesManager.js)

## Instructions
1. Update import statements in `StoreSearchHeader.js` to `import { AutocompleteSearch } from '../../components/Search'`.
2. Update import statements in Admin managers to `import { SearchInput } from '../Search'` or `@/components/Search`.
