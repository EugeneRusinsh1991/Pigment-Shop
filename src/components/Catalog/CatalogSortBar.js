/**
 * CatalogSortBar.js
 *
 * Thin horizontal bar with a sort selector for the catalog product grid.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SORT_OPTIONS } from './useCatalogFilters';

function SortChip({ option, isActive, onPress, isDark }) {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={() => onPress(option.key)}
      activeOpacity={0.75}
    >
      <Text style={[styles.chipText, isActive ? styles.chipTextActive : (isDark ? styles.chipTextDark : styles.chipTextLight)]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function CatalogSortBar({ sortKey, onSortChange, resultCount, isDark }) {
  return (
    <View style={styles.bar}>
      <Text style={[styles.count, isDark ? styles.textDark : styles.textLight]}>
        {resultCount} {resultCount === 1 ? 'product' : 'products'}
      </Text>
      <View style={styles.chips}>
        {SORT_OPTIONS.map((opt) => (
          <SortChip
            key={opt.key}
            option={opt}
            isActive={sortKey === opt.key}
            onPress={onSortChange}
            isDark={isDark}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  count: { fontSize: 13 },
  textDark: { color: '#94a3b8' },
  textLight: { color: '#64748b' },

  chips: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5d8d3',
  },
  chipActive: { backgroundColor: '#E87A8E', borderColor: '#E87A8E' },
  chipText: { fontSize: 12, fontWeight: '500' },
  chipTextActive: { color: '#FFFFFF' },
  chipTextDark: { color: '#FFFFFF' },
  chipTextLight: { color: '#1C1C1C' },
});
