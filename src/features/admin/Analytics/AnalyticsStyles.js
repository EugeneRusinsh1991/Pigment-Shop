/**
 * AnalyticsStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout, shadow, buttonTokens } from '../../../theme/tokens';

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
    backgroundColor: colors.white,
    borderRadius: layout.radii.iconBtn,
    padding: layout.spacing.lg + layout.spacing.xxs,
    ...shadow.card(),
    elevation: layout.elevation.sm,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.xs + layout.spacing.xxs,
  },
  statLabel: {
  },
  statIcon: {
  },

  statValue: {
  },

  /* Chart Panels */
  chartPanel: {
    backgroundColor: colors.white,
    borderRadius: layout.radii.iconBtn,
    padding: layout.spacing.lg + layout.spacing.xxs,
    marginBottom: layout.spacing.lg,
    ...shadow.card(),
    elevation: layout.elevation.sm,
  },
  chartTitle: {
    marginBottom: layout.spacing.lg,
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
    height: layout.spacing.lg + layout.spacing.xxs,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.spacing.xxs,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: layout.spacing.xxs,
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
    minWidth: 140,
    paddingVertical: layout.spacing.xs + layout.spacing.xxs,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.radii.lg,
    backgroundColor: colors.black,
    borderWidth: 1.5,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetBtnActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  presetText: {
    color: colors.white,
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
    borderWidth: 1,
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
    backgroundColor: colors.successMid,
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
  loadingIndicator: {
    marginVertical: layout.spacing.xxl + layout.spacing.sm,
  },
});
