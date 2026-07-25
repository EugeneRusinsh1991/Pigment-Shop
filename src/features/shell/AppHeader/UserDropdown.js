import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useDropdownAnimation } from '@/hooks/useDropdownAnimation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useProfile } from '@/hooks/useProfile';
import { useAdminAuth } from '@/services/adminDomain';
import { AnimatedButton } from '@/components/Button';
import {
    AdminIcon,
    ClipboardIcon,
    HeartIcon,
    LoginIcon,
    LogoutIcon,
    UserIcon
} from '@/components/Icons';
import { colors } from '@/theme/tokens';
import styles from './AppHeaderStyles';

const getTrimmedValue = (val) => {
  return typeof val === 'string' ? val.trim() : '';
};

const getEmail = (user) => {
  return user.email || '';
};

const getFullName = (first, last) => {
  return (first && last) ? `${first} ${last}` : '';
};

const getUserDisplayName = (user, profile) => {
  if (!user) return '';
  
  const p = profile || {};
  const name = getFullName(getTrimmedValue(p.firstName), getTrimmedValue(p.lastName));
  return name || getEmail(user);
};

const getDropdownStyles = (isDark) => {
  const ic = (dark, light) => isDark ? dark : light;
  return {
    dropdown: [styles.dropdown, ic(styles.dropdownDark, styles.dropdownLight), { width: 180 }],
    subtextText: [styles.dropdownText, ic(styles.subtextDark, styles.subtextLight), { fontSize: 11 }],
    itemText: [styles.dropdownText, ic(styles.textDark, styles.textLight)],
    borderBottomColor: isDark ? colors.borderDark : colors.secondaryLightBorder,
    iconColor: isDark ? colors.white : colors.dark
  };
};

export default function UserDropdown({
  showUserMenu,
  isDark: isDarkProp,
  isAuthenticated,
  onLogout,
  onToggleUserMenu,
  isMobile
}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const { t } = useLanguage();
  const { user } = useAuth();
  const { profile } = useProfile(user);
  const { isAdmin } = useAdminAuth();

  const { shouldRender, translateY, opacity } = useDropdownAnimation(showUserMenu);

  if (!shouldRender) return null;
  
  const dStyles = getDropdownStyles(isDark);

  return (
    <Animated.View
      style={[
        ...dStyles.dropdown,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {isAuthenticated ? (
        <>
          <View style={{ paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: dStyles.borderBottomColor, marginBottom: 4 }}>
            <Text style={dStyles.subtextText} numberOfLines={1} ellipsizeMode="tail">
              {getUserDisplayName(user, profile)}
            </Text>
          </View>
          <Link href="/profile" asChild>
            <AnimatedButton style={StyleSheet.flatten([styles.dropdownItem, { flexDirection: 'row', alignItems: 'center', minHeight: 44 }])} onPress={onToggleUserMenu}>
              <UserIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
              <Text style={dStyles.itemText}>{t('userProfile')}</Text>
            </AnimatedButton>
          </Link>
          <Link href="/favorites" asChild>
            <AnimatedButton style={StyleSheet.flatten([styles.dropdownItem, { flexDirection: 'row', alignItems: 'center', minHeight: 44 }])} onPress={onToggleUserMenu}>
              <HeartIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
              <Text style={dStyles.itemText}>{t('navFavorites')}</Text>
            </AnimatedButton>
          </Link>
          <Link href="/orders" asChild>
            <AnimatedButton style={StyleSheet.flatten([styles.dropdownItem, { flexDirection: 'row', alignItems: 'center', minHeight: 44 }])} onPress={onToggleUserMenu}>
              <ClipboardIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
              <Text style={dStyles.itemText}>{t('userOrders')}</Text>
            </AnimatedButton>
          </Link>
          {isAdmin && (
            <Link href="/admin" asChild>
              <AnimatedButton style={StyleSheet.flatten([styles.dropdownItem, { flexDirection: 'row', alignItems: 'center', minHeight: 44 }])} onPress={() => { onToggleUserMenu(); }} data-testid="admin-panel-link">
                <AdminIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
                <Text style={dStyles.itemText}>{t('adminTitle')}</Text>
              </AnimatedButton>
            </Link>
          )}
          <AnimatedButton style={[styles.dropdownItem, { flexDirection: 'row', alignItems: 'center', minHeight: 44 }]} onPress={() => { onLogout(); onToggleUserMenu(); }}>
            <LogoutIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
            <Text style={dStyles.itemText}>{t('userLogout')}</Text>
          </AnimatedButton>
        </>
      ) : (
        <>
          <Link href="/login" asChild>
            <AnimatedButton style={StyleSheet.flatten([styles.dropdownItem, { flexDirection: 'row', alignItems: 'center', minHeight: 44 }])} onPress={onToggleUserMenu}>
              <LoginIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
              <Text style={dStyles.itemText}>{t('userLogin')}</Text>
            </AnimatedButton>
          </Link>
          <Link href={{ pathname: '/login', params: { isRegister: 'true' } }} asChild>
            <AnimatedButton style={StyleSheet.flatten([styles.dropdownItem, { flexDirection: 'row', alignItems: 'center', minHeight: 44 }])} onPress={onToggleUserMenu}>
              <UserIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
              <Text style={dStyles.itemText}>{t('reviewsRegisterBtn')}</Text>
            </AnimatedButton>
          </Link>
        </>
      )}
    </Animated.View>
  );
}
