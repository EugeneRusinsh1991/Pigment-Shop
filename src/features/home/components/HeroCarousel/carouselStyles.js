import { StyleSheet } from 'react-native';
import { colors, layout } from '@/theme/tokens';

export const localStyles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imageFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
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
    opacity: 1,
  },
  dotInactive: {
    width: layout.spacing.sm,
    opacity: 0.5,
  },
});
