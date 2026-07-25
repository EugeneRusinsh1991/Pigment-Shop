# Task 2.1: Deploy Backward-Compatibility Proxy Shims

## Recommended Model Tier
🟢 **Gemini 3.6 Flash (Low / Medium)**

## Objective
Update legacy search component files to export backward-compatible proxy shims pointing to the new `src/components/Search/` module.

## Target Files
- [MODIFY] [SearchToolbar.js](file:///d:/Magazine/_PigmentShop/src/components/SearchToolbar.js)
- [MODIFY] [SearchBar.js](file:///d:/Magazine/_PigmentShop/src/components/SearchBar.js)
- [MODIFY] [SearchInput.js](file:///d:/Magazine/_PigmentShop/src/components/SearchBar/SearchInput.js)

## Instructions
1. Update `SearchToolbar.js` to re-export `SearchInput` from `./Search`.
2. Update `SearchBar.js` to re-export `AutocompleteSearch` from `./Search`.
3. Update `SearchBar/SearchInput.js` to re-export `SearchInput` from `../Search`.
