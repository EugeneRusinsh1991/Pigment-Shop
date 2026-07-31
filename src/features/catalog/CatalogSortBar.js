/**
 * CatalogSortBar.js
 *
 * Thin horizontal bar with a sort selector for the catalog product grid.
 */
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/ui/Text';
import Toggle from '../../components/ui/Toggle';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { SORT_OPTIONS } from '../../hooks/useCatalogFilters';
import { layout } from '../../theme/tokens';

export default function CatalogSortBar({ sortKey, onSortChange, resultCount, isDark }) {
  const { t } = useLanguage();
  const productWord = resultCount === 1 ? t('catalogProduct') : t('catalogProducts');

  const toggleOptions = useMemo(
    () =>
      SORT_OPTIONS.map((opt) => ({
        label: t(opt.labelKey),
        value: opt.key,
      })),
    [t]
  );

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
        optionStyle={styles.sortOption}
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
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
  },
  count: {},
  sortOption: {
    minWidth: 240,
    paddingHorizontal: layout.spacing.lg,
  },
});

