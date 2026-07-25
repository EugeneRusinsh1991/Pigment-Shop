# Non-Canonical Buttons & Phased Migration Batches

## Overview
This document catalogs all **non-canonical button implementations** across the PigmentShop application. Non-canonical buttons refer to interactive clickables that currently bypass central design primitives (`Button`, `IconButton`, `ChipButton`) by using direct `TouchableOpacity`, `Pressable`, or unstyled `AnimatedButton` wrappers with custom inline heights, radii, or padding.

---

## Detailed Non-Canonical Button Inventory & Audit

### 1. Shell & Application Header (`src/features/shell/AppHeader/`)
- **Navigation Links**: [`AppHeaderNavLinks.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderNavLinks.js#L31)
  - Uses `AnimatedButton` with custom `navLink` styles.
- **User Account Dropdown Triggers & Items**: [`UserDropdown.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/UserDropdown.js#L92)
  - Uses `AnimatedButton` with custom `dropdownItem` flex layouts and padding.
- **Header Controls (Cart, Search, Theme Toggle)**: [`AppHeaderControls.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderControls.js#L78)
  - Uses `AnimatedButton` with inline `minWidth: 44, minHeight: 44` overrides.
- **Brand Logo Triggers**: [`AppHeaderLogo.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderLogo.js#L43) and [`NavMenuHeader.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/NavMenuHeader.js#L31)
  - Uses `AnimatedButton` with `activeOpacity={0.8}`.

### 2. Navigation Menu & Drawer Subsystem (`src/features/shell/NavMenu/`)
- **Nav Menu Drawer Items**: [`NavItemList.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/NavItemList.js#L72)
  - Uses `AnimatedButton` for drawer list item rows.
- **Language / Currency Option Selectors**: [`LanguageSelector.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/LanguageSelector.js#L94)
  - Uses `AnimatedButton` with custom item borders and backgrounds.
- **Category Tree Navigation Nodes**: [`CategoryTreeNodeButtons.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/CategoryTreeNodeButtons.js#L4)
  - Uses `AnimatedButton` for tree item expansion and navigation.

### 3. Product & Storefront Components (`src/features/product/`, `src/features/catalog/`)
- **Filter Checkbox Items**: [`SidebarUIComponents.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/SidebarUIComponents.js#L18)
  - Uses `AnimatedButton` for filter checkbox row touch area.
- **Card Touch Area Wrapper**: [`InteractiveCard.js`](file:///d:/Magazine/_PigmentShop/src/components/Card/InteractiveCard.js#L51)
  - Uses raw `TouchableOpacity` with custom scale animation.
- **Auth Screen Toggle Text Links**: [`LoginPageComponents.js`](file:///d:/Magazine/_PigmentShop/src/features/auth/LoginPageComponents.js#L2)
  - Uses raw `TouchableOpacity` for text links instead of `Button` `ghost`/`unstyled` variant.

### 4. Admin Panel & Management Interface (`src/components/Admin/`)
- **Admin Tab Bar Navigation**: [`AdminTabBar.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/AdminTabBar.js#L28)
  - Uses `TouchableOpacity` with custom tab active/inactive styling.
- **Media Browser Item Selection**: [`MediaBrowserItem.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Media/MediaBrowserItem.js#L15)
  - Uses `TouchableOpacity` for grid item selection overlay.
- **Product Table Row Actions**: [`ProductRowVariants.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRowVariants.js#L56)
  - Uses `TouchableOpacity` for inline table row edit/delete actions.
- **Analytics Calendar Controls**: [`CalendarDayCell.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Analytics/CalendarDayCell.js#L102) and [`DateRangeCalendar.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Analytics/DateRangeCalendar.js#L79)
  - Uses `TouchableOpacity` for date grid cell and range preset selection.

---

## Migration Batches

### Batch 1: Shell Navigation & Header Controls
- **Target Files**: `AppHeaderNavLinks.js`, `UserDropdown.js`, `HeaderDropdown.js`, `AppHeaderControls.js`
- **Objective**: Standardize header item triggers and cart action button using `IconButton` or `Button` `unstyled` / `ghost` variants with standard touch target tokens (`minHeight: 40px`, tokenized hover/active opacity).

### Batch 2: Navigation Drawer & Category Tree
- **Target Files**: `NavItemList.js`, `LanguageSelector.js`, `CategoryTreeNodeButtons.js`
- **Objective**: Standardize drawer interactive rows using `ChipButton` or tokenized `Button` primitives.

### Batch 3: Storefront & Card Action Overlays
- **Target Files**: `SidebarUIComponents.js` (Checkboxes), `InteractiveCard.js`, `LoginPageComponents.js`
- **Objective**: Standardize card pressables and text links to maintain tokenized spring press animation (`motion.press`) and accessibility roles (`accessibilityRole="button"`).

### Batch 4: Admin Workspace & Analytics UI
- **Target Files**: `AdminTabBar.js`, `MediaBrowserItem.js`, `ProductRowVariants.js`, `DateRangeCalendar.js`, `CalendarDayCell.js`
- **Objective**: Standardize admin tab bars, grid selectors, and row actions using tokenized `IconButton` (`size="sm"`) and `ChipButton`.
