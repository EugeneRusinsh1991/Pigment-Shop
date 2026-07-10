/**
 * CatalogContext.js
 *
 * Single source of truth for all product and category data exposed to the UI.
 *
 * Subscribes to catalogState via useSyncExternalStore (React 18+).
 * Any mutation made through adminProductsService or adminCatalogBoundary
 * calls catalogState.notify() which automatically triggers a re-render here —
 * no version counters or manual refresh() calls are needed.
 *
 * All derived values are memoized with useMemo so that downstream consumers
 * (e.g. useNavigationState) receive stable object references between renders
 * and do not enter infinite update loops.
 */
import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import { getBanners, getCategories, getProducts, subscribe } from '../data/catalogState';
import { buildCatalogViewModel } from '../services/catalogAssemblyService';
import { useTheme } from './ThemeContext';

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  // Re-renders automatically whenever catalogState.notify() is called.
  // getProducts / getCategories return a stable reference — the same array
  // object — until setProducts / setCategories replaces it. This satisfies
  // useSyncExternalStore's requirement that getSnapshot returns a cached value.
  const products   = useSyncExternalStore(subscribe, getProducts);
  const categories = useSyncExternalStore(subscribe, getCategories);
  const banners    = useSyncExternalStore(subscribe, getBanners);
  const { lang } = useTheme();

  const catalogViewModel = useMemo(
    () => buildCatalogViewModel({ products, categories, lang }),
    [products, categories, lang]
  );

  const { flatList, categoryTree, adminCategoryTree } = catalogViewModel;

  return (
    <CatalogContext.Provider
      value={{ flatList, categoryTree, adminCategoryTree, banners }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
