import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import ProductCard from '../product/ProductCard';
import { layout } from '../../theme/tokens';

import { EmptyState as GlobalEmptyState } from '../../components/Feedback';

function EmptyCatalogState({ isDark, label }) {
  return (
    <View style={styles.empty}>
      <GlobalEmptyState description={label} />
    </View>
  );
}

export default function ProductGrid({ products, cols, cardWidth, isDark, onCardPress, favs, emptyLabel, listHeader, listFooter, isNarrow, gridWidth }) {
  const itemWidth = `${(100 / cols).toFixed(4)}%`;
  const renderItem = useCallback(
    ({ item }) => (
      <View style={{ width: itemWidth, alignSelf: 'stretch' }}>
        <Link href={{ pathname: '/product/[id]', params: { id: item.id } }} asChild>
          <ProductCard
            item={item}
            isDark={isDark}
            depth={1}
            isFavorite={favs?.isFavorite(item.id)}
            onToggleFavorite={favs?.toggleFavorite}
          />
        </Link>
      </View>
    ),
    [isDark, cols, itemWidth, favs]
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={cols}
      key={`catalog-grid-${cols}`}
      style={isNarrow ? { alignSelf: 'center', width: gridWidth || '100%', minHeight: '100%' } : { width: '100%', minHeight: '100%' }}
      renderItem={renderItem}
      contentContainerStyle={[styles.grid, { flexGrow: 1, minHeight: '100%' }]}
      ListHeaderComponent={listHeader}
      ListHeaderComponentStyle={isNarrow ? { zIndex: layout.zIndices.drawer, elevation: layout.zIndices.drawer, position: 'relative' } : undefined}
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
  empty: { paddingVertical: layout.spacing.xxl, alignItems: 'center' },
});
