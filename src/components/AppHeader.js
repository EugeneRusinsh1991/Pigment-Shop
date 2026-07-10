import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './AppHeader/AppHeaderStyles';
import { useTheme } from '../context/ThemeContext';
import {
  AdminIcon,
  ThemeIcon,
  GlobeIcon,
  BagIcon,
  UserIcon
} from './Icons';
import LangDropdown from './AppHeader/LangDropdown';
import UserDropdown from './AppHeader/UserDropdown';

const DARK_THEME = {
  textColor: 'textDark',
  subtextColor: 'subtextDark',
  iconColor: '#FFFFFF',
  headerStyle: 'headerDark',
  adminBtnStyle: 'adminBtnDark',
  badgeStyle: 'badgeDark',
  badgeTextStyle: 'badgeTextDark',
};

const LIGHT_THEME = {
  textColor: 'textLight',
  subtextColor: 'subtextLight',
  iconColor: '#1C1C1C',
  headerStyle: 'headerLight',
  adminBtnStyle: 'adminBtnLight',
  badgeStyle: 'badgeLight',
  badgeTextStyle: 'badgeTextLight',
};

function getHeaderTheme(isDark) {
  const themeKeys = isDark ? DARK_THEME : LIGHT_THEME;
  return {
    textColor: styles[themeKeys.textColor],
    subtextColor: styles[themeKeys.subtextColor],
    iconColor: themeKeys.iconColor,
    headerStyle: styles[themeKeys.headerStyle],
    adminBtnStyle: styles[themeKeys.adminBtnStyle],
    badgeStyle: styles[themeKeys.badgeStyle],
    badgeTextStyle: styles[themeKeys.badgeTextStyle],
  };
}

export default function AppHeader({
  isDark, appName, canGoBack, onBack, onMenuPress,
  lang, showLangMenu, onToggleLangMenu, onSelectLanguage,
  onToggleTheme, cartCount, onCartPress, onLoginPress, onHome,
  onAdminPress, showUserMenu, onToggleUserMenu, isAuthenticated, onLogout,
  onProfilePress, onOrdersPress, onFavoritesPress, onCatalogPress
}) {
  const { t } = useTheme();
  const theme = getHeaderTheme(isDark);

  return (
    <View style={[styles.header, theme.headerStyle, { paddingHorizontal: 0, justifyContent: 'center' }]}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', width: '100%', maxWidth: 1064, paddingHorizontal: 8 }}>
        {/* Left: Brand Logo */}
        <View style={styles.leftSec}>
          <Text style={[styles.logo, theme.textColor]}>{appName}</Text>
        </View>

        {/* Center Links */}
        <View style={styles.centerSec}>
          <TouchableOpacity style={styles.menuBtn} onPress={onMenuPress}>
            <Text style={[styles.menuBtnText, theme.textColor]}>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLink} onPress={onHome}>
            <Text style={[styles.navLinkText, theme.subtextColor]}>{t('navHome')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLink} onPress={onCatalogPress}>
            <Text style={[styles.navLinkText, theme.textColor]}>{t('navCatalog')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLink} onPress={onFavoritesPress}>
            <Text style={[styles.navLinkText, theme.textColor]}>{t('navFavorites')}</Text>
          </TouchableOpacity>
        </View>

        {/* Right Controls */}
        <View style={styles.rightSec}>
          {/* Admin Panel Button */}
          <TouchableOpacity
            style={[styles.adminBtn, theme.adminBtnStyle]}
            onPress={onAdminPress}
          >
            <AdminIcon color={theme.iconColor} size={14} />
            <Text style={[styles.adminBtnText, theme.textColor]}>{t('navAdmin')}</Text>
          </TouchableOpacity>

          {/* Theme Toggle (Sun/Moon symbol) */}
          <TouchableOpacity style={styles.iconBtn} onPress={onToggleTheme}>
            <ThemeIcon isDark={isDark} color={theme.iconColor} size={18} />
          </TouchableOpacity>

          {/* Language selector (Globe symbol) */}
          <View style={styles.langContainer}>
            <TouchableOpacity style={styles.iconBtn} onPress={onToggleLangMenu}>
              <GlobeIcon color={theme.iconColor} size={18} />
            </TouchableOpacity>
            <LangDropdown showLangMenu={showLangMenu} isDark={isDark} lang={lang} onSelectLanguage={onSelectLanguage} />
          </View>
 
          {/* Shopping bag (with count badge) */}
          <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
            <BagIcon color={theme.iconColor} size={18} />
            {cartCount > 0 && (
              <View style={[styles.badge, theme.badgeStyle]}>
                <Text style={[styles.badgeText, theme.badgeTextStyle]}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
 
          {/* Profile */}
          <View style={styles.langContainer}>
            <TouchableOpacity style={styles.iconBtn} onPress={onToggleUserMenu}>
              <UserIcon color={theme.iconColor} size={18} />
            </TouchableOpacity>
            <UserDropdown
              showUserMenu={showUserMenu}
              isDark={isDark}
              isAuthenticated={isAuthenticated}
              onProfilePress={onProfilePress}
              onOrdersPress={onOrdersPress}
              onLogout={onLogout}
              onLoginPress={onLoginPress}
              onToggleUserMenu={onToggleUserMenu}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
