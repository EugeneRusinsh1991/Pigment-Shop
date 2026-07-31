import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import ProductCard from '../product/ProductCard';
import { layout } from '../../theme/tokens';

import { EmptyState as GlobalEmptyState } from '../../components/ui/Feedback';

function EmptyCatalogState({ isDark, label }) {
  return (
    <View style={styles.empty}>
      <GlobalEmptyState description={label} />
    </View>
  );
}

function getItemStyle(itemWidth) {
  return [styles.item, { width: itemWidth }];
}

function getGridStyle(isNarrow, gridWidth) {
  return [
    styles.gridList,
    isNarrow && styles.gridNarrow,
    isNarrow && gridWidth ? { width: gridWidth } : null,
  ];
}


export default function ProductGrid({ products, cols, cardWidth, isDark, onCardPress, favs, emptyLabel, listHeader, listFooter, isNarrow, gridWidth, gap = layout.spacing.lg }) {
  const itemWidth = `${(100 / cols).toFixed(4)}%`;
  const gridGap = gap ?? layout.spacing.lg;

  const renderItem = useCallback(
    ({ item }) => (
      <View style={[styles.item, { width: itemWidth, padding: gridGap / 2 }]}>
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
    [isDark, cols, itemWidth, favs, gridGap]
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={cols}
      key={`catalog-grid-${cols}`}
      style={getGridStyle(isNarrow, gridWidth)}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.grid,
        styles.contentContainer,
        { marginHorizontal: -(gridGap / 2), marginVertical: -(gridGap / 2) },
      ]}
      ListHeaderComponent={listHeader}
      ListHeaderComponentStyle={isNarrow ? styles.headerStyle : undefined}
      ListFooterComponent={listFooter}
      ListEmptyComponent={<EmptyCatalogState isDark={isDark} label={emptyLabel} />}
      showsVerticalScrollIndicator={!isNarrow}
      scrollEnabled={false}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}

const styles = StyleSheet.create({
  grid: { paddingBottom: layout.spacing.none },
  gridList: { width: '100%' },
  gridNarrow: { alignSelf: 'center' },
  item: { alignSelf: 'stretch' },
  contentContainer: { flexGrow: 1 },
  headerStyle: {
    zIndex: layout.zIndices.drawer,
    elevation: layout.zIndices.drawer,
    position: 'relative',
  },
  empty: { paddingVertical: layout.spacing.xxl, alignItems: 'center' },
});
