import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import commonStyles from '../theme/commonStyles';
import styles from './OrdersPageStyles';
import { useTheme } from '../context/ThemeContext';
import { useCatalog } from '../context/CatalogContext';

const JUST_NOW_TRANSLATIONS = {
  uk: 'Щойно',
  en: 'Just now',
  ru: 'Только что',
};

const LOCALE_TRANSLATIONS = {
  uk: 'uk-UA',
  en: 'en-US',
  ru: 'ru-RU',
};

const STATUS_MAP = {
  'Новый заказ': 'orderStatusPending',
  'В обработке': 'orderStatusPending',
  'Pending': 'orderStatusPending',
  'Выполнен': 'orderStatusCompleted',
  'Completed': 'orderStatusCompleted',
  'Отменен': 'orderStatusCancelled',
  'Cancelled': 'orderStatusCancelled',
};

function getItemLabel(labelObj, lang) {
  if (labelObj && typeof labelObj === 'object' && labelObj[lang]) {
    return labelObj[lang];
  }
  return labelObj;
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

function getFormattedDate(order, lang) {
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

function getOrderNumber(order) {
  return order.id.slice(-5).toUpperCase();
}

function getOrderStatus(order, t) {
  const status = order.status || 'Новый заказ';
  const translationKey = STATUS_MAP[status];
  return translationKey ? t(translationKey) : status;
}

function getOrderTotalPrice(order) {
  return order.totalPrice?.toLocaleString() || 0;
}

function getToggleText(isExpanded, t) {
  return isExpanded ? `${t('orderHideDetails')} ▲` : `${t('orderShowDetails')} ▼`;
}

function ExpandedItemsList({ show, items, getStyle }) {
  if (!show || !items) return null;
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
    </View>
  );
}

export default function OrderCard({ order, isDark, isExpanded, onToggle, getStyle }) {
  const { t, lang } = useTheme();
  return (
    <View style={[commonStyles.card, getStyle(commonStyles.cardDark, commonStyles.cardLight), styles.cardSpecific]}>
      <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
        <View style={styles.orderHeader}>
          <Text style={[styles.orderNumber, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
            {t('orderNumber')}{getOrderNumber(order)}
          </Text>
          <Text style={[styles.orderStatus, getStyle(styles.statusDark, styles.statusLight)]}>
            {getOrderStatus(order, t)}
          </Text>
        </View>
        <Text style={[styles.orderDate, getStyle(commonStyles.subtextDark, commonStyles.subtextLight)]}>
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
      />
    </View>
  );
}
