import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Flag, FlagGroup } from '@/components/domain/Flag';
import styles from './OrdersStyles';

// Canonical statuses with their locale keys
export const STATUS_FILTERS = [
  { key: 'all',        localeKey: 'all',                  values: [] },
  { key: 'pending',    localeKey: 'orderStatusPending',    values: ['Новый заказ', 'New', 'pending'] },
  { key: 'processing', localeKey: 'orderStatusProcessing', values: ['В обработке', 'Processing'] },
  { key: 'completed',  localeKey: 'orderStatusCompleted',  values: ['Выполнен', 'Completed'] },
  { key: 'cancelled',  localeKey: 'orderStatusCancelled',  values: ['Отменён', 'Cancelled'] },
];

export function StatusFilterBar({ t, activeFilter, onSelectFilter, count, isDark }) {
  const filterList = useMemo(
    () =>
      STATUS_FILTERS.map((sf) => ({
        key: sf.key,
        label: t(sf.localeKey) || sf.key,
      })),
    [t]
  );

  const activeArray = useMemo(() => {
    if (Array.isArray(activeFilter)) return activeFilter;
    return activeFilter ? [activeFilter] : ['all'];
  }, [activeFilter]);

  const handleGroupChange = (selectedValues) => {
    if (!Array.isArray(selectedValues) || selectedValues.length === 0) {
      onSelectFilter(['all']);
      return;
    }

    const hadAll = activeArray.includes('all');
    const hasAll = selectedValues.includes('all');

    if (hasAll && !hadAll) {
      onSelectFilter(['all']);
    } else if (hasAll && hadAll && selectedValues.length > 1) {
      onSelectFilter(selectedValues.filter((v) => v !== 'all'));
    } else {
      onSelectFilter(selectedValues);
    }
  };

  return (
    <View style={styles.filterBarContainer}>
      <FlagGroup
        value={activeArray}
        onChange={handleGroupChange}
        multiple={true}
      >
        {filterList.map((sf) => (
          <Flag key={sf.key} value={sf.key} variant="chip" isDark={isDark}>
            {sf.label}
          </Flag>
        ))}
      </FlagGroup>

      {count !== null && count !== undefined && (
        <View style={styles.countBadge}>
          <Text style={styles.countText} size={14} weight="700">{count}</Text>
        </View>
      )}
    </View>
  );
}

