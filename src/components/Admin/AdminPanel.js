/**
 * AdminPanel.js
 *
 * Main admin panel layout with header + tab bar.
 */
import { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
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
import PageTransition from '../PageTransition';
import { colors, layout } from '../../theme/tokens';

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
  const { t } = useTheme();
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
          <TouchableOpacity style={styles.headerBackBtn} onPress={onBack}>
            <BackArrowIcon color={colors.textLight} size={16} />
          </TouchableOpacity>
          {!isMobile && <Text style={styles.headerTitle}>{t('adminTitle')}</Text>}
        </View>
        <TouchableOpacity
          style={[styles.logoutBtn, isMobile && { paddingHorizontal: 10 }]}
          onPress={handleLogout}
        >
          <LogoutIcon color={colors.textDescLight} size={16} />
          {!isMobile && <Text style={styles.logoutText}>{t('userLogout')}</Text>}
        </TouchableOpacity>
      </View>
      <View>
        <AdminTabBar activeTab={activeTab} onSelect={setActiveTab} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        <PageTransition key={activeTab} trigger={activeTab}>
          {renderActiveTab(activeTab)}
        </PageTransition>
      </ScrollView>
    </View>
  );
}
