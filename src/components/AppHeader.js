import { View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import AppHeaderControls from './AppHeader/AppHeaderControls';
import AppHeaderLogo from './AppHeader/AppHeaderLogo';
import AppHeaderNavLinks from './AppHeader/AppHeaderNavLinks';
import styles from './AppHeader/AppHeaderStyles';

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

export default function AppHeader(props) {
  const { t } = useTheme();
  const theme = getHeaderTheme(props.isDark);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.header, theme.headerStyle, { paddingHorizontal: 8, justifyContent: 'center' }]}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', width: '100%', maxWidth: 1048, paddingHorizontal: 0 }}>
        <AppHeaderLogo
          isDark={props.isDark}
          appName={props.appName}
          isMobile={isMobile}
          onMenuPress={props.onMenuPress}
          onHome={props.onHome}
          theme={theme}
        />
        <AppHeaderNavLinks
          isMobile={isMobile}
          onMenuPress={props.onMenuPress}
          onHome={props.onHome}
          onCatalogPress={props.onCatalogPress}
          onAllProductsPress={props.onAllProductsPress}
          onFavoritesPress={props.onFavoritesPress}
          theme={theme}
          t={t}
        />
        <AppHeaderControls
          isMobile={isMobile}
          theme={theme}
          isDark={props.isDark}
          t={t}
          onAdminPress={props.onAdminPress}
          onToggleTheme={props.onToggleTheme}
          onToggleLangMenu={props.onToggleLangMenu}
          showLangMenu={props.showLangMenu}
          lang={props.lang}
          onSelectLanguage={props.onSelectLanguage}
          onCartPress={props.onCartPress}
          cartCount={props.cartCount}
          onToggleUserMenu={props.onToggleUserMenu}
          showUserMenu={props.showUserMenu}
          isAuthenticated={props.isAuthenticated}
          onProfilePress={props.onProfilePress}
          onFavoritesPress={props.onFavoritesPress}
          onOrdersPress={props.onOrdersPress}
          onLogout={props.onLogout}
          onLoginPress={props.onLoginPress}
        />
      </View>
    </View>
  );
}
