import React from 'react';
import { FlatList } from 'react-native';
import CategoryCard from './CategoryCard';
import ProductCard from './ProductCard';

/**
 * PlaceholderCard Component
 * Acts as a router/wrapper that renders either a CategoryCard or a ProductCard.
 */
export default function PlaceholderCard({ item, onPress, isDark, isLeaf, depth, isFavorite, onToggleFavorite }) {
  if (!isLeaf) {
    return <CategoryCard item={item} onPress={onPress} isDark={isDark} depth={depth} />;
  }
  return <ProductCard item={item} onPress={onPress} isDark={isDark} depth={depth} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />;
}

/**
 * PlaceholderGrid Component
 * Renders a flat grid of Leaf PlaceholderCards.
 */
export function PlaceholderGrid({ data, cols, gridKey, isDark, onCardPress, favs }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={cols}
      key={`${gridKey}-${cols}`}
      renderItem={({ item }) => (
        <PlaceholderCard
          item={item}
          onPress={() => onCardPress(item)}
          isDark={isDark}
          isLeaf={true}
          isFavorite={favs?.isFavorite(item.id)}
          onToggleFavorite={favs?.toggleFavorite}
        />
      )}
      scrollEnabled={false}
    />
  );
}

