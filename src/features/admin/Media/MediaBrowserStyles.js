import { StyleSheet } from 'react-native';
import { colors, layout, shadow, buttonTokens } from '../../../theme/tokens';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayScrim,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: layout.radii.md,
    width: 600,
    maxWidth: '95%',
    maxHeight: '80%',
    overflow: 'hidden',
    ...shadow.media(),
    elevation: layout.elevation.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.xl,
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.slateMid,
    gap: layout.spacing.sm,
  },
  title: {
    flex: 1,
    color: colors.dark,
  },
  refreshBtn: {
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.slateMid,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  refreshBtnText: {
    color: colors.secondaryLightText,
  },
  closeBtn: {
    color: colors.secondaryDarkText,
    padding: layout.spacing.xxs,
  },
  outdatedBanner: {
    marginHorizontal: layout.spacing.lg,
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.xxs,
    padding: layout.spacing.md,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.warningBgLight,
    borderWidth: 1,
    borderColor: colors.warningLight,
  },
  outdatedBannerTitle: {
    color: colors.warningDeeper,
    marginBottom: layout.elevation.sm,
  },
  outdatedBannerText: {
    color: colors.warningDarkAlt,
  },
  outdatedBannerCode: {
    color: colors.warningDeeper,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: layout.spacing.xl,
    paddingVertical: layout.spacing.sm,
    gap: layout.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.slateMid,
  },
  tab: {
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.slateMid,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  tabActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  tabText: {
    color: colors.secondaryLightText,
  },
  tabTextActive: {
    color: colors.white,
  },
  body: {
    padding: layout.spacing.lg,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.sm,
  },
  itemBtn: {
    width: 100,
    borderRadius: layout.radii.sm,
    borderWidth: 2,
    borderColor: colors.transparent,
    overflow: 'hidden',
    backgroundColor: colors.slateLight,
  },
  itemBtnSelected: {
    borderColor: colors.dark,
  },
  itemThumbContainer: {
    width: '100%',
    height: 80,
    overflow: 'hidden',
  },
  itemThumb: {
    width: '100%',
    height: 70,
    backgroundColor: colors.secondaryLightBorder,
  },
  itemName: {
    color: colors.secondaryLightText,
    paddingHorizontal: layout.spacing.xs,
    paddingVertical: layout.spacing.xxs,
  },
  videoPlaceholder: {
    width: '100%',
    height: 70,
    backgroundColor: colors.secondaryLightBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {},
  removeBtn: {
    position: 'absolute',
    top: layout.spacing.xxs,
    right: layout.spacing.xxs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: layout.spacing.sm,
    padding: layout.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.slateMid,
  },
  cancelBtn: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: buttonTokens.sizes.md.borderRadiusPill,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.slateMid,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  cancelBtnText: {
    color: colors.secondaryLightText,
  },
  selectBtn: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: buttonTokens.sizes.md.borderRadiusPill,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.dark,
  },
  selectBtnText: {
    color: colors.white,
  },
  selectBtnDisabled: {
    backgroundColor: colors.slateStrong,
  },
  alertIcon: {
    marginRight: layout.spacing.xs,
  },
  refreshIcon: {
    marginRight: layout.spacing.xxs,
  },
});
