# Pull-to-Refresh Coverage Audit

## Current Mechanism

The hook [usePullToRefresh.js](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js) registers `document`-level touch listeners (web) that detect a downward drag when `scrollY === 0` and fire `onRefresh`. The `RefreshControl` from `react-native-web` is a **NO-OP stub** — it renders a plain `<View>` and ignores all refresh props. Therefore, only the DOM listener path matters on web.

---

## ✅ Screens WITH `usePullToRefresh`

| Screen | Route | Integration Component | Status |
|---|---|---|---|
| Products Catalog | `/products` | [ProductGrid.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/ProductGrid.js#L41) | **✅ Working** — FlatList `scrollEnabled={true}`, hook mounts, DOM listeners fire. |
| Cart Drawer (overlay) | _overlay_ | [CartDrawerList.js](file:///d:/Magazine/_PigmentShop/src/features/cart/CartDrawer/CartDrawerList.js#L10) | **⚠️ Problematic** — Drawer uses its own ScrollView. Pull gesture conflicts with drawer scroll. DOM listeners fire at `document` level even inside drawer. |
| Catalog Grid (category pages) | `/catalog`, `/catalog/[categoryId]` | [UnifiedCardGrid.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Grid/UnifiedCardGrid.js#L23) via [CatalogView.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js#L107) | **⚠️ Partially Working** — `scrollEnabled={false}` (line 146) disables native FlatList scroll, but the DOM listener on `document` still works because the page scrolls via browser overflow. `RefreshControl` is dead (stub), so the native path is broken. Web path works incidentally. |

---

## ❌ Screens WITHOUT `usePullToRefresh`

| # | Screen | Route | Feature Component | Scrollable? | Reason Missing |
|---|---|---|---|---|---|
| 1 | **Home** | `/` | [CatalogView.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js#L149-L177) (branch `showCategoryGrid=false`) | Yes — browser overflow | Renders plain `<View>`, not `UnifiedCardGrid`. No component in this branch calls `usePullToRefresh`. |
| 2 | **Product Detail** | `/product/[id]` | [ProductPage.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductPage.js) | Yes — browser overflow | No `usePullToRefresh` call. Uses `View` + `ScrollFadeUp`, no scroll container. |
| 3 | **Cart (full page)** | `/cart` | [CartViewContent.js](file:///d:/Magazine/_PigmentShop/src/features/cart/CartViewContent.js) via [PageScrollLayout](file:///d:/Magazine/_PigmentShop/src/features/shell/PageScrollLayout/PageScrollLayout.js) | Yes — browser overflow | No `usePullToRefresh` call. `PageScrollLayout` is a plain `<View>`. |
| 4 | **Profile** | `/profile` | [ProfilePage.js](file:///d:/Magazine/_PigmentShop/src/features/profile/ProfilePage.js) via [AccountLayout.js](file:///d:/Magazine/_PigmentShop/src/features/profile/components/AccountLayout.js) | Yes — browser overflow | No `usePullToRefresh` call. `AccountLayout` is a plain `<View>`. |
| 5 | **Orders** | `/orders` | [OrdersPage.js](file:///d:/Magazine/_PigmentShop/src/features/orders/OrdersPage.js) via `AccountLayout` | Yes — browser overflow | No `usePullToRefresh` call. Same `AccountLayout` wrapper. |
| 6 | **Favorites** | `/favorites` | [FavoritesPage.js](file:///d:/Magazine/_PigmentShop/src/features/favorites/FavoritesPage.js) via `AccountLayout` | Yes — browser overflow | No `usePullToRefresh` call. Same `AccountLayout` wrapper. |
| 7 | **Order Confirmation** | `/order-confirmation` | [OrderConfirmationPage.js](file:///d:/Magazine/_PigmentShop/src/features/orders/OrderConfirmationPage.js) via `PageScrollLayout` | Yes — browser overflow | No `usePullToRefresh` call. |
| 8 | **Contact** | `/contact` | [ContactPage.js](file:///d:/Magazine/_PigmentShop/src/features/contact/ContactPage.js) | Yes — browser overflow | No `usePullToRefresh` call. Static page, uses plain `<View>`. |
| 9 | **Admin Panel** | `/admin` | [AdminPanel](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminPanel.js) + sub-managers | Yes — multiple `ScrollView`s | No `usePullToRefresh` call. Admin uses own scroll containers. |

---

## Structural Observations

1. **Duplicate listener risk**: `ProductGrid`, `UnifiedCardGrid`, and `CartDrawerList` each call `usePullToRefresh` independently. On the `/products` route (which renders `ProductGrid` inside `CatalogPage`), only one instance mounts — this is fine. But if a user opens the Cart Drawer while on the catalog page, **two** hook instances attach `document`-level touch listeners simultaneously, potentially causing a double-reload.

2. **Home screen is the most visible gap**: The `/` route renders `CatalogView` with `showCategoryGrid=false`, which bypasses `UnifiedCardGrid` entirely and uses a plain `<View>`. No component in this rendering path calls the hook.

3. **All "Account" pages share the same gap**: Profile, Orders, and Favorites all route through `AccountLayout`, which is a plain `<View>` wrapper. Adding the hook to `AccountLayout` would cover all three screens in one change.

4. **`PageScrollLayout` is another shared gap**: Cart (full page) and Order Confirmation both use `PageScrollLayout`, which is also a plain `<View>`. Adding the hook there would cover both.

5. **Login page** (`/login`) is a form-only screen — pull-to-refresh is not expected there.
