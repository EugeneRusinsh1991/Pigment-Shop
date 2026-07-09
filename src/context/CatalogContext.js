/**
 * CatalogContext.js
 *
 * Single source of truth for all product data.
 * The admin panel mutates the product list via the service;
 * the storefront reads from this context.
 */
import React, { createContext, useCallback, useContext, useState } from 'react';
import { getAdminProducts } from '../data/adminProducts';
import { buildCatalogTree, buildFlatProductList } from '../services/catalogBuilder';

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [version, setVersion] = useState(0);

  // Increment version to force re-computation after admin changes
  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  const products = getAdminProducts();
  const activeProducts = products.filter((p) => p.active !== false);
  const flatList = buildFlatProductList(activeProducts);
  const categoryTree = buildCatalogTree(activeProducts);

  return (
    <CatalogContext.Provider value={{ flatList, categoryTree, refresh, version }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
