# Audit & Unification Registry: Card Primitives

This document contains a complete list of all Card components, card containers, and card primitives in the codebase to be audited and unified under the architecture standard defined in `.docs/architecture-standards/05-card-module-spec.md`.

---

## 1. Existing Primitives (`src/components/Card/`)

| Path | Description / Usage | Action Plan |
| :--- | :--- | :--- |
| `src/components/Card/BaseCard.js` | Generic card background & layout wrapper | Standardize & merge into `Card.js` |
| `src/components/Card/InteractiveCard.js` | Pressable card container with animation | Extract to `useCardAnimation.js` / `Card.js` |
| `src/components/Card/StaticCard.js` | Non-interactive static surface card | Merge into `Card.js` variant |
| `src/components/Card/NavigationCard.js` | Card with navigation press handler | Refactor to use unified `Card` |
| `src/components/Card/PlaceholderCard.js` | Skeleton/Loading card state | Convert to `Card.Skeleton` slot |
| `src/components/Card/CardShadow.js` | Web/Native shadow helper | Replace with `tokens.js` shadows |

---

## 2. Feature & Domain Product Cards

| Path | Location / Screen | Description | Action Plan |
| :--- | :--- | :--- | :--- |
| `src/features/product/ProductCard.js` | Home, Catalog, Products screens | Main product card (Image, Title, Price, Badges, Add to Cart, Favorite) | Refactor to consume `Card` primitive |
| `src/features/catalog/CategoryCard.js` | Catalog page | Category visual navigation card | Refactor to consume `Card` primitive |
| `src/components/OrderCard.js` | Customer Orders screen | Order summary card (Order ID, Status, Items, Total) | Refactor to consume `Card` primitive |
| `src/features/orders/OrderDetailsCard.js` | Order details screen | Detailed view container for order items & delivery info | Refactor to consume `Card` primitive |
| `src/features/profile/ProfileFormCard.js` | Profile page | User info & form container card | Refactor to consume `Card` primitive |

---

## 3. Admin & Secondary Cards

| Path | Location / Screen | Description | Action Plan |
| :--- | :--- | :--- | :--- |
| `src/components/Admin/Users/UserInfoCard.js` | Admin Users view | Detailed customer profile card | Refactor to consume `Card` primitive |
| `src/components/Admin/Products/ProductRowComponents.js` | Admin Products table | Grid/Row view container for product management | Align container styles with `Card` |

---

## 4. Next Steps for Unification

1. Create canonical `src/components/Card/` module layout (`Card.js`, `CardStyles.js`, `useCardTheme.js`, `useCardAnimation.js`, `index.js`).
2. Migrate domain components (`ProductCard.js`, `CategoryCard.js`, `OrderCard.js`) to use the unified `Card` primitive.
