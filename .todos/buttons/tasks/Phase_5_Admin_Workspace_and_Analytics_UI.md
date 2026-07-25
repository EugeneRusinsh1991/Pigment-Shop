# Phase 5: Admin Workspace & Analytics UI

## Goal
Standardize admin workspace tab bars, product table row actions, media selection grids, and analytics date pickers.

---

## Tasks

### 5.1 Standardize Admin Tab Bar Items
- [ ] **Task 5.1.1**: Refactor admin navigation tab items in [`AdminTabBar.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/AdminTabBar.js) to use `ChipButton`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 5.1.2**: Remove custom active tab background styles in [`AdminTabBar.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/AdminTabBar.js) and consume central `chipTokens`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 5.2 Standardize Admin Product Table Row Actions
- [ ] **Task 5.2.1**: Refactor inline edit action icon button in [`ProductRowVariants.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRowVariants.js) to central `IconButton` (`size="sm"`). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 5.2.2**: Refactor inline delete action icon button in [`ProductRowVariants.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRowVariants.js) to central `IconButton` (`size="sm"`). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 5.3 Standardize Media Selection Grid
- [ ] **Task 5.3.1**: Refactor media grid item selection touchable in [`MediaBrowserItem.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Media/MediaBrowserItem.js) to use `AnimatedButton`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 5.3.2**: Refactor media remove/delete action button in [`MediaBrowserItem.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Media/MediaBrowserItem.js) to central `IconButton` (`size="sm"`). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 5.4 Standardize Analytics Date Range Picker & Calendar
- [ ] **Task 5.4.1**: Refactor quick date range preset buttons in [`DateRangeCalendar.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Analytics/DateRangeCalendar.js) to use `ChipButton`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 5.4.2**: Refactor calendar day cell touchables in [`CalendarDayCell.js`](file:///d:/Magazine/_PigmentShop/src/components/Admin/Analytics/CalendarDayCell.js) to use tokenized hit-slop and spring press feedback. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
