/**
 * AnalyticsStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

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
    padding: 18,
    ...shadow.card(),
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    padding: 20,
    marginBottom: layout.spacing.lg,
    ...shadow.card(),
    elevation: 2,
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
    marginBottom: 10,
  },
  barLabel: {
    width: 140,
    marginRight: 10,
    flexShrink: 1,
  },
  barTrack: {
    flex: 1,
    height: 20,
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
    width: 24,
    textAlign: 'right',
  },

  /* Donut / Pie Chart (status) */
  donutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: layout.spacing.sm,
  },
  legendText: {
  },
  legendValue: {
    marginLeft: 4,
  },

  /* SVG area (for revenue line chart) */
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
    marginBottom: 20,
    position: 'relative',
    zIndex: layout.zIndices.modal,
  },
  datePickerPresets: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  presetBtn: {
    minWidth: 140,
    paddingVertical: 10,
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
    height: 40,
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
    height: 40,
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
    marginBottom: 20,
    position: 'relative',
    zIndex: layout.zIndices.modal,
    gap: layout.spacing.sm,
  },
  mobilePresetsRow: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    width: '100%',
  },
});
