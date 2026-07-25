import { StyleSheet } from 'react-native';
import { colors, fonts, layout } from '../../theme/tokens';

export default StyleSheet.create({
  prodCard: {
    flex: 1,
    margin: 8,
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
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  prodInfoDark: {
  },
  prodInfoLight: {
  },
  brandText: {
    fontFamily: fonts.sans,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  prodTitle: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    height: 36,
    marginBottom: 4,
  },
  prodTitleDark: {
    color: colors.textDark,
  },
  prodTitleLight: {
    color: colors.textLight,
  },
  priceText: {
    fontFamily: fonts.serif,
    fontSize: 16,
    fontWeight: '600',
  },
  priceTextDark: {
    color: colors.textDark,
  },
  priceTextLight: {
    color: colors.textLight,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  originalPriceText: {
    fontFamily: fonts.serif,
    fontSize: 12,
    color: colors.textDescDark,
    textDecorationLine: 'line-through',
  },
  favBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: layout.radii.iconBtn,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  favBtnDark: { backgroundColor: colors.overlayDark },
  favBtnLight: { backgroundColor: colors.overlayLight },
  favIcon: { fontSize: 16 },
  favIconActive: { color: colors.accent },
  favIconInactiveDark: { color: colors.white },
  favIconInactiveLight: { color: colors.textLight },
  cartBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
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
    top: 8,
    right: 8,
    zIndex: 10,
  },
  bottomOverlayWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    zIndex: 10,
  },
  cartBtnSolidStyle: {
    backgroundColor: colors.dark,
  },
});
