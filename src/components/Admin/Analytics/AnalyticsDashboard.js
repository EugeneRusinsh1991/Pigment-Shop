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
import StatCard from './StatCard';
import TopProductsChart from './TopProductsChart';
import styles from './AnalyticsStyles';

function formatCurrency(val) {
  return `$${val.toLocaleString()}`;
}

function StatsRow({ stats }) {
  return (
    <View style={styles.statsRow}>
      <StatCard label="Выручка" value={formatCurrency(stats.revenue)} icon="💵" />
      <StatCard label="Заказов" value={String(stats.orders)} icon="📋" />
      <StatCard label="Средний чек" value={formatCurrency(stats.avgOrder)} icon="📈" />
      <StatCard label="Продано единиц" value={String(stats.totalSold)} icon="📦" />
    </View>
  );
}

function RevenuePanel() {
  return (
    <View style={styles.chartPanel}>
      <Text style={styles.chartTitle}>Выручка за последние 14 дней</Text>
      <RevenueChart />
    </View>
  );
}

function BottomChartsRow() {
  return (
    <View style={styles.chartsRow}>
      <View style={[styles.chartPanel, styles.chartHalf]}>
        <Text style={styles.chartTitle}>Топ товаров по продажам</Text>
        <TopProductsChart />
      </View>
      <View style={[styles.chartPanel, styles.chartHalf]}>
        <Text style={styles.chartTitle}>Статусы заказов</Text>
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
