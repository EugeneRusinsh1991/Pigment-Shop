import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { layout } from '../../../theme/tokens';
import styles from './OrdersStyles';
import Toggle from '@/components/ui/Toggle';

// Canonical statuses with their locale keys
export const STATUS_FILTERS = [
  { key: 'all',        localeKey: 'all',                  values: [] },
  { key: 'pending',    localeKey: 'orderStatusPending',    values: ['Новый заказ', 'New', 'pending'] },
  { key: 'processing', localeKey: 'orderStatusProcessing', values: ['В обработке', 'Processing'] },
  { key: 'completed',  localeKey: 'orderStatusCompleted',  values: ['Выполнен', 'Completed'] },
  { key: 'cancelled',  localeKey: 'orderStatusCancelled',  values: ['Отменён', 'Cancelled'] },
];

export function StatusFilterBar({ t, activeFilter, onSelectFilter, count, isDark }) {
  const options = useMemo(
    () =>
      STATUS_FILTERS.map((sf) => ({
        value: sf.key,
        label: t(sf.localeKey) || sf.key,
      })),
    [t]
  );

  return (
    <View style={styles.filterBarContainer}>
      <Toggle
        options={options}
        value={activeFilter}
        onChange={onSelectFilter}
        size="sm"
        isDark={isDark}
      />

      {count !== null && count !== undefined && (
        <View style={styles.countBadge}>
          <Text style={styles.countText} size={14} weight="700">{count}</Text>
        </View>
      )}
    </View>
  );
}

