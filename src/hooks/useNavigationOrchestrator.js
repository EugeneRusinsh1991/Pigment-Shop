import useCatalogBrowsing from './useCatalogBrowsing';
import useScreenState from './useScreenState';

/**
 * useNavigationOrchestrator.js
 *
 * Thin orchestration layer that coordinates the screen-state module and the
 * catalog-browsing module. All user-facing navigation actions are implemented
 * here so that behaviour remains centralized but not monolithic.
 *
 * This hook is consumed by NavigationContext and should not be imported
 * directly by UI components.
 */
export default function useNavigationOrchestrator(categoryTree, onDismissMenus) {
  const screen = useScreenState(onDismissMenus);
  const catalog = useCatalogBrowsing(categoryTree);

  // ---------------------------------------------------------------------------
  // Composed "canGoBack" — true when any screen or browsing depth is active
  // ---------------------------------------------------------------------------
  const canGoBack =
    screen.showCart ||
    screen.showLogin ||
    screen.showProfile ||
    screen.showOrders ||
    screen.showFavorites ||
    screen.showAllProducts ||
    screen.showCatalog ||
    !!catalog.selectedProduct ||
    catalog.depth > 0;

  // ---------------------------------------------------------------------------
  // High-level navigation actions
  // ---------------------------------------------------------------------------

  /**
   * Handles pressing the Back button.
   * Priority: active screen → selected product → catalog depth → noop.
   */
  const handleBackPress = () => {
    if (screen.showLogin) { screen.setShowLogin(false); return; }
    if (screen.showProfile) { screen.setShowProfile(false); return; }
    if (screen.showOrders) { screen.setShowOrders(false); return; }
    if (screen.showFavorites) { screen.setShowFavorites(false); return; }
    if (screen.showAllProducts) { screen.setShowAllProducts(false); return; }
    if (screen.showCart) { screen.setShowCart(false); return; }

    // Catalog browsing should take priority over closing the catalog "screen".
    // Clear selected product first, then step up one level in the category stack.
    if (catalog.selectedProduct) { catalog.setSelectedProduct(null); screen.setShowCatalog(true); return; }
    if (catalog.depth > 0) { catalog.goBack(); screen.setShowCatalog(true); return; }

    // If nothing else to go back from, and the catalog overlay is open, close it.
    if (screen.showCatalog) { screen.setShowCatalog(false); return; }
  };

  /**
   * Navigates to the home state: no active screen, browsing reset to root.
   */
  const handleHome = () => {
    screen.closeAll();
    catalog.resetToRoot();
  };

  /**
   * Opens the catalog screen and resets product selection.
   */
  const handleCatalogPress = () => {
    catalog.resetToRoot();
    screen.setShowCatalog(true);
    screen.setShowAllProducts(false);
    catalog.setSelectedProduct(null);
  };

  /**
   * Opens the full catalog page with all products, preserving the existing
   * search and filter experience.
   */
  const handleAllProductsPress = () => {
    catalog.resetToRoot();
    screen.setShowAllProducts(true);
    screen.setShowCatalog(false);
    catalog.setSelectedProduct(null);
    if (onDismissMenus) onDismissMenus();
  };

  /**
   * Handles pressing a category card or product card in the catalog grid.
   * - Category nodes: push a new level onto the navigation stack.
   * - Product/leaf nodes: select the product for detail view.
   */
  const handleCardPress = (node) => {
    if (!node.children?.length && !node.isCategory) {
      // Selecting a product: ensure any overlay/catalog screen is closed
      // so the selected product detail view becomes visible.
      screen.closeAll();
      catalog.setSelectedProduct(node);
    } else {
      catalog.enterNode(node);
      screen.setShowCatalog(true);
      screen.setShowAllProducts(false);
      catalog.setSelectedProduct(null);
    }
    if (onDismissMenus) onDismissMenus();
  };

  /**
   * Handles pressing a breadcrumb item to navigate up the stack.
   */
  const handleCrumbPress = (idx) => {
    catalog.goToCrumb(idx);
    // Ensure the catalog screen is visible when navigating via breadcrumbs
    screen.setShowCatalog(true);
    if (onDismissMenus) onDismissMenus();
  };

  /**
   * Selects a product from search results, closing all overlay screens first.
   */
  const selectProductFromSearch = (product) => {
    screen.closeAll();
    catalog.setSelectedProduct(product);
  };

  /**
   * Opens a named storefront screen (login, profile, orders, favorites, cart).
   * Clears the selected product so the screen renders without product context.
   */
  const openScreen = (screenKey) => {
    screen.setShowLogin(screenKey === 'login');
    screen.setShowProfile(screenKey === 'profile');
    screen.setShowOrders(screenKey === 'orders');
    screen.setShowFavorites(screenKey === 'favorites');
    screen.setShowCart(screenKey === 'cart');
    screen.setShowAllProducts(screenKey === 'allProducts');
    catalog.setSelectedProduct(null);
  };

  // ---------------------------------------------------------------------------
  // Public API — flat shape to keep consumers simple
  // ---------------------------------------------------------------------------
  return {
    // Screen flags
    showCatalog: screen.showCatalog,
    showCart: screen.showCart,
    showLogin: screen.showLogin,
    showProfile: screen.showProfile,
    showOrders: screen.showOrders,
    showFavorites: screen.showFavorites,
    showAllProducts: screen.showAllProducts,
    showMenu: screen.showMenu,

    // Screen setters (kept for components that toggle screens directly)
    setShowCatalog: screen.setShowCatalog,
    setShowCart: screen.setShowCart,
    setShowLogin: screen.setShowLogin,
    setShowProfile: screen.setShowProfile,
    setShowOrders: screen.setShowOrders,
    setShowFavorites: screen.setShowFavorites,
    setShowAllProducts: screen.setShowAllProducts,
    setShowMenu: screen.setShowMenu,

    // Catalog browsing
    selectedProduct: catalog.selectedProduct,
    navigationStack: catalog.navigationStack,
    currentLevel: catalog.currentLevel,
    crumbs: catalog.crumbs,
    depth: catalog.depth,
    setSelectedProduct: catalog.setSelectedProduct,

    // Orchestrated actions
    canGoBack,
    handleBackPress,
    handleHome,
    handleCatalogPress,
    handleAllProductsPress,
    handleCardPress,
    handleCrumbPress,
    selectProductFromSearch,
    openScreen,
  };
}
