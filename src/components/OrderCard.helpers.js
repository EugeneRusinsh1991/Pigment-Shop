import { Text, View } from 'react-native';
import { useCatalog } from '../context/CatalogContext';
import { useTheme } from '../context/ThemeContext';
import commonStyles from '../theme/commonStyles';
import styles from './OrdersPageStyles';

export const JUST_NOW_TRANSLATIONS = {
  uk: 'Щойно',
  en: 'Just now',
  ru: 'Только что',
};

export const LOCALE_TRANSLATIONS = {
  uk: 'uk-UA',
  en: 'en-US',
  ru: 'ru-RU',
};

export const STATUS_MAP = {
  'Новый заказ': 'orderStatusPending',
  'В обработке': 'orderStatusProcessing',
  'Pending': 'orderStatusPending',
  'Processing': 'orderStatusProcessing',
  'New': 'orderStatusPending',
  'Выполнен': 'orderStatusCompleted',
  'Completed': 'orderStatusCompleted',
  'Отменен': 'orderStatusCancelled',
  'Отменён': 'orderStatusCancelled',
  'Cancelled': 'orderStatusCancelled',
};

export function getItemLabel(labelObj, lang) {
  if (labelObj && typeof labelObj === 'object' && labelObj[lang]) {
    return labelObj[lang];
  }
  return labelObj;
}

export function OrderItemRow({ item, idx, getStyle }) {
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
        <Text style={[styles.itemLabel, getStyle(commonStyles.textDark, commonStyles.textLight)]} numberOfLines={1}>
          {label}
        </Text>
        <Text style={[styles.itemQtyPrice, getStyle(commonStyles.subtextDark, commonStyles.subtextLight)]}>
          {item.qty} {t('pcs')} × {item.price}
        </Text>
      </View>
      <Text style={[styles.itemSubtotal, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
        ${subtotal}
      </Text>
    </View>
  );
}

export function getFormattedDate(order, lang) {
  if (!order.createdAt) {
    return JUST_NOW_TRANSLATIONS[lang] || JUST_NOW_TRANSLATIONS.ru;
  }
  try {
    const date = order.createdAt.toDate();
    const locale = LOCALE_TRANSLATIONS[lang] || LOCALE_TRANSLATIONS.ru;
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  } catch (e) {
    return '—';
  }
}

export function getOrderNumber(order) {
  return order.id.slice(-5).toUpperCase();
}

export function getOrderStatus(order, t) {
  const status = order.status || 'Новый заказ';
  const translationKey = STATUS_MAP[status];
  return translationKey ? t(translationKey) : status;
}

const STATUS_KEYWORDS = {
  completed: ['complet', 'выполн'],
  cancelled: ['cancel', 'отмен'],
  processing: ['process', 'обработ'],
};

export function getOrderStatusKey(order) {
  const normalized = String(order.status || 'Новый заказ').toLowerCase();
  const found = Object.entries(STATUS_KEYWORDS).find(([, keywords]) =>
    keywords.some((kw) => normalized.includes(kw))
  );
  return found ? found[0] : 'new';
}

const STATUS_STYLE_MAP = {
  completed: (getStyle) => getStyle(styles.statusCompletedDark, styles.statusCompletedLight),
  cancelled: (getStyle) => getStyle(styles.statusCancelledDark, styles.statusCancelledLight),
  processing: (getStyle) => getStyle(styles.statusProcessingDark, styles.statusProcessingLight),
  new: (getStyle) => getStyle(styles.statusNewDark, styles.statusNewLight),
};

export function getOrderStatusStyle(order, getStyle) {
  return STATUS_STYLE_MAP[getOrderStatusKey(order)](getStyle);
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
        <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: getStyle('#2D2D2D', '#E2E8F0') }}>
          <Text style={[styles.itemLabel, getStyle(commonStyles.subtextDark, commonStyles.subtextLight), { fontSize: 12, marginBottom: 4 }]}> 
            {getItemLabel({ en: 'Order Note', ru: 'Комментарий к заказу', uk: 'Коментар до замовлення' }, theme.lang)}
          </Text>
          <Text style={[styles.itemLabel, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
            {order.note}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const ADMIN_BG_STYLE_MAP = {
  completed: styles.adminCardCompleted,
  cancelled: styles.adminCardCancelled,
  processing: styles.adminCardProcessing,
  new: styles.adminCardNew,
};

export function getAdminBgStyle(order) {
  return ADMIN_BG_STYLE_MAP[getOrderStatusKey(order)];
}
