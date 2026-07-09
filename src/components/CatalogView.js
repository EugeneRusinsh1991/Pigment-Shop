import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import PlaceholderCard from './PlaceholderCard';
import CatalogHeader from './CatalogHeader';
import DiscountsSection from './DiscountsSection';
import NewArrivalsFooter from './NewArrivalsFooter';
import styles from '../AppStyles';

const COLS_MAP = {
  wide: { depth0: 2, depthRest: 4 },
  narrow: { depth0: 2, depthRest: 2 },
};

const CARD_WIDTH_MAP = {
  depth0: { desktop: 480, tablet: 340, mobile: 145 },
  depthRest: { desktop: 250, tablet: 250, mobile: 250 },
};

/**
 * Computes the layout dimensions and columns configuration for CatalogView.
 */
function getCatalogLayout(isWide, depth, windowWidth) {
  const device = windowWidth >= 1024 
    ? 'desktop' 
    : (windowWidth >= 768 ? 'tablet' : 'mobile');

  const wideKey = isWide ? 'wide' : 'narrow';
  const depthKey = depth === 0 ? 'depth0' : 'depthRest';

  const cols = COLS_MAP[wideKey][depthKey];
  const cardWidth = CARD_WIDTH_MAP[depthKey][device];
  const gridWidth = cols * (cardWidth + 16);

  return { cols, gridWidth };
}

/**
 * CatalogFooter Helper Component
 * Renders the discounts and new arrivals sections for depth 0.
 */
function CatalogFooter({ depth, isDark, isWide, t, onCardPress }) {
  if (depth !== 0) {
    return null;
  }

  return (
    <View style={{ gap: 32 }}>
      <DiscountsSection isDark={isDark} isWide={isWide} t={t} onCardPress={onCardPress} />
      <NewArrivalsFooter isDark={isDark} isWide={isWide} t={t} onCardPress={onCardPress} />
    </View>
  );
}

/**
 * Helper to render catalog list items.
 */
function renderCatalogItem({ item, onCardPress, isDark, depth }) {
  const isLeaf = !item.children || item.children.length === 0;
  return (
    <PlaceholderCard
      item={item}
      onPress={() => onCardPress(item)}
      isDark={isDark}
      isLeaf={isLeaf}
      depth={depth}
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
  t,
  onCrumbPress,
  onCardPress,
}) {
  const { width: windowWidth } = useWindowDimensions();
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
      renderItem={({ item }) => renderCatalogItem({ item, onCardPress, isDark, depth })}
      contentContainerStyle={[styles.list, { alignSelf: 'center', width: gridWidth }]}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        <CatalogFooter
          depth={depth}
          isDark={isDark}
          isWide={isWide}
          t={t}
          onCardPress={onCardPress}
        />
      }
    />
  );
}
