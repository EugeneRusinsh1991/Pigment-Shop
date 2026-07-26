import React from 'react';
import { View } from 'react-native';
import { Text } from '../../Text';
import styles from './OrdersStyles';
import Toggle from '../../Toggle';

// Canonical statuses with their locale keys
export const STATUS_FILTERS = [
  { key: 'all',        localeKey: 'all',                  values: [] },
  { key: 'pending',    localeKey: 'orderStatusPending',    values: ['Новый заказ', 'New', 'pending'] },
  { key: 'processing', localeKey: 'orderStatusProcessing', values: ['В обработке', 'Processing'] },
  { key: 'completed',  localeKey: 'orderStatusCompleted',  values: ['Выполнен', 'Completed'] },
  { key: 'cancelled',  localeKey: 'orderStatusCancelled',  values: ['Отменён', 'Cancelled'] },
];

export function StatusFilterBar({ t, activeFilter, onSelectFilter, count, isDark }) {
  const options = STATUS_FILTERS.map((sf) => ({
    value: sf.key,
    label: t(sf.localeKey) || sf.key,
  }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
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

