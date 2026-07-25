import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, useSegments, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useCatalog } from '../context/CatalogContext';
import { HomeIcon } from '@/components/Icons';
import { buildBreadcrumbStack } from '../utils/breadcrumbResolver';
import { colors } from '../theme/tokens';
import AnimatedButton from './AnimatedButton';

function CrumbItem({ crumb, isLast, isDark, testID }) {
  const textStyle = [
    styles.crumb,
    isLast
      ? isDark
        ? styles.crumbCurrentDark
        : styles.crumbCurrentLight
      : isDark
        ? styles.crumbActiveDark
        : styles.crumbActiveLight,
  ];

  if (isLast) {
    return (
      <Text style={textStyle} numberOfLines={1}>
        {crumb.label}
      </Text>
    );
  }

  return (
    <Link href={crumb.href || '/catalog'} asChild testID={testID}>
      <AnimatedButton hitSlop={{ top: 12, bottom: 12, left: 6, right: 6 }}>
        <Text style={textStyle} numberOfLines={1}>
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
export default function Breadcrumb({ isDark }) {
  const { t, lang } = useTheme();
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
        <AnimatedButton style={{ paddingVertical: 4, paddingHorizontal: 6 }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <HomeIcon color={colors.accent} size={14} />
        </AnimatedButton>
      </Link>

      {stack.map((crumb, index) => (
        <View key={`crumb-${index}`} style={styles.crumbRow}>
          {/* Separator */}
          <Text style={[styles.separator, isDark ? styles.separatorDark : styles.separatorLight]}>
            /
          </Text>

          {/* Crumb button */}
          <CrumbItem crumb={crumb} isLast={index === stack.length - 1} isDark={isDark} testID={`breadcrumb-item-${index}`} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 4,
    flexWrap: 'nowrap',
    minWidth: 0,
  },
  crumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    fontSize: 14,
    marginHorizontal: 6,
  },
  separatorDark: {
    color: colors.accent,
  },
  separatorLight: {
    color: colors.accent,
  },
  crumb: {
    fontSize: 13,
    fontWeight: '500',
    maxWidth: 120,
  },
  crumbActiveDark: {
    color: colors.accent,
  },
  crumbActiveLight: {
    color: colors.accent,
  },
  crumbCurrentDark: {
    color: colors.textDescDark,
  },
  crumbCurrentLight: {
    color: colors.textSubtleDark,
  },
});

