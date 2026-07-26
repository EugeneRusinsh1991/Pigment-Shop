/**
 * OrderCustomerCard.js — localized customer info with order date
 */
import { View } from 'react-native';
import { Text } from '../../Text';
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
        <View style={[styles.detailRow, { backgroundColor: colors.warningBgLegacy, padding: layout.spacing.md, borderRadius: layout.radii.xs, marginBottom: layout.spacing.md }]}>
          <Text variant="subtitle2" weight="semiBold" style={{ color: colors.warningDeep }}>
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
