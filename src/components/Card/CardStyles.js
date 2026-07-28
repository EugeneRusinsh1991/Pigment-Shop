import { Platform, StyleSheet } from 'react-native';
import { colors, layout, shadows } from '../../theme/tokens';
export const styleMap = {
  containerLight: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.borderLight,
    borderWidth: layout.borderWidth.thin,
  },
  containerDark: {
    backgroundColor: colors.surfaceDark,
    borderColor: colors.borderDark,
    borderWidth: layout.borderWidth.thin,
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
    padding: layout.spacing.md,
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    marginBottom: layout.spacing.xxs,
  },
  titleLight: {
    color: colors.textLight,
  },
  titleDark: {
    color: colors.textDark,
  },
  badge: {
    alignSelf: 'flex-start',
    marginBottom: layout.spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.md,
    paddingBottom: layout.spacing.md,
  },
  skeleton: {
    backgroundColor: colors.borderLight,
    borderRadius: layout.radii.sm,
    overflow: 'hidden',
  },
  skeletonDark: {
    backgroundColor: colors.borderDark,
  },
  price: {
    marginTop: layout.spacing.xxs,
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
