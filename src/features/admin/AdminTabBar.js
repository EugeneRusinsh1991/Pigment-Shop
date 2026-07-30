import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import styles from './AdminPanelStyles';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import Toggle from '@/components/ui/Toggle';
import { colors, layout } from '../../theme/tokens';

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
      style={styles.tabBar}
      contentContainerStyle={{ paddingRight: layout.spacing.xl, paddingVertical: layout.spacing.xs, alignItems: 'center' }}
    >
      <Toggle
        options={options}
        value={activeTab}
        onChange={onSelect}
        size="md"
        isDark={isDark}
        animated={false}
        style={{ backgroundColor: 'transparent', borderWidth: 0 }}
        optionStyle={{ backgroundColor: 'transparent', borderRadius: 0, borderBottomWidth: 2, borderBottomColor: 'transparent', paddingHorizontal: layout.spacing.md }}
        activeOptionStyle={{ borderBottomWidth: 2, borderBottomColor: colors.accent, backgroundColor: 'transparent' }}
        textStyle={{ color: isDark ? colors.secondaryDarkText : colors.textDescLight, fontWeight: '400' }}
        activeTextStyle={{ color: isDark ? colors.white : colors.accent, fontWeight: '700' }}
      />
    </ScrollView>
  );
}


