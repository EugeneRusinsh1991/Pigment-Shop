# Task 1.4: Build Autocomplete & Dropdown Layer

## Recommended Model Tier
🟠 **Gemini 3.6 Flash (High)**

## Objective
Port `SearchDropdown.js` and implement `AutocompleteSearch.js` encapsulating catalog indexing, navigation, and active focus states.

## Target Files
- [NEW] [SearchDropdown.js](file:///d:/Magazine/_PigmentShop/src/components/Search/SearchDropdown.js)
- [NEW] [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/Search/AutocompleteSearch.js)

## Instructions
1. Extract `SearchDropdown.js` overlay into `src/components/Search/SearchDropdown.js`.
2. Build `AutocompleteSearch.js` wrapping `SearchInput` and `SearchDropdown`, handling catalog filtering (`useCatalog`), auto-navigation to `/product/[id]`, and focus callbacks (`onActiveChange`).
