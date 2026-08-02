import { StyleSheet } from 'react-native';
import { colors, buttonTokens, layout, carouselTokens } from '../../theme/tokens';


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
  wideRowTablet: {
    flexDirection: 'row',
    padding: layout.spacing.xl,
    gap: layout.spacing.xl,
  },
  narrowStack: {
    paddingHorizontal: layout.spacing.lg,
    paddingTop: layout.spacing.sm,
    paddingBottom: layout.spacing.none,
  },
  imageArea: {
    width: '100%',
  },
  imageAreaWide: {
    flex: 1,
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
    marginTop: layout.spacing.none,
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
    borderWidth: layout.borderWidth.thin,
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
    borderWidth: layout.borderWidth.thin,
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
    zIndex: layout.zIndices.active,
  },
  favOverlayDark: { backgroundColor: colors.overlayDark },
  favOverlayLight: { backgroundColor: colors.overlayLight },
  carouselContainer: {
    width: '100%',
    height: 300,
    borderRadius: layout.radii.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  carouselContainerWide: {
    height: 500,
  },
  carouselContainerTablet: {
    height: 380,
  },
  imageFill: {
    position: 'absolute',
    left: layout.spacing.none,
    top: layout.spacing.none,
    right: layout.spacing.none,
    bottom: layout.spacing.none,
    width: '100%',
    height: '100%',
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -24,
    width: 48,
    height: 48,
    borderRadius: layout.radii.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: layout.borderWidth.thin,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: layout.zIndices.raised,
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
    zIndex: layout.zIndices.raised,
    gap: carouselTokens.dots.gap,
  },
  dot: {
    height: carouselTokens.dots.height,
    borderRadius: carouselTokens.dots.borderRadius,
    backgroundColor: carouselTokens.dots.inactiveColor,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  dotActive: {
    width: carouselTokens.dots.activeWidth,
    opacity: layout.opacity.full,
    backgroundColor: carouselTokens.dots.activeBgColor,
    overflow: 'hidden',
    borderRadius: carouselTokens.dots.borderRadius,
  },
  dotInactive: {
    width: carouselTokens.dots.inactiveWidth,
    opacity: layout.opacity.full,
  },
  progressBar: {
    backgroundColor: carouselTokens.dots.activeColor,
    height: '100%',
    borderRadius: carouselTokens.dots.borderRadius,
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
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: layout.spacing.none,
  },
  bottomSpacer: {
    height: layout.spacing.xxl + layout.spacing.sm,
  },

  // Thumbnail Slot & Bar Styles
  thumbnailsRowContainer: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    marginTop: layout.spacing.md,
    width: '100%',
  },
  thumbnailSlot: {
    flex: 1,
    height: 80,
    borderRadius: layout.radii.md,
    overflow: 'hidden',
    borderWidth: layout.borderWidth.thin,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnailSlotLight: {
    backgroundColor: colors.productCardLight,
    borderColor: colors.borderLight,
  },
  thumbnailSlotDark: {
    backgroundColor: colors.productCardDark,
    borderColor: colors.secondaryDarkBorder,
  },
  thumbnailActiveIndicator: {
    position: 'absolute',
    inset: 0,
    borderWidth: layout.borderWidth.medium,
    borderColor: colors.accent,
    borderRadius: layout.radii.md,
    zIndex: layout.zIndices.active,
  },
});
