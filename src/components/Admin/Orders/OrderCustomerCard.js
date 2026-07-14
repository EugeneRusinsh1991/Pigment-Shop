import { Text, View } from 'react-native';
import styles from './OrdersStyles';

export default function OrderCustomerCard({ order }) {
  const isGuest = order.isGuest;
  
  return (
    <View style={styles.detailCard}>
      {isGuest && (
        <View style={[styles.detailRow, { backgroundColor: '#fff3cd', padding: 12, borderRadius: 6, marginBottom: 12 }]}>
          <Text style={{ color: '#856404', fontWeight: '600', fontSize: 14 }}>
            ⚠️ Unregistered Customer (Guest Order)
          </Text>
        </View>
      )}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Name</Text>
        <Text style={styles.detailValue}>{order.customerName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Email</Text>
        <Text style={styles.detailValue}>{order.customerEmail || '—'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Phone</Text>
        <Text style={styles.detailValue}>{order.customerPhone || '—'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>City</Text>
        <Text style={styles.detailValue}>{order.customerCity || '—'}</Text>
      </View>
    </View>
  );
}
