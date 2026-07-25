import React from 'react';
import { Image, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useCatalog } from '../../context/CatalogContext';
import styles from './categoryCardStyles';
import BaseCard from '../../components/BaseCard';
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

const CategoryCardInner = React.forwardRef(({ item, isDark, depth, ...rest }, ref) => {
  const { lang } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;
  const { desc, label } = useCategoryContent(item, lang);
  const computedStyles = getCategoryCardStyles(isDark, isMobile);

  return (
    <BaseCard
      ref={ref}
      isDark={isDark}
      interactive={true}
      useDimensions={true}
      depth={depth}
      lightBgColor="#FAF8F6"
      {...rest}
    >
      <View style={{ ...StyleSheet.absoluteFillObject, borderRadius: layout.radii.lg, overflow: 'hidden' }}>
        <Image source={{ uri: CATEGORY_PLACEHOLDER }} style={styles.catImage} resizeMode="cover" />
        <View style={[styles.overlay, computedStyles.overlay]} />
        <View style={computedStyles.content}>
          <Text style={computedStyles.label} numberOfLines={2}>{label}</Text>
          <Text style={computedStyles.desc}  numberOfLines={2}>{desc}</Text>
        </View>
      </View>
    </BaseCard>
  );
});

const CategoryCard = React.memo(CategoryCardInner);

export default CategoryCard;
