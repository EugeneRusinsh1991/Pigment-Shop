import { useState } from 'react';

/**
 * Hook for controlling shell header menu visibility states.
 */
export function useMenuVisibilityState() {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const closeMenus = () => {
    setShowLangMenu(false);
    setShowUserMenu(false);
    setShowCurrencyMenu(false);
    setShowNavMenu(false);
  };

  const toggleLangMenu = () => {
    setShowLangMenu((prev) => {
      const next = !prev;
      if (next) {
        setShowUserMenu(false);
        setShowCurrencyMenu(false);
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
    closeMenus,
    toggleLangMenu,
    toggleUserMenu,
    toggleCurrencyMenu,
  };
}
