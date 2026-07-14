import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from './AdminPanelStyles';
import { AnalyticsIcon, ClipboardIcon, BoxIcon, FolderIcon, ImageIcon, UsersIcon } from '../Icons';
import { useTheme } from '../../context/ThemeContext';

const TABS = [
  { id: 'analytics', labelKey: 'adminTabAnalytics', icon: (color) => <AnalyticsIcon color={color} size={16} style={{ marginRight: 8 }} /> },
  { id: 'orders', labelKey: 'adminTabOrders', icon: (color) => <ClipboardIcon color={color} size={16} style={{ marginRight: 8 }} /> },
  { id: 'products', labelKey: 'adminTabProducts', icon: (color) => <BoxIcon color={color} size={16} style={{ marginRight: 8 }} /> },
  { id: 'categories', labelKey: 'adminTabCategories', icon: (color) => <FolderIcon color={color} size={16} style={{ marginRight: 8 }} /> },
  { id: 'banners', labelKey: 'adminTabBanners', icon: (color) => <ImageIcon color={color} size={16} style={{ marginRight: 8 }} /> },
  { id: 'users', labelKey: 'adminTabUsers', icon: (color) => <UsersIcon color={color} size={16} style={{ marginRight: 8 }} /> },
];

export default function AdminTabBar({ activeTab, onSelect }) {
  const { t } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={{ paddingRight: 24 }}>
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
    </ScrollView>
  );
}
