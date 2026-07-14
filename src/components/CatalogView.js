import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import styles from '../AppStyles';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import CatalogHeader from './CatalogHeader';
import DiscountsSection from './DiscountsSection';
import NewArrivalsFooter from './NewArrivalsFooter';
import PageNavigation from './PageNavigation';
import PlaceholderCard from './PlaceholderCard';
import SharedLayoutWrapper from './SharedLayoutWrapper';

const COLS_MAP = {
  desktop: { depth0: 4, depthRest: 4 },
  tablet: { depth0: 4, depthRest: 4 },
  mobile: { depth0: 2, depthRest: 2 },
};

const CARD_WIDTH_MAP = {
  depth0: { desktop: 250, tablet: 250, mobile: 165 },
  depthRest: { desktop: 250, tablet: 250, mobile: 165 },
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
  const cardMargin = device === 'mobile' ? 4 : 8;
  const gridWidth = cols * (cardWidth + cardMargin * 2);

  return { cols, gridWidth };
}

/**
 * CatalogFooter Helper Component
 * Renders the new arrivals and discounts sections for depth 0.
 */
function CatalogFooter({ depth, isDark, isWide, t, onCardPress, favs }) {
  if (depth !== 0) {
    return null;
  }

  return (
    <View>
      <NewArrivalsFooter isDark={isDark} isWide={isWide} t={t} onCardPress={onCardPress} favs={favs} />
      <DiscountsSection isDark={isDark} isWide={isWide} t={t} onCardPress={onCardPress} favs={favs} />
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
  showCategoryGrid = true,
  showSectionTitle = true,
  showPromotionalSections = true,
  showHeroBanner = true,
  showNavigation = false,
}) {
  const { width: windowWidth } = useWindowDimensions();
  const { t } = useTheme();
  const favs = useFavoritesContext();
  const { handleCrumbPress, handleCardPress, handleBackPress, handleCatalogPress } = useNavigation();
  const onCardPress = handleCardPress;
  const onCatalogPress = handleCatalogPress;
  const { cols, gridWidth } = getCatalogLayout(isWide, depth, windowWidth);

  return (
    <SharedLayoutWrapper isDark={isDark}>
      <View style={[layoutStyles.catalogContainer, isDark ? styles.containerDark : styles.containerLight]}>
        {showNavigation && (
          <View style={{ alignSelf: 'center', width: gridWidth, maxWidth: '100%' }}>
            <PageNavigation
              isDark={isDark}
              crumbs={crumbs}
              onCrumbPress={handleCrumbPress}
              onBack={handleBackPress}
              showBack={true}
              showBreadcrumbs={true}
            />
          </View>
        )}
        <FlatList
          ListHeaderComponent={
            <CatalogHeader
              isDark={isDark}
              isWide={isWide}
              depth={depth}
              currentLevel={currentLevel}
              crumbs={crumbs}
              t={t}
              onCrumbPress={handleCrumbPress}
              onCardPress={onCardPress}
              onCatalogPress={onCatalogPress}
              showSectionTitle={showSectionTitle}
              showHeroBanner={showHeroBanner}
            />
          }
          data={showCategoryGrid ? items : []}
          keyExtractor={(item) => item.id}
          numColumns={cols}
          key={`grid-${cols}`}
          renderItem={({ item }) => renderCatalogItem({ item, onCardPress, isDark, depth, favs })}
          contentContainerStyle={[styles.list, { alignSelf: 'center', width: gridWidth, paddingBottom: 0, flexGrow: 1 }]}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={[styles.footerWrapper, { width: '100%' }]}>
            {showPromotionalSections && (
              <CatalogFooter
                depth={depth}
                isDark={isDark}
                isWide={isWide}
                t={t}
                onCardPress={onCardPress}
                favs={favs}
              />
            )}
          </View>
        }
        style={layoutStyles.listContainer}
      />
      </View>
    </SharedLayoutWrapper>
  );
}

const layoutStyles = StyleSheet.create({
  catalogContainer: {
    flex: 1,
  },
  searchWrapper: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1064,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 8,
    zIndex: 1,
    elevation: 1,
    position: 'relative',
  },
  footerWrapper: {
    width: '100%',
  },
  listContainer: {
    flex: 1,
  },
});
