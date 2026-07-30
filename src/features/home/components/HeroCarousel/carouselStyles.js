import { StyleSheet } from 'react-native';
import { colors, layout } from '@/theme/tokens';
import globalStyles from '@/theme/appStyles';

export const localStyles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imageFill: {
    position: 'absolute',
    left: layout.spacing.none,
    top: layout.spacing.none,
    right: layout.spacing.none,
    bottom: layout.spacing.none,
    width: '100%',
    height: '100%',
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: layout.radii.lg,
    backgroundColor: colors.overlayDark,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: layout.zIndices.dropdown,
  },
  leftArrow: {
    left: layout.spacing.md,
  },
  rightArrow: {
    right: layout.spacing.md,
  },
  arrowText: {
    color: colors.white,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: layout.spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: layout.zIndices.dropdown,
    gap: layout.spacing.sm,
  },
  dot: {
    height: layout.spacing.sm,
    borderRadius: layout.radii.xs,
    backgroundColor: colors.white,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  dotActive: {
    width: 48,
    opacity: layout.opacity.full,
    backgroundColor: colors.overlayScrim,
    overflow: 'hidden',
  },
  dotInactive: {
    width: layout.spacing.sm,
    opacity: layout.opacity.disabled,
  },
  progressBar: {
    backgroundColor: colors.white,
    height: '100%',
  },
});

function getBreakoutStyle(isWide, windowWidth) {
  if (isWide) return {};
  return { width: windowWidth, alignSelf: 'center', borderRadius: layout.radii.none };
}

export function getCarouselBaseStyle(isWide, windowWidth) {
  const breakoutStyle = getBreakoutStyle(isWide, windowWidth);
  const responsiveStyle = isWide ? globalStyles.heroRightWide : globalStyles.heroRightMobile;
  return [globalStyles.heroRight, responsiveStyle, breakoutStyle];
}

export function getPlaceholderStyle(isWide, isDark, windowWidth) {
  const baseStyle = getCarouselBaseStyle(isWide, windowWidth);
  const backgroundColor = isDark ? colors.borderDark : colors.borderSlateLight;
  return [baseStyle, { backgroundColor }];
}

