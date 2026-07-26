import { View } from 'react-native';
import { Text } from './Text';
import { useCatalog } from '../context/CatalogContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/tokens';
import styles from './OrdersPageStyles';
import { getLocalizedValue } from '../utils/localization';
import { formatDateLong } from '../utils/dateFormatting';
import { resolveStatusKey, resolveStatusDef } from '../utils/orderStatus';
export { resolveStatusKey };

const JUST_NOW_TRANSLATIONS = {
  uk: 'Щойно',
  en: 'Just now',
  ru: 'Только что',
};

function getItemLabel(labelObj, lang) {
  return getLocalizedValue(labelObj, lang, labelObj);
}

function OrderItemRow({ item, idx, getStyle }) {
  const { t, lang } = useTheme();
  const { flatList } = useCatalog();
  const matched = flatList.find((p) => p.id === item.id);
  const labelObj = matched ? matched.label : item.label;
  const label = getItemLabel(labelObj, lang);
  const priceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
  const subtotal = (priceNum * item.qty).toFixed(2);

  return (
    <View style={[styles.itemRow, idx > 0 && getStyle(styles.itemBorderDark, styles.itemBorderLight)]}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemLabel} numberOfLines={1}>
          {label}
        </Text>
        <Text variant="caption" color="muted" style={styles.itemQtyPrice}>
          {item.qty} {t('pcs')} × {item.price}
        </Text>
      </View>
      <Text style={styles.itemSubtotal}>
        ${subtotal}
      </Text>
    </View>
  );
}

export function getFormattedDate(order, lang) {
  if (!order.createdAt) {
    return JUST_NOW_TRANSLATIONS[lang] || JUST_NOW_TRANSLATIONS.ru;
  }
  return formatDateLong(order.createdAt, lang);
}

export function getOrderNumber(order) {
  return order.id.slice(-5).toUpperCase();
}

export function getOrderStatus(order, t) {
  const def = resolveStatusDef(order.status);
  return t(def.localeKey) || order.status;
}

const STATUS_STYLE_MAP = {
  pending:    (getStyle) => getStyle(styles.statusNewDark, styles.statusNewLight),
  processing: (getStyle) => getStyle(styles.statusProcessingDark, styles.statusProcessingLight),
  completed:  (getStyle) => getStyle(styles.statusCompletedDark, styles.statusCompletedLight),
  cancelled:  (getStyle) => getStyle(styles.statusCancelledDark, styles.statusCancelledLight),
};

export function getOrderStatusStyle(order, getStyle) {
  return STATUS_STYLE_MAP[resolveStatusKey(order.status)](getStyle);
}

export function getOrderTotalPrice(order) {
  return order.totalPrice?.toLocaleString() || 0;
}

export function getToggleText(isExpanded, t) {
  return isExpanded ? `${t('orderHideDetails')} ▲` : `${t('orderShowDetails')} ▼`;
}

export function ExpandedItemsList({ show, items, getStyle, order }) {
  if (!show || !items) return null;
  const theme = useTheme();
  return (
    <View style={[styles.itemsList, getStyle(styles.itemsListDark, styles.itemsListLight)]}>
      {items.map((item, idx) => (
        <OrderItemRow
          key={idx}
          item={item}
          idx={idx}
          getStyle={getStyle}
        />
      ))}
      {order.note ? (
        <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: getStyle(colors.neutralDarkFaint, colors.secondaryLightBorder) }}>
          <Text variant="caption" color="muted" style={[styles.itemLabel, { marginBottom: 4 }]}> 
            {getItemLabel({ en: 'Order Note', ru: 'Комментарий к заказу', uk: 'Коментар до замовлення' }, theme.lang)}
          </Text>
          <Text style={styles.itemLabel}>
            {order.note}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const ADMIN_BG_STYLE_MAP = {
  pending:    styles.adminCardNew,
  processing: styles.adminCardProcessing,
  completed:  styles.adminCardCompleted,
  cancelled:  styles.adminCardCancelled,
};

export function getAdminBgStyle(order) {
  return ADMIN_BG_STYLE_MAP[resolveStatusKey(order.status)];
}
