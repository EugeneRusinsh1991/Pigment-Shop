# Button Standardization Master Task List

## Overview
This TODO list tracks all engineering tasks required to achieve 100% visual, geometric, and motion consistency across all buttons in the PigmentShop application.

---

## 🎯 Phase 1: Core Tokens & Button Primitive Architecture [DONE]
- [x] Verify button height tokens (`lg`: 48px, `md`: 40px, `sm`: 32px) in [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js).
- [x] Verify button border radius tokens (`lg`: 16px, `md`: 8px, `sm`: 6px) in [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js).
- [x] Ensure `Button` base primitive enforces standard spring press animation (`motion.press`).
- [x] Standardize Home Page hero CTA ("Go to Catalog") to `<Button variant="accent" size="lg" />`.
- [x] Standardize Product Detail review submit button ("Submit Review") to `<Button variant="accent" size="lg" />`.

---

## 📋 Phase 2: Shell Header & Navigation Controls
- [ ] **Task 2.1**: Refactor Header Nav Links ([`AppHeaderNavLinks.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderNavLinks.js)) to use standard `Button` `ghost` variant.
- [ ] **Task 2.2**: Refactor User Account Menu items ([`UserDropdown.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/UserDropdown.js)) to remove custom paddings and consume `Button` tokenized row styling.
- [ ] **Task 2.3**: Refactor Header Icon Action Triggers (Cart, Search, Theme) in [`AppHeaderControls.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderControls.js) to use central `IconButton`.
- [ ] **Task 2.4**: Refactor Header Brand Logo pressables in [`AppHeaderLogo.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderLogo.js) to use tokenized hit-slop and spring press feedback.

---

## 📋 Phase 3: Navigation Drawer & Category Controls
- [ ] **Task 3.1**: Migrate Navigation Drawer list items in [`NavItemList.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/NavItemList.js) to tokenized `Button` or `ChipButton`.
- [ ] **Task 3.2**: Standardize Language & Currency Selectors in [`LanguageSelector.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/LanguageSelector.js) to use central `ChipButton`.
- [ ] **Task 3.3**: Standardize Category Tree Node expanders in [`CategoryTreeNodeButtons.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/CategoryTreeNodeButtons.js) using standard `IconButton` (`size="sm"`).

---

## 📋 Phase 4: Storefront & Product Overlays
- [ ] **Task 4.1**: Refactor Catalog Filter Checkbox rows ([`SidebarUIComponents.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/SidebarUIComponents.js)) to use standard touch feedback and accessibility attributes.
- [ ] **Task 4.2**: Standardize Product Quantity Selector (`+` / `-`) buttons to use `IconButton` (`size="sm"`).
- [ ] **Task 4.3**: Standardize Card touch wrappers ([`InteractiveCard.js`](file:///d:/Magazine/_PigmentShop/src/components/Card/InteractiveCard.js)) to use unified press scale motion (`motion.press.scale`).

---

## 📋 Phase 5: Admin Workspace & Analytics UI
- [ ] **Task 5.1**: Standardize Admin Tab Bar items ([`AdminTabBar.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/AdminTabBar.js)) to use `ChipButton`.
- [ ] **Task 5.2**: Standardize Admin Product Table inline action buttons ([`ProductRowVariants.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRowVariants.js)) to use `IconButton` (`size="sm"`).
- [ ] **Task 5.3**: Standardize Media Grid item selection overlays ([`MediaBrowserItem.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Media/MediaBrowserItem.js)).
- [ ] **Task 5.4**: Standardize Analytics Date Range Calendar presets and grid cells ([`DateRangeCalendar.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Analytics/DateRangeCalendar.js) and [`CalendarDayCell.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Analytics/CalendarDayCell.js)).
