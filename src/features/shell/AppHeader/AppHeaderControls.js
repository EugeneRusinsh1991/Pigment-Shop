import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import IconButton from '@/components/IconButton';
import AnimatedButton from '@/components/AnimatedButton';
import { BagIcon, CurrencyIcon, GlobeIcon, ThemeIcon, UserIcon } from '@/components/Icons';
import styles from './AppHeaderStyles';
import LangDropdown from './LangDropdown';
import CurrencyDropdown from './CurrencyDropdown';
import UserDropdown from './UserDropdown';


export default function AppHeaderControls({
  isMobile,
  theme,
  isDark,
  t,
  onToggleTheme,
  onToggleLangMenu,
  showLangMenu,
  onToggleCurrencyMenu,
  showCurrencyMenu,
  lang,
  onSelectLanguage,
  onLogout,
  cartCount,
  onToggleUserMenu,
  showUserMenu,
  isAuthenticated,
}) {
  return (
    <View style={[styles.rightSec, isMobile && { gap: 8 }]}>

      {!isMobile && (
        <IconButton
          icon={<ThemeIcon isDark={isDark} color={theme.iconColor} size={18} />}
          onPress={onToggleTheme}
          size={44}
          variant="transparent"
          isDark={isDark}
        />
      )}

      {!isMobile && (
        <View style={styles.langContainer}>
          <IconButton
            icon={<GlobeIcon color={theme.iconColor} size={18} />}
            onPress={onToggleLangMenu}
            size={44}
            variant="transparent"
            isDark={isDark}
          />
          <LangDropdown
            showLangMenu={showLangMenu}
            isDark={isDark}
            lang={lang}
            onSelectLanguage={onSelectLanguage}
          />
        </View>
      )}

      {!isMobile && (
        <View style={styles.langContainer}>
          <IconButton
            icon={<CurrencyIcon color={theme.iconColor} size={18} />}
            onPress={onToggleCurrencyMenu}
            size={44}
            variant="transparent"
            isDark={isDark}
          />
          <CurrencyDropdown
            showCurrencyMenu={showCurrencyMenu}
            isDark={isDark}
          />
        </View>
      )}

      <Link href="/cart" asChild>
        <AnimatedButton style={StyleSheet.flatten([styles.cartBtn, { minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' }])}>
          <BagIcon color={theme.iconColor} size={18} />
          {cartCount > 0 && (
            <View style={[styles.badge, theme.badgeStyle]}>
              <Text style={[styles.badgeText, theme.badgeTextStyle]}>{cartCount}</Text>
            </View>
          )}
        </AnimatedButton>
      </Link>

      <View style={styles.langContainer}>
        <IconButton
          icon={<UserIcon color={theme.iconColor} size={18} />}
          onPress={onToggleUserMenu}
          size={44}
          variant="transparent"
          isDark={isDark}
          data-testid="user-menu-btn"
        />
        <UserDropdown
          showUserMenu={showUserMenu}
          isDark={isDark}
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          onToggleUserMenu={onToggleUserMenu}
          isMobile={isMobile}
        />
      </View>
    </View>
  );
}
