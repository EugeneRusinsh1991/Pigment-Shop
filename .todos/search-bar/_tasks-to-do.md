# Search Module - Tasks To Do List

Model recommendations follow the **Universal AI Audit Framework v2** rules (+20% complexity buffer).

---

## 📦 Phase 1: Core Search Module Encapsulation

- [x] **Task 1.1**: `task-1.1_theme_resolver_DONE.md` — Create Theme Resolver (`useSearchTheme.js`) & Constants (`searchCommon.js`).
  - **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- [x] **Task 1.2**: `task-1.2_style_factory_DONE.md` — Create Unified Style Factory (`SearchStyles.js`).
  - **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- [x] **Task 1.3**: `task-1.3_search_input_DONE.md` — Build Base `SearchInput.js` Primitive.
  - **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- [x] **Task 1.4**: `task-1.4_autocomplete_search_DONE.md` — Build `AutocompleteSearch.js` & `SearchDropdown.js` Layer.
  - **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- [x] **Task 1.5**: `task-1.5_index_export_DONE.md` — Create Single Public Barrel Export (`index.js`).
  - **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low)**

---

## 🔄 Phase 2: Backward-Compatibility Proxy Shims

- [x] **Task 2.1**: `task-2.1_proxy_shims_DONE.md` — Deploy Proxy Shims for `SearchToolbar.js`, `SearchBar.js`, and `SearchInput.js`.
  - **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**

---

## 🚀 Phase 3: Consumer Migration & Legacy Cleanup

- [ ] **Task 3.1**: `task-3.1_consumer_migration.md` — Update Consumer Imports (Storefront Header & Admin Managers) to `@/components/Search`.
  - **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- [ ] **Task 3.2**: `task-3.2_legacy_cleanup.md` — Delete Legacy Proxy Files & Perform Smoke Test Verification.
  - **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
