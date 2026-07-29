/**
 * OrderCustomerCard.js — localized customer info with order date
 */
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useTheme } from '../../../context/ThemeContext';
import styles from './OrdersStyles';
import { formatDateLongWithTime } from '../../../utils/dateFormatting';
import { colors, layout } from '../../../theme/tokens';


function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel} size={14}>{label}</Text>
      <Text style={styles.detailValue} size={14} weight="500">{value || '—'}</Text>
    </View>
  );
}

export default function OrderCustomerCard({ order }) {
  const { t, lang } = useTheme();
  const isGuest = order.isGuest;

  return (
    <View style={styles.detailCard}>
      {isGuest && (
        <View style={[styles.detailRow, styles.guestBanner]}>
          <Text variant="subtitle2" weight="semibold" style={styles.guestBannerText}>
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
