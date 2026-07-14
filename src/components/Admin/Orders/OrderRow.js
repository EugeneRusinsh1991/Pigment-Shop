/**
 * OrderRow.js
 */
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './OrdersStyles';

const STATUS_STYLE_MAP = {
  'Новый заказ': { bg: styles.statusNewBg, text: styles.statusNewText, localeKey: 'orderStatusPending' },
  'В обработке': { bg: styles.statusProcessingBg, text: styles.statusProcessingText, localeKey: 'orderStatusProcessing' },
  'Выполнен': { bg: styles.statusCompletedBg, text: styles.statusCompletedText, localeKey: 'orderStatusCompleted' },
  'Отменён': { bg: styles.statusCancelledBg, text: styles.statusCancelledText, localeKey: 'orderStatusCancelled' },
  'New': { bg: styles.statusNewBg, text: styles.statusNewText, localeKey: 'orderStatusPending' },
  'Processing': { bg: styles.statusProcessingBg, text: styles.statusProcessingText, localeKey: 'orderStatusProcessing' },
  'Completed': { bg: styles.statusCompletedBg, text: styles.statusCompletedText, localeKey: 'orderStatusCompleted' },
  'Cancelled': { bg: styles.statusCancelledBg, text: styles.statusCancelledText, localeKey: 'orderStatusCancelled' },
};

function formatRowDate(createdAt, lang) {
  if (!createdAt) return '—';
  try {
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
    const dateStr = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
    const timeStr = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(date);
    return `${dateStr} ${timeStr}`;
  } catch (e) {
    return '—';
  }
}

function getOrderNumber(orderId) {
  return orderId.slice(-5).toUpperCase();
}

function getCustomerContact(order) {
  return order.customerPhone || order.customerEmail || '';
}

function getStatusDef(status) {
  return STATUS_STYLE_MAP[status] || STATUS_STYLE_MAP['New'];
}

export default function OrderRow({ order, isMobile, onPress }) {
  const { t, lang } = useTheme();

  const formattedDate = formatRowDate(order.createdAt, lang);
  const orderNum = getOrderNumber(order.id);
  const statusDef = getStatusDef(order.status);
  const statusDisplay = t(statusDef.localeKey) || order.status;
  const contact = getCustomerContact(order);
  const formattedTotal = (order.totalPrice || 0).toLocaleString();

  return (
    <TouchableOpacity style={[styles.row, isMobile && styles.rowMobile]} onPress={onPress}>
      <View style={styles.rowTop}>
        <Text style={styles.tdText}>#{orderNum}</Text>
        <Text style={styles.tdText}>{formattedDate}</Text>
        <Text style={[styles.tdText, styles.customerName]} numberOfLines={1}>{order.customerName}</Text>
      </View>
      <View style={styles.rowMiddle}>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>{t('adminOrdersCustomer')}</Text>
          <Text style={styles.metaValue}>{contact || '—'}</Text>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>{t('adminOrdersStatus')}</Text>
          <View style={[styles.statusBadge, statusDef.bg]}>
            <Text style={[styles.statusText, statusDef.text]}>{statusDisplay}</Text>
          </View>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>{t('adminOrdersTotal')}</Text>
          <Text style={styles.metaValue}>${formattedTotal}</Text>
        </View>
      </View>
      <View style={styles.rowBottom}>
        <View style={styles.noteBlock}>
          <Text style={styles.metaLabel}>Cust Note</Text>
          <Text style={styles.metaValue}>{order.note || '—'}</Text>
        </View>
        <View style={styles.noteBlock}>
          <Text style={styles.metaLabel}>Admin Note</Text>
          <Text style={styles.metaValue}>{order.adminNote || '—'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
