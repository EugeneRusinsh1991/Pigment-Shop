import { useState, useEffect } from 'react';
import { Platform, UIManager, LayoutAnimation } from 'react-native';
import { findCategoryPath, getParentCategoryIds } from '../../../utils/categoryTreeUtils';

export function useExpandedIds(initialState = []) {
  const [expandedIds, setExpandedIds] = useState(initialState);
  const [lastExpandedId, setLastExpandedId] = useState(null);

  const toggleExpand = (id, descendantIds = []) => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental &&
      !global.nativeFabricUIManager
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIds((prev) => {
      if (prev.includes(id)) {
        const toRemove = new Set([id, ...descendantIds]);
        return prev.filter((x) => !toRemove.has(x));
      } else {
        return [...prev, id];
      }
    });
    setLastExpandedId(id);
  };

  const clearAll = () => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental &&
      !global.nativeFabricUIManager
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIds([]);
    setLastExpandedId(null);
  };

  return [expandedIds, toggleExpand, clearAll, setExpandedIds, lastExpandedId, setLastExpandedId];
}

export function useAutoExpandSelectedCategory(selectedCategoryId, categoryTree, setExpandedIds, onExpand) {
  useEffect(() => {
    if (selectedCategoryId && categoryTree) {
      if (onExpand) onExpand();
      const parentIds = getParentCategoryIds(categoryTree, selectedCategoryId);
      setExpandedIds((prev) => {
        const next = new Set([...prev, ...parentIds]);
        return Array.from(next);
      });
    }
  }, [selectedCategoryId, categoryTree]);
}

export { findCategoryPath, getParentCategoryIds };



