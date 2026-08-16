# Engineering Standard: DataTable UI Module Architecture

> [!NOTE]
> This engineering standard defines the semantic purpose, architectural layout, hook breakdown, API props contract, and design token integration for the **DataTable** UI primitive in PigmentShop.

---

## 1. Semantic Purpose & Interaction Model

### 1.1 Semantic Purpose
The `DataTable` is a structured data grid primitive for presenting tabular data with sorting, row selection, pagination, and admin action capabilities.

- **Primary Scope**: Admin panels, batch data management, transaction logs, inventory lists.

---

## 2. Module Architecture

```
src/components/domain/DataTable/
├── index.js                      # Barrel export for DataTable
├── DataTable.js                  # Main grid container & header rendering
├── DataTableRow.js               # Individual row component
├── DataTableStyles.js            # Style factory for grid, borders, and rows
└── useDataTableTheme.js          # Theme resolution for zebra striping, borders, and hover states
```

---

## 3. Design Token Integration

All styling MUST reference [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js):
- **Colors**: `colors.surface`, `colors.tableHeaderBackground`, `colors.borderLight`, `colors.rowHover`.
- **Typography & Spacing**: `fonts.sans`, `typography.sizes.caption`, `layout.spacing.sm`.

---

## 4. Compliance Checklist

- [ ] Style factory extracted to `DataTableStyles.js`.
- [ ] Theme, row hover, and header background colors resolved in `useDataTableTheme.js`.
- [ ] Clean public exports in `index.js`.
