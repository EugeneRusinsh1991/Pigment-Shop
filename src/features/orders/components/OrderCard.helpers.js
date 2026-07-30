import { useState } from 'react';
import { View, Animated } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useCatalog } from '@/features/catalog/CatalogContext';
import { useAnimatedTransition } from '@/hooks/useAnimatedTransition';
import { formatDateLong } from '@/utils/dateFormatting';
import { getLocalizedValue } from '@/utils/localization';
import { resolveStatusDef, resolveStatusKey } from '@/utils/orderStatus';
import styles from '../OrdersPageStyles';
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
  const { t, lang } = useLanguage();
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
  const { shouldRender, anim } = useAnimatedTransition(show, {
    durationIn: 250,
    durationOut: 200,
  });
  const [contentHeight, setContentHeight] = useState(0);
  const { t } = useLanguage();

  if (!shouldRender || !items) return null;

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-12, 0],
  });

  const maxHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight || 500],
  });

  return (
    <Animated.View
      style={{
        maxHeight,
        opacity: anim,
        transform: [{ translateY }],
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <View
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (h && h !== contentHeight) {
            setContentHeight(h);
          }
        }}
        style={[styles.itemsList, getStyle(styles.itemsListDark, styles.itemsListLight)]}
      >
        {items.map((item, idx) => (
          <OrderItemRow
            key={idx}
            item={item}
            idx={idx}
            getStyle={getStyle}
          />
        ))}
        {order.note ? (
          <View style={[styles.noteSection, getStyle(styles.itemBorderDark, styles.itemBorderLight)]}>
            <Text variant="caption" color="muted" style={[styles.itemLabel, styles.noteTitle]}> 
              {t('cartOrderNote')}
            </Text>
            <Text style={styles.itemLabel}>
              {order.note}
            </Text>
          </View>
        ) : null}
      </View>
    </Animated.View>
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
