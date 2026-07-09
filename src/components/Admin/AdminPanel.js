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
import ProductsManager from './Products/ProductsManager';
import styles from './AdminPanelStyles';

const TABS = [
  { id: 'analytics', label: '📊  Аналитика продаж' },
  { id: 'products', label: '📦  Управление товарами' },
];

function AdminHeader({ onBack, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onBack}>
          <Text style={styles.headerBackText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Panel</Text>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>↪ Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

function TabBar({ activeTab, onSelect }) {
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.tabActive]}
          onPress={() => onSelect(tab.id)}
        >
          <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function AdminPanel({ onBack, onLogout }) {
  const [activeTab, setActiveTab] = useState('analytics');

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <View style={styles.container}>
      <AdminHeader onBack={onBack} onLogout={handleLogout} />
      <TabBar activeTab={activeTab} onSelect={setActiveTab} />
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'products' && <ProductsManager />}
      </ScrollView>
    </View>
  );
}
