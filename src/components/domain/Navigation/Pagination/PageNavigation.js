import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Breadcrumb } from '../Breadcrumbs/Breadcrumb';
import { AnimatedButton } from '@/components/ui/Button';
import { usePaginationTheme } from './usePaginationTheme';

/**
 * BackButton helper component.
 */
function BackButton({ show, onPress, styles, t }) {
  if (!show) return null;
  return (
    <AnimatedButton 
      testID="page-back-button"
      size="sm"
      style={styles.backButton} 
      onPress={onPress}
    >
      <Text variant="body1" size="sm" weight="medium" style={styles.backText}>
        ‹ {t('btnBackLabel')}
      </Text>
    </AnimatedButton>
  );
}

/**
 * BreadcrumbSection helper component.
 */
function BreadcrumbSection({ show, isDark, styles, flatList, categoryLookup }) {
  if (!show) return null;
  return (
    <View style={styles.breadcrumbWrapper}>
      <Breadcrumb isDark={isDark} flatList={flatList} categoryLookup={categoryLookup} />
    </View>
  );
}

/**
 * Standardized in-page navigation header for category and product pages.
 * Displays a Back button and breadcrumb path consistently.
 */
export function PageNavigation({
  isDark: isDarkProps,
  crumbs = [], // Kept for backwards compatibility if needed elsewhere
  flatList,
  categoryLookup,
  onBack,
  showBack = false,
  showBreadcrumbs = false,
  nativeHeadersEnabled = false,
}) {
  const { t, isDark, styles } = usePaginationTheme(isDarkProps);
  
  const shouldShowBack = showBack && !nativeHeadersEnabled;
  const hasContent = shouldShowBack || showBreadcrumbs;
  
  if (!hasContent) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        <BackButton show={shouldShowBack} onPress={onBack} styles={styles} t={t} />
        <BreadcrumbSection show={showBreadcrumbs} isDark={isDark} styles={styles} flatList={flatList} categoryLookup={categoryLookup} />
      </View>
    </View>
  );
}
