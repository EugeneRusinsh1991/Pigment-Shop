# Stage 1 — Project Inventory & Sub-Batch Mapping

## 1. Audit Target & Scope
- **Target Scope**: Whole Project (`app/`, `src/`)
- **Audit Profile**: Full UI Audit
- **Objective**: Audit visual primitive consistency, design token adherence, interactive states (hover/press), accessibility, and UI component parity across Storefront and Admin interfaces.

## 2. Tech Stack & Environment Overview
- **Framework**: Expo / React Native Web (Expo Router)
- **Theme System**: Tokenized system (`src/theme/tokens.js`, `src/context/ThemeContext.js`)
- **Component Base**: `src/components/`, `app/`

## 3. UI Primitive Sub-Batch Definitions
The UI audit is split globally across all directories by visual primitive category to ensure 100% component unity across Storefront and Admin:

### Batch 2.1: Buttons & Clickable Elements (`buttons_clickables`)
- **Scope**: All primary/secondary buttons, icon buttons, touchable wrappers, links, action bars.
- **Directories**: `src/components/`, `app/(store)/`, `app/admin/`

### Batch 2.2: Inputs & Form Controls (`inputs_forms`)
- **Scope**: Text inputs, search bars, textareas, checkboxes, switches, dropdowns, form wrappers.
- **Directories**: `src/components/`, `app/(store)/`, `app/admin/`

### Batch 2.3: Modals, Overlays & Popups (`modals_dialogs_popups`)
- **Scope**: Modals, alert dialogs, bottom sheets, popovers, toast notifications.
- **Directories**: `src/components/`, `app/(store)/`, `app/admin/`

### Batch 2.4: Cards, Lists & Navigation (`cards_lists_navigation`)
- **Scope**: Product cards, category cards, grid items, list items, headers, footers, tab bars.
- **Directories**: `src/components/`, `app/(store)/`, `app/admin/`
