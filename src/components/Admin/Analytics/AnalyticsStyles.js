/**
 * AnalyticsStyles.js
 */
import { StyleSheet } from 'react-native';

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
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  statIcon: {
    fontSize: 18,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1C',
  },

  /* Chart Panels */
  chartPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 16,
  },
  chartsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  chartHalf: {
    flex: 1,
  },

  /* Bar Chart */
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  barLabel: {
    fontSize: 11,
    color: '#475569',
    width: 140,
    marginRight: 10,
    flexShrink: 1,
  },
  barTrack: {
    flex: 1,
    height: 20,
    backgroundColor: '#F5F7FA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#E87A8E',
    borderRadius: 4,
  },
  barValue: {
    fontSize: 11,
    color: '#475569',
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
    fontSize: 12,
    color: '#475569',
  },
  legendValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1C1C',
    marginLeft: 4,
  },

  /* SVG area (for revenue line chart) */
  svgWrapper: {
    height: 160,
    width: '100%',
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 4,
  },
  xLabel: {
    fontSize: 9,
    color: '#94a3b8',
  },
});
