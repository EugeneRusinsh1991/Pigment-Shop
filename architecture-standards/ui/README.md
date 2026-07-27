# AI Agent Guide: UI Component Architecture (`src/components/`)

> [!NOTE]
> All UI primitives in `src/components/` must strictly adhere to the reference architecture in [`_reference-module-spec.md`](./_reference-module-spec.md).

## Core UI Reference Architecture
- **Reference Spec:** [`_reference-module-spec.md`](./_reference-module-spec.md) — Master guide for component layout, state separation, token integration, and cyclomatic complexity limits.

---

## UI Component Specifications Index

| Component / Element | File Link | AI Agent Purpose & Description |
| :--- | :--- | :--- |
| **Reference Standard** | [`_reference-module-spec.md`](./_reference-module-spec.md) | Master specification for UI module decomposition and design system rules. |
| **Badge** | [`badge-module-spec.md`](./badge-module-spec.md) | Status indicators, count pills, and visual tags. |
| **Batches** | [`batches-module-spec.md`](./batches-module-spec.md) | Batch operations, bulk selection controls, and multi-item actions. |
| **Button** | [`button-module-spec.md`](./button-module-spec.md) | Single-action triggers (commands, forms, modals). Does not persist toggle state. |
| **Card** | [`card-module-spec.md`](./card-module-spec.md) | Content containers, product items, and elevated surface cards. |
| **Data Table** | [`data-table-module-spec.md`](./data-table-module-spec.md) | Tabular data grids, sorting, pagination, and row controls. |
| **Domain Relocation** | [`domain-relocation-spec.md`](./domain-relocation-spec.md) | Architectural migration rules for moving features/components into domain boundaries. |
| **Drawer** | [`drawer-module-spec.md`](./drawer-module-spec.md) | Side overlay panels, slide-out menus, and mobile drawers. |
| **Feedback** | [`feedback-module-spec.md`](./feedback-module-spec.md) | User notifications, alerts, toast banners, and inline status messages. |
| **Flag** | [`flag-module-spec.md`](./flag-module-spec.md) | Standalone boolean state switchers, checkboxes, and feature flags. |
| **Icons** | [`icons-module-spec.md`](./icons-module-spec.md) | SVG icon wrappers, standard icon sizes, and visual glyphs. |
| **Media** | [`media-module-spec.md`](./media-module-spec.md) | Image wrappers, video players, lazy loading, and fallback placeholders. |
| **Modal** | [`modal-module-spec.md`](./modal-module-spec.md) | Dialog overlays, confirmation modals, and focused flow popups. |
| **Motion** | [`motion-module-spec.md`](./motion-module-spec.md) | Animation tokens, micro-interactions, spring transitions, and gesture hooks. |
| **Navigation** | [`navigation-module-spec.md`](./navigation-module-spec.md) | Navbars, breadcrumbs, tab bars, and pagination controls. |
| **Search** | [`search-module-spec.md`](./search-module-spec.md) | Instant search inputs, filter triggers, and search suggestion dropdowns. |
| **Text Field** | [`text-field-module-spec.md`](./text-field-module-spec.md) | Text inputs, textareas, search fields with error states and validation UI. |
| **Text** | [`text-module-spec.md`](./text-module-spec.md) | Typography primitives (Headings, Paragraphs, Labels, Code snippets). |
| **Toggle** | [`toggle-module-spec.md`](./toggle-module-spec.md) | Multi-option view/mode selection switchers (tabs, view toggles). |
