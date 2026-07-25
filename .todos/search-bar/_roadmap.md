# Search Module Architecture Roadmap

## 1. Where We Are (What We Have)

Search functionality is currently fragmented across 4 separate locations:

- **`SearchToolbar.js`**: Standard input container used in Admin screens (Users, Products).
- **`SearchBar/SearchInput.js`**: Adapter proxy wrapping `SearchToolbar`.
- **`SearchBar.js`**: Storefront header catalog search field with autocomplete logic.
- **`SearchDropdown.js`**: Autocomplete overlay dropdown rendering search results.

---

## 2. Where We Want to Be (What We Want to Have)

A canonical, unified **Search Module** in `src/components/Search/` adhering 100% to the **Button Module Architecture**:

```
src/components/Search/
├── index.js                     # Single public API barrel export
├── SearchInput.js               # Shared foundational input component
├── AutocompleteSearch.js        # Autocomplete variant (SearchInput + SearchDropdown)
├── SearchDropdown.js            # Overlay dropdown & result item rows
├── SearchStyles.js              # Centralized token style factory
├── useSearchTheme.js            # Dynamic dark/light theme resolver hook
└── searchCommon.js              # Layout constants & default props
```

---

## 3. Step-by-Step Low Profile Roadmap

### Phase 1: Core Search Module Encapsulation (`src/components/Search/`)
- **Step 1.1**: Create Theme Resolver & Constants (`searchCommon.js`, `useSearchTheme.js`)
- **Step 1.2**: Create Unified Style Factory (`SearchStyles.js`)
- **Step 1.3**: Build Base `SearchInput.js` Primitive
- **Step 1.4**: Build `AutocompleteSearch.js` & `SearchDropdown.js` Overlay Layer
- **Step 1.5**: Create Barrel Export (`src/components/Search/index.js`)

### Phase 2: Backward-Compatibility Proxy Shims
- **Step 2.1**: Deploy Proxy Shim for `SearchToolbar.js`
- **Step 2.2**: Deploy Proxy Shim for `SearchBar.js`
- **Step 2.3**: Deploy Proxy Shim for `SearchBar/SearchInput.js`

### Phase 3: Consumer Migration & Legacy Cleanup
- **Step 3.1**: Migrate Storefront Header (`StoreSearchHeader.js`)
- **Step 3.2**: Migrate Admin Screens (`ProductsManager.js`, `UsersManager.js`, `CategoriesManager.js`)
- **Step 3.3**: Delete Legacy Shims & Verify Clean Build
