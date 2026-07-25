/**
 * OrderStatusSelector.js — with status badge colors on trigger + dropdown
 */
import { useState } from 'react';
import { Text, View } from 'react-native';
import AnimatedButton from '../../AnimatedButton';
import styles from './OrdersStyles';
import OrderStatusDropdownMenu from './OrderStatusDropdownMenu';

const STATUSES = [
  { value: 'New',        localeKey: 'orderStatusPending',    color: '#3B82F6', bg: '#DBEAFE' },
  { value: 'Processing', localeKey: 'orderStatusProcessing', color: '#D97706', bg: '#FEF3C7' },
  { value: 'Completed',  localeKey: 'orderStatusCompleted',  color: '#10B981', bg: '#D1FAE5' },
  { value: 'Cancelled',  localeKey: 'orderStatusCancelled',  color: '#EF4444', bg: '#FEE2E2' },
];

// Also handle legacy Russian status values
const LEGACY_MAP = {
  'Новый заказ': 'New',
  'В обработке': 'Processing',
  'Выполнен':    'Completed',
  'Отменён':     'Cancelled',
};

function resolveStatus(currentStatus) {
  const canonical = LEGACY_MAP[currentStatus] || currentStatus;
  return STATUSES.find((s) => s.value === canonical) || STATUSES[0];
}

export default function OrderStatusSelector({ currentStatus, updating, onStatusChange, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const statusObj = resolveStatus(currentStatus);

  const handleSelect = (statusValue) => {
    onStatusChange(statusValue);
    setIsOpen(false);
  };

  return (
    <View style={{ zIndex: 100, position: 'relative', marginBottom: 10 }}>
      <AnimatedButton
        style={[
          styles.statusDropdown,
          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 0,
            backgroundColor: statusObj.bg, borderColor: statusObj.color, borderWidth: 1.5 },
        ]}
        onPress={() => setIsOpen(!isOpen)}
        disabled={updating}
        activeOpacity={0.7}
      >
        <Text style={[styles.statusOptionText, { fontWeight: '700', color: statusObj.color }]}>
          {t(statusObj.localeKey) || currentStatus}
        </Text>
        <Text style={{ fontSize: 10, color: statusObj.color }}>{isOpen ? '▲' : '▼'}</Text>
      </AnimatedButton>

      {isOpen && (
        <OrderStatusDropdownMenu
          statuses={STATUSES}
          currentStatus={currentStatus}
          updating={updating}
          handleSelect={handleSelect}
          t={t}
        />
      )}
    </View>
  );
}
