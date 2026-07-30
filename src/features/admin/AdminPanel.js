/**
 * AdminPanel.js
 *
 * Main admin panel layout with header + tab bar.
 */
import { useState, useEffect } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Heading } from '@/components/ui/Text';
import { useTheme } from '../../context/ThemeContext';
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

function renderActiveTab(activeTab) {
  const Component = TAB_COMPONENTS[activeTab];
  return Component ? <Component /> : null;
}

export default function AdminPanel({ onBack }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const { isDark, t } = useTheme();
  const { logoutAdmin } = useAdminAuth();
  const { loadDrafts } = useAdminDrafts();
  const { width } = useWindowDimensions();
  const isMobile = width < layout.breakpoints.mobile;

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
        {isMobile ? (
          <IconButton
            icon={<LogoutIcon color={colors.textDescLight} size={16} />}
            onPress={handleLogout}
            variant="secondary"
            size="sm"
            testID="admin-logout-control"
          />
        ) : (
          <Button
            title={t('userLogout')}
            leftIcon={<LogoutIcon color={colors.secondaryLightText} size={14} style={styles.logoutIcon} />}
            onPress={handleLogout}
            variant="secondary"
            size="sm"
            testID="admin-logout-control"
          />
        )}
      </View>
      <View>
        <AdminTabBar activeTab={activeTab} onSelect={setActiveTab} isDark={isDark} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <PageTransition key={activeTab} trigger={activeTab}>
          {renderActiveTab(activeTab)}
        </PageTransition>
      </ScrollView>
    </View>
  );
}
