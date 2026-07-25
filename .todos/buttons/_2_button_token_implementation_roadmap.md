# Button Dimensions & Tokenization Master Roadmap

## 📌 Executive Summary
This document serves as the master index for implementing a unified, token-driven button sizing, height, radius, and width system across the entire codebase without hardcoding values in screens or components.

---

## 🔗 Implementation Phases & Task Documents

- 📄 **[Phase 1: Core Primitives Refactoring](file:///d:/Magazine/_PigmentShop/.todos/buttons/_3_phase1_core_primitives.md)**
  - Tokenizing `ButtonStyles.js`, `IconButton.js`, and `ChipButton.js`
  - Introducing width helper props in `Button.js`

- 📄 **[Phase 2: Navigation & Shell Alignment](file:///d:/Magazine/_PigmentShop/.todos/buttons/_4_phase2_navigation_and_shell.md)**
  - Cleaning inline height/radius overrides in `UserDropdown.js`, `HeaderDropdown.js`, and `AppHeaderNavLinks.js`

- 📄 **[Phase 3: Admin & Dashboard Alignment](file:///d:/Magazine/_PigmentShop/.todos/buttons/_5_phase3_admin_and_dashboard.md)**
  - Standardizing table actions, pagination, and modal buttons in `AdminTable.js`, `AdminFormModal.js`, and `AdminHeader.js`

- 📄 **[Phase 4: Storefront & Auth Screens](file:///d:/Magazine/_PigmentShop/.todos/buttons/_6_phase4_storefront_and_auth.md)**
  - Aligning CTA buttons, login screens (`LoginPageStyles.js`), product cards, and profile screens (`ProfilePageStyles.js`)

---

## 📐 Tokenized Geometry Standard Reference

| Size | Height | Border Radius (Standard) | Border Radius (Pill / Round) | Standard Padding |
| :--- | :--- | :--- | :--- | :--- |
| **`sm`** | **32px** | **6px** (`radii.xs`) | **16px** | `8px 12px` |
| **`md`** | **40px** | **8px** (`radii.sm`) | **20px** | `10px 16px` |
| **`lg`** | **48px** | **12px** (`radii.md`) | **24px** | `12px 24px` |

---

## 🔍 Future Width Alignment (Notes for Next Phase)
- **Fluid vs Fixed Widths**: Standardize form/CTA submit buttons to `fullWidth` (`width: '100%'`) and secondary inline actions to `auto` (`paddingHorizontal`-driven width).
- **Icon Button Aspect Ratio**: Enforce 1:1 ratio (`width = height`) automatically via `buttonTokens.sizes`.
