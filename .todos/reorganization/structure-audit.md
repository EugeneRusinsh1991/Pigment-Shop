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

## 🔴 CRITICAL: Additional Non-Existent Text Variants

### 19. `variant="label"` — Non-Existent Variant (~10 usages)

**Rationale:** Same silent-fallback issue as `variant="body"` (#11). The `VARIANTS` map in `TextStyles.js` does not define `"label"`. All usages fall back silently to `body1`.

**Affected files:**
- `src/components/TextField/TextField.js` (L28) — used for all field labels
- `src/features/cart/CartSummary.js` (L33, L84)
- `src/features/profile/ProfileFormCard.js` (L11)
- `src/features/orders/OrderDetailsCard.js` (L13, L16, L19, L22)
- `src/features/auth/LoginPageComponents.js` (L113)
- `src/features/auth/LoginPage.js` (L94)

```
variant="label"   ← ❌ Not in VARIANTS, silently falls back to body1
variant="caption" ← ✅ Closest semantic equivalent (xs, regular)
```

---

### 20. `variant="title"` — Non-Existent Variant (2 usages)

**Rationale:** `"title"` is not defined in `VARIANTS`. Falls back to `body1`, which is completely wrong visually for a title-level element.

**Affected files:**
- `src/features/orders/OrderHeader.js` (L11)
- `src/features/cart/CartSummary.js` (L87)

```
variant="title" ← ❌ Not in VARIANTS, falls back to body1
variant="h3"    ← ✅ or variant="h4" depending on context
```

---

## 🔴 CRITICAL: Typography Weight Inconsistencies

### 21. `weight="semiBold"` — camelCase Mismatch with Token Key (~6 usages)

**Rationale:** `typography.weights` defines `semibold` (all-lowercase). The `getTextStyle` function passes the weight prop directly as `fontWeight`, bypassing the token map entirely. Passing `"semiBold"` is a raw string not recognised by React Native's font weight system (which expects `"600"`), so the weight may be silently ignored or produce unexpected results.

**Affected files:**
- `src/components/Button/Button.js` (L50)
- `src/components/Badge/Badge.js` (L31)
- `src/components/Card/NavigationCard.js` (L22)
- `src/features/admin/Orders/OrderCustomerCard.js` (L29)
- `src/features/admin/Banners/BannersManager.js` (L99, L109)

```
weight="semiBold" ← ❌ camelCase, not a valid token key or RN fontWeight value
weight="semibold" ← ✅ matches typography.weights.semibold → '600'
```

---

## 🟠 IMPORTANT: Additional Token Gaps

### 22. `weight="heavy"` — Undefined Typography Weight (3 usages)

**Rationale:** `typography.weights` defines `regular`, `medium`, `semibold`, `bold`. `"heavy"` does not exist. Mentioned in the `[!WARNING]` note under #11 but not formally tracked as its own item.

**Affected files:**
- `src/features/cart/CartItem.js` (L68)
- `src/features/cart/CartSummary.js` (L36)
- `src/features/orders/OrderHeader.js` (L11)

**Fix:** Replace with `weight="bold"` or add `heavy: '800'` to `typography.weights` in `tokens.js` if a distinct extra-bold step is needed.

---

### 23. `color="info"` — Missing Color Preset in Text Component (2 usages)

**Rationale:** `colorPresetMap` in `TextStyles.js` does not contain an `"info"` key. The resolver falls back to `"primary"` (dark text on light / white on dark), which is semantically incorrect for an informational state that should resolve to `colors.infoStrong` / `colors.infoLight`.

**Affected files:**
- `src/features/cart/CartItem.js` (L68) — `color={isDark ? 'info' : 'primary'}`
- `src/features/orders/OrderHeader.js` (L11) — `color={isDark ? 'info' : 'success'}`

**Fix:** Add `info: (isDark) => isDark ? colors.infoLight : colors.infoDeep` to `colorPresetMap`.

---

### 24. `activeOpacity` — No Motion Token, Scattered Raw Values (20+ usages)

**Rationale:** `buttonCommon.js` defines `DEFAULT_ACTIVE_OPACITY = 0.8` as a module-level constant, not a design token. Over 20 files bypass this constant and hardcode different raw values (`0.7`, `0.75`, `0.85`, `0.9`), making press feedback inconsistent across the UI.

**Sample affected files:**
- `src/components/Toggle/Toggle.js` — `0.7`
- `src/components/Card/Card.js` — `0.85`
- `src/components/Badge/Badge.js` — `0.75`
- `src/features/shell/NavMenu/NavItemList.js`, `MainMenuContent.js`, `CategoryTreeNodeButtons.js` — `0.7`
- `src/features/admin/Users/UserRow.js` — `0.7`
- `src/features/admin/Categories/CategoryRow.js` — `0.85`
- `src/features/admin/Banners/BannersManager.js` — `0.8`, `0.85`

**Fix:** Add `motion.press.activeOpacity: 0.8` to `tokens.js` and replace all raw values with the token. Remove `DEFAULT_ACTIVE_OPACITY` from `buttonCommon.js`.

---

### 25. `motion.press.scale: 1.1` — Inverted Press Animation Direction

**Rationale:** The press scale token in `tokens.js` is set to `1.1`, meaning interactive elements *grow* when pressed. The standard UX convention for press feedback is a subtle *shrink* (scale < 1.0, typically `0.97`–`0.98`). Growing on press feels unnatural and is inconsistent with platform conventions. Used in `Button.js` as the default `scaleTo`.

```js
// tokens.js — current:
motion.press.scale: 1.1  // ❌ Grows on press — unconventional

// Expected:
motion.press.scale: 0.97 // ✅ Shrinks on press — standard feel
```

---

## 🟡 DISCUSSION REQUIRED: Minor Token Coverage Gaps

### 26. `borderWidth: 1` — Token Exists but Is Ignored (50+ usages)

**Rationale:** `layout.borderWidth.thin: 1` is already defined in `tokens.js`. However, the raw integer `1` is used directly in 50+ style files instead of referencing the token. This is a lower-priority consistency issue since the value is unlikely to change, but it breaks the single-source principle.

**Fix:** Replace `borderWidth: 1` with `borderWidth: layout.borderWidth.thin` across all style files.

---

### 27. `badgeFontSizes` — Local Size Dictionary Outside Token System

**Rationale:** `Badge.js` defines a local `badgeFontSizes` object with raw pixel values (`sm: 10`, `md: 11`, `lg: 12`, `counter: 10`). These partially overlap with `typography.sizes` (`xxs: 10`, `xs: 12`) but are maintained separately, creating a divergence point if the type scale changes.

```js
// Badge.js — current:
const badgeFontSizes = { sm: 10, small: 10, md: 11, medium: 11, lg: 12, large: 12, counter: 10 };
// ❌ Raw values, not referenced from typography.sizes
```

**Fix:** Map badge sizes to `typography.sizes` tokens, or move the size map into `buttonTokens`/`badgeTokens` section in `tokens.js`.

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
| 19 | `variant="label"` (~10 usages) | Throughout codebase | Use `caption` or `body2` | 🔴 Critical |
| 20 | `variant="title"` (2 usages) | `OrderHeader.js`, `CartSummary.js` | Use `h3` or `h4` | 🔴 Critical |
| 21 | `weight="semiBold"` camelCase (6 usages) | Components & features | Use `semibold` (lowercase) | 🔴 Critical |
| 22 | `weight="heavy"` (3 usages) | `CartItem.js`, `CartSummary.js`, `OrderHeader.js` | Use `bold` or define token | 🟠 Important |
| 23 | `color="info"` missing preset (2 usages) | `CartItem.js`, `OrderHeader.js` | Add `info` to `colorPresetMap` | 🟠 Important |
| 24 | `activeOpacity` raw values (20+ usages) | Throughout codebase | Add `motion.press.activeOpacity` token | 🟠 Important |
| 25 | `motion.press.scale: 1.1` inverted | `tokens.js` | Change to `0.97` (shrink on press) | 🟠 Important |
| 26 | `borderWidth: 1` raw number (50+ usages) | Throughout styles | Use `layout.borderWidth.thin` | 🟡 Discussion |
| 27 | `badgeFontSizes` local dict in Badge | `Badge.js` | Map to `typography.sizes` tokens | 🟡 Discussion |
