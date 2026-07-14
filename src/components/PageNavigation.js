import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Breadcrumb from './Breadcrumb';
import { ACCENT_COLOR } from './NavMenu/constants';

/**
 * BackButton helper component.
 */
function BackButton({ show, onPress, isDark }) {
  const { t } = useTheme();
  if (!show) return null;
  return (
    <TouchableOpacity 
      style={styles.backButton} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <Text style={[styles.backText, isDark ? styles.textDark : styles.textLight]}>
        ‹ {t('btnBackLabel')}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * BreadcrumbSection helper component.
 */
function BreadcrumbSection({ show, crumbs, onPress, isDark }) {
  if (!show) return null;
  return (
    <View style={[styles.breadcrumbWrapper, isDark ? styles.borderDark : styles.borderLight]}>
      <Breadcrumb stack={crumbs} onPress={onPress} isDark={isDark} />
    </View>
  );
}

/**
 * Standardized in-page navigation header for category and product pages.
 * Displays a Back button and breadcrumb path consistently.
 */
export default function PageNavigation({
  isDark,
  crumbs = [],
  onCrumbPress,
  onBack,
  showBack = false,
  showBreadcrumbs = false,
}) {
  const hasContent = showBack || (showBreadcrumbs && crumbs.length > 0);
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
        <BackButton show={showBack} onPress={onBack} isDark={isDark} />
        <BreadcrumbSection show={showBreadcrumbs} crumbs={crumbs} onPress={onCrumbPress} isDark={isDark} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1064,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    minHeight: 52,
  },
  containerDark: {
    backgroundColor: '#0D0D0D',
  },
  containerLight: {
    backgroundColor: '#FAF8F6',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  backButton: {
    paddingVertical: 4,
    flexShrink: 0,
    marginRight: 16,
  },
  backText: {
    fontSize: 14,
    fontWeight: '500',
    color: ACCENT_COLOR,
  },
  breadcrumbWrapper: {
    paddingVertical: 4,
    flex: 1,
    minHeight: 32,
    minWidth: 0,
  },
  borderDark: {
    borderBottomColor: '#242424',
  },
  borderLight: {
    borderBottomColor: '#f1e8e4',
  },
  textDark: {
    color: '#FFFFFF',
  },
  textLight: {
    color: '#1C1C1C',
  },
});
