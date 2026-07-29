# 1. Detailed UI Architecture Violations & Component Refactoring Plan | `🔴 G 3.1 P (H) — 3d | 13f | +15r`

> ⚠️ **Action**: BREAK DOWN INTO SUBTASKS

Source Audits:
- `.docs/audits/dynamic-audits/docs/01-dynamic-ui-architecture-public-smoke-violations.log`
- `.docs/audits/dynamic-audits/docs/01-dynamic-ui-architecture-admin-smoke-violations.log`

---

## 🎯 Main Goal
Ensure 100% component architecture compliance across all UI components and features:
1. **Three-part component structure**:
   - `Component.js` (UI render logic only)
   - `ComponentStyles.js` (Component-specific style sheet)
   - `useComponentTheme.js` (Component theme hook)
2. **Eliminate inline style literals**: Extract all hardcoded margins, padding, gap, and colors to spatial tokens and styles.
3. **Export consistency**: Ensure named and default exports for components, styles, and hooks.

---

## 🛠️ Step-by-Step Task Breakdown

### Phase 1: Core Components (`src/components/`) | `🟡 G 3.6 F (M) — 1d | 4f | +4r`
- [ ] **Button** (`src/components/Button/`):
  - [x] Verify `Button.js`, `ButtonStyles.js`, `useButtonTheme.js`.
  - [ ] Clean up remaining inline styles or hardcoded tokens in `Button.js`.
- [ ] **Search** (`src/components/Search/`):
  - [x] Fix `useSearchTheme.js` export & return signature.
  - [ ] Verify `SearchInput.js` uses `SearchStyles.js`.
- [ ] **Motion** (`src/components/Motion/`):
  - [x] Verify `MotionStyles.js` and `useMotionTheme.js`.
- [ ] **Text** (`src/components/Text/`):
  - [x] Ensure `TextStyles.js` imported and used in `Text.js`.

### Phase 2: Feature Shell Components (`src/features/shell/`) | `🟡 G 3.6 F (M) — 1d | 5f | +5r`
- [ ] **AppHeader** (`src/features/shell/AppHeader/`):
  - [ ] Extract hardcoded inline padding/gap to `AppHeaderStyles.js`.
  - [ ] Refactor `UserDropdown.js` to consume explicit `UserDropdownStyles.js`.
- [ ] **NavMenu** (`src/features/shell/NavMenu/`):
  - [ ] Refactor `LanguageSelector.js` style structure to use `NavMenuStyles.js` or dedicated `LanguageSelectorStyles.js`.
- [ ] **Footer** (`src/features/shell/components/Footer.js`):
  - [ ] Create `FooterStyles.js` and `useFooterTheme.js` if missing.

### Phase 3: Domain Feature Pages (`src/features/`) | `🟡 G 3.6 F (M) — 1d | 4f | +4r`
- [ ] **Product Feature** (`src/features/product/`):
  - [ ] Audit `ProductPageStyles.js` and `ProductReviewsStyles.js`.
  - [ ] Extract inline styles in `ProductCard.js` / `ProductDetails.js`.
- [ ] **Profile Feature** (`src/features/profile/`):
  - [ ] Audit `ProfilePageStyles.js` and extract hardcoded layout dimensions.

---

## 🔬 Quality Assurance & Verification | `🟢 G 3.6 F (L) — 1d | 0f | +2r`
- [ ] Run `npm run type-check` (Must pass without TypeScript errors).
- [ ] Run `npm run audit:ui` (Must show zero architecture violations).
- [ ] Test UI manually on dev server (`http://localhost:8081`).
- [ ] Commit all changes with message: `fix(ui): complete UI component architecture refactoring`.
