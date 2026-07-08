import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Breadcrumb
 *
 * Props:
 *   stack   Array<{ label: string }>  – navigation history (root to current)
 *   onPress (index: number) => void   – called when a crumb is tapped
 *   isDark  boolean
 */
export default function Breadcrumb({ stack, onPress, isDark }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {/* "Home" crumb */}
      <TouchableOpacity onPress={() => onPress(-1)} activeOpacity={0.7}>
        <Text style={[styles.crumb, isDark ? styles.crumbActiveDark : styles.crumbActiveLight]}>
          🏠
        </Text>
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
    flexGrow: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexWrap: 'nowrap',
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
    color: '#475569',
  },
  separatorLight: {
    color: '#cbd5e1',
  },
  crumb: {
    fontSize: 13,
    fontWeight: '500',
    maxWidth: 120,
  },
  crumbActiveDark: {
    color: '#38bdf8',
  },
  crumbActiveLight: {
    color: '#7c3aed',
  },
  crumbCurrentDark: {
    color: '#94a3b8',
  },
  crumbCurrentLight: {
    color: '#64748b',
  },
});
