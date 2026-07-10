/**
 * AnalyticsDashboard.js
 *
 * Analytics tab content: stat cards + revenue chart + bottom charts row.
 */
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { getSummaryStats } from '../../../data/adminAnalytics';
import OrderStatusChart from './OrderStatusChart';
import RevenueChart from './RevenueChart';
import TopProductsChart from './TopProductsChart';
import styles from './AnalyticsStyles';
import { useTheme } from '../../../context/ThemeContext';

function StatCard({ label, value, icon }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statIcon}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}


function formatCurrency(val) {
  return `$${val.toLocaleString()}`;
}

function StatsRow({ stats }) {
  const { t } = useTheme();
  return (
    <View style={styles.statsRow}>
      <StatCard label={t('adminAnalyticsRevenue')} value={formatCurrency(stats.revenue)} icon="💵" />
      <StatCard label={t('adminAnalyticsOrders')} value={String(stats.orders)} icon="📋" />
      <StatCard label={t('adminAnalyticsAvgOrder')} value={formatCurrency(stats.avgOrder)} icon="📈" />
      <StatCard label={t('adminAnalyticsTotalSold')} value={String(stats.totalSold)} icon="📦" />
    </View>
  );
}

function RevenuePanel() {
  const { t } = useTheme();
  return (
    <View style={styles.chartPanel}>
      <Text style={styles.chartTitle}>{t('adminAnalyticsRevenue14Days')}</Text>
      <RevenueChart />
    </View>
  );
}

function BottomChartsRow() {
  const { t } = useTheme();
  return (
    <View style={styles.chartsRow}>
      <View style={[styles.chartPanel, styles.chartHalf]}>
        <Text style={styles.chartTitle}>{t('adminAnalyticsTopProducts')}</Text>
        <TopProductsChart />
      </View>
      <View style={[styles.chartPanel, styles.chartHalf]}>
        <Text style={styles.chartTitle}>{t('adminAnalyticsOrderStatuses')}</Text>
        <OrderStatusChart />
      </View>
    </View>
  );
}

export default function AnalyticsDashboard() {
  const stats = useMemo(() => getSummaryStats(), []);

  return (
    <View style={styles.container}>
      <StatsRow stats={stats} />
      <RevenuePanel />
      <BottomChartsRow />
    </View>
  );
}
