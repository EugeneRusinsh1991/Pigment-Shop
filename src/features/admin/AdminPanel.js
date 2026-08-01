/**
 * AdminPanel.js
 *
 * Main admin panel layout with header + tab bar.
 */
import { useState, useEffect, useMemo } from 'react';
import { ScrollView, View, useWindowDimensions, Platform } from 'react-native';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const styleId = 'hide-admin-scrollbars-style';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.innerHTML = `
      ::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      * {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
    `;
    document.head.appendChild(styleEl);
  }
}

import { Heading } from '@/components/ui/Text';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminAuth, useAdminDrafts } from '../../services/adminDomain';
import { BackArrowIcon, LogoutIcon } from '@/components/Icons';
import styles from './AdminPanelStyles';
import AdminTabBar from './AdminTabBar';
import AnalyticsDashboard from './Analytics/AnalyticsDashboard';
import BannersManager from './Banners/BannersManager';
import CategoriesManager from './Categories/CategoriesManager';
import OrdersManager from './Orders/OrdersManager';
import ProductsManager from './Products/ProductsManager';
import UsersManager from './Users/UsersManager';
import { PageTransition } from '@/components/ui/Motion';
import { colors, layout } from '../../theme/tokens';

import { Button, IconButton } from '@/components/ui/Button';

const TAB_COMPONENTS = {
  analytics: AnalyticsDashboard,
  orders: OrdersManager,
  products: ProductsManager,
  categories: CategoriesManager,
  banners: BannersManager,
  users: UsersManager,
};

function renderActiveTab(activeTab, sessionDateRange, setSessionDateRange) {
  if (activeTab === 'analytics') {
    return <AnalyticsDashboard dateRange={sessionDateRange} onDateRangeChange={setSessionDateRange} />;
  }
  if (activeTab === 'orders') {
    return <OrdersManager dateRange={sessionDateRange} onDateRangeChange={setSessionDateRange} />;
  }
  const Component = TAB_COMPONENTS[activeTab];
  return Component ? <Component /> : null;
}

export default function AdminPanel({ onBack }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { logoutAdmin } = useAdminAuth();
  const { loadDrafts } = useAdminDrafts();
  const { width } = useWindowDimensions();
  const isMobile = width < layout.breakpoints.mobile;

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

  const [sessionDateRange, setSessionDateRange] = useState({
    start: initialStart,
    end: initialStart ? initialEnd : initialEnd,
    mode: '7days',
  });

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  const handleLogout = async () => {
    await logoutAdmin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconButton
            icon={<BackArrowIcon color={colors.textLight} size={16} />}
            onPress={onBack}
            variant="transparent"
            size="sm"
            testID="admin-exit-control"
          />
          {!isMobile && <Heading level={2} style={styles.headerTitle}>{t('adminTitle')}</Heading>}
        </View>
      </View>
      <View>
        <AdminTabBar activeTab={activeTab} onSelect={setActiveTab} isDark={isDark} />
      </View>
      <View style={styles.content}>
        <PageTransition key={activeTab} trigger={activeTab}>
          {renderActiveTab(activeTab, sessionDateRange, setSessionDateRange)}
        </PageTransition>
      </View>
    </View>
  );
}
