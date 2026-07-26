# Stage 1 — Project Inventory & Sub-Batch Definitions

## 🎯 Audit Profile
- **Scope**: Whole Project — `src/` + `app/`
- **Profile**: `ui`
- **Sub-Profiles Covered**: UI Architecture · Hardcoded Styles · Typography · Performance · Inline Style Violations · Accessibility

---

## 🏗️ Tech Stack
| Layer | Technology |
|---|---|
| Framework | Expo / React Native Web (Expo Router) |
| State | React Context (`src/context/`) |
| Design System | Tokenized tokens (`src/theme/tokens.js`, `AppStyles.js`) |
| Routing | Expo Router (`app/` directory) |
| Styling | React Native `StyleSheet` + design token hooks |

---

## 📊 Pre-Audit Data Summary (from `npm run audit:ui`)
| Audit Check | Issues | Files |
|---|---|---|
| UI Architecture violations | **7** | 7 targets |
| Hardcoded Styles (colors/spacing) | **152** | 49 files |
| Typography violations | **4** | 4 files |
| Performance (useMemo/useCallback overuse) | **30** | 14 files |
| Service Layer violations | 13 | — |
| Layer Import violations | 20 | — |
| Unused Exports | 4 | — |
| Hardcoded URLs | 17 | — |
| Magic Numbers | 5 | — |
| Fallow: Dead Files | 111 | — |
| Fallow: Unused Exports | 212 | — |
| Fallow: Critical Health Findings | 18 | — |
| Fallow: High Health Findings | 35 | — |
| Fallow: Code Duplication Groups | 30 | — |

---

## 📦 Component Primitive Registry (project-wide)

### `src/components/` — Shared UI Primitives
| Dir | Key Files | Architecture Violations |
|---|---|---|
| `Button/` | Button.js, IconButton.js, useButtonTheme.js | `useButtonTheme` returns empty |
| `Badge/` | Badge.js, BadgeStyles.js | GHOST_IMPORT: BadgeStyles.js unused |
| `Card/` | Card.js, InteractiveCard.js, StaticCard.js, NavigationCard.js | — |
| `DataTable/` | EmptyState.js | — |
| `Drawer/` | Drawer.js | — |
| `Feedback/` | Toast, Skeleton, EmptyState, InlineError | — |
| `Flag/` | — | — |
| `Icons/` | AppIcons.js, CategoryIcons.js, ControlIcons.js, AdminIcons.js | Typography violations (raw fontSize) |
| `Media/` | GifRenderer.js, VideoRenderer.js | — |
| `Modal/` | — | — |
| `Motion/` | ScrollFadeUp, PageTransition | MISSING: MotionStyles.js, useMotionTheme.js |
| `Navigation/` | Breadcrumbs/, Pagination/ | — |
| `PageScrollLayout/` | PageScrollLayout.js | MISSING: PageScrollLayoutStyles.js, usePageScrollLayoutTheme.js |
| `Search/` | AutocompleteSearch.js, SearchInput.js, SearchDropdown.js, SearchStyles.js | `useSearchTheme` returns empty |
| `SharedLayoutWrapper/` | SharedLayoutWrapper.js | — |
| `Text/` | Text.js, Heading.js, TextStyles.js | GHOST_IMPORT: TextStyles.js unused |
| `TextField/` | — | — |
| `Toggle/` | Toggle.js | — |
| `Admin/` | SharedFormComponents + Analytics, Categories, Users | MISSING: index.js, useAdminTheme.js |

---

## 🖼️ Feature-Level UI Files (project-wide — UI scope only)

### `src/features/`
| Feature | Key UI Files with Issues |
|---|---|
| `auth/` | LoginPageStyles.js (hardcoded padding 0) |
| `catalog/` | CatalogView.js, CategoryCard.js, GridHeaderFooter.js, PlaceholderCard.js, ProductGrid.js, components/NewArrivalsFooter.js |
| `contact/` | ContactPage.js, ContactPageStyles.js |
| `favorites/` | FavoritesPageStyles.js |
| `home/` | HeroCarousel.js, CarouselDots.js, CarouselLayers.js, DiscountsSection.js, FeaturedSections.js |
| `orders/` | OrderRows.js, OrdersPageStyles.js |
| `product/` | ProductCard.js, ProductPage.js, ProductPageStyles.js |
| `profile/` | ProfilePageStyles.js |
| `shell/` | AppHeaderControls.js, AppHeaderLogo.js, HeaderDropdown.js, CategoryTreeNodeButtons.js, LanguageSelector.js, StoreSearchHeader.js |

### `app/` (Routing Shell)
- `_layout.js` — Root layout & provider wrapper (in scope for shell/navigation primitives)

---

## 🗂️ UI Audit Batch Plan

> **Batching Rule**: Batches are grouped by **VISUAL PRIMITIVE CATEGORY across the ENTIRE project**, NOT by folder boundary.

### Batch 2.1 — All Buttons & Clickables (Project-Wide)
**Rationale**: Ensures parity across every pressable/touchable/button across admin, storefront, shell.

**Target Files**:
- `src/components/Button/Button.js`
- `src/components/Button/IconButton.js`
- `src/components/Button/useButtonTheme.js`
- `src/components/Toggle/Toggle.js`
- `src/components/Navigation/Breadcrumbs/Breadcrumb.js`
- `src/features/catalog/CategoryCard.js`
- `src/features/catalog/GridHeaderFooter.js` (sort buttons)
- `src/features/product/ProductCard.js`
- `src/features/shell/AppHeader/AppHeaderControls.js`
- `src/features/shell/NavMenu/CategoryTreeNodeButtons.js`
- `src/features/shell/NavMenu/LanguageSelector.js` (toggle)

**Known Issues**:
- `useButtonTheme.js` — HOOK_RETURNS_EMPTY
- Button.js L50, L60 — INLINE_STYLE
- IconButton.js L56 — INLINE_STYLE
- Toggle.js L57, L69 — INLINE_STYLE (computedOptionStyle, computedTextStyle)
- CategoryTreeNodeButtons.js L26, L30 — INLINE_STYLE + HARDCODED_SPACING (paddingVertical: 10)
- LanguageSelector.js L19, L25, L32 — HARDCODED_SPACING + HARDCODED_COLOR (rgba)
- AppHeaderControls.js L82, L89 — INLINE_STYLE
- GridHeaderFooter.js L44, L50, L59, L84, L87, L93, L96 — INLINE_STYLE
- Breadcrumb.js L20, L29 — INLINE_STYLE
- ProductCard.js L63 — useMemo (performance)

---

### Batch 2.2 — All Search & Inputs (Project-Wide)
**Target Files**:
- `src/components/Search/AutocompleteSearch.js`
- `src/components/Search/SearchInput.js`
- `src/components/Search/SearchDropdown.js`
- `src/components/Search/SearchStyles.js`
- `src/components/Search/useSearchTheme.js`
- `src/components/TextField/` (all files)
- `src/features/shell/StoreSearchHeader.js`

**Known Issues**:
- `useSearchTheme.js` — HOOK_RETURNS_EMPTY
- AutocompleteSearch.js L69 — INLINE_STYLE
- SearchDropdown.js L29, L46, L75, L76 — INLINE_STYLE
- SearchInput.js L41 — INLINE_STYLE
- SearchStyles.js L57 — HARDCODED_SPACING (paddingVertical: 0)
- StoreSearchHeader.js L16 — useMemo overuse; L29 — INLINE_STYLE

---

### Batch 2.3 — All Cards & Surfaces (Project-Wide)
**Target Files**:
- `src/components/Card/Card.js`
- `src/components/Card/InteractiveCard.js`
- `src/components/Card/StaticCard.js`
- `src/components/Card/NavigationCard.js`
- `src/features/catalog/CategoryCard.js`
- `src/features/catalog/PlaceholderCard.js`
- `src/features/catalog/ProductGrid.js`
- `src/features/product/ProductCard.js`
- `src/features/home/components/FeaturedSections.js`

**Known Issues**:
- Card.js L42, L47, L61, L70 — INLINE_STYLE
- InteractiveCard.js L71, L72, L75, L91 — INLINE_STYLE (hardcoded borderRadius in L91)
- StaticCard.js L61 — INLINE_STYLE
- NavigationCard.js L15 — INLINE_STYLE
- CategoryCard.js L133, L144, L145, L146 — INLINE_STYLE
- PlaceholderCard.js L47 — INLINE_STYLE
- ProductGrid.js L21, L42, L59 — INLINE_STYLE + HARDCODED_SPACING (paddingBottom: 0)
- FeaturedSections.js L112, L117, L144 — HARDCODED_SPACING + HARDCODED_COLOR

---

### Batch 2.4 — All Modals, Drawers & Overlays (Project-Wide)
**Target Files**:
- `src/components/Drawer/Drawer.js`
- `src/components/Modal/` (all files)
- `src/components/Search/SearchDropdown.js` (overlay portion)
- `src/features/shell/AppHeader/HeaderDropdown.js`

**Known Issues**:
- Drawer.js L11 — INLINE_STYLE
- HeaderDropdown.js L35 — INLINE_STYLE (marginVertical hardcoded)

---

### Batch 2.5 — All Typography, Text & Icons (Project-Wide)
**Target Files**:
- `src/components/Text/Text.js`
- `src/components/Text/Heading.js`
- `src/components/Text/TextStyles.js`
- `src/components/Badge/Badge.js`
- `src/components/Badge/BadgeStyles.js`
- `src/components/Flag/` (all files)
- `src/components/Icons/AppIcons.js`
- `src/components/Icons/CategoryIcons.js`
- `src/components/Icons/ControlIcons.js`
- `src/components/Icons/AdminIcons.js`

**Known Issues**:
- TextStyles.js — GHOST_IMPORT (not imported in Text.js)
- BadgeStyles.js — GHOST_IMPORT (not imported in Badge.js)
- Heading.js L40 — INLINE_STYLE
- AppIcons.js — INLINE_STYLE (×14) + Typography violation L20 (raw fontSize)
- CategoryIcons.js — INLINE_STYLE (×5) + Typography violation L21
- ControlIcons.js — INLINE_STYLE (×14) + Typography violation L18
- AdminIcons.js — Typography violation L17

---

### Batch 2.6 — All Navigation, Layout & Shell (Project-Wide)
**Target Files**:
- `src/components/Navigation/NavigationStyles.js`
- `src/components/Navigation/useNavigationTheme.js`
- `src/components/Navigation/Breadcrumbs/` (all files)
- `src/components/Navigation/` (Pagination)
- `src/components/PageScrollLayout/PageScrollLayout.js`
- `src/components/SharedLayoutWrapper/SharedLayoutWrapper.js`
- `src/features/shell/AppHeader/AppHeaderControls.js`
- `src/features/shell/AppHeader/AppHeaderLogo.js`
- `src/features/shell/AppHeader/HeaderDropdown.js`
- `src/features/shell/NavMenu/CategoryTreeNodeButtons.js`
- `src/features/shell/NavMenu/LanguageSelector.js`
- `src/features/shell/StoreSearchHeader.js`
- `src/features/home/components/HeroCarousel.js`
- `src/features/home/components/HeroCarousel/CarouselDots.js`
- `src/features/home/components/HeroCarousel/CarouselLayers.js`
- `app/_layout.js`

**Known Issues**:
- PageScrollLayout — MISSING: PageScrollLayoutStyles.js, usePageScrollLayoutTheme.js; L14, L19 INLINE_STYLE
- SharedLayoutWrapper.js L17, L24 — INLINE_STYLE
- NavigationStyles.js L12 — HARDCODED_SPACING (paddingHorizontal: 0)
- useNavigationTheme.js L9, L10 — useMemo overuse
- AppHeaderLogo.js L28 — INLINE_STYLE
- HeroCarousel.js L37 — HARDCODED_SPACING (borderRadius: 0); L64, L71, L72 — INLINE_STYLE
- CarouselDots.js L43 — INLINE_STYLE
- CarouselLayers.js L17 — INLINE_STYLE

---

### Batch 2.7 — All Feedback, Motion & Media (Project-Wide)
**Target Files**:
- `src/components/Feedback/` (Toast, Skeleton, EmptyState, InlineError — all files)
- `src/components/Motion/` (ScrollFadeUp, PageTransition — all files)
- `src/components/Media/GifRenderer.js`
- `src/components/Media/VideoRenderer.js`
- `src/components/DataTable/` (all files including EmptyState.js)

**Known Issues**:
- Motion/ — MISSING: MotionStyles.js, useMotionTheme.js
- GifRenderer.js L13, L40 — INLINE_STYLE
- VideoRenderer.js L79 — INLINE_STYLE (StyleSheet.flatten with hardcoded objectFit)
- DataTable/EmptyState.js L10 — INLINE_STYLE

---

### Batch 2.8 — All Admin UI (Project-Wide)
**Target Files**:
- `src/components/Admin/SharedFormComponents.js`
- `src/components/Admin/Analytics/AnalyticsDashboard.js`
- `src/components/Admin/Categories/CategoryTree.js`
- `src/components/Admin/Categories/useCategoriesWorkflow.js`
- `src/components/Admin/Users/UserDetails.js`
- `src/components/Admin/` (all remaining Admin files)
- `app/admin/` (all admin route files)

**Known Issues**:
- Admin/ — MISSING: index.js, useAdminTheme.js
- SharedFormComponents.js L23, L25 — INLINE_STYLE
- AnalyticsDashboard.js L116–L119 — useMemo ×4 (performance)
- CategoryTree.js L54, L65, L66, L68 — useMemo/useCallback overuse
- useCategoriesWorkflow.js L11 — useMemo overuse
- UserDetails.js L18 — useCallback overuse

---

### Batch 2.x — Feature Page Styles (Hardcoded Spacing Sweep)
**Target Files** (remaining style files with `paddingBottom: 0` / `marginTop: 0` patterns):
- `src/features/auth/LoginPageStyles.js`
- `src/features/contact/ContactPageStyles.js`
- `src/features/contact/ContactPage.js`
- `src/features/favorites/FavoritesPageStyles.js`
- `src/features/orders/OrderRows.js`
- `src/features/orders/OrdersPageStyles.js`
- `src/features/product/ProductPageStyles.js`
- `src/features/profile/ProfilePageStyles.js`
- `src/features/home/components/DiscountsSection.js`
- `src/features/home/components/NewArrivalsFooter.js`
- `src/features/catalog/CatalogView.js`

---

## ✅ Stage 1 Exit Criteria — MET
- [x] `audit-config.md` created
- [x] `stages/1-project-inventory.md` created
- [x] Batch plan defined (8 primitive-grouped batches + 1 feature style sweep)
- [x] All known violations cross-referenced from `npm run audit:ui` output
