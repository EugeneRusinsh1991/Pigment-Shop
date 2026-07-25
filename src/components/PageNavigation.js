import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Breadcrumb from './Breadcrumb';
import AnimatedButton from './AnimatedButton';
import { colors } from '../theme/tokens';

/**
 * BackButton helper component.
 */
function BackButton({ show, onPress, isDark }) {
  const { t } = useTheme();
  if (!show) return null;
  return (
    <AnimatedButton 
      testID="page-back-button"
      style={styles.backButton} 
      onPress={onPress}
    >
      <Text style={[styles.backText, isDark ? styles.textDark : styles.textLight]}>
        ‹ {t('btnBackLabel')}
      </Text>
    </AnimatedButton>
  );
}

/**
 * BreadcrumbSection helper component.
 */
function BreadcrumbSection({ show, isDark }) {
  if (!show) return null;
  return (
    <View style={[styles.breadcrumbWrapper, isDark ? styles.borderDark : styles.borderLight]}>
      <Breadcrumb isDark={isDark} />
    </View>
  );
}

/**
 * Standardized in-page navigation header for category and product pages.
 * Displays a Back button and breadcrumb path consistently.
 */
export default function PageNavigation({
  isDark,
  crumbs = [], // Kept for backwards compatibility if needed elsewhere
  onBack,
  showBack = false,
  showBreadcrumbs = false,
  nativeHeadersEnabled = false,
}) {
  const shouldShowBack = showBack && !nativeHeadersEnabled;
  const hasContent = shouldShowBack || showBreadcrumbs;
  if (!hasContent) {
    return null;
  }

  const containerStyle = [
    styles.container,
    isDark ? styles.containerDark : styles.containerLight,
    isDark ? styles.borderDark : styles.borderLight
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.navRow}>
        <BackButton show={shouldShowBack} onPress={onBack} isDark={isDark} />
        <BreadcrumbSection show={showBreadcrumbs} isDark={isDark} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1330,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 0,
    minHeight: 36,
  },
  containerDark: {
    backgroundColor: colors.backgroundDark,
  },
  containerLight: {
    backgroundColor: colors.backgroundLight,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  backButton: {
    paddingVertical: 4,
    minHeight: 44,
    justifyContent: 'center',
    flexShrink: 0,
    marginRight: 16,
  },
  backText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.accent,
  },
  breadcrumbWrapper: {
    paddingVertical: 2,
    flex: 1,
    minHeight: 24,
    minWidth: 0,
  },
  borderDark: {
    borderBottomColor: colors.borderDarkAlt,
  },
  borderLight: {
    borderBottomColor: colors.borderLightAlt,
  },
  textDark: {
    color: colors.textDark,
  },
  textLight: {
    color: colors.textLight,
  },
});
