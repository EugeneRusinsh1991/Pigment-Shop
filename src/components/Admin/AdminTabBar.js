import React from 'react';
import { ScrollView } from 'react-native';
import styles from './AdminPanelStyles';
import { AnalyticsIcon, ClipboardIcon, BoxIcon, FolderIcon, ImageIcon, UsersIcon } from '@/components/Icons';
import { useTheme } from '../../context/ThemeContext';
import { ChipButton } from '../Button';

const ICON_SIZE = 16;

const TABS = [
  { id: 'analytics', labelKey: 'adminTabAnalytics', Icon: AnalyticsIcon },
  { id: 'orders', labelKey: 'adminTabOrders', Icon: ClipboardIcon },
  { id: 'products', labelKey: 'adminTabProducts', Icon: BoxIcon },
  { id: 'categories', labelKey: 'adminTabCategories', Icon: FolderIcon },
  { id: 'banners', labelKey: 'adminTabBanners', Icon: ImageIcon },
  { id: 'users', labelKey: 'adminTabUsers', Icon: UsersIcon },
];

export default function AdminTabBar({ activeTab, onSelect }) {
  const { t } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={{ paddingRight: 24, gap: 8, paddingVertical: 8, alignItems: 'center' }}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.Icon;
        return (
          <ChipButton
            key={tab.id}
            label={t(tab.labelKey)}
            leftIcon={<IconComponent size={ICON_SIZE} />}
            active={isActive}
            onPress={() => onSelect(tab.id)}
          />
        );
      })}
    </ScrollView>
  );
}

