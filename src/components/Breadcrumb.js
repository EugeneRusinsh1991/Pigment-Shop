import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

import { HomeIcon } from './Icons';
import { ACCENT_COLOR } from './NavMenu/constants';

/**
 * Breadcrumb
 *
 * Props:
 *   stack   Array<{ label: string }>  – navigation history (root to current)
 *   onPress (index: number) => void   – called when a crumb is tapped
 *   isDark  boolean
 */
export default function Breadcrumb({ stack, onPress, isDark }) {
  const { t } = useTheme();
  // Preparatory variable for future text-based Home label localization
  const homeText = t('navHome') || 'Home'; 

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {/* "Home" crumb */}
      <TouchableOpacity onPress={() => onPress(-1)} activeOpacity={0.7} style={{ paddingVertical: 2 }}>
        <HomeIcon color={ACCENT_COLOR} size={14} />
      </TouchableOpacity>


      {stack.map((crumb, index) => (
        <View key={`crumb-${index}`} style={styles.crumbRow}>
          {/* Separator */}
          <Text style={[styles.separator, isDark ? styles.separatorDark : styles.separatorLight]}>
            /
          </Text>

          {/* Crumb button — last crumb is the current page (not tappable but styled differently) */}
          {index < stack.length - 1 ? (
            <TouchableOpacity onPress={() => onPress(index)} activeOpacity={0.7}>
              <Text
                style={[styles.crumb, isDark ? styles.crumbActiveDark : styles.crumbActiveLight]}
                numberOfLines={1}
              >
                {crumb.label}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={[styles.crumb, isDark ? styles.crumbCurrentDark : styles.crumbCurrentLight]}
              numberOfLines={1}
            >
              {crumb.label}
            </Text>
          )}
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
    paddingVertical: 8,
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
    color: ACCENT_COLOR,
  },
  separatorLight: {
    color: ACCENT_COLOR,
  },
  crumb: {
    fontSize: 13,
    fontWeight: '500',
    maxWidth: 120,
  },
  crumbActiveDark: {
    color: ACCENT_COLOR,
  },
  crumbActiveLight: {
    color: ACCENT_COLOR,
  },
  crumbCurrentDark: {
    color: '#94a3b8',
  },
  crumbCurrentLight: {
    color: '#64748b',
  },
});
