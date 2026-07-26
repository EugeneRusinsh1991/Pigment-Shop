/**
 * AnalyticsStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  /* Stat Cards */
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: 160,
    backgroundColor: colors.white,
    borderRadius: 14,
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
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    ...shadow.card(),
    elevation: 2,
  },
  chartTitle: {
    marginBottom: 16,
  },
  chartsRow: {
    flexDirection: 'row',
    gap: 16,
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
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  barValue: {
    marginLeft: 8,
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
    marginBottom: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
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
    zIndex: 2000,
  },
  datePickerPresets: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  presetBtn: {
    minWidth: 140,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
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
    gap: 8,
    marginTop: 8,
  },
  customDateInput: {
    flex: 1,
    minWidth: 120,
    height: 40,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
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
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyBtnText: {
    color: colors.white,
  },

  /* Mobile DateRangePicker */
  mobileDatePickerContainer: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 2000,
    gap: 8,
  },
  mobilePresetsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
});
