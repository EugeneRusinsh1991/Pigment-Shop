import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './OrdersStyles';
import OrderStatusDropdownMenu from './OrderStatusDropdownMenu';

const STATUSES = [
  { value: 'New', localeKey: 'orderStatusPending' },
  { value: 'Processing', localeKey: 'orderStatusProcessing' },
  { value: 'Completed', localeKey: 'orderStatusCompleted' },
  { value: 'Cancelled', localeKey: 'orderStatusCancelled' },
];

export default function OrderStatusSelector({ currentStatus, updating, onStatusChange, t }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentStatusObj = STATUSES.find((s) => s.value === currentStatus) || STATUSES[0];

  const handleSelect = (statusValue) => {
    onStatusChange(statusValue);
    setIsOpen(false);
  };

  return (
    <View style={{ zIndex: 100, position: 'relative', marginBottom: 10 }}>
      <TouchableOpacity
        style={[
          styles.statusDropdown,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,
          },
        ]}
        onPress={() => setIsOpen(!isOpen)}
        disabled={updating}
        activeOpacity={0.7}
      >
        <Text style={[styles.statusOptionText, { fontWeight: '500' }]}>
          {t(currentStatusObj.localeKey) || currentStatus}
        </Text>
        <Text style={{ fontSize: 10, color: '#64748B' }}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

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
