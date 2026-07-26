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
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleText: {
    color: colors.black,
  },
  bannerCard: {
    width: '100%',
    marginHorizontal: 0,
    marginVertical: layout.spacing.sm,
  },
  bannerContent: {
    bottom: 20,
    left: 20,
    right: 20,
  },
  bannerLabel: {},
  bannerDesc: {},
});
