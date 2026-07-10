/**
 * CatalogContext.js
 *
 * Storefront-facing catalog context. Provides a stable read-only view model
 * of the product and category catalog to all public UI components.
 *
 * This context is a PASSIVE READER. It:
 *   - Subscribes to catalogState via useSyncExternalStore (React 18+).
 *   - Derives the storefront view model via catalogAssemblyService.
 *   - Has NO dependency on admin mutation services or the admin domain.
 *
 * Any admin-side mutation (add/update/remove product or category) flows through
 * adminCatalogBoundary, which calls catalogState.notify() — that automatically
 * triggers a re-render here without any manual refresh() calls.
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
