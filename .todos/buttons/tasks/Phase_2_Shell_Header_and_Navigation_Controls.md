# Phase 2: Shell Header & Navigation Controls

## Goal
Standardize all interactive header nav links, dropdown triggers, and icon buttons across the top application shell.

---

## Tasks

### 2.1 Refactor Header Nav Links
- [ ] **Task 2.1.1**: Refactor nav link touchable rendering in [`AppHeaderNavLinks.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderNavLinks.js) to use standard `Button` `ghost` variant. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 2.1.2**: Clean up custom `navLink` height and padding overrides in [`AppHeaderStyles.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderStyles.js). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 2.2 Refactor User Account Menu Items
- [ ] **Task 2.2.1**: Audit menu item touchables in [`UserDropdown.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/UserDropdown.js) and replace inline `AnimatedButton` items with standard `Button` `ghost` variant. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 2.2.2**: Standardize Admin Panel link and Logout button items in [`UserDropdown.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/UserDropdown.js). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 2.3 Refactor Header Icon Action Triggers
- [ ] **Task 2.3.1**: Migrate Cart icon button trigger in [`AppHeaderControls.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderControls.js) to central `IconButton`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 2.3.2**: Migrate Search trigger icon button in [`AppHeaderControls.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderControls.js) to central `IconButton`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 2.3.3**: Migrate Theme toggle icon button in [`AppHeaderControls.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderControls.js) to central `IconButton`. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`

### 2.4 Refactor Header Brand Logo Pressables
- [ ] **Task 2.4.1**: Update brand logo pressable in [`AppHeaderLogo.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderLogo.js) with tokenized hit-slop and spring press feedback. `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
- [ ] **Task 2.4.2**: Update drawer header logo pressable in [`NavMenuHeader.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu/NavMenuHeader.js). `[Recommended Model: 🟢 Gemini 3.6 Flash (Medium)]`
