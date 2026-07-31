import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export default StyleSheet.create({
  prodCard: {
    flex: 1,
    borderRadius: layout.radii.lg,
    overflow: 'visible',
  },
  prodCardDark: {
    backgroundColor: colors.productCardDark,
  },
  prodCardLight: {
    backgroundColor: colors.productCardLight,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.borderLight,
  },
  imageContainer: {
    height: 260,
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
    paddingTop: layout.spacing.md,
    paddingBottom: layout.spacing.sm,
  },
  prodInfoDark: {
  },
  prodInfoLight: {
  },
  brandText: {
    marginBottom: layout.spacing.xxs,
    textTransform: 'uppercase',
  },
  prodTitle: {
    minHeight: 40,
    marginBottom: layout.spacing.xs,
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
    width: 36,
    height: 36,
    borderRadius: layout.radii.iconBtn,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: layout.zIndices.raised,
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
    width: 36,
    height: 36,
    borderRadius: layout.radii.iconBtn,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: layout.zIndices.raised,
  },
  topOverlayWrapper: {
    position: 'absolute',
    top: layout.spacing.sm,
    right: layout.spacing.sm,
    zIndex: layout.zIndices.raised,
  },
  bottomOverlayWrapper: {
    position: 'absolute',
    bottom: layout.spacing.sm,
    right: layout.spacing.sm,
    zIndex: layout.zIndices.raised,
  },
  cartBtnSolidStyle: {
    backgroundColor: colors.accent,
  },
});
