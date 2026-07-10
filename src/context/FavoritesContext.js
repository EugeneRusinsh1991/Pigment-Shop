/**
 * FavoritesContext.js
 *
 * Promotes `useFavorites` from a local hook into a React Context so any
 * component can access favorites state without prop drilling.
 */
import React, { createContext, useContext } from 'react';
import useFavorites from '../hooks/useFavorites';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const favs = useFavorites();
  return <FavoritesContext.Provider value={favs}>{children}</FavoritesContext.Provider>;
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavoritesContext must be used within FavoritesProvider');
  return ctx;
}
