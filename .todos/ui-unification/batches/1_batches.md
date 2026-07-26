# Audit & Unification Registry: Badges & Chips (Batches) Primitives

This document contains the complete list of all Badge, Chip, Tag, and Status indicator elements ("батчи / badges") identified in the application UI screenshots and throughout the codebase for future unification.

---

## 1. Badges Highlighted in Screenshots

| # | Badge / Identifier | Location / Screen | Screenshot Source | Description / Variant |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `badgeNew` | Customer Home / Catalog | `S_14-40-58_Home.jpg` | "NEW" / "НОВИНКА" product badge overlay |
| 2 | `discountBadge` (`-34%`) | Customer Home / Catalog | `S_14-41-00_Home.jpg` | Product discount percentage badge |
| 3 | `orderStatusCancelled` / `orderStatusProcessing` / `orderStatusPending` / `orderStatusCompleted` | Admin Orders Table | `S_14-41-13_Admin.jpg` | Order status indicator badge in admin orders list |
| 4 | `adminProductsActive` | Admin Products Table | `S_14-41-16_Admin.jpg` | Product publication status indicator (Active / Inactive) |
| 5 | `Category Holder` / `Product Holder` | Admin Categories View | `S_14-41-19_Admin.jpg` | Category hierarchy level indicator badge |

---

## 2. Additional Badges & Chips Discovered in Codebase

| # | Identifier / Component | Location / File | Description / Usage |
| :--- | :--- | :--- | :--- |
| 6 | `badgeFeatured` | `src/features/product/ProductBadges.js` | "FEATURED" product badge overlay |
| 7 | Cart Badge | `src/features/shell/AppHeader/AppHeaderControls.js` | Header shopping cart counter badge |
| 8 | `betaBadge` | `src/features/shell/AppHeader/AppHeaderStyles.js` | Application Header Beta status badge |
| 9 | `OrderStatusBadge` | `src/components/OrderCard.js` | Customer order history status badge |
| 10 | Product Filter Chips | `src/components/Admin/Products/ProductFilterChips.js` | Quick filters for discount/new products in admin |
| 11 | Analytics Date Range Chips | `src/components/Admin/Analytics/AnalyticsComponents.js` | Date period filter chips (7 days, 30 days, Month, Year) |

---

## 3. Recommended Action Plan for Badge Unification

1. Create a unified `Badge` primitive in `src/components/Badge/` supporting variants:
   - `status` (success, warning, error, info)
   - `product` (new, discount, featured)
   - `counter` (cart count, notification count)
   - `chip` / `filter` (interactive filter pills)
2. Refactor existing components to consume the canonical `Badge` component.
