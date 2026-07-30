import React from 'react';
import { View, Pressable } from 'react-native';
import { Link, usePathname } from 'expo-router';
import {
  UserIcon,
  HeartIcon,
  ClipboardIcon,
  AdminIcon,
  LogoutIcon,
} from '../../../components/Icons';
import { Text } from '../../../components/ui/Text';
import { useAuth } from '../../../context/AuthContext';
import { useAdminAuth } from '../../../services/adminDomain';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { useProfile } from '../useProfile';
import styles from './ProfileSidebarStyles';

const getTrimmedValue = (val) => (typeof val === 'string' ? val.trim() : '');
const getEmail = (user) => user?.email || '';
const getFullName = (first, last) => (first && last ? `${first} ${last}` : '');

const getUserDisplayName = (user, profile) => {
  if (!user) return '';
  const p = profile || {};
  const name = getFullName(getTrimmedValue(p.firstName), getTrimmedValue(p.lastName));
  return name || getEmail(user);
};

export default function ProfileSidebar({ onLogout: onLogoutProp }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { profile } = useProfile(user);
  const { isAdmin } = useAdminAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    if (onLogoutProp) {
      onLogoutProp();
    } else if (logout) {
      logout();
    }
  };

  const cardStyle = [
    styles.sidebarCard,
    isDark ? styles.sidebarCardDark : styles.sidebarCardLight,
  ];

  const headerStyle = [
    styles.userHeader,
    isDark ? styles.userHeaderDark : styles.userHeaderLight,
  ];

  const displayName = getUserDisplayName(user, profile);

  const navItems = [
    {
      id: 'profile',
      href: '/profile',
      icon: UserIcon,
      label: t('userProfile'),
      show: true,
    },
    {
      id: 'orders',
      href: '/orders',
      icon: ClipboardIcon,
      label: t('userOrders'),
      show: true,
    },
    {
      id: 'favorites',
      href: '/favorites',
      icon: HeartIcon,
      label: t('navFavorites'),
      show: true,
    },
    {
      id: 'admin',
      href: '/admin',
      icon: AdminIcon,
      label: t('adminTitle'),
      show: Boolean(isAdmin),
    },
    {
      id: 'logout',
      action: handleLogout,
      icon: LogoutIcon,
      label: t('userLogout'),
      show: !isAdmin,
    },
  ];

  return (
    <View style={cardStyle}>
      {Boolean(displayName) && (
        <View style={headerStyle}>
          <Text variant="body2" weight="500" color="secondary" numberOfLines={1} ellipsizeMode="tail">
            {displayName}
          </Text>
        </View>
      )}

      <View style={styles.navContainer}>
        {navItems.map((item) => {
          if (!item.show) return null;

          const isActive = Boolean(item.href && pathname === item.href);
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

          if (item.href) {
            return (
              <Link key={item.id} href={item.href} style={itemStyle}>
                <IconComponent color={iconColor} size={16} />
                <Text style={textStyle}>{item.label}</Text>
              </Link>
            );
          }

          return (
            <Pressable key={item.id} style={itemStyle} onPress={item.action}>
              <IconComponent color={iconColor} size={16} />
              <Text style={textStyle}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
