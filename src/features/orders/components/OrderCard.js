import { View, useWindowDimensions } from 'react-native';
import { Text } from '@/components/ui/Text';
import { AnimatedButton } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import Card from '@/components/ui/Card';
import { colors, layout, motion } from '@/theme/tokens';
import { Badge } from '@/components/ui/Badge';
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
    resolveStatusKey,
} from './OrderCard.helpers';
import styles from '../OrdersPageStyles';

function OrderStatusBadge({ order, t }) {
  const statusKey = resolveStatusKey(order.status);
  return (
    <Badge variant="status" status={statusKey} label={getOrderStatus(order, t)} size="sm" />
  );
}

function MobileOrderHeader({ order, t, lang, isExpanded, getStyle }) {
  return (
    <View style={styles.mobileHeader}>
      <View style={styles.mobileCol}>
        <Text style={styles.orderNumber}>
          {t('orderNumber')}{getOrderNumber(order)}
        </Text>
        <Text variant="caption" color="muted" style={styles.orderDate}>
          {getFormattedDate(order, lang)}
        </Text>
        <Text style={[styles.orderTotal, styles.mobileTotal]}>
          {t('orderTotalLabel')} ${getOrderTotalPrice(order)}
        </Text>
      </View>
      <View style={styles.mobileRight}>
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
        <Text style={styles.orderNumber}>
          {t('orderNumber')}{getOrderNumber(order)}
        </Text>
        {!isAdminView && (
          <Text variant="caption" color="muted" style={styles.orderDate}>
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
        <Text variant="caption" color="muted" style={[styles.orderDate, styles.adminOrderDate]}>
          {getFormattedDate(order, lang)}
        </Text>
      )}
      <View style={styles.summaryRow}>
        <Text style={styles.orderTotal}>
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
    <Card
      variant="list"
      isDark={isDark}
      interactive={false}
      style={[
        styles.cardSpecific,
        isAdminView && [styles.adminCardSpecific, getAdminBgStyle(order)],
      ]}
    >
      <AnimatedButton onPress={onToggle} activeOpacity={motion.press.activeOpacity}>
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
    </Card>
  );
}

