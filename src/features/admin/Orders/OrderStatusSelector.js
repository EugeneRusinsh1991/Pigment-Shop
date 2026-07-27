/**
 * OrderStatusSelector.js — with status badge colors on trigger + dropdown
 */
import { useState } from 'react';
import { View } from 'react-native';
import { Flag } from '@/components/Flag';
import { colors, layout } from '../../../theme/tokens';
import styles from './OrdersStyles';
import OrderStatusDropdownMenu from './OrderStatusDropdownMenu';

const STATUSES = [
  { value: 'New',        localeKey: 'orderStatusPending',    color: colors.infoStrong, bg: colors.infoBgMid },
  { value: 'Processing', localeKey: 'orderStatusProcessing', color: colors.warningDark, bg: colors.warningBgMid },
  { value: 'Completed',  localeKey: 'orderStatusCompleted',  color: colors.successMid, bg: colors.successBgMid },
  { value: 'Cancelled',  localeKey: 'orderStatusCancelled',  color: colors.danger, bg: colors.dangerBgLight },
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
    <View style={styles.statusSelectorContainer}>
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
