import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * useCatalogBrowsing.js
 *
 * Manages catalog traversal state: selectedProduct, breadcrumb/navigation stack,
 * current catalog depth, and category traversal. Derives currentLevel, crumbs,
 * and depth from its own state without depending on the screen-state module.
 *
 * This module is intentionally isolated from UI screen visibility logic.
 */
export default function useCatalogBrowsing(categoryTree) {
  const { t } = useTheme();

  const [selectedProduct, rawSetSelectedProduct] = useState(null);
  const [navigationStack, setNavigationStack] = useState([
    { label: t('navRootCatalog'), items: categoryTree },
  ]);

  // Keep root level in sync when catalog data or language changes
  React.useEffect(() => {
    setNavigationStack((prev) => {
      const updated = [...prev];
      updated[0] = { label: t('navRootCatalog'), items: categoryTree };
      return updated;
    });
  }, [categoryTree, t]);

  /**
   * Sets the selected product and rebuilds the navigation stack to reflect
   * the product's category path. Clears selection when null is passed.
   */
  const setSelectedProduct = (product) => {
    if (product) {
      const newStack = buildStackForProduct(product, categoryTree, t);
      if (newStack) setNavigationStack(newStack);
    }
    rawSetSelectedProduct(product);
  };

  /**
   * Pushes a category/subcategory node onto the navigation stack.
   */
  const enterNode = (node) => {
    setNavigationStack((prev) => [
      ...prev,
      { label: node.label, items: node.children || [] },
    ]);
  };

  /**
   * Pops back to the breadcrumb at the given index (0-based, relative to depth).
   * Also clears selectedProduct.
   */
  const goToCrumb = (idx) => {
    setNavigationStack((prev) => prev.slice(0, idx + 2));
    rawSetSelectedProduct(null);
  };

  /**
   * Pops one level off the navigation stack (if depth > 0).
   */
  const goBack = () => {
    setNavigationStack((prev) => prev.slice(0, -1));
  };

  /**
   * Resets the browsing state to the catalog root.
   */
  const resetToRoot = () => {
    setNavigationStack([{ label: t('navRootCatalog'), items: categoryTree }]);
    rawSetSelectedProduct(null);
  };

  // Derived values
  const currentLevel = navigationStack[navigationStack.length - 1];
  const crumbs = navigationStack.slice(1).map((s) => ({ label: s.label }));
  if (selectedProduct) {
    const productLabel =
      selectedProduct.label ?? selectedProduct.name ?? selectedProduct.title ?? selectedProduct.id;
    if (productLabel) {
      crumbs.push({ label: productLabel });
    }
  }
  const depth = navigationStack.length - 1;
  const canGoDeeper = depth > 0 || !!selectedProduct;

  return {
    // State
    selectedProduct,
    navigationStack,
    // Derived
    currentLevel,
    crumbs,
    depth,
    canGoDeeper,
    // Actions
    setSelectedProduct,
    enterNode,
    goToCrumb,
    goBack,
    resetToRoot,
  };
}

/**
 * Builds a navigation stack that positions the product inside its category.
 * Returns null when the category cannot be resolved.
 */
function buildStackForProduct(product, categoryTree, t) {
  if (!product) return null;
  const catLabel = product.category || t('navCategoryOther');
  const catNode =
    categoryTree.find((c) => c.label === catLabel) ||
    categoryTree.find((c) => c.label === t('navCategoryOther'));
  if (!catNode) return null;
  return [
    { label: t('navRootCatalog'), items: categoryTree },
    { label: catNode.label, items: catNode.children },
  ];
}
