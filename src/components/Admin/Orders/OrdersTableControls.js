import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import styles from './OrdersStyles';

// Canonical statuses with their locale keys
export const STATUS_FILTERS = [
  { key: 'pending',    localeKey: 'orderStatusPending',    values: ['Новый заказ', 'New', 'pending'] },
  { key: 'processing', localeKey: 'orderStatusProcessing', values: ['В обработке', 'Processing'] },
  { key: 'completed',  localeKey: 'orderStatusCompleted',  values: ['Выполнен', 'Completed'] },
  { key: 'cancelled',  localeKey: 'orderStatusCancelled',  values: ['Отменён', 'Cancelled'] },
];


import ChipButton from '../../ChipButton';

export function StatusFilterBar({ t, activeFilters, onToggle, count }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const renderPills = (items, flex = false) =>
    items.map((sf) => (
      <ChipButton
        variant="pill"
        key={sf.key}
        label={t(sf.localeKey)}
        active={activeFilters.includes(sf.key)}
        onPress={() => onToggle(sf.key)}
        style={flex ? { flex: 1 } : undefined}
      />
    ));

  if (isMobile) {
    const row1 = [STATUS_FILTERS[0], STATUS_FILTERS[1]];
    const row2 = [STATUS_FILTERS[2], STATUS_FILTERS[3]];

    return (
      <View style={{ marginBottom: 16 }}>
        <View style={styles.statusFilterGridMobile}>
          <View style={styles.statusFilterRowMobile}>{renderPills(row1, true)}</View>
          <View style={styles.statusFilterRowMobile}>{renderPills(row2, true)}</View>
        </View>

        {count !== null && count !== undefined && (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={styles.statusFilterBar}
      >
        {renderPills(STATUS_FILTERS)}
      </ScrollView>

      {count !== null && count !== undefined && (
        <View style={[styles.countBadge, { marginLeft: 12 }]}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </View>
  );
}
