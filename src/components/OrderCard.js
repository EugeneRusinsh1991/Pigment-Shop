import { Text, View, useWindowDimensions } from 'react-native';
import { AnimatedButton } from './Button';
import { useTheme } from '../context/ThemeContext';
import commonStyles from '../theme/commonStyles';
import { BaseCard } from './Card';
import { colors, layout } from '../theme/tokens';
import { Flag } from './Flag';
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
import styles from './OrdersPageStyles';

function OrderStatusBadge({ order, t }) {
  const statusKey = resolveStatusKey(order.status);
  const scheme = statusKey === 'completed' ? 'completed' : statusKey === 'cancelled' ? 'cancelled' : 'pending';
  return (
    <Flag variant="chip" readOnly colorScheme={scheme}>
      {getOrderStatus(order, t)}
    </Flag>
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
      borderRadius={isAdminView ? layout.radii.md : layout.radii.lg}
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

