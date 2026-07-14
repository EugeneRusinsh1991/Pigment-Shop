/**
 * AdminPanel.js
 *
 * Main admin panel layout with header + tab bar.
 */
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAdminDomain } from '../../services/adminDomain';
import { BackArrowIcon, LogoutIcon } from '../Icons';
import styles from './AdminPanelStyles';
import AdminTabBar from './AdminTabBar';
import AnalyticsDashboard from './Analytics/AnalyticsDashboard';
import BannersManager from './Banners/BannersManager';
import CategoriesManager from './Categories/CategoriesManager';
import OrdersManager from './Orders/OrdersManager';
import ProductsManager from './Products/ProductsManager';
import UsersManager from './Users/UsersManager';

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
  const { logoutAdmin } = useAdminDomain();

  const handleLogout = async () => {
    await logoutAdmin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerBackBtn} onPress={onBack}>
            <BackArrowIcon color="#1C1C1C" size={16} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('adminTitle')}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogoutIcon color="#475569" size={14} />
          <Text style={styles.logoutText}>{t('userLogout')}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <AdminTabBar activeTab={activeTab} onSelect={setActiveTab} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        {renderActiveTab(activeTab)}
      </ScrollView>
    </View>
  );
}
