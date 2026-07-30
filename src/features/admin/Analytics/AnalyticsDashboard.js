import { BoxIcon, ClipboardIcon, DollarIcon, TrendIcon } from '@/components/Icons';
import { Heading, Text } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getOrderStatuses, getRevenueChartData, getSummaryStats, getTopProducts } from '../../../data/adminAnalytics';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { loadAdminOrders } from '../../../services/adminOrdersService';
import { colors } from '../../../theme/tokens';
import styles from './AnalyticsStyles';
import DateRangePicker from './DateRangePicker';
import OrderStatusChart from './OrderStatusChart';
import RevenueChart from './RevenueChart';
import TopProductsChart from './TopProductsChart';

function StatCard({ label, value, icon, accentColor }) {
  return (
    <Card style={[styles.statCard, accentColor ? { borderLeftColor: accentColor } : null]}>
      <View style={styles.statHeader}>
        <Text variant="caption" weight="medium" color="secondary" style={styles.statLabel}>{label}</Text>
        <View>{icon}</View>
      </View>
      <Heading level={2} style={styles.statValue}>{value}</Heading>
    </Card>
  );
}

function formatCurrency(val) {
  return `$${val.toLocaleString()}`;
}

function StatsRow({ stats }) {
  const { t } = useTheme();
  return (
    <View style={styles.statsRow}>
      <StatCard label={t('adminAnalyticsRevenue')} value={formatCurrency(stats.revenue)} icon={<DollarIcon color={colors.successMid} size={18} />} accentColor={colors.successMid} />
      <StatCard label={t('adminAnalyticsOrders')} value={String(stats.orders)} icon={<ClipboardIcon color={colors.infoStrong} size={18} />} accentColor={colors.infoStrong} />
      <StatCard label={t('adminAnalyticsAvgOrder')} value={formatCurrency(stats.avgOrder)} icon={<TrendIcon color={colors.accentPink} size={18} />} accentColor={colors.accentPink} />
      <StatCard label={t('adminAnalyticsTotalSold')} value={String(stats.totalSold)} icon={<BoxIcon color={colors.purpleLight} size={18} />} accentColor={colors.purpleLight} />
    </View>
  );
}

function RevenuePanel({ revenueData }) {
  const { t } = useTheme();
  return (
    <Card style={styles.chartPanel}>
      <Heading level={3} style={styles.chartTitle}>{t('adminAnalyticsRevenue14Days')}</Heading>
      <RevenueChart revenueData={revenueData} />
    </Card>
  );
}

function BottomChartsRow({ topProducts, orderStatuses }) {
  const { t } = useTheme();
  return (
    <View style={styles.chartsRow}>
      <Card style={[styles.chartPanel, styles.chartHalf]}>
        <Heading level={3} style={styles.chartTitle}>{t('adminAnalyticsTopProducts')}</Heading>
        <TopProductsChart productsData={topProducts} />
      </Card>
      <Card style={[styles.chartPanel, styles.chartHalf]}>
        <Heading level={3} style={styles.chartTitle}>{t('adminAnalyticsOrderStatuses')}</Heading>
        <OrderStatusChart statusData={orderStatuses} />
      </Card>
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
  const { handleError } = useErrorHandler();
  
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
        const res = await loadAdminOrders();
        const fetched = res.data || [];
        
        const startMs = dateRange.start.getTime();
        const endMs = dateRange.end.getTime();
        
        const filtered = fetched.filter(order => {
          const time = getOrderTime(order);
          return time !== null && time >= startMs && time <= endMs;
        });
        
        setOrders(filtered);
      } catch (err) {
        handleError(err, { message: 'Error fetching orders for analytics' });
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
