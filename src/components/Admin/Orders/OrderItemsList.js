import { View, Text } from 'react-native';
import styles from './OrdersStyles';

function getLocalizedText(field) {
  if (!field) return '';
  if (typeof field === 'object') {
    return field.ru || '';
  }
  return field;
}

function resolveItemName(item) {
  const name = getLocalizedText(item.name);
  if (name) return name;
  const label = getLocalizedText(item.label);
  return label || 'Unknown';
}

export default function OrderItemsList({ items }) {
  return (
    <View style={styles.detailCard}>
      {items?.map((item, idx) => (
        <View key={idx} style={[styles.itemRow, idx === items.length - 1 && { borderBottomWidth: 0 }]}>
          <Text style={styles.itemLabel} numberOfLines={1}>
            {resolveItemName(item)}
          </Text>
          <Text style={styles.itemQty}>{item.qty} pcs</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      ))}
    </View>
  );
}
