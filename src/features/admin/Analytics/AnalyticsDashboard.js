import { BoxIcon, ClipboardIcon, DollarIcon, TrendIcon } from '@/components/Icons';
import { Heading, Text } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import adminStyles from '../AdminPanelStyles';
import { useLanguage } from '../../../context/LanguageContext';
import { getOrderStatuses, getRevenueChartData, getSummaryStats, getTopProducts } from '../../../data/adminAnalytics';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { loadAdminOrders } from '../../../services/adminOrdersService';
import { colors } from '../../../theme/tokens';
import styles from './AnalyticsStyles';
import DateRangePicker from './DateRangePicker';
import LowStockList from './LowStockList';
import OrderStatusChart from './OrderStatusChart';
import RevenueChart from './RevenueChart';
import TopCustomersList from './TopCustomersList';
import TopProductsChart from './TopProductsChart';

function StatCard({ label, value, icon, accentColor }) {
  return (
    <Card style={[styles.statCard, accentColor ? { borderLeftColor: accentColor } : null]}>
      <View style={styles.statHeader}>
        <Text variant="label" color="secondary" style={styles.statLabel}>{label}</Text>
        <View>{icon}</View>
      </View>
      <Heading level={1} style={styles.statValue}>{value}</Heading>
    </Card>
  );
}

function formatCurrency(val) {
  return `$${val.toLocaleString()}`;
}

function StatsRow({ stats }) {
  const { t } = useLanguage();
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
  const { t } = useLanguage();
  return (
    <Card style={styles.chartPanel}>
      <Heading level={3} style={styles.chartTitle}>{t('adminAnalyticsRevenue')}</Heading>
      <RevenueChart revenueData={revenueData} />
    </Card>
  );
}

function BottomChartsRow({ topProducts, orderStatuses, orders }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('topProducts');

  return (
    <View style={styles.chartsRow}>
      <Card style={[styles.chartPanel, styles.chartHalf]}>
        <View style={styles.cardHeaderTabs}>
          <TouchableOpacity
            style={[styles.cardTabBtn, activeTab === 'topProducts' && styles.cardTabBtnActive]}
            onPress={() => setActiveTab('topProducts')}
            accessibilityRole="button"
          >
            <Text
              variant="subtitle2"
              style={[styles.cardTabText, activeTab === 'topProducts' && styles.cardTabTextActive]}
            >
              {t('adminAnalyticsHitsOfSales')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardTabBtn, activeTab === 'lowStock' && styles.cardTabBtnActive]}
            onPress={() => setActiveTab('lowStock')}
            accessibilityRole="button"
          >
            <Text
              variant="subtitle2"
              style={[styles.cardTabText, activeTab === 'lowStock' && styles.cardTabTextActive]}
            >
              {t('adminAnalyticsLowStock')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardTabBtn, activeTab === 'topCustomers' && styles.cardTabBtnActive]}
            onPress={() => setActiveTab('topCustomers')}
            accessibilityRole="button"
          >
            <Text
              variant="subtitle2"
              style={[styles.cardTabText, activeTab === 'topCustomers' && styles.cardTabTextActive]}
            >
              {t('adminAnalyticsTopCustomers')}
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'topProducts' && <TopProductsChart productsData={topProducts} />}
        {activeTab === 'lowStock' && <LowStockList />}
        {activeTab === 'topCustomers' && <TopCustomersList orders={orders} />}
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

export default function AnalyticsDashboard({ dateRange: propDateRange, onDateRangeChange }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();
  
  const initialEnd = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end;
  }, []);

  const initialStart = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(initialEnd.getDate() - 6);
    return start;
  }, [initialEnd]);
  
  const [localDateRange, setLocalDateRange] = useState({ start: initialStart, end: initialEnd, mode: '7days' });

  const dateRange = propDateRange || localDateRange;
  const setDateRange = onDateRangeChange || setLocalDateRange;

  const handleDateChange = (start, end, mode) => {
    setDateRange({ start, end, mode: mode || dateRange.mode || '7days' });
  };

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await loadAdminOrders();
        const fetched = res.data || [];
        
        const startMs = dateRange.start ? dateRange.start.getTime() : 0;
        const endMs = dateRange.end ? dateRange.end.getTime() : Infinity;
        
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
  const topProducts = useMemo(() => getTopProducts(orders, 15), [orders]);
  const revenueData = useMemo(() => getRevenueChartData(orders, dateRange.start, dateRange.end), [orders, dateRange]);
  const orderStatuses = useMemo(() => getOrderStatuses(orders), [orders]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={adminStyles.contentContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <DateRangePicker 
        startDate={dateRange.start} 
        endDate={dateRange.end}
        mode={dateRange.mode}
        onChange={handleDateChange} 
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.dark} style={styles.loadingIndicator} />
      ) : (
        <>
          <StatsRow stats={stats} />
          <RevenuePanel revenueData={revenueData} />
          <BottomChartsRow topProducts={topProducts} orderStatuses={orderStatuses} orders={orders} />
        </>
      )}
    </ScrollView>
  );
}
