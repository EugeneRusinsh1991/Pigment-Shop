import { useCallback, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { getContentGridWidth } from '../../utils/layoutUtils';
import { useCart } from '../cart/CartContext';
import { useCatalog } from '../catalog/CatalogContext';
import { useMenuVisibilityState } from './useMenuVisibilityState';

function buildMenuItems(t, catalogItems) {
  return {
    mainItems: [
      { id: 'nav-catalog', label: t('navCatalog'), icon: '▣', route: '/catalog' },
      { id: 'nav-all-products', label: t('navAllProducts'), icon: '⬢', route: '/catalog' },
      { id: 'nav-contact', label: t('navContactUs'), icon: '✉', route: '/contact' },
    ],
    categoryItems: catalogItems || [],
    contactItems: [
      { id: 'contact-instagram', label: t('contactInstagram'), icon: '📸', action: 'instagram' },
      { id: 'contact-telegram', label: t('contactTelegram'), icon: '✈️', action: 'telegram' },
    ],
  };
}


export function useAppShell() {
  // Layout state
  const { width: windowWidth } = useWindowDimensions();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const isWide = windowWidth >= 768;
  const contentWidth = getContentGridWidth(windowWidth);

  // Navigation, UI Menu, Auth, Cart, Theme, Language
  const menuState = useMenuVisibilityState();
  const auth = useAuth();
  const cart = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { lang, t, selectLanguage } = useLanguage();

  const handleLogout = useCallback(() => {
    auth.logout();
    menuState.closeMenus();
  }, [auth, menuState]);

  const handleSelectLanguage = useCallback((code) => {
    selectLanguage(code);
    menuState.setShowLangMenu(false);
  }, [selectLanguage, menuState]);

  const { categoryTree } = useCatalog();

  const { mainItems, categoryItems, contactItems } = useMemo(
    () => buildMenuItems(t, categoryTree),
    [t, categoryTree],
  );

  const themeState = useMemo(() => ({
    isDark,
    lang,
    t,
    toggleTheme,
    selectLanguage,
  }), [isDark, lang, t, toggleTheme, selectLanguage]);

  const layoutState = useMemo(() => ({
    isSearchActive,
    setIsSearchActive,
    isWide,
    contentWidth,
  }), [isSearchActive, setIsSearchActive, isWide, contentWidth]);

  const navItems = useMemo(() => ({
    mainItems,
    categoryItems,
    contactItems,
  }), [mainItems, categoryItems, contactItems]);

  return useMemo(() => ({
    ...themeState,
    ...layoutState,
    ...navItems,
    menuState,
    auth,
    cart,
    handleLogout,
    handleSelectLanguage,
  }), [
    themeState,
    layoutState,
    navItems,
    menuState,
    auth,
    cart,
    handleLogout,
    handleSelectLanguage,
  ]);
}
