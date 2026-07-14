/**
 * CatalogPage.js
 *
 * Full-page Catalog layout: left sidebar (filters) + right area (sort bar + product grid).
 * Reuses ProductCard via PlaceholderGrid and existing product navigation.
 */
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useCatalog } from '../context/CatalogContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import CatalogFilterSidebar from './Catalog/CatalogFilterSidebar';
import CatalogSortBar from './Catalog/CatalogSortBar';
import useCatalogFilters from './Catalog/useCatalogFilters';
import ProductCard from './ProductCard';
import SharedLayoutWrapper from './SharedLayoutWrapper';

const CARD_MARGIN = 8;
const SIDEBAR_WIDTH = 176; // 160px sidebar + 16px content padding
const MAIN_PADDING = 32;  // main View padding: 16px each side

function computeCols(isNarrow) {
  return isNarrow ? 2 : 3;
}

function computeCardWidth(flatListWidth, cols) {
  return Math.max(140, Math.floor((flatListWidth - CARD_MARGIN * 2 * cols) / cols));
}

function EmptyState({ isDark }) {
  return (
    <View style={styles.empty}>
      <Text style={[styles.emptyText, isDark ? styles.textDark : styles.textLight]}>
        No products match the selected filters.
      </Text>
    </View>
  );
}

function ProductGrid({ products, cols, cardWidth, isDark, onCardPress, favs }) {
  if (products.length === 0) return <EmptyState isDark={isDark} />;
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={cols}
      key={`catalog-grid-${cols}`}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          onPress={() => onCardPress(item)}
          isDark={isDark}
          depth={1}
          overrideWidth={cardWidth}
          isFavorite={favs?.isFavorite(item.id)}
          onToggleFavorite={favs?.toggleFavorite}
        />
      )}
      contentContainerStyle={[styles.grid, { flexGrow: 1 }]}
    />
  );
}

export default function CatalogPage({ isDark }) {
  const { flatList, categoryTree } = useCatalog();
  const favs = useFavoritesContext();
  const { setSelectedProduct, setShowCatalog, setShowAllProducts } = useNavigation();
  const onCardPress = (p) => { setSelectedProduct(p); setShowCatalog(false); setShowAllProducts(false); };
  const { filters, sortKey, setSortKey, setFilter, toggleCategory, toggleSubcategory, resetFilters, sortedProducts } =
    useCatalogFilters(flatList);

  const { width: windowWidth } = useWindowDimensions();
  const isNarrow = windowWidth < 640;
  const contentWidth = Math.min(windowWidth, 1064) - 16;
  const gridWidth = contentWidth - (isNarrow ? 0 : SIDEBAR_WIDTH);
  const cols = computeCols(isNarrow);
  const cardWidth = computeCardWidth(gridWidth - MAIN_PADDING, cols);

  return (
    <SharedLayoutWrapper isDark={isDark}>
      <View style={[isNarrow ? styles.container : styles.row, isDark ? styles.containerDark : styles.containerLight]}>
        <CatalogFilterSidebar
          categoryTree={categoryTree}
          filters={filters}
          setFilter={setFilter}
          toggleCategory={toggleCategory}
          toggleSubcategory={toggleSubcategory}
          resetFilters={resetFilters}
          isDark={isDark}
        />
        <View style={styles.main}>
          <CatalogSortBar
            sortKey={sortKey}
            onSortChange={setSortKey}
            resultCount={sortedProducts.length}
            isDark={isDark}
          />
          <ProductGrid products={sortedProducts} cols={cols} cardWidth={cardWidth} isDark={isDark} onCardPress={onCardPress} favs={favs} />
        </View>
      </View>
    </SharedLayoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerDark: { backgroundColor: '#0D0D0D' },
  containerLight: { backgroundColor: '#FAF8F6' },
  row: { flex: 1, flexDirection: 'row', width: '100%', maxWidth: 1064, alignSelf: 'center', paddingHorizontal: 8 },
  main: { flex: 1, padding: 16 },
  grid: { paddingBottom: 48 },
  empty: { paddingVertical: 48, alignItems: 'center' },
  emptyText: { fontSize: 14 },
  textDark: { color: '#94a3b8' },
  textLight: { color: '#64748b' },
});
