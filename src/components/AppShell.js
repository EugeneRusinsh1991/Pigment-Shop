/**
 * AppShell.js
 *
 * Top-level layout component for the storefront. Reads all state from
 * contexts — no props are drilled through this component into children.
 *
 * Uses the refactored NavigationContext which is backed by the orchestration
 * layer. Screen switching, menu dismissal, and back navigation are all
 * delegated to the orchestrator via useNavigation().
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { useUIMenu } from '../context/UIMenuContext';

import styles from '../AppStyles';
import AppHeader from './AppHeader';
import MainContent from './MainContent';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';
import SharedLayoutWrapper from './SharedLayoutWrapper';

const ic = (isDark, dark, light) => (isDark ? dark : light);

function shouldHeaderGoBack(nav) {
  return nav.canGoBack && !nav.selectedProduct;
}

function isBaseScreenActive(nav) {
  return !nav.showLogin &&
         !nav.showProfile &&
         !nav.showOrders &&
         !nav.showFavorites &&
         !nav.showCart &&
         !nav.showAllProducts;
}

function isHomePage(nav) {
  return isBaseScreenActive(nav) &&
         !nav.showCatalog &&
         !nav.selectedProduct &&
         nav.depth === 0;
}

function buildMenuItems(t, catalogItems) {
  return {
    mainItems: [
      { id: 'nav-home', label: t('navHome'), icon: '⌂', action: 'home' },
      { id: 'nav-catalog', label: t('navCatalog'), icon: '▣', action: 'catalog' },
      { id: 'nav-all-products', label: t('navAllProducts'), icon: '⬢', action: 'allProducts' },
    ],
    categoryItems: catalogItems || [],
  };
}

export default function AppShell({ onOpenAdmin }) {
  const { isDark, lang, t, toggleTheme, selectLanguage } = useTheme();
  const { showLangMenu, setShowLangMenu, showUserMenu, setShowUserMenu, closeMenus } = useUIMenu();
  const nav = useNavigation();
  const auth = useAuth();
  const cart = useCartContext();

  const { width: windowWidth } = useWindowDimensions();
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const isWide = windowWidth >= 768;

  // Menu dismissal for header dropdowns is handled via UIMenuContext.
  // Navigation-level menu dismissal (lang/user menus) is wired inside the
  // orchestrator via onDismissMenus — so navigation actions automatically
  // close those menus without extra calls here.
  const handleHome = () => {
    closeMenus();
    nav.handleHome();
  };

  const handleSelectLanguage = (code) => {
    selectLanguage(code);
    setShowLangMenu(false);
  };

  const handleLogout = () => {
    auth.logout();
    handleHome();
  };

  // Uses nav.openScreen which closes all other screens and clears selectedProduct.
  const handleNavigate = (screenKey) => {
    nav.openScreen(screenKey);
    setShowUserMenu(false);
  };

  const isProductHolderCategory = (item) =>
    item?.isCategory &&
    item.children?.length > 0 &&
    item.children.every((child) => !child.isCategory);

  const handleMenuSelect = (item) => {
    if (item?.action === 'home') {
      handleHome();
      return;
    }
    if (item?.action === 'catalog') {
      nav.handleCatalogPress();
      return;
    }
    if (item?.action === 'allProducts') {
      nav.handleAllProductsPress();
      return;
    }
    if (item?.action === 'favorites') {
      handleNavigate('favorites');
      return;
    }

    nav.handleCardPress(item);
    if (isProductHolderCategory(item)) {
      nav.setShowMenu(false);
    }
  };

  const { mainItems, categoryItems } = React.useMemo(
    () => buildMenuItems(t, nav.currentLevel.items),
    [t, nav.currentLevel.items],
  );

  return (
    <Pressable
      style={[styles.container, ic(isDark, styles.containerDark, styles.containerLight)]}
      onPress={closeMenus}
    >
      <StatusBar style={ic(isDark, 'light', 'dark')} />

      <AppHeader
        isDark={isDark}
        appName={t.appName}
        canGoBack={shouldHeaderGoBack(nav)}
        onBack={nav.handleBackPress}
        onMenuPress={() => nav.setShowMenu(true)}
        lang={lang}
        showLangMenu={showLangMenu}
        onToggleLangMenu={() => setShowLangMenu(!showLangMenu)}
        onSelectLanguage={handleSelectLanguage}
        onToggleTheme={toggleTheme}
        cartCount={cart.totalCount}
        onLoginPress={() => handleNavigate('login')}
        onCartPress={() => handleNavigate('cart')}
        onHome={handleHome}
        onAdminPress={onOpenAdmin}
        showUserMenu={showUserMenu}
        onToggleUserMenu={() => setShowUserMenu(!showUserMenu)}
        isAuthenticated={auth.isAuthenticated}
        onLogout={handleLogout}
        onProfilePress={() => handleNavigate('profile')}
        onOrdersPress={() => handleNavigate('orders')}
        onFavoritesPress={() => handleNavigate('favorites')}
        onCatalogPress={nav.handleCatalogPress}
        onAllProductsPress={nav.handleAllProductsPress}
      />

      <NavMenu
        visible={nav.showMenu}
        onClose={() => nav.setShowMenu(false)}
        mainItems={mainItems}
        categoryItems={categoryItems}
        onSelectItem={handleMenuSelect}
        canGoBack={nav.canGoBack}
        onBack={nav.handleBackPress}
        isDark={isDark}
        onAdminPress={onOpenAdmin}
        onSelectLanguage={handleSelectLanguage}
        lang={lang}
        onToggleTheme={toggleTheme}
      />

      {isHomePage(nav) && (
        <View
          style={[
            styles.stickySearchContainer,
            ic(isDark, styles.stickySearchContainerDark, styles.stickySearchContainerLight),
            isSearchActive && { zIndex: 10000, elevation: 10000 }
          ]}
        >
          <View style={{ width: '100%', maxWidth: 1048, alignSelf: 'center' }}>
            <SearchBar isDark={isDark} onActiveChange={setIsSearchActive} />
          </View>
        </View>
      )}

      <View style={styles.mainContent}>
        <SharedLayoutWrapper
          isDark={isDark}
          showFooter
          contentContainerStyle={styles.mainContentBody}
          footerContainerStyle={styles.footerContainer}
        >
          <MainContent isDark={isDark} isWide={isWide} />
        </SharedLayoutWrapper>
      </View>
    </Pressable>
  );
}
