import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import CategoryCard from './CategoryCard';
import ProductCard from '../product/ProductCard';
import NavigationCard from '../../components/Card/NavigationCard';

/**
 * PlaceholderCard Component
 * Acts as a router/wrapper that renders either a CategoryCard, a ProductCard, or a NavigationCard.
 */
const PlaceholderCard = React.memo(function PlaceholderCard({ item, isDark, isLeaf, depth, isFavorite, onToggleFavorite }) {
  if (item.isNavigationCard) {
    return (
      <Link href={item.href} asChild>
        <NavigationCard type={item.type} isDark={isDark} text={item.text} />
      </Link>
    );
  }
  
  const href = isLeaf ? { pathname: '/product/[id]', params: { id: item.id } } : { pathname: '/catalog/[categoryId]', params: { categoryId: item.id } };
  
  const card = isLeaf ? (
    <ProductCard item={item} isDark={isDark} depth={depth} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
  ) : (
    <CategoryCard item={item} isDark={isDark} depth={depth} />
  );

  return (
    <Link href={href} asChild>
      {card}
    </Link>
  );
});

export default PlaceholderCard;

/**
 * PlaceholderGrid Component
 * Renders a flat grid of Leaf PlaceholderCards.
 */
export const PlaceholderGrid = React.memo(function PlaceholderGrid({ data, cols, gridKey, isDark, favs }) {
  const itemWidth = `${(100 / cols).toFixed(4)}%`;
  return (
    <View style={styles.gridRow} key={`${gridKey}-${cols}`}>
      {data.map((item) => (
        <View key={item.id} style={{ width: itemWidth }}>
          <PlaceholderCard
            item={item}
            isDark={isDark}
            isLeaf={true}
            isFavorite={favs?.isFavorite ? favs.isFavorite(item.id) : false}
            onToggleFavorite={favs?.toggleFavorite}
          />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
