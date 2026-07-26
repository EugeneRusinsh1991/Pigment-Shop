import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import styles from '../../AppStyles';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

import CatalogHeader from './CatalogHeader';
import PageNavigation from '../../components/PageNavigation';
import PlaceholderCard from './PlaceholderCard';
import CatalogListFooter from './CatalogListFooter';
import { useCatalogViewData } from '../../hooks/useCatalogViewData';

function useCatalogTransition(showPromotionalSections, showHeroBanner) {
  const [isTransitionReady, setIsTransitionReady] = useState(false);

  useEffect(() => {
    if (!showPromotionalSections && !showHeroBanner) {
      setIsTransitionReady(true);
      return;
    }
    setIsTransitionReady(false);
    const timer = setTimeout(() => {
      setIsTransitionReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [showPromotionalSections, showHeroBanner]);

  return isTransitionReady;
}

/**
 * Helper to render catalog list items.
 */
function renderCatalogItem({ item, isDark, depth, favs, cols }) {
  const isLeaf = !item.isCategory;
  const isBanner = Boolean(item?.isBanner || item?.isSingleSubcategory);
  const itemWidth = isBanner ? '100%' : `${(100 / cols).toFixed(4)}%`;
  return (
    <View style={{ width: itemWidth, alignSelf: 'stretch' }}>
      <PlaceholderCard
        item={item}
        isDark={isDark}
        isLeaf={isLeaf}
        depth={depth}
        isFavorite={favs?.isFavorite(item.id)}
        onToggleFavorite={favs?.toggleFavorite}
      />
    </View>
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
  const { t } = useTheme();
  const favs = useFavoritesContext();
  const router = useRouter();

  const {
    depth,
    currentLevel,
    items,
    crumbs,
    cols,
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

  return (
    <View style={[layoutStyles.catalogContainer, isDark ? styles.containerDark : styles.containerLight]}>
      {showNavigation && (
        <View style={{ alignSelf: 'center', width: gridWidth, maxWidth: '100%' }}>
          <PageNavigation
            isDark={isDark}
            crumbs={crumbs}
            onBack={handleBackPress}
            showBack={true}
            showBreadcrumbs={true}
          />
        </View>
      )}
      {showCategoryGrid ? (
        <FlatList
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
          numColumns={cols}
          key={`grid-${cols}`}
          renderItem={renderItem}
          contentContainerStyle={[styles.list, { alignSelf: 'center', width: gridWidth, paddingBottom: 0, flexGrow: 1, minHeight: '100%' }]}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
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
          windowSize={5}
          removeClippedSubviews={false}
        />
      ) : (
        <ScrollView
          contentContainerStyle={[styles.list, { alignSelf: 'center', width: gridWidth, paddingBottom: 0, flexGrow: 1 }]}
          showsVerticalScrollIndicator={false}
          style={layoutStyles.listContainer}
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
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
        </ScrollView>
      )}
    </View>
  );
}

const layoutStyles = StyleSheet.create({
  catalogContainer: {
    flex: 1,
    minHeight: '100%',
  },
  listContainer: {
    flex: 1,
    minHeight: '100%',
  },
});
