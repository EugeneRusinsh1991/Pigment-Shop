import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import styles from '../../theme/appStyles';
import { layout } from '../../theme/tokens';
import { useFavoritesContext } from '../favorites/FavoritesContext';

import { PageNavigation } from '@/components/domain/Navigation';
import UnifiedCardGrid from '../../components/ui/Grid/UnifiedCardGrid';
import CatalogHeader from './CatalogHeader';
import CatalogListFooter from './CatalogListFooter';
import PlaceholderCard from './PlaceholderCard';
import { useCatalog } from './CatalogContext';
import { useCatalogTransition } from './useCatalogTransition';
import { useCatalogViewData } from './useCatalogViewData';

/**
 * Helper to render catalog list items.
 */
function renderCatalogItem({ item, isDark, depth, favs, cols }) {
  const isLeaf = !item.isCategory;
  return (
    <PlaceholderCard
      item={item}
      isDark={isDark}
      isLeaf={isLeaf}
      depth={depth}
      isFavorite={favs?.isFavorite(item.id)}
      onToggleFavorite={favs?.toggleFavorite}
    />
  );
}

/**
 * CatalogView Component
 * Renders the list of categories or products in a grid structure.
 */
export default function CatalogView({
  isDark,
  isWide,
  depth: overrideDepth,
  currentLevel: overrideCurrentLevel,
  items: overrideItems,
  crumbs: overrideCrumbs,
  showCategoryGrid = true,
  showSectionTitle = true,
  showPromotionalSections = false,
  showHeroBanner = false,
  showNavigation = false,
}) {
  const { t } = useLanguage();
  const favs = useFavoritesContext();
  const router = useRouter();
  const { flatList, categoryLookup } = useCatalog();

  const {
    depth,
    currentLevel,
    items,
    crumbs,
    cols,
    gap,
    gridWidth,
  } = useCatalogViewData({
    overrideDepth,
    overrideCurrentLevel,
    overrideItems,
    overrideCrumbs,
    isWide,
  });

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };
  const handleCatalogPress = () => router.push('/catalog');
  const isTransitionReady = useCatalogTransition(showPromotionalSections, showHeroBanner);

  const renderItem = useCallback(
    ({ item }) => renderCatalogItem({ item, isDark, depth, favs, cols }),
    [isDark, depth, favs, cols]
  );

  const gridContentStyle = [styles.list, layoutStyles.gridContent];
  const scrollContentStyle = [styles.list, layoutStyles.scrollContent];

  return (
    <View style={[layoutStyles.catalogContainer, isDark ? styles.containerDark : styles.containerLight]}>
      {showNavigation && (
        <View style={[layoutStyles.navWrapper, { width: gridWidth }]}>
          <PageNavigation
            isDark={isDark}
            crumbs={crumbs}
            onBack={handleBackPress}
            showBack={true}
            showBreadcrumbs={true}
            flatList={flatList}
            categoryLookup={categoryLookup}
          />
        </View>
      )}
      {showCategoryGrid ? (
        <UnifiedCardGrid
          variant="flatlist"
          ListHeaderComponent={
            <CatalogHeader
              isDark={isDark}
              isWide={isWide}
              depth={depth}
              currentLevel={currentLevel}
              crumbs={crumbs}
              t={t}
              onCatalogPress={handleCatalogPress}
              showSectionTitle={showSectionTitle}
              showHeroBanner={showHeroBanner}
              isTransitionReady={isTransitionReady}
            />
          }
          data={items}
          keyExtractor={(item) => item.id}
          cols={cols}
          gap={gap}
          key={`grid-${cols}`}
          renderItem={renderItem}
          contentContainerStyle={gridContentStyle}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={layoutStyles.footerWrapper}
          ListFooterComponent={
            <CatalogListFooter
              showPromotionalSections={showPromotionalSections}
              isTransitionReady={isTransitionReady}
              depth={depth}
              isDark={isDark}
              isWide={isWide}
              t={t}
              favs={favs}
            />
          }
          style={layoutStyles.listContainer}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          scrollEnabled={false}
          removeClippedSubviews={false}
        />
      ) : (
        <View
          style={[scrollContentStyle, layoutStyles.listContainer]}
        >
          <CatalogHeader
            isDark={isDark}
            isWide={isWide}
            depth={depth}
            currentLevel={currentLevel}
            crumbs={crumbs}
            t={t}
            onCatalogPress={handleCatalogPress}
            showSectionTitle={showSectionTitle}
            showHeroBanner={showHeroBanner}
            isTransitionReady={isTransitionReady}
          />
          <View style={layoutStyles.footerWrapper}>
            <CatalogListFooter
              showPromotionalSections={showPromotionalSections}
              isTransitionReady={isTransitionReady}
              depth={depth}
              isDark={isDark}
              isWide={isWide}
              t={t}
              favs={favs}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const layoutStyles = StyleSheet.create({
  catalogContainer: {
    flexGrow: 1,
    paddingHorizontal: layout.spacing.lg,
  },
  listContainer: {
    flexGrow: 1,
  },
  itemWrapper: {
    alignSelf: 'stretch',
  },
  navWrapper: {
    alignSelf: 'center',
    maxWidth: '100%',
  },
  gridContent: {
    alignSelf: 'center',
    paddingBottom: layout.spacing.none,
  },
  scrollContent: {
    alignSelf: 'center',
    paddingBottom: layout.spacing.none,
  },
  footerWrapper: {
    width: '100%',
  },
});
