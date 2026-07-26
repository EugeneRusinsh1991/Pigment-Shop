import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@/components/Text';
import { Link, useSegments, useLocalSearchParams } from 'expo-router';
import { useCatalog } from '@/context/CatalogContext';
import { HomeIcon } from '@/components/Icons';
import { buildBreadcrumbStack } from '@/utils/breadcrumbResolver';
import { colors, layout } from '@/theme/tokens';
import { AnimatedButton } from '@/components/Button';
import { useBreadcrumbTheme } from './useBreadcrumbTheme';

function CrumbItem({ crumb, isLast, styles, testID }) {
  const textStyle = [
    styles.crumb,
    isLast ? styles.crumbCurrent : styles.crumbActive,
  ];

  if (isLast) {
    return (
      <Text style={textStyle} size="sm" weight="medium" numberOfLines={1}>
        {crumb.label}
      </Text>
    );
  }

  return (
    <Link href={crumb.href || '/catalog'} asChild testID={testID}>
      <AnimatedButton hitSlop={{ top: layout.spacing.md, bottom: layout.spacing.md, left: layout.spacing.xs, right: layout.spacing.xs }}>
        <Text style={textStyle} size="sm" weight="medium" numberOfLines={1}>
          {crumb.label}
        </Text>
      </AnimatedButton>
    </Link>
  );
}

/**
 * Breadcrumb
 * Dynamically derives breadcrumbs from Expo Router state.
 *
 * Props:
 *   isDark  boolean
 */
export function Breadcrumb({ isDark: isDarkProps }) {
  const { t, lang, styles } = useBreadcrumbTheme(isDarkProps);
  const segments = useSegments();
  const params = useLocalSearchParams();
  const { flatList, categoryLookup } = useCatalog() || {};

  const stack = buildBreadcrumbStack({ segments, params, flatList, categoryLookup, t, lang });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {/* "Home" crumb */}
      <Link href="/" asChild testID="breadcrumb-home">
        <AnimatedButton style={{ paddingVertical: layout.spacing.xxs, paddingHorizontal: layout.spacing.xs }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <HomeIcon color={colors.accent} size={14} />
        </AnimatedButton>
      </Link>

      {stack.map((crumb, index) => (
        <View key={`crumb-${index}`} style={styles.crumbRow}>
          {/* Separator */}
          <Text style={styles.separator} size="sm">/</Text>

          {/* Crumb button */}
          <CrumbItem 
            crumb={crumb} 
            isLast={index === stack.length - 1} 
            styles={styles} 
            testID={`breadcrumb-item-${index}`} 
          />
        </View>
      ))}
    </ScrollView>
  );
}
