import React, { useMemo, useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { getSummaryStats, getTopProducts, getLowestSellingProducts, getRevenueChartData, getOrderStatuses } from '../../../data/adminAnalytics';
import OrderStatusChart from './OrderStatusChart';
import RevenueChart from './RevenueChart';
import TopProductsChart from './TopProductsChart';
import DateRangePicker from './DateRangePicker';
import styles from './AnalyticsStyles';
import { useTheme } from '../../../context/ThemeContext';
import { DollarIcon, ClipboardIcon, TrendIcon, BoxIcon } from '../../Icons';

function StatCard({ label, value, icon }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statLabel}>{label}</Text>
        <View>{icon}</View>
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
      <StatCard label={t('adminAnalyticsRevenue')} value={formatCurrency(stats.revenue)} icon={<DollarIcon color="#10B981" size={18} />} />
      <StatCard label={t('adminAnalyticsOrders')} value={String(stats.orders)} icon={<ClipboardIcon color="#3B82F6" size={18} />} />
      <StatCard label={t('adminAnalyticsAvgOrder')} value={formatCurrency(stats.avgOrder)} icon={<TrendIcon color="#EC4899" size={18} />} />
      <StatCard label={t('adminAnalyticsTotalSold')} value={String(stats.totalSold)} icon={<BoxIcon color="#8B5CF6" size={18} />} />
    </View>
  );
}

function RevenuePanel({ revenueData }) {
  const { t } = useTheme();
  return (
    <View style={styles.chartPanel}>
      <Text style={styles.chartTitle}>{t('adminAnalyticsRevenue14Days')}</Text>
      <RevenueChart revenueData={revenueData} />
    </View>
  );
}

function BottomChartsRow({ topProducts, lowestProducts, orderStatuses }) {
  const { t } = useTheme();
  return (
    <>
      <View style={styles.chartsRow}>
        <View style={[styles.chartPanel, styles.chartHalf]}>
          <Text style={styles.chartTitle}>{t('adminAnalyticsTopProducts')}</Text>
          <TopProductsChart productsData={topProducts} />
        </View>
        <View style={[styles.chartPanel, styles.chartHalf]}>
          <Text style={styles.chartTitle}>{t('adminAnalyticsOrderStatuses')}</Text>
          <OrderStatusChart statusData={orderStatuses} />
        </View>
      </View>
      <View style={styles.chartsRow}>
        <View style={[styles.chartPanel, styles.chartHalf]}>
          <Text style={styles.chartTitle}>{t('adminAnalyticsLowestProducts')}</Text>
          <TopProductsChart productsData={lowestProducts} />
        </View>
      </View>
    </>
  );
}

export default function AnalyticsDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const initialEnd = new Date();
  initialEnd.setHours(23, 59, 59, 999);
  const initialStart = new Date();
  initialStart.setHours(0, 0, 0, 0);
  initialStart.setDate(initialEnd.getDate() - 6);
  
  const [dateRange, setDateRange] = useState({ start: initialStart, end: initialEnd });

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'orders'),
          where('createdAt', '>=', Timestamp.fromDate(dateRange.start)),
          where('createdAt', '<=', Timestamp.fromDate(dateRange.end))
        );
        const snap = await getDocs(q);
        const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(fetched);
      } catch (err) {
        console.error('Error fetching orders for analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [dateRange]);

  const stats = useMemo(() => getSummaryStats(orders), [orders]);
  const topProducts = useMemo(() => getTopProducts(orders, 5), [orders]);
  const lowestProducts = useMemo(() => getLowestSellingProducts(orders, 5), [orders]);
  const revenueData = useMemo(() => getRevenueChartData(orders, dateRange.start, dateRange.end), [orders, dateRange]);
  const orderStatuses = useMemo(() => getOrderStatuses(orders), [orders]);

  return (
    <View style={styles.container}>
      <DateRangePicker 
        startDate={dateRange.start} 
        endDate={dateRange.end} 
        onChange={(s, e) => setDateRange({ start: s, end: e })} 
      />
      {loading ? (
        <ActivityIndicator size="large" color="#1C1C1C" style={{ marginVertical: 40 }} />
      ) : (
        <>
          <StatsRow stats={stats} />
          <RevenuePanel revenueData={revenueData} />
          <BottomChartsRow topProducts={topProducts} lowestProducts={lowestProducts} orderStatuses={orderStatuses} />
        </>
      )}
    </View>
  );
}
