/**
 * CatalogSortBar.js
 *
 * Thin horizontal bar with a sort selector for the catalog product grid.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SORT_OPTIONS } from './useCatalogFilters';
import { Text } from '../../components/Text';
import { useTheme } from '../../context/ThemeContext';
import Toggle from '../../components/Toggle';
import { colors } from '../../theme/tokens';

export default function CatalogSortBar({ sortKey, onSortChange, resultCount, isDark }) {
  const { t } = useTheme();
  const productWord = resultCount === 1 ? t('catalogProduct') : t('catalogProducts');

  const toggleOptions = SORT_OPTIONS.map((opt) => ({
    label: t(opt.labelKey),
    value: opt.key,
  }));

  return (
    <View style={styles.bar}>
      <Text style={styles.count} isDark={isDark}>
        {resultCount} {productWord}
      </Text>
      <Toggle
        options={toggleOptions}
        value={sortKey}
        onChange={onSortChange}
        size="sm"
        isDark={isDark}
      />
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
  count: {},
});

