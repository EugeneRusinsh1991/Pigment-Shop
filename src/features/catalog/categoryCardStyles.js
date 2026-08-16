import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export default StyleSheet.create({
  catCard: {
    flex: 1,
    borderRadius: layout.radii.lg,
    overflow: 'visible',
    position: 'relative',
  },
  catCardDark: {
    backgroundColor: colors.productCardDark,
  },
  catCardLight: {
    backgroundColor: colors.backgroundLight,
  },
  catImage: {
    ...StyleSheet.absoluteFillObject,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: layout.radii.lg,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)',
    backgroundColor: 'transparent',
  },

  catContent: {
    position: 'absolute',
    bottom: layout.spacing.xxl,
    left: layout.spacing.xl,
    right: layout.spacing.xl,
  },
  catLabel: {
    marginBottom: layout.spacing.xxs,
  },
  catDesc: {},
  arrowCircle: {
    position: 'absolute',
    bottom: layout.spacing.xl,
    right: layout.spacing.xl,
    width: 38,
    height: 38,
    borderRadius: layout.radii.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleText: {
    color: colors.white,
  },
  bannerCard: {
    width: '100%',
    marginHorizontal: layout.spacing.none,
    marginVertical: layout.spacing.sm,
  },
  bannerContent: {
    bottom: layout.spacing.xl,
    left: layout.spacing.xl,
    right: layout.spacing.xl,
  },
  bannerLabel: {},
  bannerDesc: {},
});
