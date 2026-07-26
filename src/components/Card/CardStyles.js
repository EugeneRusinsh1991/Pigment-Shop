import { StyleSheet, Platform } from 'react-native';
import { colors, layout, shadows } from '../../theme/tokens';

export const cardDimensionsContract = {
  standardHeights: {
    desktop: 340,
    tablet: 280,
    mobile: 240,
  },
  imageHeights: {
    desktop: 230,
    tablet: 180,
    mobile: 135,
  },
  aspectRatio: 0.75,
};

export const styleMap = {
  containerLight: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.borderLight,
    borderWidth: 1,
  },
  containerDark: {
    backgroundColor: colors.surfaceDark,
    borderColor: colors.borderDark,
    borderWidth: 1,
  },
  cardBgLight: colors.productCardLight,
  cardBgDark: colors.productCardDark,
};

export const variantStyles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
    borderRadius: layout.radii.md,
    overflow: 'hidden',
    position: 'relative',
  },
  compact: {
    flexDirection: 'column',
    borderRadius: layout.radii.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  list: {
    flexDirection: 'row',
    borderRadius: layout.radii.md,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
});

export const slotStyles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  titleLight: {
    color: colors.textLight,
  },
  titleDark: {
    color: colors.textDark,
  },
  badge: {
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  skeleton: {
    backgroundColor: colors.borderLight,
    borderRadius: layout.radii.sm,
    overflow: 'hidden',
  },
  skeletonDark: {
    backgroundColor: colors.borderDark,
  },
});

export const getShadowStyle = (isDark, elevated = false) => {
  if (!elevated) return {};
  const shadow = Platform.select({
    web: shadows.cardHover.web,
    default: shadows.cardHover.native,
  });
  return {
    ...shadow,
    elevation: layout.elevation.md,
  };
};
