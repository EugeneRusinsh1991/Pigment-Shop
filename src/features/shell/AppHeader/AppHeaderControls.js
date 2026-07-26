import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { IconButton } from '@/components/Button';
import { BagIcon, CurrencyIcon, GlobeIcon, ThemeIcon, UserIcon } from '@/components/Icons';
import { Badge } from '@/components/Badge';
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
          icon={<ThemeIcon color={theme.iconColor} size={18} />}
          onPress={onToggleTheme}
          size={44}
          variant="transparent"
          isDark={isDark}
          accessibilityLabel="Toggle Theme"
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
        <IconButton
          icon={(
            <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
              <BagIcon color={theme.iconColor} size={18} />
              {cartCount > 0 && (
                <Badge
                  variant="counter"
                  count={cartCount}
                  animated
                  style={{ position: 'absolute', top: -6, right: -10 }}
                />
              )}
            </View>
          )}
          size={44}
          variant="transparent"
          isDark={isDark}
        />
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
