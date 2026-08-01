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
              <Text variant={isSelected ? 'subtitle2' : 'body2'} style={[styles.statusOptionText, { color: status.color }]}>
                {t(status.localeKey) || status.value}
              </Text>
              {isSelected && <Text variant="caption" style={[styles.checkmark, { color: status.color }]}>✓</Text>}
            </View>
          </AnimatedButton>
        );
      })}
    </View>
  );
}
