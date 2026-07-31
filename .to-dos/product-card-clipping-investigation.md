# Product Card Clipping Technical Investigation & Root Cause Report

## 1. Executive Summary

This report provides a definitive technical analysis of the product card clipping issue observed on the **All Products** (`/catalog`) page. Through static analysis of layout contracts, component hierarchy tracing, and cross-referencing visual evidence from browser snapshots (`S_21-02-31_Products.jpg` through `S_21-02-37_Products.jpg`), the investigation has identified **two primary independent root causes** working in tandem, along with **two contributing technical factors**.

---

## 2. Rendering Pipeline Component Map

```
app/(store)/products/index.js
 └── PageTransition [trigger="products-catalog"] (src/components/ui/Motion/PageTransition/PageTransition.js)
      └── CatalogPage (src/features/catalog/CatalogPage.js)
           └── ScrollView [containerLight / containerDark]
                └── CatalogMainContent
                     └── View [styles.gridContainer]
                          └── PageTransition (src/components/ui/Motion/PageTransition/PageTransition.js)
                               └── ProductGrid (src/features/catalog/ProductGrid.js)
                                    └── FlatList [removeClippedSubviews={true}, contentContainerStyle negative margins]
                                         └── renderItem -> View [styles.item] ({ width, padding: gap / 2 })
                                              └── Link [asChild]
                                                   └── ProductCard (src/features/product/ProductCard.js)
                                                        └── Card (src/components/ui/Card/Card.js)
                                                             └── Animated.View [combinedStyle: translateY, shadows]
                                                                  └── TouchableOpacity [staticStyles.touchable]
```

---

## 3. Findings & Detailed Analysis of Causes

The clipping manifest on screen is caused by **two distinct, independent layout mechanisms** that affect different visual aspects of the cards (top edge translation vs. lateral shadow bounds).

### Independent Cause #1: Viewport Boundary Clipping of Negative Translation
- **Primary Source**: `CatalogPage.js` (lines 132–137) `<ScrollView>`
- **Mechanism**:
  1. Hovering over a card activates `useCardAnimation.js` (lines 25–28), which applies `translateY: -6` to `Animated.View`.
  2. This translates the card 6px upward, placing its upper visual region at `y = -6px` relative to the catalog grid's top origin.
  3. In React Native Web, `<ScrollView>` compiles to a DOM node with implicit CSS overflow boundaries (`overflow-x: hidden; overflow-y: auto;`).
  4. Because the `ScrollView` content boundary starts at `y = 0`, any child element translated to `y < 0` is clipped by the browser scroll viewport boundary, slicing off the top 6px of all first-row product cards.

### Independent Cause #2: Flush Outer Margin Alignment & Shadow Truncation
- **Primary Source**: `ProductGrid.js` (lines 70–72) `contentContainerStyle` negative margins
- **Mechanism**:
  1. `ProductGrid.js` applies negative margins to `contentContainerStyle`: `{ marginHorizontal: -(gridGap / 2), marginVertical: -(gridGap / 2) }`.
  2. For a standard grid gap of 24px, `padding: 12px` is applied inside each item cell `View style={styles.item}` while `-12px` negative margins shift the entire grid container left and top.
  3. This layout trick aligns the outer structural edge of border cards (column 1 left edge, column 4 right edge, row 1 top edge) flush with the 0px container edge (`x = 0`, `x = gridWidth`).
  4. Elevation shadows (`shadows.cardHover`) cast a `box-shadow` extending 8px–16px outward beyond the card bounding box.
  5. Because the card edge sits at `x = 0`, the shadow extends to `x < 0` (or `x > gridWidth`). The parent `FlatList` container clips any content extending outside `[0, gridWidth]`, resulting in vertical truncation of shadows along the left and right borders.

### Relationship Between Independent Cause #1 and Cause #2
- **Cause #1** specifically targets vertical Y-axis overflow caused by dynamic hover translation (`translateY: -6`). It affects cards in the top row.
- **Cause #2** specifically targets static X-axis and Y-axis overflow caused by spatial shadow spread (`shadows.cardHover`). It affects cards on all outer grid edges (columns 1 & N, top & bottom rows).
- Together, they result in full perimeter truncation: top-row cards lose top edges when hovered, while edge-column cards lose outer shadow halos.

---

## 4. Classification Matrix of Pipeline Locations

| Pipeline Location | Source File & Lines | Code Property | Classification | Evidence & Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Root Scroll View** | `src/features/catalog/CatalogPage.js` (L132–137) | `<ScrollView>` DOM container | 🔴 **Confirmed Root Cause #1** | Generates web scroll container with CSS overflow clipping; truncates top 6px of top-row cards during `-6px` upward hover lift. |
| **Grid Container** | `src/features/catalog/ProductGrid.js` | `contentContainerStyle` negative margins (L70–72) | 🔴 **Confirmed Root Cause #2** | Pulls outer card cell edges flush to container 0-boundaries (`-gap/2`), cutting off 8px–16px shadow spread along left, right, and top edges. |
| **List Virtualization** | `src/features/catalog/ProductGrid.js` | `removeClippedSubviews={true}` (L82) | 🟠 **Contributing Factor** | Forces list subview containment on native/web, reinforcing container clipping of elements overflowing cell boundaries. |
| **Hover Driver** | `src/components/ui/Card/useCardAnimation.js` | `hoverTranslateY = -6` (L10, L27) | 🟠 **Contributing Factor** | Triggers the Y-axis shift into the top overflow-clipped zone. The animation operates as designed but exposes container clipping. |
| **Motion Container** | `src/components/ui/Motion/PageTransition/PageTransition.js` | `overflow: 'visible'` (L30) | 🟢 **Eliminated Suspect** | Explicitly enforces `overflow: 'visible'` on `Animated.View`, introducing no clipping. |
| **Touchable Container** | `src/components/ui/Card/Card.js` | `staticStyles.touchable` `overflow: 'hidden'` (L124) | 🟢 **Eliminated Suspect** | Applied to inner `TouchableOpacity`, which is a child of `Animated.View`. Outer `Animated.View` holds the transform and shadow, so touchable overflow does not clip outer card shadows/lift. |
| **Card Style Tokens** | `src/features/product/ProductCardStyles.js` | `prodCard` `overflow: 'visible'` (L8) | 🟢 **Eliminated Suspect** | Explicitly specifies `overflow: 'visible'`, introducing no clipping. |

---

## 5. Implementation Tasks (`◕ FH — 2d 3f +6r`)

To completely eliminate product card clipping while preserving design system tokens and responsive alignments, the following tasks must be performed:

### Task 1: Provide Top Buffer Padding in Catalog Main Content Layout (`◐ FM — 1d 1f +2r — Task 1 [Parallel with Task 3]`)
- **Target File**: `src/features/catalog/CatalogPage.js`
- **Scope**:
  - Add top content padding (e.g., `paddingTop: layout.spacing.sm` or `paddingTop: 8`) to `styles.gridContainer` or `styles.main`.
  - Provide sufficient vertical clearance (at least 6px for `translateY` lift plus shadow radius) so top-row cards translating upward do not cross the root `ScrollView` boundary.

### Task 2: Replace Negative Margins with Positive Cell Gutters in Product Grid (`◐ FM — 1d 1f +2r`)
- **Target File**: `src/features/catalog/ProductGrid.js`
- **Scope**:
  - Remove negative margins (`marginHorizontal: -(gridGap / 2), marginVertical: -(gridGap / 2)`) from `contentContainerStyle`.
  - Configure `contentContainerStyle` with explicit positive container padding (`paddingHorizontal: layout.spacing.sm`, `paddingTop: layout.spacing.xs`, `paddingBottom: layout.spacing.md`).
  - Set `removeClippedSubviews={false}` on `FlatList` to prevent DOM list item subview truncation.

### Task 3: Decouple Card Surface Shadows from Inner Media Overflow Bounds (`◐ FM — 1d 1f +2r — Task 3 [Parallel with Task 1]`)
- **Target File**: `src/components/ui/Card/Card.js`
- **Scope**:
  - Audit `Card.js` element layout to ensure shadow styles (`shadows.cardHover` / `shadows.cardRest`) remain applied to the outer `Animated.View` with `overflow: 'visible'`.
  - Confirm that inner image container (`Card.Image`) maintains `overflow: 'hidden'` for rounded image corners without restricting parent shadow spread.

### Task 4: Responsive Verification & Visual Regression Testing (`○ FL — 1d 0f +2r`)
- **Target Component / Tools**: `.tools/scripts/open-playwright.js`
- **Scope**:
  - Test hover lift animation (`translateY: -6`) across desktop (4 cols), tablet (3 cols), and mobile (2 cols) viewports.
  - Verify card elevation shadows along top, left, right, and bottom outer edges in both Light and Dark themes.
