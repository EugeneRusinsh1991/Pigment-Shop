# Catalog UX Improvement Research — Refine Existing Implementation

## 1. Objective

Improve the **Catalog (Categories)** section across **Mobile, Tablet, and Desktop** without changing its architecture. The accordion tree, `CategoryTree → DataTable → CategoryRow` pipeline, modal-based editing, and all existing components remain intact. Every recommendation targets readability, spacing, typography, touch targets, visual hierarchy, and cross-breakpoint consistency — delivering maximum UX improvement within the existing structure.

---

## 2. Current Implementation Reference

### File Map

| File | Role |
|---|---|
| `CategoriesManager.js` | State container: category tree, search, modal open/close |
| `CategoryTree.js` | Tree table: `collapsed` Set, `flattenVisible()`, Expand/Collapse All toolbar, `DataTable` render delegates |
| `CategoryRow.js` | `DesktopCategoryRow` + `MobileCategoryCard` — both use `useCategoryRowData()` hook |
| `CategoryRowElements.js` | `DepthBars`, `ToggleButton`, `ImageBadge`, `getCategoryMeta`, `resolveCategoryName`. Exports `INDENT_PER_LEVEL = 20` |
| `CategoriesStyles.js` | `CATEGORY_TYPE_COLORS`, all tree row styles, mobile card styles |

### Rendering Pipeline

```
CategoryTree
  └─ DataTable
       ├─ renderRow       → DesktopCategoryRow
       └─ renderMobileRow → MobileCategoryCard
            ├─ DepthBars         (absolute-positioned, INDENT_PER_LEVEL = 20)
            ├─ ToggleButton      (chevron IconButton — nested inside outer AnimatedButton)
            └─ mobileContentCol
                 ├─ mobileRowMain  →  Text (name, numberOfLines=1) + Badge (xs)
                 └─ mobileRowSub   →  ImageBadge
```

---

## 3. Diagnosed Issues by Breakpoint

### Mobile (< 768px)

| # | Issue | Root Cause |
|---|---|---|
| M1 | Name truncation at depth 2–3 | `paddingLeft: depth * 20` + DepthBars (~40px) + ToggleButton (20px) + Badge leaves < 120px for name |
| M2 | Accidental modal opens | Entire `MobileCategoryCard` is one `AnimatedButton(onPress=onEdit)`. Inner `ToggleButton` press bubbles to outer tap zone |
| M3 | Verbose badge text overflows | `"Subcategories: 4"` on `size="xs"` collapses name to `"..."` |
| M4 | Toolbar wraps to second line | `flexWrap: wrap` with 3 controls on ~360px screen |
| M5 | DepthBars redundant visual noise | 3 stacked 2px absolute bars at depth 3 consume left rail unnecessarily on narrow screens |

### Tablet (768px – 1024px)

| # | Issue | Root Cause |
|---|---|---|
| T1 | Desktop row renders at tablet widths | No mid-breakpoint styles; tablet gets same `DesktopCategoryRow` as wide desktop |
| T2 | `colName: flex 2` / `colImage: flex 0.8` proportions feel unbalanced at ~800px | Column ratios not tuned for mid-range widths |

### Desktop (> 1024px)

| # | Issue | Root Cause |
|---|---|---|
| D1 | `ToggleButton` (20×20) is a small tap target | Fixed 20px width/height in `CategoriesStyles.js` |
| D2 | Depth background tints (`treeRowDepth1`, `treeRowDepth2`) defined but not applied | Styles exist in `CategoriesStyles.js` but `DesktopCategoryRow` does not reference them |
| D3 | Row padding tight at `paddingVertical: spacing.sm` | Rows feel dense at 3+ depth levels when names stack with badges |
| D4 | `colImage` column wastes space on rows with no image set | `ImageBadge` renders a "None" state but the column still reserves `flex: 0.8` |

---

## 4. UX Principles (Applied Across All Breakpoints)

1. **Tap Zone Isolation** — Expand/collapse and Edit must be independently pressable areas. Never nest a pressable inside another pressable's primary action zone without `stopPropagation`-equivalent handling.
2. **Progressive Badge Brevity** — Desktop: full label (`"Subcategories: 4"`). Tablet: shortened (`"Subs: 4"`). Mobile: count only (`"4"`). Same data, scaled presentation.
3. **Consistent Visual Language** — Type colors (purple = category_holder, green = product_holder), badge variants, and font sizes must be identical across `DesktopCategoryRow` and `MobileCategoryCard`. No exclusive-to-mobile or exclusive-to-desktop divergence in the design language.
4. **Depth Legibility** — Tree depth should be communicated primarily through indentation. `DepthBars` are supplementary and should not dominate the left rail. On mobile they can be simplified or reduced.
5. **Touch Minimum** — All interactive elements must meet a 44×44pt minimum touch target on mobile and tablet. On desktop, 32×32px is acceptable.
6. **Density Calibration** — Row height should feel breathable on desktop (≥ 40px effective row height) and compact-but-readable on mobile (≥ 36px effective row height).

---

## 5. Recommended Improvements

### 5.1 Fix Tap Zone Isolation — `MobileCategoryCard` (M2)

**File**: `CategoryRow.js`

Replace the outer `AnimatedButton` wrapping the entire `MobileCategoryCard` with a `View`. Split the card into two independently pressable zones:

```
[ ToggleZone | ContentZone ]
  44px wide    flex: 1, TouchableOpacity → onEdit(row)
  onPress → onToggle
```

- Left zone: `View` with `minWidth: 44`, `minHeight: 44`, centered `ToggleButton`.
- Right zone: `TouchableOpacity` (or `AnimatedButton`) covering `mobileContentCol` → `onEdit`.
- This also applies on tablet where the same `renderMobileRow` is used.

---

### 5.2 Reduce Mobile Badge Verbosity — `CategoryRow.js` (M3)

**File**: `CategoryRow.js`

`badgeLabel` construction should be breakpoint-aware:

- Mobile: `countLabel` only (e.g. `"4"`).
- Tablet/Desktop: `"${typePrefix}: ${countLabel}"` (current full string).

Since `MobileCategoryCard` and `DesktopCategoryRow` are already separate components, this is a one-line change per component: pass a short label to `Badge` in `MobileCategoryCard`.

---

### 5.3 Reduce Mobile Indent & Simplify DepthBars (M1, M5)

**File**: `CategoryRowElements.js`, `CategoryRow.js`

- Export `MOBILE_INDENT_PER_LEVEL = 12` (vs. current `INDENT_PER_LEVEL = 20`).
- Use `MOBILE_INDENT_PER_LEVEL` inside `MobileCategoryCard` only.
- Suppress `<DepthBars />` rendering inside `MobileCategoryCard`. The indentation alone communicates depth on narrow screens. `DepthBars` remain on `DesktopCategoryRow`.

---

### 5.4 Compress Toolbar on Mobile (M4)

**File**: `CategoryTree.js`, `CategoriesStyles.js`

- On mobile, move the "Expand All" / "Collapse All" `ChipButton`s into an overflow icon menu (e.g. a single `•••` `IconButton` that opens a small dropdown) OR collapse them into a single toggle chip: `"Expand All" ↔ "Collapse All"` (toggle state based on whether any nodes are currently collapsed).
- Keeps the toolbar to a single row on all breakpoints.
- The "Add Category" primary `Button` always stays visible.

---

### 5.5 Apply Depth Background Tints on Desktop (D2)

**File**: `CategoryRow.js` (`DesktopCategoryRow`)

`treeRowDepth1` and `treeRowDepth2` are defined in `CategoriesStyles.js` but never applied. Apply them conditionally:

```js
safeDepth === 1 && styles.treeRowDepth1,
safeDepth >= 2 && styles.treeRowDepth2,
```

This immediately improves tree hierarchy legibility on desktop without any style changes.

---

### 5.6 Increase Desktop Toggle Hit Target (D1)

**File**: `CategoriesStyles.js`

Change `toggleBtn` from `20×20` to `32×32`:

```js
toggleBtn: {
  width: 32,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
},
```

No layout impact — the toggle sits in the `nameCell` flex row and the extra 12px is absorbed by the row's existing height.

---

### 5.7 Increase Desktop Row Padding (D3)

**File**: `CategoriesStyles.js`

Change `treeRow.paddingVertical` from `layout.spacing.sm` to `layout.spacing.md`. This gives each row ~8px more vertical breathing room and makes multi-badge rows (name + type badge) more readable at a glance.

---

### 5.8 Unify Typography Across Both Row Types

**Files**: `CategoryRow.js`, `CategoriesStyles.js`

Confirm the following tokens are identical in both `DesktopCategoryRow` and `MobileCategoryCard`:

| Token | Value | Applies to |
|---|---|---|
| Category name font size | `size={14}` | Both — currently `size={12}` used for depth > 0 on desktop |
| Category name weight | `weight="bold"` | Both |
| Category name color | `colors.textLight` | Both |
| Badge size | `"xs"` (mobile) / `"sm"` (desktop) | Separate per component |
| Type badge variant | `"status"` | Both |

**Action**: Standardize desktop name size to `size={14}` at all depths. The current `size={safeDepth > 0 ? 12 : undefined}` causes a visual jump between root and child rows that undermines hierarchy without a real UX benefit — the indent and depth tints already communicate level.

---

### 5.9 Tablet Column Balance (T2)

**File**: `CategoriesStyles.js`

Adjust `colName` and `colImage` flex ratios for mid-width screens. Since React Native Web does not have breakpoint-conditional StyleSheet, use `useWindowDimensions()` in `CategoryTree.js` or `DesktopCategoryRow` to pass adjusted column styles:

- Desktop (≥ 1024px): `colName: flex 2`, `colImage: flex 0.8` (current)
- Tablet (768–1024px): `colName: flex 3`, `colImage: flex 0.6`

Alternatively, compute column style inline in `DesktopCategoryRow` based on passed `width` prop. Small change, noticeable layout improvement on tablets.

---

## 6. Implementation Checklist

All changes target existing files only. No new files, no new navigation models.
**Overall Checklist Rating**: ◕ FH — 1d 4f +2r

### `CategoryRowElements.js` `○ FL — 1d 1f +0r` `[Parallel with CategoriesStyles.js, CategoryRow.js, CategoryTree.js]`
- [x] Export `MOBILE_INDENT_PER_LEVEL = 12` alongside `INDENT_PER_LEVEL = 20`

### `CategoriesStyles.js` `○ FL — 1d 1f +0r` `[Parallel with CategoryRowElements.js, CategoryRow.js, CategoryTree.js]`
- [x] `toggleBtn`: increase to `width: 32, height: 32`
- [x] `treeRow.paddingVertical`: change from `spacing.sm` to `spacing.md`
- [x] `mobileTreeCard`: `flexDirection: 'row'`, `alignItems: 'stretch'` — removed `paddingHorizontal/paddingVertical` (moved to zone styles)
- [x] Added `mobileToggleZone`: `minWidth: 44`, `alignSelf: 'stretch'`, centered
- [x] Added `mobileContentZone`: `flex: 1`, `paddingRight: spacing.lg`, `paddingVertical: spacing.xs + 2`

### `CategoryRow.js` `◐ FM — 1d 1f +2r` `[Parallel with CategoryRowElements.js, CategoriesStyles.js, CategoryTree.js]`
- [x] `MobileCategoryCard`: replace outer `AnimatedButton` with `View`; added `mobileToggleZone` (View + ToggleButton) and `mobileContentZone` (AnimatedButton → onEdit)
- [x] `MobileCategoryCard`: use `MOBILE_INDENT_PER_LEVEL` for `paddingLeft`
- [x] `MobileCategoryCard`: removed `<DepthBars />` render
- [x] `MobileCategoryCard`: shortened `badgeLabel` to `countLabel` only
- [x] `DesktopCategoryRow`: apply `treeRowDepth1` / `treeRowDepth2` styles conditionally on `safeDepth`
- [x] `DesktopCategoryRow`: standardized name `size={14}` at all depths

### `CategoryTree.js` `◐ FM — 1d 1f +1r` `[Parallel with CategoryRowElements.js, CategoriesStyles.js, CategoryRow.js]`
- [x] Toolbar: on `isMobile` (width < 768) renders single smart toggle chip (`Collapse All` ↔ `Expand All` based on `collapsed.size`); tablet/desktop retains both chips — single-row guaranteed
- [x] Tablet column rebalance: `colName flex: 3`, `colImage flex: 0.6` when `768 ≤ width < 1024`

---

## 7. Expected Outcomes

| Improvement | Mobile | Tablet | Desktop |
|---|---|---|---|
| Tap zone isolation | ✅ Fixes accidental edits | ✅ Same fix applies | — |
| Badge brevity | ✅ More name space | — | — |
| Reduced indent + no DepthBars | ✅ More name space at depth 2–3 | — | — |
| Toolbar single-row | ✅ Eliminates second-row wrap | — | — |
| Depth background tints | — | ✅ | ✅ Hierarchy at a glance |
| Larger toggle hit target | — | ✅ | ✅ More precise interaction |
| Row padding increase | — | ✅ | ✅ More readable dense trees |
| Unified name size 14px | ✅ | ✅ | ✅ Consistent visual weight |
| Tablet column rebalance | — | ✅ | — |
