import { BagIcon, CurrencyIcon, GlobeIcon, ThemeIcon, UserIcon } from '@/components/Icons';
import { Badge } from '@/components/ui/Badge';
import { IconButton } from '@/components/ui/Button';
import { useCart } from '@/features/cart/CartContext';
import { layout } from '@/theme/tokens';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import CurrencyDropdown from './CurrencyDropdown';
import LangDropdown from './LangDropdown';
import UserDropdown from './UserDropdown';
import styles from './AppHeaderStyles';


export default function AppHeaderControls({
  isMobile,
  theme,
  isDark,
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
  const cart = useCart();
  const effectiveCartCount = cartCount !== undefined ? cartCount : (cart?.totalCount || 0);

  return (
    <View style={[styles.rightSec, isMobile && { gap: layout.spacing.sm }]}>

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
            <View style={localStyles.bagIconWrapper}>
              <BagIcon color={theme.iconColor} size={18} />
              {effectiveCartCount > 0 && (
                <Badge
                  variant="counter"
                  size="counter"
                  count={effectiveCartCount}
                  animated
                  style={localStyles.badgePosition}
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

const localStyles = StyleSheet.create({
  bagIconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePosition: {
    position: 'absolute',
    top: -5,
    right: -7,
  },
});
