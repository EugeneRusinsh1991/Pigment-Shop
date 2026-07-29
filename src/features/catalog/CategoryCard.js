import React from 'react';
import { Image, Platform, useWindowDimensions, View } from 'react-native';
import Card from '../../components/ui/Card/Card';
import { Heading, Text } from '../../components/ui/Text';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { colors, layout } from '../../theme/tokens';
import { getLocalizedValue } from '../../utils/localization';
import { useCatalog } from './CatalogContext';
import styles from './categoryCardStyles';


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
  return { bottom: { bottom: layout.spacing.md, left: layout.spacing.md, right: layout.spacing.md }, logo: undefined, desc: undefined };
}

function getNativePlatformStyles(isWeb) {
  if (isWeb) return { textShadow: undefined, overlay: undefined, descColor: undefined };
  return {
    textShadow: { textShadowColor: colors.overlayDark, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5 },
    overlay: { backgroundColor: colors.overlayScrim },
    descColor: colors.white,
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
const CATEGORY_GRID_HEIGHTS = layout.cardHeights.categoryGrid;
const CATEGORY_BANNER_HEIGHTS = layout.cardHeights.categoryBanner;

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
  const { lang } = useLanguage();
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
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.catImage}
          resizeMode="cover"
          onError={() => setImgError(true)}
        />
        <View style={[styles.overlay, computedStyles.overlay]} />
        <View style={getContentStyle(computedStyles, activeIsBanner)}>
          <Heading level={3} style={getLabelStyle(computedStyles, activeIsBanner)} numberOfLines={2} isDark={isDark}>{label}</Heading>
          <Text style={getDescStyle(computedStyles, activeIsBanner)} numberOfLines={2} isDark={isDark}>{desc}</Text>
        </View>
      </View>
    </Card>
  );
});

const CategoryCard = React.memo(CategoryCardInner);

export default CategoryCard;
