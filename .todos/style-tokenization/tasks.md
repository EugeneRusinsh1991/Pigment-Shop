# Style Tokenization Tasks (Hardcoded Styles Refactoring)

## Overview
Goal: Replace all 1385 hardcoded style values (colors, dimensions, spacing) identified in `.docs/audits/audits/03-hardcode-styles-violations.log` with centralized design tokens from `src/theme/tokens.js` and component theme hooks.
*Target Execution*: 🟠 **Gemini 3.6 Flash (High)** (Max 3-4 files per task, zero Pro needed).

---

## Phase 1: Core UI Components
*Phase Aggregate*: 🔴 **Gemini 3.1 Pro (High)** - 24 files (⚠️ Break down into subtasks)

### Phase 1.1: Badges & Buttons *(Subphase Aggregate: 🔴 Gemini 3.1 Pro (High) - 6 files)*
- [x] Refactor `src/components/Badge/` (Badge.js, BadgeStyles.js) — 🟡 Gemini 3.6 Flash (Medium) - 2 files
- [x] Refactor `src/components/Button/` (Button.js, ButtonStyles.js, ChipButton.js, IconButton.js) — 🟠 Gemini 3.6 Flash (High) - 4 files

### Phase 1.2: Cards *(Subphase Aggregate: 🔴 Gemini 3.1 Pro (High) - 6 files)*
- [x] Refactor Base Card Components (`BaseCard.js`, `Card.js`, `CardStyles.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files
- [x] Refactor Variant Cards (`InteractiveCard.js`, `NavigationCard.js`, `StaticCard.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files

### Phase 1.3: Inputs & Overlays *(Subphase Aggregate: 🔴 Gemini 3.1 Pro (High) - 8 files)*
- [x] Refactor Form & Input Components (Input, Form fields base) — 🟠 Gemini 3.6 Flash (High) - 4 files
- [x] Refactor Modals & Overlays (Modal, Overlay wrappers) — 🟠 Gemini 3.6 Flash (High) - 4 files

### Phase 1.4: Navigation & Feedback *(Subphase Aggregate: 🔴 Gemini 3.1 Pro (High) - 8 files)*
- [x] Refactor Dropdowns & Navigation UI (Dropdown, Tabs, Breadcrumbs) — 🟠 Gemini 3.6 Flash (High) - 4 files
- [x] Refactor Feedback UI (Toast, EmptyState, InlineError, Skeleton) — 🟠 Gemini 3.6 Flash (High) - 4 files

---

## Phase 2: Admin Panel Modules
*Phase Aggregate*: 🔴 **Gemini 3.1 Pro (High)** - 36 files (⚠️ Break down into subtasks)

### Phase 2.1: Admin Core & Analytics *(Subphase Aggregate: 🔴 Gemini 3.1 Pro (High) - 11 files)*
- [x] Refactor Admin Panel Core (`AdminPanel.js`, `AdminPanelStyles.js`, `AdminTabBar.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files
- [x] Refactor Admin Panel Layouts (`LanguageTabs.js`, `FormModalLayout.js`) — 🟡 Gemini 3.6 Flash (Medium) - 2 files
- [x] Refactor Admin Analytics Dashboard (`AnalyticsDashboard.js`, `AnalyticsStyles.js`, `Charts`) — 🟠 Gemini 3.6 Flash (High) - 3 files
- [x] Refactor Admin Date Pickers (`CalendarDayCell.js`, `DateRangeCalendar.js`, `DateRangePicker.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files

### Phase 2.2: Banners, Categories & Media *(Subphase Aggregate: 🔴 Gemini 3.1 Pro (High) - 7 files)*
- [ ] Refactor Admin Banners & Categories (`BannersStyles.js`, `CategoriesStyles.js`, `CategoryForm*`, `CategoryRow*`) — 🟠 Gemini 3.6 Flash (High) - 4 files
- [ ] Refactor Admin Media Browser (`MediaBrowserComponents.js`, `MediaBrowserItem.js`, `MediaBrowserStyles.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files

### Phase 2.3: Admin Orders *(Subphase Aggregate: 🔴 Gemini 3.1 Pro (High) - 6 files)*
- [ ] Refactor Order Details & Notes (`AdminNoteSection.js`, `OrderCustomerCard.js`, `OrderDetails.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files
- [ ] Refactor Order Items & Tables (`OrderItemsList.js`, `OrdersStyles.js`, `OrdersTable*`) — 🟠 Gemini 3.6 Flash (High) - 3 files

### Phase 2.4: Admin Products & Users *(Subphase Aggregate: 🔴 Gemini 3.1 Pro (High) - 11 files)*
- [ ] Refactor Product Forms & Styles (`ProductFormFields.js`, `ProductFormModal.js`, `ProductFormStyles.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files
- [ ] Refactor Product Rows & Filters (`MobileProductRow.js`, `ProductsFilterBar.js`, `ProductsStyles.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files
- [ ] Refactor User Details & Notes (`UserDetails.js`, `UserNoteSection.js`, `UserRow.js`) — 🟠 Gemini 3.6 Flash (High) - 3 files
- [ ] Refactor User Manager & Styles (`UsersManager.js`, `UsersStyles.js`) — 🟡 Gemini 3.6 Flash (Medium) - 2 files

---

## Phase 3: Screens & Application Root
*Phase Aggregate*: 🔴 **Gemini 3.1 Pro (High)** - 9 files

- [ ] Refactor App Root Styles (`src/AppStyles.js`) — 🟢 Gemini 3.6 Flash (Low) - 1 file
- [ ] Refactor Screen Layouts Batch 1 (Primary screens, max 4 files) — 🟠 Gemini 3.6 Flash (High) - 4 files
- [ ] Refactor Screen Layouts Batch 2 (Secondary screens, max 4 files) — 🟠 Gemini 3.6 Flash (High) - 4 files
- [ ] Run verification audit (`npm run audit:ui`) — 🟢 Gemini 3.6 Flash (Low) - 0 files
