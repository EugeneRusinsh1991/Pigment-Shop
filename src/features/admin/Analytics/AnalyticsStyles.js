/**
 * AnalyticsStyles.js
 */
import { StyleSheet } from 'react-native';
import { buttonTokens, colors, layout, shadow } from '../../../theme/tokens';

export default StyleSheet.create({
  container: {
    paddingHorizontal: layout.spacing.xl,
    paddingTop: layout.spacing.xl,
  },

  /* Stat Cards */
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.md,
    marginBottom: layout.spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: 160,
    padding: layout.spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderBottomWidth: 0,
    ...shadow.card(),
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  statLabel: {
  },
  statIcon: {
  },

  statValue: {
  },

  /* Chart Panels */
  chartPanel: {
    padding: layout.spacing.lg + layout.spacing.xxs,
    marginBottom: layout.spacing.lg,
    ...shadow.panel(),
  },
  chartTitle: {
    marginBottom: layout.spacing.md,
    paddingBottom: layout.spacing.xs,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.secondaryLightBorder,
  },
  cardHeaderTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    marginBottom: layout.spacing.md,
    paddingBottom: layout.spacing.xs,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.secondaryLightBorder,
  },
  cardTabBtn: {
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.full,
    backgroundColor: colors.secondaryLightBg,
  },
  cardTabBtnActive: {
    backgroundColor: colors.accent,
  },
  cardTabText: {
    color: colors.textDescLight,
    fontWeight: '600',
  },
  cardTabTextActive: {
    color: colors.white,
  },
  chartsRow: {
    flexDirection: 'row',
    gap: layout.spacing.lg,
    flexWrap: 'wrap',
  },
  chartHalf: {
    flex: 1,
    minWidth: 280,
  },

  /* Low Stock */
  lowStockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.sm,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderLight,
  },
  lowStockNameCol: {
    flex: 1,
    marginRight: layout.spacing.md,
  },
  lowStockBadge: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxs,
    borderRadius: layout.radii.full,
    backgroundColor: colors.secondaryLightBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowStockBadgeWarning: {
    backgroundColor: colors.warningBgLight,
  },
  lowStockBadgeDanger: {
    backgroundColor: colors.dangerBgLight,
  },
  lowStockQty: {
    fontWeight: '700',
  },

  /* Bar Chart */
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.xs + layout.spacing.xxs,
  },
  barLabel: {
    width: 140,
    marginRight: layout.spacing.xs + layout.spacing.xxs,
    flexShrink: 1,
  },
  barTrack: {
    flex: 1,
    height: layout.spacing.lg,
    backgroundColor: colors.borderLight,
    borderRadius: layout.radii.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: layout.radii.full,
  },
  barValue: {
    marginLeft: layout.spacing.sm,
    width: layout.spacing.xl,
    textAlign: 'right',
  },

  /* Donut / Pie Chart (status) */
  donutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgDonutFallback: {
    alignItems: 'center',
  },
  svgDonutBar: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: colors.secondaryLightBg,
  },
  donutBarSegment: {
  },
  topProductsEmpty: {
    paddingVertical: layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topProductsBarContainer: {
    flexDirection: 'row',
    height: '100%',
    borderRadius: layout.spacing.xxs,
    overflow: 'hidden',
  },
  topProductsSegment: {
  },
  topProductsExpandRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: layout.spacing.sm,
    paddingTop: layout.spacing.xs,
  },
  topProductsExpandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.full,
    backgroundColor: colors.secondaryLightBg,
  },
  topProductsExpandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  svgRotate: {
    transform: 'rotate(-90deg)',
  },
  legendList: {
    marginTop: layout.spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.xs,
  },
  legendDot: {
    width: layout.spacing.xs + layout.spacing.xxs,
    height: layout.spacing.xs + layout.spacing.xxs,
    borderRadius: layout.radii.full,
    marginRight: layout.spacing.sm,
  },
  legendText: {
  },
  legendValue: {
    marginLeft: layout.spacing.xxs,
  },

  /* SVG area (for revenue line chart) */
  chartEmpty: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgBlock: {
    display: 'block',
  },
  revenueNativeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  revenueNativeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  revenueBarCol: {
    flex: 1,
    alignItems: 'center',
  },
  revenueBarFill: {
    width: layout.spacing.xs,
    backgroundColor: colors.successMid,
    borderRadius: layout.radii.full,
  },
  svgWrapper: {
    height: 190,
    width: '100%',
  },
  xLabels: {
    display: 'none',
  },
  xLabel: {
    color: colors.secondaryDarkText,
  },

  /* DateRangePicker */
  datePickerContainer: {
    marginBottom: layout.spacing.lg + layout.spacing.xxs,
    position: 'relative',
    zIndex: layout.zIndices.modal,
  },
  calendarToggleWrapper: {
    position: 'relative',
    zIndex: layout.zIndices.toast,
  },
  datePickerPresets: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  presetBtn: {
    minWidth: 120,
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.radii.full,
    backgroundColor: colors.secondaryLightBg,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetBtnActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  presetText: {
    color: colors.textDescLight,
    textAlign: 'center',
  },
  presetTextActive: {
    color: colors.white,
  },
  customDateRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: layout.spacing.sm,
    marginTop: layout.spacing.sm,
  },
  customDateInput: {
    flex: 1,
    minWidth: 120,
    height: buttonTokens.sizes.md.height,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.secondaryLightBorder,
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
    color: colors.dark,
    backgroundColor: colors.slateLight,
  },
  customDateDash: {
    color: colors.secondaryDarkText,
  },
  applyBtn: {
    height: buttonTokens.sizes.md.height,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.radii.sm,
  },
  applyBtnText: {
    color: colors.white,
  },

  /* Mobile DateRangePicker */
  mobileDatePickerContainer: {
    marginBottom: layout.spacing.lg + layout.spacing.xxs,
    position: 'relative',
    zIndex: layout.zIndices.modal,
    gap: layout.spacing.sm,
  },
  mobilePresetsRow: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    width: '100%',
  },
  /* Top Customers */
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: layout.spacing.sm,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderLight,
    gap: layout.spacing.sm,
  },
  customerRank: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerRankText: {
    fontWeight: '700',
    color: colors.secondaryDarkText,
  },
  customerAvatar: {
    width: 34,
    height: 34,
    borderRadius: layout.radii.full,
    backgroundColor: colors.secondaryLightBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerAvatarText: {
    fontWeight: '700',
    color: colors.accent,
  },
  customerInfo: {
    flex: 1,
    minWidth: 0,
  },
  customerName: {
    fontWeight: '600',
    color: colors.dark,
    marginBottom: layout.spacing.xxs,
  },
  customerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    flexWrap: 'wrap',
  },
  customerMetaText: {
    color: colors.secondaryDarkText,
  },
  customerOrdersBadge: {
    paddingHorizontal: layout.spacing.xs,
    paddingVertical: 1,
    borderRadius: layout.radii.full,
    backgroundColor: colors.secondaryLightBg,
  },
  customerOrdersBadgeText: {
    color: colors.textDescLight,
  },
  customerTotalSpent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  customerSpentText: {
    fontWeight: '700',
    color: colors.accent,
  },

  loadingIndicator: {
    marginVertical: layout.spacing.xxl + layout.spacing.sm,
  },
});
