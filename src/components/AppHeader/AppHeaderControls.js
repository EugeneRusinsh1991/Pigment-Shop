import { Text, TouchableOpacity, View } from 'react-native';
import { BagIcon, GlobeIcon, ThemeIcon, UserIcon } from '../Icons';
import styles from './AppHeaderStyles';
import LangDropdown from './LangDropdown';
import UserDropdown from './UserDropdown';

export default function AppHeaderControls({
  isMobile,
  theme,
  isDark,
  t,
  onAdminPress,
  onToggleTheme,
  onToggleLangMenu,
  showLangMenu,
  lang,
  onSelectLanguage,
  onCartPress,
  cartCount,
  onToggleUserMenu,
  showUserMenu,
  isAuthenticated,
  onProfilePress,
  onOrdersPress,
  onLogout,
  onLoginPress,
  onFavoritesPress,
}) {
  return (
    <View style={[styles.rightSec, isMobile && { gap: 8 }]}>

      {!isMobile && (
        <TouchableOpacity style={styles.iconBtn} onPress={onToggleTheme}>
          <ThemeIcon isDark={isDark} color={theme.iconColor} size={18} />
        </TouchableOpacity>
      )}

      {!isMobile && (
        <View style={styles.langContainer}>
          <TouchableOpacity style={styles.iconBtn} onPress={onToggleLangMenu}>
            <GlobeIcon color={theme.iconColor} size={18} />
          </TouchableOpacity>
          <LangDropdown
            showLangMenu={showLangMenu}
            isDark={isDark}
            lang={lang}
            onSelectLanguage={onSelectLanguage}
          />
        </View>
      )}

      <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
        <BagIcon color={theme.iconColor} size={18} />
        {cartCount > 0 && (
          <View style={[styles.badge, theme.badgeStyle]}>
            <Text style={[styles.badgeText, theme.badgeTextStyle]}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>

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
          isMobile={isMobile}
          onFavoritesPress={onFavoritesPress}
          onAdminPress={onAdminPress}
        />
      </View>
    </View>
  );
}
