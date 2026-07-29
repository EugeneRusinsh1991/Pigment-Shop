/**
 * FavoritesContext.js
 *
 * Promotes `useFavorites` from a local hook into a React Context so any
 * component can access favorites state without prop drilling.
 */
import { createContext, useContext } from 'react';
import useFavoritesHook from './useFavorites';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const favs = useFavoritesHook();
  return <FavoritesContext.Provider value={favs}>{children}</FavoritesContext.Provider>;
}

function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}

/** @deprecated Use `useFavorites` instead */
export const useFavoritesContext = useFavorites;
