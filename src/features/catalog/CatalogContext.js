/**
 * CatalogContext.js
 *
 * Storefront-facing catalog context. Provides a stable read-only view model
 * of the product and category catalog to all public UI components.
 */
import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getBanners, getCategories, getProducts, getIsLoading, subscribe } from '../../data/catalogState';
import {
    buildCategoryLookup,
    buildCategorySubtreeMap,
    buildCategoryTree,
    buildFlatList,
    buildNormalizedCategories,
    buildNormalizedProducts,
    buildProductCategoryMap
} from '../../services/catalogViewModel';

export const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const products   = useSyncExternalStore(subscribe, getProducts);
  const categories = useSyncExternalStore(subscribe, getCategories);
  const banners    = useSyncExternalStore(subscribe, getBanners);
  const isLoading  = useSyncExternalStore(subscribe, getIsLoading);
  const { lang } = useLanguage();

  const rawProducts = products || [];
  const rawCategories = categories || [];

  const productCategoryMap = useMemo(() => buildProductCategoryMap(rawCategories), [rawCategories]);
  const normalizedProducts = useMemo(() => buildNormalizedProducts(rawProducts, productCategoryMap), [rawProducts, productCategoryMap]);
  const normalizedCategories = useMemo(() => buildNormalizedCategories(rawCategories), [rawCategories]);

  const categoryLookup = useMemo(() => buildCategoryLookup(normalizedCategories), [normalizedCategories]);

  const flatList = useMemo(() => buildFlatList(normalizedProducts, categoryLookup, lang), [normalizedProducts, categoryLookup, lang]);
  const categoryTree = useMemo(() => buildCategoryTree(normalizedCategories, flatList, lang), [normalizedCategories, flatList, lang]);

  const flatListMap = useMemo(() => new Map(flatList.map((item) => [item.id, item])), [flatList]);

  const searchIndex = useMemo(() => {
    const cache = new Map();
    return {
      get(id) {
        if (!id) return [];
        if (cache.has(id)) return cache.get(id);
        const item = flatListMap.get(id);
        if (!item) return [];

        const searchableTexts = [item.label, item.category, item.subcategory, item.brand, item.sku]
          .filter(Boolean)
          .map((t) => String(t).toLowerCase());
        const tokens = searchableTexts.flatMap((text) => {
          const words = text.split(/[\s\-\/\(\),;]+/).filter(Boolean);
          return [...words, text];
        });
        cache.set(id, tokens);
        return tokens;
      },
    };
  }, [flatListMap]);

  const categorySubtreeMap = useMemo(() => buildCategorySubtreeMap(categoryTree), [categoryTree]);

  const value = useMemo(() => ({ 
    flatList, categoryTree, banners, searchIndex, categoryLookup, categorySubtreeMap, isLoading 
  }), [flatList, categoryTree, banners, searchIndex, categoryLookup, categorySubtreeMap, isLoading]);

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
