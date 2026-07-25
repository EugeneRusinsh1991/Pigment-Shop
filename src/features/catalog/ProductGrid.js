import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import ProductCard from '../product/ProductCard';

import GlobalEmptyState from '../../components/EmptyState';

function EmptyCatalogState({ isDark, label }) {
  return (
    <View style={styles.empty}>
      <GlobalEmptyState description={label} />
    </View>
  );
}

export default function ProductGrid({ products, cols, cardWidth, isDark, onCardPress, favs, emptyLabel, listHeader, listFooter, isNarrow, gridWidth }) {
  const renderItem = useCallback(
    ({ item }) => (
      <Link href={{ pathname: '/product/[id]', params: { id: item.id } }} asChild>
        <ProductCard
          item={item}
          isDark={isDark}
          depth={1}
          overrideWidth={cardWidth}
          isFavorite={favs?.isFavorite(item.id)}
          onToggleFavorite={favs?.toggleFavorite}
        />
      </Link>
    ),
    [isDark, cardWidth, favs]
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={cols}
      key={`catalog-grid-${cols}`}
      style={isNarrow ? { alignSelf: 'center', width: gridWidth } : null}
      renderItem={renderItem}
      contentContainerStyle={styles.grid}
      ListHeaderComponent={listHeader}
      ListHeaderComponentStyle={isNarrow ? { zIndex: 1000, elevation: 1000, position: 'relative' } : undefined}
      ListFooterComponent={listFooter}
      ListEmptyComponent={<EmptyCatalogState isDark={isDark} label={emptyLabel} />}
      showsVerticalScrollIndicator={!isNarrow}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}

const styles = StyleSheet.create({
  grid: { paddingBottom: 0 },
  empty: { paddingVertical: 48, alignItems: 'center' },
  emptyText: { fontSize: 14 },
  textDark: { color: '#94a3b8' },
  textLight: { color: '#64748b' },
});
