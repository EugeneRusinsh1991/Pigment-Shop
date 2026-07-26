import { View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { colors, layout } from '../../theme/tokens';
import AppHeaderControls from './AppHeader/AppHeaderControls';
import AppHeaderLogo from './AppHeader/AppHeaderLogo';
import AppHeaderNavLinks from './AppHeader/AppHeaderNavLinks';
import styles from './AppHeader/AppHeaderStyles';

const DARK_THEME = {
  textColor: 'textDark',
  subtextColor: 'subtextDark',
  iconColor: colors.white,
  headerStyle: 'headerDark',
  adminBtnStyle: 'adminBtnDark',
  badgeStyle: 'badgeDark',
  badgeTextStyle: 'badgeTextDark',
};

const LIGHT_THEME = {
  textColor: 'textLight',
  subtextColor: 'subtextLight',
  iconColor: colors.dark,
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
  const { isDark: isDarkContext } = useTheme();
  const { t } = useLanguage();
  const isDark = props.isDark ?? isDarkContext;
  const theme = getHeaderTheme(isDark);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View id="app-header" style={[styles.header, theme.headerStyle, { justifyContent: 'center' }]}>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: props.contentWidth, minWidth: 0, paddingHorizontal: layout.spacing.sm }}>
        <AppHeaderLogo
          isDark={props.isDark}
          appName={props.appName}
          isMobile={isMobile}
          onMenuPress={props.onMenuPress}
          theme={theme}
        />
        <AppHeaderNavLinks
          isMobile={isMobile}
          onMenuPress={props.onMenuPress}
          theme={theme}
          t={t}
        />
        <AppHeaderControls
          isMobile={isMobile}
          theme={theme}
          isDark={props.isDark}
          t={t}
          onToggleTheme={props.onToggleTheme}
          onToggleLangMenu={props.onToggleLangMenu}
          showLangMenu={props.showLangMenu}
          onToggleCurrencyMenu={props.onToggleCurrencyMenu}
          showCurrencyMenu={props.showCurrencyMenu}
          lang={props.lang}
          onSelectLanguage={props.onSelectLanguage}
          cartCount={props.cartCount}
          onToggleUserMenu={props.onToggleUserMenu}
          showUserMenu={props.showUserMenu}
          isAuthenticated={props.isAuthenticated}
          onLogout={props.onLogout}
        />
      </View>
    </View>
  );
}
