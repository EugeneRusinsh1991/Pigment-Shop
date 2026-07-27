import React, { useMemo, useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Heading } from '../../Text';
import { db } from '../../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getSummaryStats, getTopProducts, getRevenueChartData, getOrderStatuses } from '../../../data/adminAnalytics';
import OrderStatusChart from './OrderStatusChart';
import RevenueChart from './RevenueChart';
import TopProductsChart from './TopProductsChart';
import DateRangePicker from './DateRangePicker';
import styles from './AnalyticsStyles';
import { useTheme } from '../../../context/ThemeContext';
import { COLLECTIONS } from '../../../services/collections';
import { DollarIcon, ClipboardIcon, TrendIcon, BoxIcon } from '@/components/Icons';
import { colors } from '../../../theme/tokens';

function StatCard({ label, value, icon }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text variant="caption" color="secondary" style={styles.statLabel}>{label}</Text>
        <View>{icon}</View>
      </View>
      <Heading level={3} style={styles.statValue}>{value}</Heading>
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
      <StatCard label={t('adminAnalyticsRevenue')} value={formatCurrency(stats.revenue)} icon={<DollarIcon color={colors.successMid} size={18} />} />
      <StatCard label={t('adminAnalyticsOrders')} value={String(stats.orders)} icon={<ClipboardIcon color={colors.infoStrong} size={18} />} />
      <StatCard label={t('adminAnalyticsAvgOrder')} value={formatCurrency(stats.avgOrder)} icon={<TrendIcon color={colors.accentPink} size={18} />} />
      <StatCard label={t('adminAnalyticsTotalSold')} value={String(stats.totalSold)} icon={<BoxIcon color={colors.purpleLight} size={18} />} />
    </View>
  );
}

function RevenuePanel({ revenueData }) {
  const { t } = useTheme();
  return (
    <View style={styles.chartPanel}>
      <Heading level={4} style={styles.chartTitle}>{t('adminAnalyticsRevenue14Days')}</Heading>
      <RevenueChart revenueData={revenueData} />
    </View>
  );
}

function BottomChartsRow({ topProducts, orderStatuses }) {
  const { t } = useTheme();
  return (
    <View style={styles.chartsRow}>
      <View style={[styles.chartPanel, styles.chartHalf]}>
        <Heading level={4} style={styles.chartTitle}>{t('adminAnalyticsTopProducts')}</Heading>
        <TopProductsChart productsData={topProducts} />
      </View>
      <View style={[styles.chartPanel, styles.chartHalf]}>
        <Heading level={4} style={styles.chartTitle}>{t('adminAnalyticsOrderStatuses')}</Heading>
        <OrderStatusChart statusData={orderStatuses} />
      </View>
    </View>
  );
}

function getOrderTime(order) {
  if (!order || !order.createdAt) return null;
  if (order.createdAt.toMillis) return order.createdAt.toMillis();
  if (order.createdAt.toDate) return order.createdAt.toDate().getTime();
  const d = new Date(order.createdAt);
  return isNaN(d.getTime()) ? null : d.getTime();
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
        const snap = await getDocs(collection(db, COLLECTIONS.ORDERS));
        const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const startMs = dateRange.start.getTime();
        const endMs = dateRange.end.getTime();
        
        const filtered = fetched.filter(order => {
          const time = getOrderTime(order);
          return time !== null && time >= startMs && time <= endMs;
        });
        
        setOrders(filtered);
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
        <ActivityIndicator size="large" color={colors.dark} style={styles.loadingIndicator} />
      ) : (
        <>
          <StatsRow stats={stats} />
          <RevenuePanel revenueData={revenueData} />
          <BottomChartsRow topProducts={topProducts} orderStatuses={orderStatuses} />
        </>
      )}
    </View>
  );
}
