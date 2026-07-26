/**
 * OrderStatusSelector.js — with status badge colors on trigger + dropdown
 */
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Flag } from '../../Flag';
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

function getColorScheme(statusValue) {
  if (statusValue === 'Completed') return 'completed';
  if (statusValue === 'Cancelled') return 'cancelled';
  if (statusValue === 'New') return 'new';
  return 'pending';
}

function getLabel(t, localeKey, currentStatus, isOpen) {
  const text = t(localeKey) || currentStatus;
  const icon = isOpen ? '▲' : '▼';
  return `${text} ${icon}`;
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
      <Flag
        variant="chip"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
        disabled={updating}
        colorScheme={getColorScheme(statusObj.value)}
      >
        {getLabel(t, statusObj.localeKey, currentStatus, isOpen)}
      </Flag>

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
