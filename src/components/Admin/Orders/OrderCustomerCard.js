/**
 * OrderCustomerCard.js — localized customer info with order date
 */
import { Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './OrdersStyles';
import { formatDateLongWithTime } from '../../../utils/dateFormatting';


function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || '—'}</Text>
    </View>
  );
}

export default function OrderCustomerCard({ order }) {
  const { t, lang } = useTheme();
  const isGuest = order.isGuest;

  return (
    <View style={styles.detailCard}>
      {isGuest && (
        <View style={[styles.detailRow, { backgroundColor: '#fff3cd', padding: 12, borderRadius: 6, marginBottom: 12 }]}>
          <Text style={{ color: '#856404', fontWeight: '600', fontSize: 14 }}>
            ⚠️ {t('adminOrdersGuestLabel')}
          </Text>
        </View>
      )}
      <DetailRow label={t('profileFirstName') + ' / ' + t('profileLastName')} value={order.customerName} />
      <DetailRow label={t('profileEmail')} value={order.customerEmail} />
      <DetailRow label={t('profilePhone')} value={order.customerPhone} />
      <DetailRow label={t('profileCity')} value={order.customerCity} />
      <DetailRow label={t('adminOrdersDate')} value={formatDateLongWithTime(order.createdAt, lang)} />
    </View>
  );
}
