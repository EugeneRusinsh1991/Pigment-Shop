/**
 * AppShell.js
 *
 * Top-level layout component for the storefront. Reads all state from
 * contexts — no props are drilled through this component into children.
 *
 * Replaces the former `StorefrontApp`, `AppHeaderAndMenu`, and `MainContent`
 * components that lived directly in App.js.
 */
import React from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '../context/ThemeContext';
import { useUIMenu } from '../context/UIMenuContext';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';

import AppHeader from './AppHeader';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';
import PageNavigation from './PageNavigation';
import MainContent from './MainContent';
import styles from '../AppStyles';

const ic = (isDark, dark, light) => (isDark ? dark : light);

function shouldHeaderGoBack(nav) {
  return nav.canGoBack && !nav.selectedProduct;
}

function resolveCrumbs(nav) {
  return nav.selectedProduct 
    ? [...nav.crumbs, { label: nav.selectedProduct.label }] 
    : nav.crumbs;
}

function shouldShowBreadcrumbs(nav) {
  return !nav.showLogin && !nav.showProfile && !nav.showOrders && !nav.showFavorites && !nav.showCart;
}

export default function AppShell({ onOpenAdmin }) {
  const { isDark, lang, t, toggleTheme, selectLanguage } = useTheme();
  const { showLangMenu, setShowLangMenu, showUserMenu, setShowUserMenu, closeMenus } = useUIMenu();
  const nav = useNavigation();
  const auth = useAuth();
  const cart = useCartContext();

  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;

  const { currentLevel, crumbs, selectedProduct } = nav;

  const handleHome = () => {
    closeMenus();
    nav.handleHome();
  };

  const handleSelectLanguage = (code) => {
    selectLanguage(code);
    setShowLangMenu(false);
  };

  const handleLoginPress = () => {
    nav.setShowLogin(true);
    nav.setShowProfile(false);
    nav.setShowOrders(false);
    setShowUserMenu(false);
  };

  const handleCartPress = () => {
    nav.setShowCart(true);
    nav.setSelectedProduct(null);
    nav.setShowLogin(false);
    nav.setShowProfile(false);
    nav.setShowOrders(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    auth.logout();
    handleHome();
  };

  const handleProfilePress = () => {
    nav.setShowProfile(true);
    nav.setShowOrders(false);
    nav.setShowLogin(false);
    nav.setShowFavorites(false);
    nav.setShowCart(false);
    nav.setSelectedProduct(null);
    setShowUserMenu(false);
  };

  const handleOrdersPress = () => {
    nav.setShowOrders(true);
    nav.setShowProfile(false);
    nav.setShowLogin(false);
    nav.setShowFavorites(false);
    nav.setShowCart(false);
    nav.setSelectedProduct(null);
    setShowUserMenu(false);
  };

  const handleFavoritesPress = () => {
    nav.setShowFavorites(true);
    nav.setShowProfile(false);
    nav.setShowOrders(false);
    nav.setShowLogin(false);
    nav.setShowCart(false);
    nav.setSelectedProduct(null);
    setShowUserMenu(false);
  };

  const handleMenuOpen = () => nav.setShowMenu(true);
  const handleMenuClose = () => nav.setShowMenu(false);
  const handleToggleLangMenu = () => setShowLangMenu(!showLangMenu);
  const handleToggleUserMenu = () => setShowUserMenu(!showUserMenu);

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
        onMenuPress={handleMenuOpen}
        lang={lang}
        showLangMenu={showLangMenu}
        onToggleLangMenu={handleToggleLangMenu}
        onSelectLanguage={handleSelectLanguage}
        onToggleTheme={toggleTheme}
        cartCount={cart.totalCount}
        onLoginPress={handleLoginPress}
        onCartPress={handleCartPress}
        onHome={handleHome}
        onAdminPress={onOpenAdmin}
        showUserMenu={showUserMenu}
        onToggleUserMenu={handleToggleUserMenu}
        isAuthenticated={auth.isAuthenticated}
        onLogout={handleLogout}
        onProfilePress={handleProfilePress}
        onOrdersPress={handleOrdersPress}
        onFavoritesPress={handleFavoritesPress}
        onCatalogPress={nav.handleCatalogPress}
      />

      <NavMenu
        visible={nav.showMenu}
        onClose={handleMenuClose}
        items={currentLevel.items}
        onSelectItem={nav.handleCardPress}
        canGoBack={nav.canGoBack}
        onBack={nav.handleBackPress}
        onHome={handleHome}
        isDark={isDark}
      />

      <View style={{ alignSelf: 'center', width: '100%', maxWidth: 1064, zIndex: 500, marginTop: 16, marginBottom: 8, paddingHorizontal: 8 }}>
        <SearchBar isDark={isDark} />
      </View>

      <View style={styles.mainContent}>
        <PageNavigation
          isDark={isDark}
          crumbs={resolveCrumbs(nav)}
          onCrumbPress={nav.handleCrumbPress}
          onBack={nav.handleBackPress}
          showBack={nav.canGoBack}
          showBreadcrumbs={shouldShowBreadcrumbs(nav)}
        />
        <MainContent isDark={isDark} isWide={isWide} />
      </View>
    </Pressable>
  );
}
