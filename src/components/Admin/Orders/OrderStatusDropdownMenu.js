import { Text, View } from 'react-native';
import AnimatedButton from '../../AnimatedButton';
import { colors } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';
import styles from './OrdersStyles';

export default function OrderStatusDropdownMenu({ statuses, currentStatus, updating, handleSelect, t }) {
  // Normalize current status to canonical value for comparison
  const LEGACY_MAP = {
    'Новый заказ': 'New', 'В обработке': 'Processing',
    'Выполнен': 'Completed', 'Отменён': 'Cancelled',
  };
  const canonical = LEGACY_MAP[currentStatus] || currentStatus;

  return (
    <View
      style={{
        position: 'absolute', top: 48, left: 0, right: 0,
        backgroundColor: colors.surfaceLight, borderWidth: 1, borderColor: colors.secondaryLightBorder,
        borderRadius: 8, elevation: 3, zIndex: 100, overflow: 'hidden',
        ...shadow.dropdown(),
      }}
    >
      {statuses.map((status, index) => {
        const isSelected = canonical === status.value;
        return (
          <AnimatedButton
            key={status.value}
            style={[
              styles.statusOption,
              {
                paddingVertical: 10, paddingHorizontal: 12,
                borderBottomWidth: index === statuses.length - 1 ? 0 : 1,
                borderBottomColor: colors.slateMid,
                backgroundColor: isSelected ? status.bg : colors.surfaceLight,
              },
            ]}
            onPress={() => handleSelect(status.value)}
            disabled={updating}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: status.color }} />
              <Text style={[styles.statusOptionText, { color: status.color, fontWeight: isSelected ? '700' : '500' }]}>
                {t(status.localeKey) || status.value}
              </Text>
              {isSelected && <Text style={{ color: status.color, fontSize: 12 }}>✓</Text>}
            </View>
          </AnimatedButton>
        );
      })}
    </View>
  );
}
