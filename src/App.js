import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';

import AppHeader from './components/AppHeader';
import CartView from './components/CartView';
import NavMenu from './components/NavMenu';
import ProductPage from './components/ProductPage';
import SearchBar from './components/SearchBar';
import CatalogView from './components/CatalogView';
import AdminDashboard from './components/Admin/AdminDashboard';

import { HIERARCHY } from './data/hierarchy';
import { TRANSLATIONS } from './data/translations';
import useCart from './hooks/useCart';
import styles from './AppStyles';

function useThemeAndLang() {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('ru');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  
  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));
  const selectLanguage = (code) => {
    setLang(code);
    setShowLangMenu(false);
  };

  return { theme, isDark, lang, t, showLangMenu, setShowLangMenu, toggleTheme, selectLanguage };
}

function useNavigationState(setShowLangMenu) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [navigationStack, setNavigationStack] = useState([{ label: 'Catalog', items: HIERARCHY }]);
  const handleCardPress = (node) => {
    if (!node.children?.length) return setSelectedProduct(node);
    setNavigationStack((p) => [...p, { label: node.label, items: node.children }]);
    setShowLangMenu(false);
  };
  const handleCrumbPress = (idx) => { setNavigationStack((p) => p.slice(0, idx + 2)); setSelectedProduct(null); setShowLangMenu(false); };
  const handleBackPress = () => {
    if (showCart) return setShowCart(false);
    if (selectedProduct) return setSelectedProduct(null);
    if (navigationStack.length > 1) setNavigationStack((p) => p.slice(0, -1));
    setShowLangMenu(false);
  };
  const handleHome = () => {
    setNavigationStack([{ label: 'Catalog', items: HIERARCHY }]);
    setSelectedProduct(null);
    setShowCart(false);
    setShowLangMenu(false);
  };
  return {
    selectedProduct, showCart, showMenu, navigationStack, setSelectedProduct, setShowCart, setShowMenu,
    handleCardPress, handleCrumbPress, handleBackPress, handleHome,
  };
}

function AppLayout({ isDark, setShowLangMenu, children }) {
  return (
    <Pressable
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      onPress={() => setShowLangMenu(false)}
    >
      {children}
    </Pressable>
  );
}

function AppHeaderAndMenu({
  isDark, t, canGoBack, nav, lang, showLangMenu, setShowLangMenu, selectLanguage, toggleTheme, cart, currentLevel, handleHome, onAdminPress
}) {
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppHeader
        isDark={isDark} appName={t.appName} canGoBack={canGoBack && !nav.selectedProduct} onBack={nav.handleBackPress}
        onMenuPress={() => nav.setShowMenu(true)} lang={lang} showLangMenu={showLangMenu}
        onToggleLangMenu={() => setShowLangMenu(!showLangMenu)} onSelectLanguage={selectLanguage}
        onToggleTheme={toggleTheme} cartCount={cart.totalCount} onLoginPress={() => {}}
        onCartPress={() => { nav.setShowCart(true); nav.setSelectedProduct(null); }}
        onHome={handleHome} onAdminPress={onAdminPress}
      />
      <NavMenu
        visible={nav.showMenu} onClose={() => nav.setShowMenu(false)} items={currentLevel.items}
        onSelectItem={nav.handleCardPress} canGoBack={canGoBack} onBack={nav.handleBackPress}
        onHome={handleHome} isDark={isDark}
      />
    </>
  );
}

function MainContent({ showCart, selectedProduct, isDark, isWide, depth, currentLevel, items, crumbs, t, nav, cart }) {
  if (showCart) {
    return (
      <CartView
        items={cart.items} isDark={isDark} onIncrease={cart.increaseQty}
        onDecrease={cart.decreaseQty} onRemove={cart.removeItem}
      />
    );
  }
  if (selectedProduct) {
    return (
      <ProductPage
        product={selectedProduct} isDark={isDark} crumbs={crumbs}
        onCrumbPress={nav.handleCrumbPress} onBack={nav.handleBackPress}
        onAddToCart={(prod, prc, qty) => { cart.addItem(prod, prc, qty); nav.setShowCart(true); }}
      />
    );
  }
  return (
    <CatalogView
      isDark={isDark} isWide={isWide} depth={depth} currentLevel={currentLevel}
      items={items} crumbs={crumbs} t={t}
      onCrumbPress={nav.handleCrumbPress} onCardPress={nav.handleCardPress}
    />
  );
}

export default function App() {
  const { isDark, lang, t, showLangMenu, setShowLangMenu, toggleTheme, selectLanguage } = useThemeAndLang();
  const nav = useNavigationState(setShowLangMenu);
  const cart = useCart();
  const { width: windowWidth } = useWindowDimensions();
  const [showAdmin, setShowAdmin] = useState(false);
  const currentLevel = nav.navigationStack[nav.navigationStack.length - 1];
  const crumbs = nav.navigationStack.slice(1).map((s) => ({ label: s.label }));
  const canGoBack = nav.showCart || !!nav.selectedProduct || nav.navigationStack.length > 1;

  if (showAdmin) {
    return <AdminDashboard onClose={() => setShowAdmin(false)} />;
  }

  return (
    <AppLayout isDark={isDark} setShowLangMenu={setShowLangMenu}>
      <AppHeaderAndMenu
        isDark={isDark} t={t} canGoBack={canGoBack} nav={nav} lang={lang}
        showLangMenu={showLangMenu} setShowLangMenu={setShowLangMenu} selectLanguage={selectLanguage}
        toggleTheme={toggleTheme} cart={cart} currentLevel={currentLevel} handleHome={nav.handleHome}
        onAdminPress={() => setShowAdmin(true)}
      />
      <SearchBar isDark={isDark} onSelectResult={(p) => { nav.setSelectedProduct(p); nav.setShowCart(false); nav.setShowMenu(false); }} />
      <View style={styles.mainContent}>
        <MainContent
          showCart={nav.showCart} selectedProduct={nav.selectedProduct} isDark={isDark} isWide={windowWidth >= 768}
          depth={nav.navigationStack.length - 1} currentLevel={currentLevel} items={currentLevel.items} crumbs={crumbs}
          t={t} nav={nav} cart={cart}
        />
      </View>
    </AppLayout>
  );
}
