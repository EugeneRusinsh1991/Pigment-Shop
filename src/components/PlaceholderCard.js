import React from 'react';
import CategoryCard from './CategoryCard';
import ProductCard from './ProductCard';

/**
 * PlaceholderCard Component
 * Acts as a router/wrapper that renders either a CategoryCard or a ProductCard.
 */
export default function PlaceholderCard({ item, onPress, isDark, isLeaf, depth }) {
  if (!isLeaf) {
    return <CategoryCard item={item} onPress={onPress} isDark={isDark} depth={depth} />;
  }
  return <ProductCard item={item} onPress={onPress} isDark={isDark} depth={depth} />;
}
