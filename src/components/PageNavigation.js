import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Breadcrumb from './Breadcrumb';
import { useTheme } from '../context/ThemeContext';

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
  if (!show || crumbs.length === 0) return null;
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
    isDark ? styles.containerDark : styles.containerLight
  ];

  return (
    <View style={containerStyle}>
      <BackButton show={showBack} onPress={onBack} isDark={isDark} />
      <BreadcrumbSection show={showBreadcrumbs} crumbs={crumbs} onPress={onCrumbPress} isDark={isDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1064,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  containerDark: {
    backgroundColor: '#0D0D0D',
  },
  containerLight: {
    backgroundColor: '#FAF8F6',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: '500',
  },
  breadcrumbWrapper: {
    borderBottomWidth: 1,
    paddingVertical: 4,
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
