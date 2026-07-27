/**
 * CatalogPage.js
 *
 * Full-page Catalog layout: left sidebar (filters) + right area (sort bar + product grid).
 * Reuses ProductCard via PlaceholderGrid and existing product navigation.
 */
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PageTransition } from '../../components/Motion';
import { useCatalog } from '../../context/CatalogContext';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import useCatalogFilters from '../../hooks/useCatalogFilters';
import useCatalogLayout from '../../hooks/useCatalogLayout';
import usePaginatedCatalog from '../../hooks/usePaginatedCatalog';
import { colors, layout } from '../../theme/tokens';
import Footer from '../shell/components/Footer';
import CatalogFilterSidebar from './CatalogFilterSidebar';
import CatalogSortBar from './CatalogSortBar';
import { GridFooter, GridHeader } from './GridHeaderFooter';
import ProductGrid from './ProductGrid';

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
  gridWidth,
  mobileFiltersVisible,
  setMobileFiltersVisible,
  sortDropdownVisible,
  setSortDropdownVisible,
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  loading,
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
              listHeader={
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
              }
              listFooter={
                <GridFooter
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={prevPage}
                  onNext={nextPage}
                  loading={loading}
                  isDark={isDark}
                  isNarrow={isNarrow}
                />
              }
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
          gridWidth={gridWidth}
          mobileFiltersVisible={mobileFiltersVisible}
          setMobileFiltersVisible={setMobileFiltersVisible}
          sortDropdownVisible={sortDropdownVisible}
          setSortDropdownVisible={setSortDropdownVisible}
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          loading={loading}
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
  row: { flex: 1, minHeight: 0, flexDirection: 'row', width: '100%', maxWidth: layout.maxContentWidth, alignSelf: 'center', paddingHorizontal: layout.spacing.sm },
  main: { flex: 1, minHeight: 0, padding: layout.spacing.lg },
  mainNarrow: { padding: layout.spacing.none, alignItems: 'center' },
  gridContainer: { flex: 1, minHeight: 0 },
});
