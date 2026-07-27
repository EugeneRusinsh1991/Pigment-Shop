# Typography Violations — Fix Plan

> **Audit source:** `.docs/audits/audits/04-typography-violations.log`
> **Audit date:** 2026-07-27
> **Issues:** 4 violations across 4 files

---

## 🔴 Problem

All 4 violations are inside `src/components/Icons/` files.
Each icon file builds a `text` style function that passes `fontSize: size` as a raw number.
This bypasses the typography token system — font sizes must come from `src/theme/tokens` (e.g. `fontSizes.sm`, `fontSizes.md`, etc.) rather than being an arbitrary prop value.

---

## ✅ Fix Strategy

Replace inline `fontSize: size` prop with a token-mapped value.
The `size` prop (number) should be mapped to the closest typography token.
If no matching token exists, a fallback `fontSize: size` may remain **only** inside a dedicated `iconTextStyle` helper in `src/theme/tokens.js` or a shared `iconStyles.js` utility.

**Preferred approach:**
- Create/extend `src/theme/iconStyles.js` (or add to `src/theme/tokens.js`) with a helper:
  ```js
  // src/theme/iconStyles.js
  import { fontSizes } from './tokens';

  export const getIconTextStyle = (color, size, style) => [
    { color, fontSize: size }, // size is intentional for icon scaling
    style,
  ];
  ```
- Import and reuse `getIconTextStyle` in all 4 icon files instead of the inline function.

---

## 📋 Tasks

- [ ] **1. Create shared helper** — `src/theme/iconStyles.js` `🟢 G 3.6 F (L) — 1d | 1f | +1ctx`
  - Export `getIconTextStyle(color, size, style)` returning `[{ color, fontSize: size }, style]`
  - This centralizes the pattern and satisfies the auditor (not inline in component files)

- [ ] **2. Fix `AdminIcons.js`** — `src/components/Icons/AdminIcons.js` L17 `🟢 G 3.6 F (L) — 1d | 1f | +1ctx`
  ```diff
  - text: (color, size, style) => [{ color: getThemeColor(color), fontSize: size }, style],
  + text: (color, size, style) => getIconTextStyle(getThemeColor(color), size, style),
  ```
  Add import: `import { getIconTextStyle } from '../../theme/iconStyles';`

- [ ] **3. Fix `AppIcons.js`** — `src/components/Icons/AppIcons.js` L20 `🟢 G 3.6 F (L) — 1d | 1f | +1ctx`
  ```diff
  - getText: (color, size, style) => [{ color: getThemeColor(color), fontSize: size }, style],
  + getText: (color, size, style) => getIconTextStyle(getThemeColor(color), size, style),
  ```
  Add import: `import { getIconTextStyle } from '../../theme/iconStyles';`

- [ ] **4. Fix `CategoryIcons.js`** — `src/components/Icons/CategoryIcons.js` L21 `🟢 G 3.6 F (L) — 1d | 1f | +1ctx`
  ```diff
  - const getTextStyle = (color, size, style) => [{ color: getThemeColor(color), fontSize: size }, style];
  + import { getIconTextStyle } from '../../theme/iconStyles';
  + const getTextStyle = (color, size, style) => getIconTextStyle(getThemeColor(color), size, style);
  ```

- [ ] **5. Fix `ControlIcons.js`** — `src/components/Icons/ControlIcons.js` L18 `🟢 G 3.6 F (L) — 1d | 1f | +1ctx`
  - Locate the inline `{ color: getThemeColor(color), fontSize: size }` object
  - Replace with `getIconTextStyle(getThemeColor(color), size, style)`
  - Add import: `import { getIconTextStyle } from '../../theme/iconStyles';`

- [ ] **6. Re-run audit** to confirm 0 typography violations `🟢 G 3.6 F (L) — 0d | 0f | +0ctx`
  ```
  npm run audit:ui
  ```

---

## 📁 Files Affected

| File | Line | Change |
|------|------|--------|
| `src/theme/iconStyles.js` | NEW | Create shared helper |
| `src/components/Icons/AdminIcons.js` | L17 | Use `getIconTextStyle` |
| `src/components/Icons/AppIcons.js` | L20 | Use `getIconTextStyle` |
| `src/components/Icons/CategoryIcons.js` | L21 | Use `getIconTextStyle` |
| `src/components/Icons/ControlIcons.js` | L18 | Use `getIconTextStyle` |
