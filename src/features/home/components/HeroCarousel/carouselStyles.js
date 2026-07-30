import { StyleSheet } from 'react-native';
import { colors, layout, carouselTokens } from '@/theme/tokens';
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
    marginTop: -24,
    width: 48,
    height: 48,
    borderRadius: layout.radii.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: layout.borderWidth.thin,
    borderColor: 'rgba(255,255,255,0.35)',
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
    gap: carouselTokens.dots.gap,
  },
  dot: {
    height: carouselTokens.dots.height,
    borderRadius: carouselTokens.dots.borderRadius,
    backgroundColor: carouselTokens.dots.inactiveColor,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  dotActive: {
    width: carouselTokens.dots.activeWidth,
    opacity: layout.opacity.full,
    backgroundColor: carouselTokens.dots.activeBgColor,
    overflow: 'hidden',
    borderRadius: carouselTokens.dots.borderRadius,
  },
  dotInactive: {
    width: carouselTokens.dots.inactiveWidth,
    opacity: layout.opacity.full,
  },
  progressBar: {
    backgroundColor: carouselTokens.dots.activeColor,
    height: '100%',
    borderRadius: carouselTokens.dots.borderRadius,
  },
});


function getBreakoutStyle() {
  return {};
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

