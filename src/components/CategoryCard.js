import { Image, Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getCategories } from '../data/catalogState';
import useCardDimensions from '../hooks/useCardDimensions';

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
    ru: 'Пигменты для перманентного макияжа',
  },
};

function getRawDescription(rawDescObj, lang) {
  if (rawDescObj && typeof rawDescObj === 'object') {
    return rawDescObj[lang];
  }
  return null;
}

function getDefaultDescription(itemId, lang) {
  const key = DEFAULT_CATEGORY_DESCRIPTIONS[itemId] ? itemId : 'default';
  const translations = DEFAULT_CATEGORY_DESCRIPTIONS[key];
  return translations[lang] || translations.ru;
}

function getCategoryDescription(rawDescObj, item, lang) {
  return (
    getRawDescription(rawDescObj, lang) ||
    item.description ||
    getDefaultDescription(item.id, lang)
  );
}

function getRawName(rawNameObj, lang) {
  if (rawNameObj && typeof rawNameObj === 'object') {
    return rawNameObj[lang];
  }
  return null;
}

function getCategoryLabel(rawNameObj, item, lang) {
  return getRawName(rawNameObj, lang) || item.label;
}

function useCategoryContent(item, lang) {
  const rawCategories = getCategories();
  const rawCat = rawCategories.find(c => c.id === item.id);
  return {
    desc: getCategoryDescription(rawCat?.description, item, lang),
    label: getCategoryLabel(rawCat?.name, item, lang),
  };
}

function getCategoryCardStyles(isDark, isMobile, { cardWidth, cardHeight, cardMargin }) {
  const mobileOverride = isMobile ? { bottom: 12, left: 12, right: 12 } : undefined;
  const mobileLogo    = isMobile ? { fontSize: 18, lineHeight: 22 } : undefined;
  const mobileDesc    = isMobile ? { fontSize: 10, lineHeight: 13 } : undefined;
  const themeStyle    = isDark ? styles.catCardDark : styles.catCardLight;
  const nativeTextShadow = Platform.OS !== 'web' ? {
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  } : undefined;
  const nativeOverlay = Platform.OS !== 'web' ? { backgroundColor: 'rgba(0, 0, 0, 0.4)' } : undefined;
  const nativeDescColor = Platform.OS !== 'web' ? '#F3F3F3' : undefined;

  return {
    card: [styles.catCard, themeStyle, { width: cardWidth, minWidth: cardWidth, height: cardHeight, flex: 0, flexGrow: 0, margin: cardMargin }],
    content: [styles.catContent, mobileOverride],
    label:   [styles.catLabel, mobileLogo, nativeTextShadow],
    desc:    [styles.catDesc, mobileDesc, nativeTextShadow, nativeDescColor && { color: nativeDescColor }],
    overlay: nativeOverlay,
  };
}

/**
 * CategoryCard Component
 * Renders a category item with layout dimensions determined by depth and viewport size.
 */
export default function CategoryCard({ item, onPress, isDark, depth }) {
  const { lang } = useTheme();
  const dims = useCardDimensions(depth, false);
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;
  const { desc, label } = useCategoryContent(item, lang);
  const s = getCategoryCardStyles(isDark, isMobile, dims);

  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: CATEGORY_PLACEHOLDER }} style={styles.catImage} resizeMode="cover" />
      <View style={[styles.overlay, s.overlay]} />
      <View style={s.content}>
        <Text style={s.label} numberOfLines={2}>{label}</Text>
        <Text style={s.desc}  numberOfLines={2}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  catCard: {
    flex: 1,
    height: 380,
    borderRadius: 24,
    margin: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  catCardDark: {
    backgroundColor: '#1E1E1E',
  },
  catCardLight: {
    backgroundColor: '#FAF8F6',
  },
  catImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  catContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  catLabel: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 26,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  catDesc: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  arrowCircle: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});
