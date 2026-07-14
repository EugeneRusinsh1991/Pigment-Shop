import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import commonStyles from '../theme/commonStyles';
import {
    ExpandedItemsList,
    getAdminBgStyle,
    getFormattedDate,
    getOrderNumber,
    getOrderStatus,
    getOrderStatusStyle,
    getOrderTotalPrice,
    getToggleText,
} from './OrderCard.helpers';
import styles from './OrdersPageStyles';

export default function OrderCard({ order, isDark, isExpanded, onToggle, getStyle, isAdminView = false }) {
  const { t, lang } = useTheme();

  const cardStyle = [
    commonStyles.card,
    getStyle(commonStyles.cardDark, commonStyles.cardLight),
    styles.cardSpecific,
  ];

  if (isAdminView) {
    cardStyle.push(styles.adminCardSpecific, getAdminBgStyle(order));
  }

  return (
    <View style={cardStyle}>
      <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
        <View style={[styles.orderHeader, isAdminView && styles.adminOrderHeader]}>
          <Text style={[styles.orderNumber, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
            {t('orderNumber')}{getOrderNumber(order)}
          </Text>
          <Text style={[styles.orderStatus, getOrderStatusStyle(order, getStyle)]}>
            {getOrderStatus(order, t)}
          </Text>
        </View>
        <Text style={[styles.orderDate, getStyle(commonStyles.subtextDark, commonStyles.subtextLight), isAdminView && styles.adminOrderDate]}>
          {getFormattedDate(order, lang)}
        </Text>
        <View style={styles.summaryRow}>
          <Text style={[styles.orderTotal, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
            {t('orderTotalLabel')} ${getOrderTotalPrice(order)}
          </Text>
          <Text style={[styles.toggleText, getStyle(styles.toggleTextDark, styles.toggleTextLight)]}>
            {getToggleText(isExpanded, t)}
          </Text>
        </View>
      </TouchableOpacity>

      <ExpandedItemsList
        show={isExpanded}
        items={order.items}
        getStyle={getStyle}
        order={order}
      />
    </View>
  );
}
