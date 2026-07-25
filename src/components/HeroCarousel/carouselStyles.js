import { StyleSheet } from 'react-native';
import { colors } from '../../theme/tokens';

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
    borderRadius: 22,
    backgroundColor: 'rgba(28, 28, 28, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  leftArrow: {
    left: 12,
  },
  rightArrow: {
    right: 12,
  },
  arrowText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 28,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  dotActive: {
    width: 48,
    opacity: 1,
  },
  dotInactive: {
    width: 8,
    opacity: 0.5,
  },
});
