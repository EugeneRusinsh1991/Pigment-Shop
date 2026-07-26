# UI Module Migration Plan: DataTable

> Based on the development standard [`1_data_table.md`](file:///d:/Magazine/_PigmentShop/.todos/ui-standards/data-table/1_data_table.md) and reference module spec [`_reference-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/_reference-module-spec.md).

---

## 1. Current State Overview
- **Current Directory:** [`src/components/DataTable/`](file:///d:/Magazine/_PigmentShop/src/components/DataTable/)
- **Current Files:**
  - `DataTable.js` (monolithic component handling rendering, header sorting, row rendering, and window dimension checks)
  - `DataTable.styles.js` (legacy style file name and hardcoded colors)
  - `EmptyState.js` (empty state wrapper)

---

## 2. Step-by-Step Refactoring Tasks

### Step 1: Create style factory `DataTableStyles.js` & Deprecate `DataTable.styles.js`
- **Recommended Model:** 🟢 Gemini 3.6 Flash (Low) - 2 files
- [x] Create file `src/components/DataTable/DataTableStyles.js`.
- [x] Refactor styles to use design system tokens (`colors`, `layout`, `shadows`).
- [x] Add dynamic style generators for headers, alternate row backgrounds, and cells.
- [x] Deprecate `DataTable.styles.js` by re-exporting from `DataTableStyles.js`.

### Step 2: Extract theme hook `useDataTableTheme.js`
- **Recommended Model:** 🟡 Gemini 3.6 Flash (Medium) - 1 file
- [x] Create hook `src/components/DataTable/useDataTableTheme.js`.
- [x] Implement `ThemeContext` resolution (`isDark`).
- [x] Return prepared surface, header, row alternative background, and text colors for light/dark modes.

### Step 3: Extract state & layout hook `useDataTable.js`
- **Recommended Model:** 🟡 Gemini 3.6 Flash (Medium) - 1 file
- [x] Create hook `src/components/DataTable/useDataTable.js`.
- [x] Extract mobile responsiveness detection (`isMobile` via `useWindowDimensions` and `layout.breakpoints.mobile`).
- [x] Extract sorting state management and row key extraction logic.

### Step 4: Refactor primary component `DataTable.js`
- **Recommended Model:** 🟠 Gemini 3.6 Flash (High) - 3 files
- [x] Integrate `useDataTableTheme` and `useDataTable` into `DataTable.js`.
- [x] Clean up inline logic/styles from `HeaderCell`, `TableBody`, `DataTableRow`, and `DataTableCell`.
- [x] Ensure 100% backward compatibility for all existing props (`data`, `columns`, `sortField`, `sortDirection`, `onSort`, `renderRow`, `renderMobileRow`, `emptyText`, etc.).

### Step 5: Create public API `index.js`
- **Recommended Model:** 🟢 Gemini 3.6 Flash (Low) - 1 file
- [x] Create `src/components/DataTable/index.js`.
- [x] Export `DataTable` as default and named, along with `DataTableRow`, `DataTableCell`, `EmptyState`, `useDataTableTheme`, `useDataTable`, and style utilities.

---

## 3. Definition of Done
- [x] Module structure strictly adheres to `_reference-module-spec.md`.
- [x] Public API exposed via `index.js`.
- [x] Zero hardcoded styles or magic numbers in `DataTable.js`.
- [x] 100% backward compatibility preserved across all admin data tables.
