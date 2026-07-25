import React from 'react';
import { View, Pressable } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAppShell } from '@/features/shell/useAppShell';
import { useTheme } from '@/context/ThemeContext';
import AppHeader from '@/features/shell/AppHeader';
import NavMenu from '@/features/shell/NavMenu';
import StoreSearchHeader from '@/features/shell/StoreSearchHeader';
import SharedLayoutWrapper from '@/components/SharedLayoutWrapper';
import styles from '@/AppStyles';

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
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
        </SharedLayoutWrapper>
      </View>
    </Pressable>
  );
}
