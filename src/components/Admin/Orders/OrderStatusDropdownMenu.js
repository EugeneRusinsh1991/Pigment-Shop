import { View, Text, TouchableOpacity } from 'react-native';
import styles from './OrdersStyles';

export default function OrderStatusDropdownMenu({ statuses, currentStatus, updating, handleSelect, t }) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 48,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {statuses.map((status, index) => {
        const isSelected = currentStatus === status.value;
        return (
          <TouchableOpacity
            key={status.value}
            style={[
              styles.statusOption,
              {
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderBottomWidth: index === statuses.length - 1 ? 0 : 1,
                borderBottomColor: '#F1F5F9',
                backgroundColor: isSelected ? '#F8FAFC' : '#FFFFFF',
              },
            ]}
            onPress={() => handleSelect(status.value)}
            disabled={updating}
          >
            <Text
              style={[
                styles.statusOptionText,
                isSelected && styles.statusOptionActiveText,
              ]}
            >
              {t(status.localeKey) || status.value} {isSelected && '✓'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
