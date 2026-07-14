/**
 * NavigationContext.js
 *
 * Exposes a narrow, stable public interface for storefront navigation.
 * Internally uses the orchestration layer (useNavigationOrchestrator) which
 * coordinates the screen-state and catalog-browsing modules.
 *
 * Components should import only the values and actions they actually need.
 * The context does NOT pass the full internal state shape to consumers.
 */
import { createContext, useContext, useMemo } from 'react';
import useNavigationOrchestrator from '../hooks/useNavigationOrchestrator';
import { useCatalog } from './CatalogContext';
import { useUIMenu } from './UIMenuContext';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const { categoryTree } = useCatalog();
  const { setShowLangMenu, setShowUserMenu } = useUIMenu();

  const dismissMenus = useMemo(
    () => () => { setShowLangMenu(false); setShowUserMenu(false); },
    [setShowLangMenu, setShowUserMenu]
  );

  const nav = useNavigationOrchestrator(categoryTree, dismissMenus);

  /**
   * Narrow public interface.
   * Only include values/actions that are consumed by UI components.
   * Internal module details (screen/catalog sub-hooks) stay encapsulated.
   */
  const value = useMemo(() => ({
    // --- Screen visibility ---
    showCatalog:   nav.showCatalog,
    showCart:      nav.showCart,
    showLogin:     nav.showLogin,
    showProfile:   nav.showProfile,
    showOrders:    nav.showOrders,
    showFavorites: nav.showFavorites,
    showAllProducts: nav.showAllProducts,
    showMenu:      nav.showMenu,

    // --- Screen toggles (used by AppShell, useLoginForm, FavoritesPage, CatalogPage) ---
    setShowCatalog:   nav.setShowCatalog,
    setShowCart:      nav.setShowCart,
    setShowLogin:     nav.setShowLogin,
    setShowProfile:   nav.setShowProfile,
    setShowOrders:    nav.setShowOrders,
    setShowFavorites: nav.setShowFavorites,
    setShowAllProducts: nav.setShowAllProducts,
    setShowMenu:      nav.setShowMenu,

    // --- Catalog browsing ---
    selectedProduct:  nav.selectedProduct,
    currentLevel:     nav.currentLevel,
    crumbs:           nav.crumbs,
    depth:            nav.depth,
    setSelectedProduct: nav.setSelectedProduct,

    // --- Derived ---
    canGoBack: nav.canGoBack,

    // --- Orchestrated actions ---
    handleBackPress:        nav.handleBackPress,
    handleHome:             nav.handleHome,
    handleCatalogPress:     nav.handleCatalogPress,
    handleAllProductsPress: nav.handleAllProductsPress,
    handleCardPress:        nav.handleCardPress,
    handleCrumbPress:       nav.handleCrumbPress,
    selectProductFromSearch: nav.selectProductFromSearch,
    openScreen:             nav.openScreen,
  }), [nav]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
