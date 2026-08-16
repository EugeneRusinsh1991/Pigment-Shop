# Route-Based Navigation Hierarchy (`route-hierarchy.md`)

> [!NOTE]
> Maps application screens and routes in `app/` to their presentation components, custom hooks, global context providers, and background services.

---

## 1. Storefront Routes (`app/(store)/`)

### 1.1 Home Screen (`/`)
- **Route File**: `app/(store)/index.js`
- **Feature Layer**: `src/features/home/` (`HomeScreen.js`, `HeroCarousel.js`, `FeaturedSections.js`)
- **UI Primitives**: `Card`, `Button`, `Media`, `Badge`, `Motion`
- **Context & Hooks**: `useTheme`, `useCart`, `useAuth`
- **Services**: `src/services/catalog/` (`getCategories`, `getFeaturedProducts`)

### 1.2 Catalog & Product Detail (`/catalog`, `/product/[id]`)
- **Route Files**: `app/(store)/catalog.js`, `app/(store)/product/[id].js`
- **Feature Layer**: `src/features/catalog/`, `src/features/product/`
- **Domain Components**: `Search`, `Navigation`
- **UI Primitives**: `Card`, `Button`, `Badge`, `TextField`, `Media`
- **Context & Hooks**: `useCatalog`, `useCart`, `useFavorites`
- **Services**: `src/services/catalog/` (`fetchProducts`, `fetchProductById`)

### 1.3 Shopping Cart & Checkout (`/cart`, `/checkout`)
- **Route Files**: `app/(store)/cart.js`, `app/(store)/checkout.js`
- **Feature Layer**: `src/features/cart/`, `src/features/checkout/`
- **UI Primitives**: `Button`, `Card`, `TextField`, `Modal`, `Drawer`, `Feedback`
- **Context & Hooks**: `useCart`, `useCheckout`, `useToast`
- **Services**: `src/services/checkout/` (`processCheckout`, `validateCart`)

### 1.4 User Profile & Orders (`/profile`, `/orders`)
- **Route Files**: `app/(store)/profile.js`, `app/(store)/orders.js`
- **Feature Layer**: `src/features/profile/`, `src/features/orders/`
- **UI Primitives**: `Card`, `Badge`, `Button`, `Modal`
- **Context & Hooks**: `useAuth`, `useOrders`
- **Services**: `src/services/orders/` (`getUserOrders`, `updateProfile`)

---

## 2. Admin Dashboard Routes (`app/admin/`)

### 2.1 Admin Overview & Analytics (`app/admin/index.js`)
- **Route File**: `app/admin/index.js`
- **Feature Layer**: `src/features/admin/` (`AdminDashboard.js`, `AdminMetrics.js`)
- **Domain Components**: `DataTable`, `Navigation`
- **UI Primitives**: `Card`, `Badge`, `Button`, `Toggle`
- **Context & Hooks**: `useAuth`, `useAdminMetrics`
- **Services**: `src/services/admin/` (`fetchDashboardMetrics`)

### 2.2 Admin Products Management (`app/admin/products.js`)
- **Route File**: `app/admin/products.js`
- **Feature Layer**: `src/features/admin/` (`ProductManager.js`, `ProductFormModal.js`)
- **Domain Components**: `DataTable`, `Search`, `Flag`
- **UI Primitives**: `Modal`, `TextField`, `Button`, `Badge`, `Media`
- **Context & Hooks**: `useAdminProducts`, `useToast`
- **Services**: `src/services/admin/` (`saveProduct`, `deleteProduct`)

### 2.3 Admin Orders Management (`app/admin/orders.js`)
- **Route File**: `app/admin/orders.js`
- **Feature Layer**: `src/features/admin/` (`OrderManager.js`)
- **Domain Components**: `DataTable`, `Search`, `Flag`
- **UI Primitives**: `Badge`, `Button`, `Modal`, `Drawer`
- **Context & Hooks**: `useAdminOrders`
- **Services**: `src/services/admin/` (`updateOrderStatus`, `fetchOrders`)
