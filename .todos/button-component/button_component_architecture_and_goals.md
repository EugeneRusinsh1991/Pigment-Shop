# Button Component Architecture & Primitive Goals

## Overview

The **Button Module** (`src/components/Button/`) is the canonical **Reference UI Primitive Architecture** for the Pigment Shop design system. All component refactoring and encapsulation across the codebase follow the principles established in this module.

---

## 🎯 Primary Goals

1. **Canonical Standard**: Maintain `src/components/Button/` as the blueprint for all primitive UI modules (Card, Modal, Drawer, Search).
2. **Encapsulated Public API**: Export all button variants and helpers through a clean barrel export (`index.js`).
3. **Unified Theme Resolution**: Centralize state, theme, and color resolution using `useButtonTheme.js`.
4. **Deterministic Layout Boundaries**: Avoid dynamic runtime calculation of layout boundaries (`hitSlop`, sizes).

---

## 🏗️ Module Architecture (`src/components/Button/`)

| Component / Utility | File | Responsibility |
| :--- | :--- | :--- |
| **`Button`** | `Button.js` | Base button primitive with loading, disabled, press feedback, and size variants (`sm`, `md`, `lg`). |
| **`IconButton`** | `IconButton.js` | Specialized icon-only button variant with size-matched touch targets. |
| **`ChipButton`** | `ChipButton.js` | Pill and rectangular tag/filter toggle button primitive. |
| **`useButtonTheme`** | `useButtonTheme.js` | Theme and style resolution hook for dark/light modes and variants. |
| **`ButtonStyles`** | `ButtonStyles.js` | Static design system styles and size token mappings. |
| **`index.js`** | `index.js` | Public API barrel export for the Button module. |

---

## 🔄 Primitive Standardization Roadmap

With **Button**, **Card**, **Modal**, and **Drawer** primitives standardized, the next goal is applying this standard to the **Search Module** (`src/components/Search/`):

- [x] **Button Module Standardization** (`src/components/Button/`)
- [x] **Card Module Encapsulation** (`src/components/Card/`)
- [x] **Modal & Dialog Standardization** (`src/components/Modal/`)
- [x] **Drawer Primitive Standardization** (`src/components/Drawer/`)
- [ ] **Search Module Architecture & Migration** (`src/components/Search/`)
