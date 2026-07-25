import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from './AdminPanelStyles';
import { AnalyticsIcon, ClipboardIcon, BoxIcon, FolderIcon, ImageIcon, UsersIcon } from '@/components/Icons';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';

const ICON_SIZE = 16;
const ICON_MARGIN = 8;

const TABS = [
  { id: 'analytics', labelKey: 'adminTabAnalytics', icon: (color) => <AnalyticsIcon color={color} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} /> },
  { id: 'orders', labelKey: 'adminTabOrders', icon: (color) => <ClipboardIcon color={color} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} /> },
  { id: 'products', labelKey: 'adminTabProducts', icon: (color) => <BoxIcon color={color} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} /> },
  { id: 'categories', labelKey: 'adminTabCategories', icon: (color) => <FolderIcon color={color} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} /> },
  { id: 'banners', labelKey: 'adminTabBanners', icon: (color) => <ImageIcon color={color} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} /> },
  { id: 'users', labelKey: 'adminTabUsers', icon: (color) => <UsersIcon color={color} size={ICON_SIZE} style={{ marginRight: ICON_MARGIN }} /> },
];

export default function AdminTabBar({ activeTab, onSelect }) {
  const { t, isDark } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={{ paddingRight: 24 }}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const color = isActive ? (isDark ? colors.white : colors.dark) : colors.slateText;
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
