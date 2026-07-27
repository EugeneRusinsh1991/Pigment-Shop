# Codebase Structure Audit — Discussion Items

> Architecture standard defines three primary layers: **UI** (`src/components/`), **Services** (`src/services/`), and **Features** (`src/features/`).
> All 🔴 Critical and 🟠 Important issues have been moved to individual task files in this directory.
> Below are items requiring team discussion before action.

---

## 🟡 DISCUSSION REQUIRED: Domain Scoping

### 7. Domain Hooks in Global `src/hooks/`
**Rationale:** Domain-specific custom hooks should be co-located within their feature module rather than stored in global `src/hooks/`:
- `useCart.js`, `useCartViewForm.js` → `src/features/cart/`
- `useCatalogViewData.js` → `src/features/catalog/`
- `useLoginForm.js` → `src/features/auth/`
- `useFavorites.js` → `src/features/favorites/`
- `useOrders.js` → `src/features/orders/`
- `useProfile.js` → `src/features/profile/`
- `useCrudWorkflow.js` → `src/features/admin/`

**Keep in `src/hooks/` (Generic Utilities):**
- `useAnimatedTransition.js`, `useCardDimensions.js`, `useCarouselState.js`, `useDropdownAnimation.js`, `useGridLayout.js`, `useHoverAnimation.js`, `useSlideAnimation.js`, `useSort.js`, `useForm.js`

---

### 8. Feature Contexts in Global `src/context/`
**Rationale:** Feature-tied state containers should live in `src/features/<Feature>/`:
- `CartContext.js` → `src/features/cart/`
- `FavoritesContext.js` → `src/features/favorites/`
- `CatalogContext.js` → `src/features/catalog/`

**Keep in `src/context/` (Global App Contexts):**
- `ThemeContext.js`, `LanguageContext.js`, `AuthContext.js`, `ToastContext.js`, `AppProviders.js`

---

### 9. Isolated `src/domain/catalogEntityContract.ts`
**Rationale:** `src/domain/` contains a single file. It should be merged into `src/services/` alongside `serviceContract.js` or expanded into a complete domain layer.

```
src/domain/catalogEntityContract.ts    ← ⚠️ Single isolated file
src/services/catalogEntityContract.ts  ← ✅ Co-located with service contracts
```

---

### 10. `AdminIcons.js` inside UI Primitives
**Rationale:** `src/components/Icons/AdminIcons.js` contains icon definitions specific to the admin area. If used exclusively by admin, move to `src/features/admin/`.

---

## 🟡 DISCUSSION REQUIRED: Minor Token Coverage Gaps

### 16. `buttonCommon.js` — Color Re-Export Anti-Pattern
**Rationale:** `src/theme/buttonCommon.js` exports a `buttonColors` object that is simply a subset re-export of `colors` from `tokens.js`. This creates an extra indirection layer with no added logic. Consumers should import directly from `tokens.js`.

```js
// buttonCommon.js — current:
export const buttonColors = {
  secondaryLightBg: colors.secondaryLightBg, // ← just re-exporting tokens
  ...
}
```

**Fix:** Either remove `buttonColors` and have button components import from `tokens.js` directly, or consolidate button-specific tokens into a `buttonTokens` section in `tokens.js` (which already exists as `buttonTokens`).

---

### 17. `letterSpacing` Not Tokenized
**Rationale:** The `overline` variant in `TextStyles.js` uses `letterSpacing: 1` as a raw number. There is no `letterSpacing` scale in `tokens.js`.

**Fix:** Add `typography.letterSpacing` scale (e.g. `tight: -0.5`, `normal: 0`, `wide: 0.5`, `widest: 1`) to `tokens.js`.

---

### 26. `borderWidth: 1` — Token Exists but Is Ignored (50+ usages)
**Rationale:** `layout.borderWidth.thin: 1` is already defined in `tokens.js`. However, the raw integer `1` is used directly in 50+ style files instead of referencing the token.

**Fix:** Replace `borderWidth: 1` with `borderWidth: layout.borderWidth.thin` across all style files.

---

### 27. `badgeFontSizes` — Local Size Dictionary Outside Token System
**Rationale:** `Badge.js` defines a local `badgeFontSizes` object with raw pixel values (`sm: 10`, `md: 11`, `lg: 12`, `counter: 10`). These partially overlap with `typography.sizes` but are maintained separately.

```js
// Badge.js — current:
const badgeFontSizes = { sm: 10, small: 10, md: 11, medium: 11, lg: 12, large: 12, counter: 10 };
// ❌ Raw values, not referenced from typography.sizes
```

**Fix:** Map badge sizes to `typography.sizes` tokens, or move the size map into `badgeTokens` section in `tokens.js`.

---

## Summary Matrix — Discussion Items Only

| # | Item | Current Location | Recommended Location |
|---|---|---|---|
| 7 | Domain Hooks (7 files) | `src/hooks/` | `src/features/<Feature>/` |
| 8 | Feature Contexts (3 files) | `src/context/` | `src/features/<Feature>/` |
| 9 | `catalogEntityContract.ts` | `src/domain/` | `src/services/` |
| 10 | `AdminIcons.js` | `src/components/Icons/` | `src/features/admin/` |
| 16 | `buttonColors` re-export | `buttonCommon.js` | Import from `tokens.js` directly |
| 17 | `letterSpacing: 1` hardcoded | `TextStyles.js` | `typography.letterSpacing` scale |
| 26 | `borderWidth: 1` raw (50+ usages) | Throughout styles | Use `layout.borderWidth.thin` |
| 27 | `badgeFontSizes` local dict | `Badge.js` | Map to `typography.sizes` tokens |
