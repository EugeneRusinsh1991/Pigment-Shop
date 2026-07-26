import { StyleSheet } from 'react-native';
import { colors, buttonTokens } from '../../theme/tokens';

export default StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 0,
  },
  rootDark: {
    backgroundColor: colors.backgroundDark,
  },
  rootLight: {
    backgroundColor: colors.backgroundLight,
  },
  scroll: {
    paddingBottom: 60,
  },
  wideRow: {
    flexDirection: 'row',
    padding: 32,
    gap: 32,
  },
  narrowStack: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 0,
  },
  imageArea: {
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
  },
  imageAreaWide: {
    flex: 1,
    height: 500,
  },
  prodImage: {
    width: '100%',
    height: '100%',
  },
  infoArea: {
    marginTop: 12,
  },
  infoAreaWide: {
    flex: 1,
    marginTop: 0,
  },
  brandText: {
    color: colors.accent,
    marginBottom: 4,
  },
  productName: {
    marginBottom: 4,
  },
  priceText: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 12,
  },
  skuText: {
    color: colors.secondaryDarkText,
    marginBottom: 4,
  },
  stockText: {
    color: colors.successMid,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  actionRowMobile: {
    flexWrap: 'nowrap',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: buttonTokens.sizes.lg.borderRadiusPill,
    borderWidth: 1,
    height: buttonTokens.sizes.lg.height,
    paddingHorizontal: 8,
  },
  qtyRowDark: {
    borderColor: colors.secondaryDarkBorder,
  },
  qtyRowLight: {
    borderColor: colors.secondaryLightBorder,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {},
  qtyVal: {
    minWidth: 30,
    textAlign: 'center',
  },
  cartBtn: {
    backgroundColor: colors.dark,
    borderRadius: buttonTokens.sizes.lg.borderRadiusPill,
    height: buttonTokens.sizes.lg.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtnWide: {
    width: 240,
  },
  cartBtnMobile: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 20,
  },
  cartBtnText: {
    color: colors.white,
    flexShrink: 1,
  },
  goToCartLink: {
    marginTop: 8,
  },
  goToCartText: {
    color: colors.accent,
  },
  favBtn: {
    width: buttonTokens.sizes.lg.height,
    height: buttonTokens.sizes.lg.height,
    borderRadius: buttonTokens.sizes.lg.borderRadiusPill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  favBtnDark: { borderColor: colors.outlineDarkBorder, backgroundColor: colors.dark },
  favBtnLight: { borderColor: colors.secondaryLightBorder, backgroundColor: colors.white },
  favIcon: {},
  favIconActive: { color: colors.accent },
  favIconInactiveDark: { color: colors.white },
  favIconInactiveLight: { color: colors.dark },
  favOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  favOverlayDark: { backgroundColor: colors.overlayDark },
  favOverlayLight: { backgroundColor: colors.overlayLight },
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
  },
  dotActive: {
    width: 20,
    opacity: 1,
  },
  dotInactive: {
    width: 8,
    opacity: 0.5,
  },
});
