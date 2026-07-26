# Category & Product Card Grid Layout Issues Analysis

## 1. Issue Overview

During the migration to the standardized `Card` primitive and column grid layout, two major visual layout regressions occurred in `CatalogView` and `ProductGrid`:

1. **Card Over-Stretching / Grid Column Density Mismatch**:
   - Subcategory items automatically triggered `bannerMode` (`width: 100%`) when `depth > 0`.
   - When total item count was less than column count (e.g., 2 items in a 5-column grid), React Native `FlatList` column wrappers expanded each item to 50% width instead of maintaining a 20% grid column width.

2. **Card Vertical Height Collapse (0px Height Rendering)**:
   - Wrapping grid items in `<View style={{ flex: 1, maxWidth }}>` inside `FlatList` cell wrappers caused web flexbox height collapse.
   - Because `FlatList` item cell wrappers do not specify an explicit height, a child with `flex: 1` attempts to resolve flex height against an unconstrained container, resulting in a collapsed 0px height horizontal bar (`S_15-05-32_Catalog.jpg`).
