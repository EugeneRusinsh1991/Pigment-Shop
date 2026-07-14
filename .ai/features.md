Storefront browsing
- purpose: let users explore product categories and view product collections.
- related modules: `src/components/CatalogView.js`, `src/components/CatalogHeader.js`, `src/context/CatalogContext.js`, `src/context/NavigationContext.js`, `src/hooks/useNavigationOrchestrator.js`.
- user-facing functionality: category grid navigation, breadcrumb navigation, hero banners, promotional sections, and product selection.
- important interactions: catalog data is provided by `CatalogContext`, navigation state is orchestrated through `NavigationContext`, and product selection updates the selected product state for detail display.

Product detail and selection
- purpose: display individual product details and enable users to view items before adding to cart.
- related modules: `src/components/ProductPage.js`, `src/components/ProductCard.js`, `src/context/NavigationContext.js`.
- user-facing functionality: product detail rendering, product card tap handling, and transition from catalog browsing to the selected product view.
- important interactions: `NavigationContext` handles selection actions and closes overlay screens when a product is selected.

Shopping cart and checkout
- purpose: allow users to manage cart items and submit checkout information.
- related modules: `src/components/CartView.js`, `src/context/CartContext.js`, `src/hooks/useCart.js`.
- user-facing functionality: add/remove cart items, adjust quantity, view totals, enter customer details, and trigger checkout.
- important interactions: cart state is exposed by `CartContext`, total calculations and checkout flow are handled in cart view logic, and user profile info populates checkout fields when authenticated.

Authentication and account management
- purpose: manage user sign-in, registration, and session state.
- related modules: `src/components/LoginPage.js`, `src/hooks/useLoginForm.js`, `src/context/AuthContext.js`, `src/bootstrap/BootstrapGate.js`.
- user-facing functionality: email/password login, registration, Google sign-in, logout, and authentication gating for startup.
- important interactions: `AuthContext` provides auth state and actions, `BootstrapGate` waits for auth to resolve before app bootstrap proceeds, and UI screens use auth state to render personalized content.

Favorites
- purpose: let users save and revisit preferred products.
- related modules: `src/components/FavoritesPage.js`, `src/context/FavoritesContext.js`, `src/components/ProductCard.js`.
- user-facing functionality: toggle favorites on products and view a dedicated favorites screen.
- important interactions: favorites state is stored in `FavoritesContext`, product cards read and update favorite status, and navigation opens the favorites screen.

Order history
- purpose: display authenticated user orders.
- related modules: `src/components/OrdersPage.js`, `src/components/OrderCard.js`, `src/context/AuthContext.js`.
- user-facing functionality: view past orders, expand order details, and see order status.
- important interactions: authenticated user triggers Firestore order queries, OrderPage renders results, and order state updates as snapshots arrive.

Theme and UI settings
- purpose: provide theme and language preferences across the app.
- related modules: `src/context/ThemeContext.js`, `src/context/UIMenuContext.js`, `src/components/AppShell.js`, `src/components/AppHeader.js`.
- user-facing functionality: toggle dark/light theme, open language menu, and control UI menu visibility.
- important interactions: theme and menu contexts are composed in `AppProviders`, and `AppShell` consumes those contexts to control header and navigation UI.

Admin management
- purpose: enable an admin user to manage catalog data, banners, and database regeneration.
- related modules: `src/components/Admin/AdminDashboard.js`, `src/components/Admin/AdminPanel.js`, `src/services/adminDomain.js`, `src/data/catalogState.js`.
- user-facing functionality: admin login, access to admin panel, and catalog/banners management.
- important interactions: admin domain checks auth state for admin user, admin actions persist catalog updates to Firestore and notify storefront state, and admin UI is separated from the storefront shell.
