import { AnimatedButton } from '@/components/ui/Button';
import { HomeIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import { colors, layout } from '@/theme/tokens';
import { buildBreadcrumbStack } from '@/utils/breadcrumbResolver';
import { CatalogContext } from '@/features/catalog/CatalogContext';
import { useContext } from 'react';
import { Link, useLocalSearchParams, useSegments } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useBreadcrumbTheme } from './useBreadcrumbTheme';

function CrumbItem({ crumb, isLast, styles, testID }) {
  const textStyle = [
    styles.crumb,
    isLast ? styles.crumbCurrent : styles.crumbActive,
  ];

  if (isLast) {
    return (
      <Text variant="subtitle2" style={textStyle} numberOfLines={1}>
        {crumb.label}
      </Text>
    );
  }

  return (
    <Link href={crumb.href || '/catalog'} asChild testID={testID}>
      <AnimatedButton hitSlop={{ top: layout.spacing.md, bottom: layout.spacing.md, left: layout.spacing.xs, right: layout.spacing.xs }}>
        <Text variant="subtitle2" style={textStyle} numberOfLines={1}>
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
export function Breadcrumb({ isDark: isDarkProps, flatList: flatListProp, categoryLookup: categoryLookupProp }) {
  const { t, lang, styles } = useBreadcrumbTheme(isDarkProps);
  const segments = useSegments();
  const params = useLocalSearchParams();
  const catalogCtx = useContext(CatalogContext);

  const flatList = flatListProp || catalogCtx?.flatList;
  const categoryLookup = categoryLookupProp || catalogCtx?.categoryLookup;

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
        <AnimatedButton style={styles.homeButton} hitSlop={{ top: layout.spacing.xs + 2, bottom: layout.spacing.xs + 2, left: layout.spacing.xs + 2, right: layout.spacing.xs + 2 }}>
          <HomeIcon color={colors.accent} size={14} />
        </AnimatedButton>
      </Link>

      {stack.map((crumb, index) => (
        <View key={`crumb-${index}`} style={styles.crumbRow}>
          {/* Separator */}
          <Text variant="subtitle2" style={styles.separator}>/</Text>

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
