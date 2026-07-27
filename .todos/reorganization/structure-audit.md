# Codebase Structure Audit & Reorganization Plan

> Architecture standard defines three primary layers: **UI** (`src/components/`), **Services** (`src/services/`), and **Features** (`src/features/`).
> Below is an audit of files and directories that logically belong elsewhere.

---

## 🔴 CRITICAL: Layer Boundary Violations

### 1. `src/components/PageScrollLayout` → Move to `src/features/shell/`
**Rationale:** `PageScrollLayout` is not a primitive reusable UI component. It tightly couples with `<Footer />` from `src/features/shell/components/Footer`. As a page-level layout tied to shell features, its proper domain is `src/features/shell/`.

```
src/components/PageScrollLayout/     ← ❌ Current
src/features/shell/PageScrollLayout/ ← ✅ Target
```

---

### 2. `src/components/SharedLayoutWrapper` → Move to `src/features/shell/`
**Rationale:** `SharedLayoutWrapper` renders `<Footer />` from `src/features/shell/components/Footer` and manages footer region layout. It is a shell layout wrapper rather than a presentational UI primitive.

> [!NOTE]
> `src/components/SharedLayoutWrapper.js` exists alongside the directory, causing file-level redundancy.

```
src/components/SharedLayoutWrapper/     ← ❌ Current
src/features/shell/SharedLayoutWrapper/ ← ✅ Target
```

---

### 3. `src/components/useThemeUtils.js` → Move to `src/theme/`
**Rationale:** `useThemeUtils.js` provides theme helper functions (`getIsDarkContext`, `getStyle`). It is not a UI component and belongs alongside `tokens.js` and `commonStyles.js`.

```
src/components/useThemeUtils.js ← ❌ Current
src/theme/useThemeUtils.js      ← ✅ Target
```

---

## 🟠 IMPORTANT: Misplaced Files

### 4. `src/AppStyles.js` → Move to `src/theme/`
**Rationale:** `AppStyles.js` defines global theme styles (`heroContainer`, `breadcrumbBar`, `stickySearchContainer`) and imports design tokens. It should reside in `src/theme/` rather than floating at the `src/` root.

```
src/AppStyles.js         ← ❌ Current
src/theme/appStyles.js   ← ✅ Target
```

---

### 5. `src/utils/locationContext.js` → Move to `.tools/browser-automation/`
**Rationale:** `locationContext.js` contains test automation visual overlay helpers (`getLocationHierarchy`, `getOverlayText`, `getTimestamp`). It is tooling logic and should not be included in runtime `src/utils/`.

```
src/utils/locationContext.js                        ← ❌ Current
.tools/browser-automation/utils/locationContext.js  ← ✅ Target
```

---

### 6. `src/utils/layout.js` → Rename & Clarify Responsibility
**Rationale:** Contains layout grid metrics (`SIDEBAR_WIDTH`, `CARD_MARGIN`, `getDeviceTier`). The generic name `layout.js` overlaps with design tokens.

```
src/utils/layout.js      ← ⚠️ Overly generic name
src/utils/layoutUtils.js ← ✅ Renamed for clarity
```

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

---

## 🔴 CRITICAL: Typography & Text Inconsistencies

### 11. `variant="body"` — Non-Existent Variant Used Across the Codebase

**Rationale:** The `Text` component's `VARIANTS` map in `TextStyles.js` defines `body1` and `body2`, but **not** `body`. However, `variant="body"` is used in ~25+ places. Since `getTextStyle` falls back to `body1` on unknown variant, this works silently — but it is semantically wrong and masks intent.

**Affected files (sample):**
- `src/features/orders/OrderRows.js`
- `src/features/cart/CartItem.js`, `CartViewContent.js`, `CartSummary.js`
- `src/features/auth/LoginPageComponents.js`
- `src/features/home/components/DiscountsSection.js`
- `src/components/Search/SearchDropdown.js`
- `src/components/Navigation/Pagination/PageNavigation.js`
- `src/components/Feedback/EmptyState/EmptyState.js`
- `src/features/contact/ContactQuestionForm.js`

```
variant="body"   ← ❌ Not in VARIANTS map, silently falls back to body1
variant="body1"  ← ✅ Explicit and correct
variant="body2"  ← ✅ Explicit and correct
```

> [!WARNING]
> `weight="heavy"` is also used in several places (`CartSummary.js`, `CartItem.js`) but is not defined in `typography.weights` — the defined values are `regular`, `medium`, `semibold`, `bold`.

---

### 12. Hardcoded `lineHeight` Values in Typography Variants

**Rationale:** In `TextStyles.js`, all `VARIANTS` use tokenized `fontSize` (via `typography.sizes`) but hardcode `lineHeight` as raw integers. There is no `lineHeight` scale in `tokens.js`, creating a split contract: sizes are tokenized, leading is not.

```js
// TextStyles.js — current state:
h1: { fontSize: typography.sizes.xxl, lineHeight: 34, ... } // ❌ lineHeight hardcoded
h2: { fontSize: typography.sizes.xl,  lineHeight: 30, ... } // ❌
body1: { fontSize: typography.sizes.md, lineHeight: 24, ... } // ❌
```

**Fix:** Add a `lineHeights` map to `typography` in `tokens.js` and reference it in `TextStyles.js`.

---

### 13. `textTransform: 'uppercase'` — Scattered Raw Values, Not Using `overline` Variant

**Rationale:** The `overline` typography variant in `TextStyles.js` is the canonical token for uppercase label text. Yet `textTransform: 'uppercase'` appears as an inline raw style in **9+ files**, bypassing the token system entirely.

**Affected files:**
- `src/features/shell/NavMenu/NavMenuStyles.js` (L73)
- `src/features/product/ProductCardStyles.js` (L41)
- `src/features/admin/Users/UsersStyles.js` (L139)
- `src/features/admin/Orders/OrdersStyles.js` (L110, L114, L220)
- `src/features/admin/Products/ProductsStyles.js` (L89, L159)
- `src/features/admin/Categories/CategoryFormStyles.js` (L95)
- `src/features/admin/Categories/CategoriesStyles.js` (L152)
- `src/components/DataTable/DataTableStyles.js` (L23, L100)

**Fix:** Replace inline `textTransform: 'uppercase'` + manual `fontSize`/`letterSpacing` combos with `<Text variant="overline">` where the semantic matches.

---

## 🟠 IMPORTANT: Token Gaps & Naming Inconsistencies

### 14. `maxWidth: 1330` — Magic Number, Not a Token

**Rationale:** The content max-width constraint `1330` appears hardcoded in 4 separate files with no named token. Any layout-width change requires hunting down every instance manually.

**Affected files:**
- `src/theme/commonStyles.js` (L8, L24)
- `src/features/catalog/CatalogPage.js` (L193)
- `src/components/Navigation/NavigationStyles.js` (L44)

**Fix:** Add `layout.maxContentWidth: 1330` to `tokens.js` and replace all raw occurrences.

---

### 15. Duplicate Breakpoint Tokens: `sm`, `mobile`, `tablet` Collision

**Rationale:** In `tokens.js`, `layout.breakpoints` defines both `sm: 640` and `mobile: 768` / `tablet: 768`. This means:
- `sm` is unused in breakpoint logic (only `mobile`/`tablet`/`desktop` are used in `getDeviceTier`)
- `mobile` and `tablet` are **identical** values (`768`) — they are the same breakpoint with two names

```js
breakpoints: {
  sm: 640,      // ⚠️ Unused in actual breakpoint logic
  mobile: 768,  // ❌ Identical to tablet
  tablet: 768,  // ❌ Identical to mobile
  desktop: 1024,
}
```

**Fix:** Either differentiate `mobile` and `tablet` or merge them into a single canonical token. Remove or use `sm`.

---

### 16. `buttonCommon.js` — Color Re-Export Anti-Pattern

**Rationale:** `src/theme/buttonCommon.js` exports a `buttonColors` object that is simply a subset re-export of `colors` from `tokens.js` (e.g. `secondaryLightBg: colors.secondaryLightBg`). This creates an extra indirection layer with no added logic. Consumers should import directly from `tokens.js`.

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

**Rationale:** The `overline` variant in `TextStyles.js` uses `letterSpacing: 1` as a raw number. There is no `letterSpacing` scale in `tokens.js`. If any other component ever needs tracked text, it will hardcode a value independently.

**Fix:** Add `typography.letterSpacing` scale (e.g. `tight: -0.5`, `normal: 0`, `wide: 0.5`, `widest: 1`) to `tokens.js`.

---

### 18. `shadows.js` — Parallel File to `tokens.js` Shadows Section

**Rationale:** `src/theme/shadows.js` exists as a standalone file, but `tokens.js` already exports a `shadows` object (lines 317–373) with the full shadow scale. Having two shadow sources creates confusion about which is authoritative.

**Affected:** `src/theme/shadows.js` vs `tokens.js export const shadows`

**Fix:** Confirm which is the canonical source, delete the other, update all imports.

---

## Summary Matrix

| # | Item | Current Location | Recommended Location | Priority |
|---|---|---|---|---|
| 1 | `PageScrollLayout/` | `src/components/` | `src/features/shell/` | 🔴 Critical |
| 2 | `SharedLayoutWrapper/` | `src/components/` | `src/features/shell/` | 🔴 Critical |
| 3 | `useThemeUtils.js` | `src/components/` | `src/theme/` | 🔴 Critical |
| 4 | `AppStyles.js` | `src/` | `src/theme/` | 🟠 Important |
| 5 | `locationContext.js` | `src/utils/` | `.tools/browser-automation/utils/` | 🟠 Important |
| 6 | `layout.js` | `src/utils/` | `src/utils/layoutUtils.js` | 🟡 Discussion |
| 7 | Domain Hooks (7 files) | `src/hooks/` | `src/features/<Feature>/` | 🟡 Discussion |
| 8 | Feature Contexts (3 files) | `src/context/` | `src/features/<Feature>/` | 🟡 Discussion |
| 9 | `catalogEntityContract.ts` | `src/domain/` | `src/services/` | 🟡 Discussion |
| 10 | `AdminIcons.js` | `src/components/Icons/` | `src/features/admin/` | 🟡 Discussion |
| 11 | `variant="body"` (~25 usages) | Throughout codebase | Use `body1` or `body2` | 🔴 Critical |
| 12 | Hardcoded `lineHeight` in variants | `TextStyles.js` | `typography.lineHeights` token | 🟠 Important |
| 13 | `textTransform: 'uppercase'` (9+ files) | Feature/component styles | `variant="overline"` | 🟠 Important |
| 14 | `maxWidth: 1330` (4 files) | Hardcoded | `layout.maxContentWidth` token | 🟠 Important |
| 15 | `sm`/`mobile`/`tablet` breakpoints | `tokens.js` | Deduplicate/clarify | 🟠 Important |
| 16 | `buttonColors` re-export | `buttonCommon.js` | Import from `tokens.js` directly | 🟡 Discussion |
| 17 | `letterSpacing: 1` hardcoded | `TextStyles.js` | `typography.letterSpacing` scale | 🟡 Discussion |
| 18 | Dual shadow sources | `shadows.js` + `tokens.js` | Consolidate to one source | 🟠 Important |
