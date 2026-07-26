import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export default StyleSheet.create({
  prodCard: {
    flex: 1,
    margin: layout.spacing.sm,
    borderRadius: layout.radii.lg,
    overflow: 'hidden',
  },
  prodCardDark: {
    backgroundColor: colors.productCardDark,
  },
  prodCardLight: {
    backgroundColor: colors.productCardLight,
  },
  imageContainer: {
    height: 260,
    borderTopLeftRadius: layout.radii.lg,
    borderTopRightRadius: layout.radii.lg,
    overflow: 'hidden',
  },
  imageContainerDark: {
  },
  imageContainerLight: {
  },
  prodImage: {
    width: '100%',
    height: '100%',
  },
  prodInfo: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.sm,
  },
  prodInfoDark: {
  },
  prodInfoLight: {
  },
  brandText: {
    color: colors.accent,
    textTransform: 'uppercase',
    marginBottom: layout.spacing.xxs,
  },
  prodTitle: {
    minHeight: 36,
    marginBottom: layout.spacing.xxs,
  },
  priceText: {},
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: layout.spacing.xs,
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
  },
  favBtn: {
    position: 'absolute',
    top: layout.spacing.sm,
    right: layout.spacing.sm,
    width: 28,
    height: 28,
    borderRadius: layout.radii.iconBtn,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  favBtnDark: { backgroundColor: colors.overlayDark },
  favBtnLight: { backgroundColor: colors.overlayLight },
  favIcon: {},
  favIconActive: { color: colors.accent },
  favIconInactiveDark: { color: colors.white },
  favIconInactiveLight: { color: colors.textLight },
  cartBtn: {
    position: 'absolute',
    bottom: layout.spacing.sm,
    right: layout.spacing.sm,
    width: 28,
    height: 28,
    borderRadius: layout.radii.iconBtn,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  topOverlayWrapper: {
    position: 'absolute',
    top: layout.spacing.sm,
    right: layout.spacing.sm,
    zIndex: 10,
  },
  bottomOverlayWrapper: {
    position: 'absolute',
    bottom: layout.spacing.sm,
    right: layout.spacing.sm,
    zIndex: 10,
  },
  cartBtnSolidStyle: {
    backgroundColor: colors.dark,
  },
});
