import React from 'react';
import { View, Pressable } from 'react-native';
import {
  TrendIcon,
  ClipboardIcon,
  BoxIcon,
  GridIcon,
  ImageIcon,
  UserIcon,
} from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './AdminPanelStyles';

const ADMIN_NAV_ITEMS = [
  { id: 'analytics', labelKey: 'adminTabAnalytics', icon: TrendIcon },
  { id: 'orders', labelKey: 'adminTabOrders', icon: ClipboardIcon },
  { id: 'products', labelKey: 'adminTabProducts', icon: BoxIcon },
  { id: 'categories', labelKey: 'adminTabCategories', icon: GridIcon },
  { id: 'banners', labelKey: 'adminTabBanners', icon: ImageIcon },
  { id: 'users', labelKey: 'adminTabUsers', icon: UserIcon },
];

export default function AdminSidebar({ activeTab, onSelect }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const cardStyle = [
    styles.sidebarCard,
    isDark ? styles.sidebarCardDark : styles.sidebarCardLight,
  ];

  return (
    <View style={cardStyle}>
      <View style={styles.navContainer}>
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;

          const iconColor = isActive
            ? styles.iconColorActive
            : isDark
            ? styles.iconColorDark
            : styles.iconColorLight;

          const itemStyle = [
            styles.navItem,
            isActive && (isDark ? styles.navItemActiveDark : styles.navItemActiveLight),
          ];

          const textStyle = [
            styles.navItemText,
            isDark ? styles.navItemTextDark : styles.navItemTextLight,
            isActive && styles.navItemTextActive,
          ];

          return (
            <Pressable
              key={item.id}
              style={itemStyle}
              onPress={() => onSelect(item.id)}
              accessibilityLabel={t(item.labelKey)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              data-testid={`admin-tab-${item.id}`}
            >
              <IconComponent color={iconColor} size={16} />
              <Text variant="subtitle2" style={textStyle}>
                {t(item.labelKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
