import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export default StyleSheet.create({
  catCard: {
    flex: 1,
    borderRadius: layout.radii.lg,
    margin: layout.spacing.sm,
    overflow: 'hidden',
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayScrim,
  },
  catContent: {
    position: 'absolute',
    bottom: layout.spacing.xl,
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
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleText: {
    color: colors.black,
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
