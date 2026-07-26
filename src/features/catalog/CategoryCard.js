import React from 'react';
import { Image, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useCatalog } from '../../context/CatalogContext';
import useCardDimensions from '../../hooks/useCardDimensions';
import styles from './categoryCardStyles';
import Card from '../../components/Card/Card';
import { colors, layout } from '../../theme/tokens';
import { getLocalizedValue } from '../../utils/localization';

const CATEGORY_PLACEHOLDER = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop';

const DEFAULT_CATEGORY_DESCRIPTIONS = {
  'cat-materials': {
    uk: 'Витратні матеріали та інструменти для майстрів',
    en: 'Consumables and tools for masters',
    ru: 'Расходники и инструменты для мастеров',
  },
  'default': {
    uk: 'Пігменти для перманентного макіяжу',
    en: 'Pigments for permanent makeup',
    ru: 'Пигменты для permanent makeup',
  },
};

function getDefaultDescription(itemId, lang) {
  const key = DEFAULT_CATEGORY_DESCRIPTIONS[itemId] ? itemId : 'default';
  const translations = DEFAULT_CATEGORY_DESCRIPTIONS[key];
  return translations[lang] || translations.ru;
}

function getCategoryDescription(rawDescObj, item, lang) {
  return getLocalizedValue(rawDescObj, lang, null) || item.description || getDefaultDescription(item.id, lang);
}

function getCategoryLabel(rawNameObj, item, lang) {
  return getLocalizedValue(rawNameObj, lang, item.label);
}

function useCategoryContent(item, lang) {
  const { categoryLookup } = useCatalog();
  const rawCat = categoryLookup.get(item.id);
  return {
    desc: getCategoryDescription(rawCat?.description, item, lang),
    label: getCategoryLabel(rawCat?.name, item, lang),
  };
}

function getMobileStyleOverrides(isMobile) {
  if (!isMobile) return { bottom: undefined, logo: undefined, desc: undefined };
  return { bottom: { bottom: 12, left: 12, right: 12 }, logo: { fontSize: 18, lineHeight: 22 }, desc: { fontSize: 10, lineHeight: 13 } };
}

function getNativePlatformStyles(isWeb) {
  if (isWeb) return { textShadow: undefined, overlay: undefined, descColor: undefined };
  return {
    textShadow: { textShadowColor: 'rgba(0, 0, 0, 0.85)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5 },
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
    descColor: '#F3F3F3',
  };
}

function getCategoryCardStyles(isDark, isMobile) {
  const isWeb = Platform.OS === 'web';
  const mobile = getMobileStyleOverrides(isMobile);
  const native = getNativePlatformStyles(isWeb);
  return {
    content: [styles.catContent, mobile.bottom],
    label:   [styles.catLabel, mobile.logo, native.textShadow],
    desc:    [styles.catDesc, mobile.desc, native.textShadow, native.descColor && { color: native.descColor }],
    overlay: native.overlay,
  };
}
const CATEGORY_GRID_HEIGHTS = { desktop: 280, tablet: 250, mobile: 200 };
const CATEGORY_BANNER_HEIGHTS = { desktop: 180, tablet: 160, mobile: 140 };

function getCategoryCardHeight(isBanner, device) {
  return isBanner ? CATEGORY_BANNER_HEIGHTS[device] : CATEGORY_GRID_HEIGHTS[device];
}

function getDeviceType(width) {
  if (width >= 1024) return 'desktop';
  if (width < 768) return 'mobile';
  return 'tablet';
}

function getActiveIsBanner(item) {
  if (!item) return false;
  return Boolean(item.isBanner || item.isSingleSubcategory);
}

function getImageSource(item, imgError) {
  if (!item || !item.image || imgError) return { uri: CATEGORY_PLACEHOLDER };
  return { uri: item.image };
}

function getCardStyle(cardHeight, activeIsBanner, style) {
  return [styles.catCard, { minHeight: cardHeight }, activeIsBanner ? styles.bannerCard : null, style];
}

function getContentStyle(computedStyles, activeIsBanner) {
  return [computedStyles.content, activeIsBanner ? styles.bannerContent : null];
}

function getLabelStyle(computedStyles, activeIsBanner) {
  return [computedStyles.label, activeIsBanner ? styles.bannerLabel : null];
}

function getDescStyle(computedStyles, activeIsBanner) {
  return [computedStyles.desc, activeIsBanner ? styles.bannerDesc : null];
}

const CategoryCardInner = React.forwardRef(({ item, isDark, depth = 1, isBanner = false, style, ...rest }, ref) => {
  const [imgError, setImgError] = React.useState(false);
  const { lang } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  
  const isMobile = windowWidth < 768;
  const device = getDeviceType(windowWidth);
  const { desc, label } = useCategoryContent(item, lang);
  const computedStyles = getCategoryCardStyles(isDark, isMobile);
  const activeIsBanner = getActiveIsBanner(item);
  const cardHeight = getCategoryCardHeight(activeIsBanner, device);
  const imageSource = getImageSource(item, imgError);

  return (
    <Card
      ref={ref}
      variant="compact"
      isDark={isDark}
      interactive={true}
      style={getCardStyle(cardHeight, activeIsBanner, style)}
      {...rest}
    >
      <View style={{ ...StyleSheet.absoluteFillObject, borderRadius: layout.radii.lg, overflow: 'hidden' }}>
        <Image
          source={imageSource}
          style={styles.catImage}
          resizeMode="cover"
          onError={() => setImgError(true)}
        />
        <View style={[styles.overlay, computedStyles.overlay]} />
        <View style={getContentStyle(computedStyles, activeIsBanner)}>
          <Text style={getLabelStyle(computedStyles, activeIsBanner)} numberOfLines={2}>{label}</Text>
          <Text style={getDescStyle(computedStyles, activeIsBanner)} numberOfLines={2}>{desc}</Text>
        </View>
      </View>
    </Card>
  );
});

const CategoryCard = React.memo(CategoryCardInner);

export default CategoryCard;
