import { useTheme } from '@/context/ThemeContext';
import AppHeader from '@/features/shell/AppHeader';
import NavMenu from '@/features/shell/NavMenu';
import SharedLayoutWrapper from '@/features/shell/SharedLayoutWrapper';
import StoreSearchHeader from '@/features/shell/StoreSearchHeader';
import { useAppShell } from '@/features/shell/useAppShell';
import styles from '@/theme/appStyles';
import { ErrorBoundary } from '@/components/ui/Feedback';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

const ic = (isDark, dark, light) => (isDark ? dark : light);

export default function StoreLayout() {
  const shellData = useAppShell();
  const { isDark } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <Pressable
      style={[styles.container, ic(isDark, styles.containerDark, styles.containerLight)]}
      onPress={shellData.menuState.closeMenus}
    >
      <StatusBar style={ic(isDark, 'light', 'dark')} />
      <AppHeader
        appName={shellData.t.appName}
        onMenuPress={() => shellData.menuState.setShowNavMenu(true)}
        lang={shellData.lang}
        showLangMenu={shellData.menuState.showLangMenu}
        onToggleLangMenu={shellData.menuState.toggleLangMenu}
        showCurrencyMenu={shellData.menuState.showCurrencyMenu}
        onToggleCurrencyMenu={shellData.menuState.toggleCurrencyMenu}
        onSelectLanguage={shellData.handleSelectLanguage}
        onToggleTheme={shellData.toggleTheme}
        showUserMenu={shellData.menuState.showUserMenu}
        onToggleUserMenu={shellData.menuState.toggleUserMenu}
        isAuthenticated={shellData.auth.isAuthenticated}
        onLogout={shellData.handleLogout}
        contentWidth={shellData.contentWidth}
      />
      <NavMenu
        visible={shellData.menuState.showNavMenu}
        onClose={() => shellData.menuState.setShowNavMenu(false)}
        mainItems={shellData.mainItems}
        categoryItems={shellData.categoryItems}
        contactItems={shellData.contactItems}
        currentLevelLabel={null}
        onSelectLanguage={shellData.handleSelectLanguage}
        lang={shellData.lang}
        onToggleTheme={shellData.toggleTheme}
      />
      <StoreSearchHeader isHome={isHome} contentWidth={shellData.contentWidth} />
      <View style={styles.mainContent}>
        <SharedLayoutWrapper
          contentContainerStyle={styles.mainContentBody}
        >
          <ErrorBoundary>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
          </ErrorBoundary>
        </SharedLayoutWrapper>
      </View>
    </Pressable>
  );
}
