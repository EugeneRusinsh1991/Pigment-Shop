/**
 * AdminPanel.js
 *
 * Main admin panel layout with header + tab bar.
 * Tabs: Analytics | Products
 */
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { logout } from '../../services/adminAuth';
import AnalyticsDashboard from './Analytics/AnalyticsDashboard';
import CategoriesManager from './Categories/CategoriesManager';
import ProductsManager from './Products/ProductsManager';
import BannersManager from './Banners/BannersManager';
import styles from './AdminPanelStyles';
import { AnalyticsIcon, BoxIcon, FolderIcon, ImageIcon, BackArrowIcon, LogoutIcon } from '../Icons';
import { useTheme } from '../../context/ThemeContext';

const TABS = [
  { id: 'analytics', labelKey: 'adminTabAnalytics', icon: (color) => <AnalyticsIcon color={color} size={16} style={{ marginRight: 8 }} /> },
  { id: 'products', labelKey: 'adminTabProducts', icon: (color) => <BoxIcon color={color} size={16} style={{ marginRight: 8 }} /> },
  { id: 'categories', labelKey: 'adminTabCategories', icon: (color) => <FolderIcon color={color} size={16} style={{ marginRight: 8 }} /> },
  { id: 'banners', labelKey: 'adminTabBanners', icon: (color) => <ImageIcon color={color} size={16} style={{ marginRight: 8 }} /> },
];

function AdminHeader({ onBack, onLogout }) {
  const { t } = useTheme();
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onBack}>
          <BackArrowIcon color="#1C1C1C" size={16} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('adminTitle')}</Text>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <LogoutIcon color="#475569" size={14} />
        <Text style={styles.logoutText}>{t('userLogout')}</Text>
      </TouchableOpacity>
    </View>
  );
}

function TabBar({ activeTab, onSelect }) {
  const { t } = useTheme();
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const color = isActive ? '#1C1C1C' : '#94a3b8';
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.tabActive, { flexDirection: 'row', alignItems: 'center' }]}
            onPress={() => onSelect(tab.id)}
          >
            {tab.icon(color)}
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {t(tab.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function AdminPanel({ onBack, onLogout }) {
  const [activeTab, setActiveTab] = useState('analytics');

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <View style={styles.container}>
      <AdminHeader onBack={onBack} onLogout={handleLogout} />
      <TabBar activeTab={activeTab} onSelect={setActiveTab} />
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'categories' && <CategoriesManager />}
        {activeTab === 'banners' && <BannersManager />}
      </ScrollView>
    </View>
  );
}
