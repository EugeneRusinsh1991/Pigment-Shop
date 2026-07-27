/**
 * CatalogPage.js
 *
 * Full-page Catalog layout: left sidebar (filters) + right area (sort bar + product grid).
 * Reuses ProductCard via PlaceholderGrid and existing product navigation.
 */
import { useState, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useCatalog } from '../../context/CatalogContext';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import CatalogFilterSidebar from './CatalogFilterSidebar';
import CatalogSortBar from './CatalogSortBar';
import useCatalogFilters from './useCatalogFilters';
import usePaginatedCatalog from './usePaginatedCatalog';
import ProductGrid from './ProductGrid';
import { GridHeader, GridFooter } from './GridHeaderFooter';
import Footer from '../shell/components/Footer';
import { getContentGridWidth, CARD_MARGIN, SIDEBAR_WIDTH, MAIN_PADDING, getGridCols } from '../../utils/layout';
import { PageTransition } from '../../components/Motion';
import { colors, layout } from '../../theme/tokens';

/**
 * Full-width desktop (>=1024px): 4 columns.
 * Tablet (>=768px): 2 columns.
 * Narrow (mobile): 2 columns.
 */
function computeCols(windowWidth) {
  return getGridCols(windowWidth, true);
}

function computeCardWidth(flatListWidth, cols) {
  return Math.max(140, Math.floor((flatListWidth - CARD_MARGIN * 2 * cols) / cols));
}

function useCatalogLayout() {
  const { width: windowWidth } = useWindowDimensions();
  const isNarrow = windowWidth < layout.breakpoints.sm;
  const contentWidth = Math.min(windowWidth, 1330) - layout.spacing.lg;
  const gridWidth = isNarrow
    ? Math.min(windowWidth, getContentGridWidth(windowWidth, 1))
    : contentWidth - SIDEBAR_WIDTH;
  const cols = computeCols(windowWidth);
  const cardWidth = isNarrow ? computeCardWidth(gridWidth, cols) : computeCardWidth(gridWidth - MAIN_PADDING, cols);

  return { isNarrow, gridWidth, cols, cardWidth };
}

function CatalogMainContent({
  isNarrow,
  sortKey,
  setSortKey,
  totalCount,
  isDark,
  triggerKey,
  currentPageProducts,
  cols,
  cardWidth,
  favs,
  t,
  listHeader,
  listFooter,
  gridWidth,
}) {
  return (
    <View style={[styles.main, isNarrow && styles.mainNarrow]}>
      {!isNarrow && (
        <CatalogSortBar
          sortKey={sortKey}
          onSortChange={setSortKey}
          resultCount={totalCount}
          isDark={isDark}
        />
      )}
      <View style={styles.gridContainer}>
        {triggerKey !== 'pending' && (
          <PageTransition key={triggerKey} trigger={triggerKey}>
            <ProductGrid
              products={currentPageProducts}
              cols={cols}
              cardWidth={cardWidth}
              isDark={isDark}
              favs={favs}
              emptyLabel={t('catalogNoProducts')}
              listHeader={listHeader}
              listFooter={listFooter}
              isNarrow={isNarrow}
              gridWidth={gridWidth}
            />
          </PageTransition>
        )}
      </View>
    </View>
  );
}

export default function CatalogPage({ isDark }) {
  const { flatList, categoryTree } = useCatalog();
  const favs = useFavoritesContext();
  const router = useRouter();
  const navParams = useLocalSearchParams();
  const { t } = useTheme();

  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);

  const { filters, sortKey, setSortKey, setFilter, toggleCategory, resetFilters } =
    useCatalogFilters(flatList, categoryTree, navParams);

  const { isNarrow, gridWidth, cols, cardWidth } = useCatalogLayout();
  const pageSize = isNarrow ? 14 : 15;

  const {
    currentPageProducts,
    currentPage,
    totalPages,
    totalCount,
    loading,
    nextPage,
    prevPage,
    triggerKey
  } = usePaginatedCatalog(filters, sortKey, flatList, categoryTree, pageSize);

  const listHeader = useMemo(() => (
    <GridHeader
      isNarrow={isNarrow}
      isDark={isDark}
      onMobileToggle={() => setMobileFiltersVisible(true)}
      sortDropdownVisible={sortDropdownVisible}
      setSortDropdownVisible={setSortDropdownVisible}
      sortKey={sortKey}
      onSortChange={setSortKey}
      t={t}
    />
  ), [isNarrow, isDark, sortDropdownVisible, sortKey, setSortKey, t]);

  const listFooter = useMemo(() => (
    <GridFooter
      currentPage={currentPage}
      totalPages={totalPages}
      onPrev={prevPage}
      onNext={nextPage}
      loading={loading}
      isDark={isDark}
      isNarrow={isNarrow}
    />
  ), [currentPage, totalPages, prevPage, nextPage, loading, isDark, isNarrow]);

  return (
    <View style={isDark ? styles.containerDark : styles.containerLight}>
      <View style={isNarrow ? styles.container : styles.row}>
        <CatalogFilterSidebar
          categoryTree={categoryTree}
          filters={filters}
          setFilter={setFilter}
          toggleCategory={toggleCategory}
          resetFilters={resetFilters}
          isDark={isDark}
          isNarrow={isNarrow}
          mobileVisible={mobileFiltersVisible}
          onMobileToggle={() => setMobileFiltersVisible((v) => !v)}
          sortKey={sortKey}
          onSortChange={setSortKey}
        />
        <CatalogMainContent
          isNarrow={isNarrow}
          sortKey={sortKey}
          setSortKey={setSortKey}
          totalCount={totalCount}
          isDark={isDark}
          triggerKey={triggerKey}
          currentPageProducts={currentPageProducts}
          cols={cols}
          cardWidth={cardWidth}
          favs={favs}
          t={t}
          listHeader={listHeader}
          listFooter={listFooter}
          gridWidth={gridWidth}
        />
      </View>
      <Footer />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 0 },
  containerDark: { flex: 1, backgroundColor: colors.backgroundDark },
  containerLight: { flex: 1, backgroundColor: colors.backgroundLight },
  row: { flex: 1, minHeight: 0, flexDirection: 'row', width: '100%', maxWidth: 1330, alignSelf: 'center', paddingHorizontal: layout.spacing.sm },
  main: { flex: 1, minHeight: 0, padding: layout.spacing.lg },
  mainNarrow: { padding: layout.spacing.none, alignItems: 'center' },
  gridContainer: { flex: 1, minHeight: 0 },
});
