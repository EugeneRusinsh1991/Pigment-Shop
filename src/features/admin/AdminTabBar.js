import React, { useMemo } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import styles from './AdminPanelStyles';
import { useLanguage } from '../../context/LanguageContext';
import Toggle from '@/components/ui/Toggle';
import { layout } from '../../theme/tokens';

const ADMIN_TABS = [
  { id: 'analytics', labelKey: 'adminTabAnalytics' },
  { id: 'orders', labelKey: 'adminTabOrders' },
  { id: 'products', labelKey: 'adminTabProducts' },
  { id: 'categories', labelKey: 'adminTabCategories' },
  { id: 'banners', labelKey: 'adminTabBanners' },
  { id: 'users', labelKey: 'adminTabUsers' },
];

export default function AdminTabBar({ activeTab, onSelect, isDark }) {
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const isMobile = width < layout.breakpoints.sm;

  const options = useMemo(
    () =>
      ADMIN_TABS.map((tab) => ({
        value: tab.id,
        label: t(tab.labelKey),
      })),
    [t]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={isMobile ? styles.tabBarMobile : styles.tabBarDesktop}
      contentContainerStyle={{
        paddingHorizontal: isMobile ? layout.spacing.sm : layout.spacing.md,
        paddingVertical: layout.spacing.xs,
        alignItems: 'center',
        minWidth: '100%',
      }}
    >
      <Toggle
        options={options}
        value={activeTab}
        onChange={onSelect}
        size="sm"
        isDark={isDark}
        style={styles.toggle}
        optionStyle={styles.toggleOption}
        equalWidth={true}
      />
    </ScrollView>
  );
}


