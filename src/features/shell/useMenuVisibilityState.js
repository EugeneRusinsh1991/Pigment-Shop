import { useState } from 'react';
import { useDrawerBackHandler } from '../../hooks/useProductNavigation';

/**
 * Hook for controlling shell header menu visibility states.
 */
export function useMenuVisibilityState() {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const closeMenus = () => {
    setShowLangMenu(false);
    setShowUserMenu(false);
    setShowCurrencyMenu(false);
    setShowNavMenu(false);
    setShowCartDrawer(false);
  };

  const isAnyMenuOpen = showLangMenu || showUserMenu || showCurrencyMenu || showNavMenu || showCartDrawer;
  useDrawerBackHandler(isAnyMenuOpen, closeMenus);

  const toggleLangMenu = () => {
    setShowLangMenu((prev) => {
      const next = !prev;
      if (next) {
        setShowUserMenu(false);
        setShowCurrencyMenu(false);
        setShowCartDrawer(false);
      }
      return next;
    });
  };

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => {
      const next = !prev;
      if (next) {
        setShowLangMenu(false);
        setShowCurrencyMenu(false);
        setShowCartDrawer(false);
      }
      return next;
    });
  };

  const toggleCurrencyMenu = () => {
    setShowCurrencyMenu((prev) => {
      const next = !prev;
      if (next) {
        setShowLangMenu(false);
        setShowUserMenu(false);
        setShowCartDrawer(false);
      }
      return next;
    });
  };

  const toggleCartDrawer = () => {
    setShowCartDrawer((prev) => {
      const next = !prev;
      if (next) {
        setShowLangMenu(false);
        setShowUserMenu(false);
        setShowCurrencyMenu(false);
      }
      return next;
    });
  };

  return {
    showLangMenu,
    setShowLangMenu,
    showUserMenu,
    setShowUserMenu,
    showCurrencyMenu,
    setShowCurrencyMenu,
    showNavMenu,
    setShowNavMenu,
    showCartDrawer,
    setShowCartDrawer,
    closeMenus,
    toggleLangMenu,
    toggleUserMenu,
    toggleCurrencyMenu,
    toggleCartDrawer,
  };
}
