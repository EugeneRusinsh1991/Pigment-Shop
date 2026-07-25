# Button Component & Primitive Refactoring - Step-by-Step TODO

Model recommendations follow the **Universal AI Audit Framework v2** rules (+20% complexity buffer).

---

## 📦 Phase 1: Button Module Canonical Architecture (Completed)

### Subtask 1.1: Consolidate Theme Resolution
- **Goal**: Extract style resolution logic into `useButtonTheme.js` and handle dark/light modes across all variants (`primary`, `secondary`, `danger`, `dangerSoft`, `success`, `transparent`).
- **Complexity**: 🟡 Medium (Shared theme state logic)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Status**: [x] Completed

### Subtask 1.2: Standardize Button Primitives
- **Goal**: Implement base `Button.js`, `IconButton.js`, and `ChipButton.js` with deterministic layout boundaries and size targets.
- **Complexity**: 🟡 Medium (Core design system primitive foundation)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Status**: [x] Completed

### Subtask 1.3: Public Barrel Export & Shim Cleanup
- **Goal**: Export all primitives in `src/components/Button/index.js` and update proxy shims.
- **Complexity**: 🟢 Low (2-3 files)
- **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- **Status**: [x] Completed

---

## 💬 Phase 2: Primitive Standardizations (Completed Steps)

### Subtask 2.1: Card Primitive Encapsulation
- **Goal**: Encapsulate cards into `src/components/Card/`, migrate consumer imports across features, and delete proxy shims.
- **Complexity**: 🔴 High (Cross-cutting touch across >10 files)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Status**: [x] Completed

### Subtask 2.2: Modal & Dialog Standardization
- **Goal**: Build base `Modal` primitive (`src/components/Modal/Modal.js`), implement `ConfirmationModal.js`, migrate consumers, and remove legacy `ConfirmationDialog.js`.
- **Complexity**: 🟡 Medium (Backdrop accessibility & modal drivers)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Status**: [x] Completed

### Subtask 2.3: Drawer Primitive Standardization
- **Goal**: Encapsulate `Drawer.js` into `src/components/Drawer/`, add `DrawerHeader`/`DrawerFooter` sub-components, and update `NavMenu` / `CatalogFilterSidebar` consumers.
- **Complexity**: 🟢 Low (3-4 files)
- **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- **Status**: [x] Completed

---

## 🔍 Phase 3: Search Module Encapsulation (Next Phase)

### Subtask 3.1: Search Primitive Modularization
- **Goal**: Create `src/components/Search/`, build `SearchInput.js`, `SearchToolbar.js`, `SearchDropdown.js`, and `SearchResultRow.js`.
- **Affected Files**: `src/components/Search/SearchInput.js`, `src/components/Search/SearchToolbar.js`, `src/components/Search/SearchDropdown.js`, `src/components/Search/SearchResultRow.js`
- **Complexity**: 🟡 Medium (4 files, core search component logic)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Status**: [ ] Pending

### Subtask 3.2: Search Barrel Export & Theme Integration
- **Goal**: Create `src/components/Search/index.js` barrel export and unify dark/light focus theme resolution (`useSearchTheme`).
- **Affected Files**: `src/components/Search/index.js`, `src/components/Search/useSearchTheme.js`
- **Complexity**: 🟢 Low (2 files)
- **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- **Status**: [ ] Pending

### Subtask 3.3: Storefront & Admin Search Consumer Migration
- **Goal**: Update all search field import paths across Admin screens (Products, Categories, Users) and Storefront Header to `import { SearchInput, SearchBar } from '@/components/Search'`.
- **Affected Files**: ~8-12 consumer components across `src/features/` and `src/components/Admin/`
- **Complexity**: 🔴 High (>8 files touched across Admin & Storefront)
- **Recommended Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Status**: [ ] Pending

---

## 🧪 Phase 4: Design System Verification

### Subtask 4.1: Automated UI & Accessibility Verification
- **Goal**: Execute Playwright smoke automation (`run-smoke.ts`) to verify modal overlays, drawers, buttons, and search inputs across light/dark themes.
- **Complexity**: 🟢 Low (Test execution & verification)
- **Recommended Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- **Status**: [ ] Pending
