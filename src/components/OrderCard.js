import { Text, View, useWindowDimensions } from 'react-native';
import AnimatedButton from './AnimatedButton';
import { useTheme } from '../context/ThemeContext';
import commonStyles from '../theme/commonStyles';
import BaseCard from './BaseCard';
import {
    ExpandedItemsList,
    getAdminBgStyle,
    getFormattedDate,
    getOrderNumber,
    getOrderStatus,
    getOrderStatusBadgeStyle,
    getOrderStatusStyle,
    getOrderTotalPrice,
    getToggleText,
} from './OrderCard.helpers';
import styles from './OrdersPageStyles';

function OrderStatusBadge({ order, t }) {
  const badge = getOrderStatusBadgeStyle(order);
  return (
    <View style={[styles.statusBadge, badge.bg]}>
      <Text style={[styles.statusBadgeText, badge.text]}>
        {getOrderStatus(order, t)}
      </Text>
    </View>
  );
}

function MobileOrderHeader({ order, t, lang, isExpanded, getStyle }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flex: 1, flexDirection: 'column', gap: 4 }}>
        <Text style={[styles.orderNumber, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
          {t('orderNumber')}{getOrderNumber(order)}
        </Text>
        <Text style={[styles.orderDate, getStyle(commonStyles.subtextDark, commonStyles.subtextLight)]}>
          {getFormattedDate(order, lang)}
        </Text>
        <Text style={[styles.orderTotal, getStyle(commonStyles.textDark, commonStyles.textLight), { marginTop: 2 }]}>
          {t('orderTotalLabel')} ${getOrderTotalPrice(order)}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 8 }}>
        <OrderStatusBadge order={order} t={t} />
        <Text style={[styles.toggleText, getStyle(styles.toggleTextDark, styles.toggleTextLight)]}>
          {getToggleText(isExpanded, t)}
        </Text>
      </View>
    </View>
  );
}

function DefaultOrderHeader({ order, t, lang, isExpanded, getStyle, isAdminView }) {
  return (
    <>
      <View style={[styles.orderHeader, isAdminView && styles.adminOrderHeader]}>
        <Text style={[styles.orderNumber, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
          {t('orderNumber')}{getOrderNumber(order)}
        </Text>
        {!isAdminView && (
          <Text style={[styles.orderDate, getStyle(commonStyles.subtextDark, commonStyles.subtextLight)]}>
            {getFormattedDate(order, lang)}
          </Text>
        )}
        {isAdminView ? (
          <Text style={[styles.orderStatus, getOrderStatusStyle(order, getStyle)]}>
            {getOrderStatus(order, t)}
          </Text>
        ) : (
          <OrderStatusBadge order={order} t={t} />
        )}
      </View>
      {isAdminView && (
        <Text style={[styles.orderDate, getStyle(commonStyles.subtextDark, commonStyles.subtextLight), styles.adminOrderDate]}>
          {getFormattedDate(order, lang)}
        </Text>
      )}
      <View style={styles.summaryRow}>
        <Text style={[styles.orderTotal, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
          {t('orderTotalLabel')} ${getOrderTotalPrice(order)}
        </Text>
        <Text style={[styles.toggleText, getStyle(styles.toggleTextDark, styles.toggleTextLight)]}>
          {getToggleText(isExpanded, t)}
        </Text>
      </View>
    </>
  );
}

export default function OrderCard({ order, isDark, isExpanded, onToggle, getStyle, isAdminView = false }) {
  const { t, lang } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;

  return (
    <BaseCard
      isDark={isDark}
      interactive={false}
      borderRadius={isAdminView ? 12 : 20}
      padding={isAdminView ? undefined : 24}
      style={[
        styles.cardSpecific,
        isAdminView && [styles.adminCardSpecific, getAdminBgStyle(order)],
      ]}
    >
      <AnimatedButton onPress={onToggle} activeOpacity={0.9}>
        {isMobile && !isAdminView ? (
          <MobileOrderHeader
            order={order}
            t={t}
            lang={lang}
            isExpanded={isExpanded}
            getStyle={getStyle}
          />
        ) : (
          <DefaultOrderHeader
            order={order}
            t={t}
            lang={lang}
            isExpanded={isExpanded}
            getStyle={getStyle}
            isAdminView={isAdminView}
          />
        )}
      </AnimatedButton>

      <ExpandedItemsList
        show={isExpanded}
        items={order.items}
        getStyle={getStyle}
        order={order}
      />
    </BaseCard>
  );
}

