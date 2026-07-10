import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import PlaceholderCard from './PlaceholderCard';
import CatalogHeader from './CatalogHeader';
import DiscountsSection from './DiscountsSection';
import NewArrivalsFooter from './NewArrivalsFooter';
import styles from '../AppStyles';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

const COLS_MAP = {
  desktop: { depth0: 4, depthRest: 4 },
  tablet: { depth0: 2, depthRest: 4 },
  mobile: { depth0: 2, depthRest: 2 },
};

const CARD_WIDTH_MAP = {
  depth0: { desktop: 250, tablet: 340, mobile: 145 },
  depthRest: { desktop: 250, tablet: 250, mobile: 250 },
};

/**
 * Computes the layout dimensions and columns configuration for CatalogView.
 */
function getCatalogLayout(isWide, depth, windowWidth) {
  const device = windowWidth >= 1024 
    ? 'desktop' 
    : (windowWidth >= 768 ? 'tablet' : 'mobile');

  const depthKey = depth === 0 ? 'depth0' : 'depthRest';

  const cols = COLS_MAP[device][depthKey];
  const cardWidth = CARD_WIDTH_MAP[depthKey][device];
  const gridWidth = cols * (cardWidth + 16);

  return { cols, gridWidth };
}

/**
 * CatalogFooter Helper Component
 * Renders the discounts and new arrivals sections for depth 0.
 */
function CatalogFooter({ depth, isDark, isWide, t, onCardPress, favs }) {
  if (depth !== 0) {
    return null;
  }

  return (
    <View style={{ gap: 32 }}>
      <DiscountsSection isDark={isDark} isWide={isWide} t={t} onCardPress={onCardPress} favs={favs} />
      <NewArrivalsFooter isDark={isDark} isWide={isWide} t={t} onCardPress={onCardPress} favs={favs} />
    </View>
  );
}

/**
 * Helper to render catalog list items.
 */
function renderCatalogItem({ item, onCardPress, isDark, depth, favs }) {
  const isLeaf = !item.isCategory;
  return (
    <PlaceholderCard
      item={item}
      onPress={() => onCardPress(item)}
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
  depth,
  currentLevel,
  items,
  crumbs,
}) {
  const { width: windowWidth } = useWindowDimensions();
  const { t } = useTheme();
  const favs = useFavoritesContext();
  const { handleCrumbPress, handleCardPress } = useNavigation();
  const onCrumbPress = handleCrumbPress;
  const onCardPress = handleCardPress;
  const { cols, gridWidth } = getCatalogLayout(isWide, depth, windowWidth);

  return (
    <FlatList
      ListHeaderComponent={
        <CatalogHeader
          isDark={isDark}
          isWide={isWide}
          depth={depth}
          currentLevel={currentLevel}
          crumbs={crumbs}
          t={t}
          onCrumbPress={onCrumbPress}
          onCardPress={onCardPress}
        />
      }
      data={items}
      keyExtractor={(item) => item.id}
      numColumns={cols}
      key={`grid-${cols}`}
      renderItem={({ item }) => renderCatalogItem({ item, onCardPress, isDark, depth, favs })}
      contentContainerStyle={[styles.list, { alignSelf: 'center', width: gridWidth }]}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        <CatalogFooter
          depth={depth}
          isDark={isDark}
          isWide={isWide}
          t={t}
          onCardPress={onCardPress}
          favs={favs}
        />
      }
    />
  );
}
