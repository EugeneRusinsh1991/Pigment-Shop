# 2. Detailed Design System Tokens & Theme Architecture Plan | `🔴 G 3.1 P (H) — 3d | 11f | +13r`

> ⚠️ **Action**: BREAK DOWN INTO SUBTASKS

Source Files: `src/theme/` (`tokens.js`, `appStyles.js`, `commonStyles.js`, `buttonCommon.js`, `iconStyles.js`, `useThemeUtils.js`)

---

## 🎯 Main Goal
Establish a unified design system foundation with standardized tokens, dark/light theme support, and centralized hooks:
1. **Design Tokens (`src/theme/tokens.js`)**: Colors, spatial scale (margins/padding), typography scale, border radii, shadows, z-index.
2. **Centralized Theme Utilities**: Theme hook integration and theme switching stability.
3. **Styles Consolidation**: Refactor shared theme files to consume tokens instead of raw pixel/hex values.

---

## 🛠️ Step-by-Step Task Breakdown

### Phase 1: Token Core Audit & Standardization (`src/theme/`) | `🟢 G 3.6 F (L) — 1d | 2f | +2r`
- [ ] **`src/theme/tokens.js`**:
  - [ ] Audit existing token scale (`spacing`, `colors`, `radius`, `typography`).
  - [ ] Ensure dark mode and light mode token palettes are fully symmetrical.
- [ ] **`src/theme/useThemeUtils.js`**:
  - [ ] Standardize theme resolution helper hooks.

### Phase 2: Common Theme Styles Alignment (`src/theme/`) | `🟡 G 3.6 F (M) — 1d | 4f | +4r`
- [ ] **`src/theme/appStyles.js`**:
  - [ ] Replace hardcoded pixel margins/paddings with spatial tokens.
- [ ] **`src/theme/commonStyles.js`**:
  - [ ] Extract raw border colors and radius values to token references.
- [ ] **`src/theme/buttonCommon.js`**:
  - [ ] Align common button dimensions with button design tokens.
- [ ] **`src/theme/iconStyles.js`**:
  - [ ] Standardize icon size tokens (`sm`, `md`, `lg`, `xl`).

### Phase 3: Component Token Integration (`src/components/`, `src/features/`) | `🟡 G 3.6 F (M) — 1d | 5f | +5r`
- [ ] Update core component styles to consume tokens from `src/theme/tokens.js`.
- [ ] Verify dark/light mode toggle behavior across header, footer, and navigation.

---

## 🔬 Quality Assurance & Verification | `🟢 G 3.6 F (L) — 1d | 0f | +2r`
- [ ] Run `npm run type-check` (Must pass without TypeScript errors).
- [ ] Run `npm run audit:ui` (Must verify no unmapped tokens remain).
- [ ] Perform manual theme toggle check on dev server (`http://localhost:8081`).
- [ ] Commit all changes with message: `fix(theme): unify design system tokens and theme architecture`.
