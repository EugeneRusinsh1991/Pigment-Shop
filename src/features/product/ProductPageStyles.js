import { StyleSheet } from 'react-native';
import { colors, buttonTokens, layout } from '../../theme/tokens';

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
    paddingBottom: layout.spacing.xxl + 28,
  },
  wideRow: {
    flexDirection: 'row',
    padding: layout.spacing.xxl,
    gap: layout.spacing.xxl,
  },
  narrowStack: {
    paddingHorizontal: layout.spacing.md,
    paddingTop: layout.spacing.sm,
    paddingBottom: 0,
  },
  imageArea: {
    height: 300,
    borderRadius: layout.radii.xl,
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
    marginTop: layout.spacing.md,
  },
  infoAreaWide: {
    flex: 1,
    marginTop: 0,
  },
  brandText: {
    color: colors.accent,
    marginBottom: layout.spacing.xxs,
  },
  productName: {
    marginBottom: layout.spacing.xxs,
  },
  priceText: {
    marginBottom: layout.spacing.sm + 2,
  },
  description: {
    marginBottom: layout.spacing.md,
  },
  skuText: {
    color: colors.secondaryDarkText,
    marginBottom: layout.spacing.xxs,
  },
  stockText: {
    color: colors.successMid,
    marginBottom: layout.spacing.lg,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.md,
    marginBottom: layout.spacing.md,
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
    paddingHorizontal: layout.spacing.sm,
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
    paddingHorizontal: layout.spacing.lg + 4,
  },
  cartBtnText: {
    color: colors.white,
    flexShrink: 1,
  },
  goToCartLink: {
    marginTop: layout.spacing.sm,
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
    marginLeft: layout.spacing.sm,
  },
  favBtnDark: { borderColor: colors.outlineDarkBorder, backgroundColor: colors.dark },
  favBtnLight: { borderColor: colors.secondaryLightBorder, backgroundColor: colors.white },
  favIcon: {},
  favIconActive: { color: colors.accent },
  favIconInactiveDark: { color: colors.white },
  favIconInactiveLight: { color: colors.dark },
  favOverlay: {
    position: 'absolute',
    top: layout.spacing.md,
    right: layout.spacing.md,
    width: 44,
    height: 44,
    borderRadius: layout.radii.full,
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
    borderRadius: layout.radii.full,
    backgroundColor: colors.overlayScrim,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
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
    zIndex: 10,
    gap: layout.spacing.sm,
  },
  dot: {
    height: layout.spacing.sm,
    borderRadius: layout.spacing.xxs,
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
  badgesOverlay: {
    position: 'absolute',
    top: layout.spacing.md,
    left: layout.spacing.md,
    zIndex: layout.zIndices.sticky,
  },
  reviewSectionContainer: {
    marginTop: layout.spacing.xl,
  },
  reviewSection: {
    marginTop: layout.spacing.xl,
  },
  priceRowContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: layout.spacing.sm,
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
  },
  actionFavBtn: {
    marginLeft: layout.spacing.sm,
  },
  flex1: {
    flex: 1,
  },
  pageHeaderContainer: {
    alignSelf: 'center',
    maxWidth: '100%',
  },
  pageBodyContainer: {
    alignSelf: 'center',
    maxWidth: '100%',
    paddingBottom: layout.spacing.xl,
  },
  loadingRoot: {
    padding: layout.spacing.xxl + layout.spacing.sm,
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 0,
  },
  bottomSpacer: {
    height: layout.spacing.xxl + layout.spacing.sm,
  },
});
