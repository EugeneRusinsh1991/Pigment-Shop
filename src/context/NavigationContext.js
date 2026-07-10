/**
 * NavigationContext.js
 *
 * Promotes `useNavigationState` from a local hook into a React Context.
 * This eliminates the need to pass navigation handlers as props through the
 * component tree. It also consumes UIMenuContext internally so that any
 * navigation action automatically dismisses open header menus — breaking the
 * inverted-dependency that previously required external setters to be injected
 * as arguments into useNavigationState.
 */
import React, { createContext, useContext } from 'react';
import { useCatalog } from './CatalogContext';
import { useUIMenu } from './UIMenuContext';
import useNavigationState from '../hooks/useNavigationState';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const { categoryTree } = useCatalog();
  const { setShowLangMenu, setShowUserMenu } = useUIMenu();

  const nav = useNavigationState(setShowLangMenu, categoryTree, setShowUserMenu);

  return (
    <NavigationContext.Provider value={nav}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
