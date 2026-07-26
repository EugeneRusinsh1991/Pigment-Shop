# Style Tokenization Tasks (Hardcoded Styles Refactoring)

## Overview
Goal: Replace all 1385 hardcoded style values (colors, dimensions, spacing) identified in `.docs/audits/audits/03-hardcode-styles-violations.log` with centralized design tokens from `src/theme/tokens.js` and component theme hooks.

---

## Phase 1: Core UI Components
- [ ] Refactor `src/components/Badge/` (Badge.js, BadgeStyles.js)
- [ ] Refactor `src/components/Button/` (Button.js, ButtonStyles.js, ChipButton.js, IconButton.js)
- [ ] Refactor `src/components/Card/` (BaseCard.js, Card.js, CardStyles.js, InteractiveCard.js, NavigationCard.js, StaticCard.js)
- [ ] Refactor remaining base UI components (Input, Modal, Dropdown, Navigation, Feedback, etc.)

---

## Phase 2: Admin Panel Modules
- [ ] Refactor Admin Panel Root (`AdminPanel.js`, `AdminPanelStyles.js`, `AdminTabBar.js`, `LanguageTabs.js`, `FormModalLayout.js`)
- [ ] Refactor Admin Analytics (`AnalyticsDashboard.js`, `AnalyticsStyles.js`, `CalendarDayCell.js`, `DateRangeCalendar.js`, `DateRangePicker.js`, `Charts`)
- [ ] Refactor Admin Banners & Categories (`BannersStyles.js`, `CategoriesStyles.js`, `CategoryForm*`, `CategoryRow*`)
- [ ] Refactor Admin Media (`MediaBrowserComponents.js`, `MediaBrowserItem.js`, `MediaBrowserStyles.js`)
- [ ] Refactor Admin Orders (`AdminNoteSection.js`, `OrderCustomerCard.js`, `OrderDetails.js`, `OrderItemsList.js`, `OrdersStyles.js`, `OrdersTable*`)
- [ ] Refactor Admin Products (`MobileProductRow.js`, `ProductFormFields.js`, `ProductFormModal.js`, `ProductFormStyles.js`, `ProductsFilterBar.js`, `ProductsStyles.js`)
- [ ] Refactor Admin Users (`UserDetails.js`, `UserNoteSection.js`, `UserRow.js`, `UsersManager.js`, `UsersStyles.js`)

---

## Phase 3: Screens & Application Root
- [ ] Refactor `src/AppStyles.js`
- [ ] Refactor screen layouts under `src/screens/`
- [ ] Run `npm run audit:ui` to verify 0 hardcode style violations
