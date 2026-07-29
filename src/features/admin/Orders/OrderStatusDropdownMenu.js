import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { AnimatedButton } from '@/components/ui/Button';
import { colors, layout, shadow } from '../../../theme/tokens';
import styles from './OrdersStyles';

export default function OrderStatusDropdownMenu({ statuses, currentStatus, updating, handleSelect, t }) {
  // Normalize current status to canonical value for comparison
  const LEGACY_MAP = {
    'Новый заказ': 'New', 'В обработке': 'Processing',
    'Выполнен': 'Completed', 'Отменён': 'Cancelled',
  };
  const canonical = LEGACY_MAP[currentStatus] || currentStatus;

  return (
    <View style={styles.dropdownMenuContainer}>
      {statuses.map((status, index) => {
        const isSelected = canonical === status.value;
        return (
          <AnimatedButton
            key={status.value}
            style={[
              styles.statusOption,
              styles.dropdownOption,
              index !== statuses.length - 1 && styles.dropdownOptionBorder,
              isSelected && { backgroundColor: status.bg },
            ]}
            onPress={() => handleSelect(status.value)}
            disabled={updating}
          >
            <View style={styles.dropdownOptionRow}>
              <View style={[styles.statusDot, { backgroundColor: status.color }]} />
              <Text style={[styles.statusOptionText, { color: status.color }]} size={14} weight={isSelected ? '700' : '500'}>
                {t(status.localeKey) || status.value}
              </Text>
              {isSelected && <Text style={[styles.checkmark, { color: status.color }]} size={12}>✓</Text>}
            </View>
          </AnimatedButton>
        );
      })}
    </View>
  );
}
