/**
 * CatalogSortBar.js
 *
 * Thin horizontal bar with a sort selector for the catalog product grid.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SORT_OPTIONS } from './useCatalogFilters';
import { useTheme } from '../../context/ThemeContext';
import AnimatedButton from '../AnimatedButton';
import { colors } from '../../theme/tokens';

function SortChip({ labelText, isActive, onPress, isDark }) {
  return (
    <AnimatedButton
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
      hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
    >
      <Text style={[styles.chipText, isActive ? styles.chipTextActive : (isDark ? styles.chipTextDark : styles.chipTextLight)]}>
        {labelText}
      </Text>
    </AnimatedButton>
  );
}

export default function CatalogSortBar({ sortKey, onSortChange, resultCount, isDark }) {
  const { t } = useTheme();
  const productWord = resultCount === 1 ? t('catalogProduct') : t('catalogProducts');

  return (
    <View style={styles.bar}>
      <Text style={[styles.count, isDark ? styles.textDark : styles.textLight]}>
        {resultCount} {productWord}
      </Text>
      <View style={styles.chips}>
        {SORT_OPTIONS.map((opt) => (
          <SortChip
            key={opt.key}
            labelText={t(opt.labelKey)}
            isActive={sortKey === opt.key}
            onPress={() => onSortChange(opt.key)}
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
  textDark: { color: colors.secondaryDarkText },
  textLight: { color: colors.secondaryLightText },

  chips: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderLightAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { fontSize: 12, fontWeight: '500' },
  chipTextActive: { color: colors.white },
  chipTextDark: { color: colors.white },
  chipTextLight: { color: colors.dark },
});
