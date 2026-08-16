# AI Agent Guide: UI & Domain Component Architecture (`src/components/`)

> [!NOTE]
> All UI primitives in `src/components/ui/` and domain components in `src/components/domain/` must strictly adhere to the reference architecture in [`_reference-module-spec.md`](./_reference-module-spec.md).

## Core UI Reference Architecture
- **Reference Spec:** [`_reference-module-spec.md`](./_reference-module-spec.md) — Master guide for component layout, state separation, token integration, and cyclomatic complexity limits.

---

## UI Component Specifications Index

### 1. UI Visual Primitives (`src/components/ui/`)

| Component / Element | Spec File | Target Path | Description |
| :--- | :--- | :--- | :--- |
| **Badge** | [`badge-module-spec.md`](./badge-module-spec.md) | `src/components/ui/Badge/` | Status indicators, count pills, and visual tags. |
| **Batches** | [`batches-module-spec.md`](./batches-module-spec.md) | `src/components/ui/Badge/` | Batch operations, bulk selection controls, and multi-item actions. |
| **Button** | [`button-module-spec.md`](./button-module-spec.md) | `src/components/ui/Button/` | Single-action triggers (commands, forms, modals). |
| **Card** | [`card-module-spec.md`](./card-module-spec.md) | `src/components/ui/Card/` | Content containers, product items, and elevated surface cards. |
| **Drawer** | [`drawer-module-spec.md`](./drawer-module-spec.md) | `src/components/ui/Drawer/` | Side overlay panels, slide-out menus, and mobile drawers. |
| **Feedback** | [`feedback-module-spec.md`](./feedback-module-spec.md) | `src/components/ui/Feedback/` | User notifications, alerts, toast banners, and inline status messages. |
| **Grid** | [`grid-module-spec.md`](./grid-module-spec.md) | `src/components/ui/Grid/` | Grid layout primitive (`UnifiedCardGrid`). |
| **Layout** | [`layout-module-spec.md`](./layout-module-spec.md) | `src/components/ui/Layout/` | Page layout container (`StorefrontPageContainer`). |
| **Media** | [`media-module-spec.md`](./media-module-spec.md) | `src/components/ui/Media/` | Image wrappers, video players, lazy loading, and fallback placeholders. |
| **Modal** | [`modal-module-spec.md`](./modal-module-spec.md) | `src/components/ui/Modal/` | Dialog overlays, confirmation modals, and focused flow popups. |
| **Motion** | [`motion-module-spec.md`](./motion-module-spec.md) | `src/components/ui/Motion/` | Animation tokens, micro-interactions, spring transitions, and gesture hooks. |
| **Text** | [`text-module-spec.md`](./text-module-spec.md) | `src/components/ui/Text/` | Typography primitives (Headings, Paragraphs, Labels, Code snippets). |
| **Text Field** | [`text-field-module-spec.md`](./text-field-module-spec.md) | `src/components/ui/TextField/` | Text inputs, textareas, search fields with error states and validation UI. |
| **Toggle** | [`toggle-module-spec.md`](./toggle-module-spec.md) | `src/components/ui/Toggle/` | Multi-option view/mode selection switchers (tabs, view toggles). |

### 2. UI Subsystems Architecture

| Subsystem | Spec File | Target Path | Description |
| :--- | :--- | :--- | :--- |
| **Haptic Feedback** | [`haptic-feedback-spec.md`](./haptic-feedback-spec.md) | `src/theme/haptics.js`, `useHaptics` | Centralized haptic feedback execution framework bridging web and native. |
| **Theme & Tokens** | [`theme-and-tokens-spec.md`](./theme-and-tokens-spec.md) | `src/theme/` | Centralized token definitions, semantic mapping, and style map factories. |
| **Responsive Architecture** | [`responsive-architecture-spec.md`](./responsive-architecture-spec.md) | `src/hooks/useVisualViewportDimensions.js` | Multi-breakpoint visual viewport calculation engine. |
| **Scroll Subsystem** | [`scroll-subsystem-spec.md`](./scroll-subsystem-spec.md) | `src/hooks/useHomeScrollHide.js` | Scroll gesture detection, auto-hiding navigation bars, and pull-to-refresh. |

### 3. Domain Presentation Components (`src/components/domain/`)

| Component / Element | Spec File | Target Path | Description |
| :--- | :--- | :--- | :--- |
| **Data Table** | [`data-table-module-spec.md`](./data-table-module-spec.md) | `src/components/domain/DataTable/` | Tabular data grids, sorting, pagination, and row controls. |
| **Flag** | [`flag-module-spec.md`](./flag-module-spec.md) | `src/components/domain/Flag/` | Standalone boolean state switchers, checkboxes, and feature flags. |
| **Navigation** | [`navigation-module-spec.md`](./navigation-module-spec.md) | `src/components/domain/Navigation/` | Navbars, breadcrumbs, tab bars, and pagination controls. |
| **Search** | [`search-module-spec.md`](./search-module-spec.md) | `src/components/domain/Search/` | Instant search inputs, filter triggers, and search suggestion dropdowns. |

### 4. Icon Wrappers & Utilities (`src/components/Icons/`)

| Component / Element | Spec File | Target Path | Description |
| :--- | :--- | :--- | :--- |
| **Icons** | [`icons-module-spec.md`](./icons-module-spec.md) | `src/components/Icons/` | Domain-grouped vector icon modules and theme bindings. |
| **Domain Relocation** | [`domain-relocation-spec.md`](./domain-relocation-spec.md) | N/A | Migration rules for moving features/components into domain boundaries. |
