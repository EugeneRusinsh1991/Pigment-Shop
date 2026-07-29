import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import useUnifiedCardGrid from '../../hooks/useUnifiedCardGrid';
import { findCategoryPath } from '../../utils/categoryTreeUtils';
import { getContentGridWidth } from '../../utils/layoutUtils';
import { useCatalog } from './CatalogContext';


export function useCatalogViewData({
  overrideDepth,
  overrideCurrentLevel,
  overrideItems,
  overrideCrumbs,
  isWide,
  hasFilterSidebar = false,
}) {
  const { width: windowWidth } = useWindowDimensions();
  const { t } = useTheme();
  const { categoryId } = useLocalSearchParams();
  const { categoryTree } = useCatalog();

  const computedPath = useMemo(() => {
    if (categoryId && categoryTree) {
      return findCategoryPath(categoryTree, categoryId) || [];
    }
    return [];
  }, [categoryId, categoryTree]);

  const { computedDepth, computedCurrentLevel, computedItems, computedCrumbs } = useMemo(() => {
    let depth = 0;
    let currentLevel = { label: t('navRootCatalog'), items: categoryTree || [] };
    let items = categoryTree || [];
    let crumbs = [];

    if (computedPath.length > 0) {
      depth = computedPath.length;
      const lastNode = computedPath[computedPath.length - 1];
      currentLevel = { label: lastNode.label, items: lastNode.children || [] };
      items = lastNode.children || [];
      crumbs = computedPath.map((node) => ({
        id: node.id,
        label: node.label,
        href: { pathname: '/catalog/[categoryId]', params: { categoryId: node.id } },
      }));
    }
    return { computedDepth: depth, computedCurrentLevel: currentLevel, computedItems: items, computedCrumbs: crumbs };
  }, [computedPath, categoryTree, t]);

  const depth = overrideDepth !== undefined ? overrideDepth : computedDepth;
  const currentLevel = overrideCurrentLevel !== undefined ? overrideCurrentLevel : computedCurrentLevel;
  const items = overrideItems !== undefined ? overrideItems : computedItems;
  const crumbs = overrideCrumbs !== undefined ? overrideCrumbs : computedCrumbs;

  const { cols } = useUnifiedCardGrid({ hasFilterSidebar });
  const gridWidth = getContentGridWidth(windowWidth, depth);

  return {
    depth,
    currentLevel,
    items,
    crumbs,
    cols,
    gridWidth,
  };
}

export function useCatalogRootData() {
  const { isDark, t } = useTheme();
  const { categoryTree } = useCatalog();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const depth = 0;
  const currentLevel = { label: t('navRootCatalog'), items: categoryTree || [] };
  const items = categoryTree || [];
  const crumbs = [];

  return { isDark, isWide, depth, currentLevel, items, crumbs };
}
