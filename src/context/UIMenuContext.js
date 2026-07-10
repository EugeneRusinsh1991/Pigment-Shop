/**
 * UIMenuContext.js
 *
 * Owns the two transient header overlay menus: the language picker and the
 * user account menu. This is intentionally separate from ThemeContext because
 * menu visibility is a UI concern, not a theme/language concern.
 *
 * NavigationContext consumes `closeMenus` so that any navigation action
 * automatically dismisses open menus — without creating a circular dependency.
 */
import React, { createContext, useContext, useState } from 'react';

const UIMenuContext = createContext(null);

export function UIMenuProvider({ children }) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const closeMenus = () => {
    setShowLangMenu(false);
    setShowUserMenu(false);
  };

  return (
    <UIMenuContext.Provider value={{ showLangMenu, setShowLangMenu, showUserMenu, setShowUserMenu, closeMenus }}>
      {children}
    </UIMenuContext.Provider>
  );
}

export function useUIMenu() {
  const ctx = useContext(UIMenuContext);
  if (!ctx) throw new Error('useUIMenu must be used within UIMenuProvider');
  return ctx;
}
