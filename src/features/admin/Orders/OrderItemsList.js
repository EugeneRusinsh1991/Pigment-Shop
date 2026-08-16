/**
 * OrderItemsList.js — redesigned with aligned columns + order total
 */
import { Text } from '@/components/ui/Text';
import { View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { layout } from '../../../theme/tokens';
import styles from './OrdersStyles';

function resolveItemName(item, lang) {
  if (item.label && typeof item.label === 'object') {
    return item.label[lang] || item.label.ru || item.label.en || item.name || 'Product';
  }
  return item.label || item.name || 'Product';
}

function getItemUnitPrice(item) {
  if (item.price != null) return Number(item.price);
  if (item.discountPrice != null) return Number(item.discountPrice);
  return 0;
}

function getItemQuantity(item) {
  return item.quantity != null ? Number(item.quantity) : 1;
}

function OrderItemRow({ item, lang }) {
  const label = resolveItemName(item, lang);
  const unitPrice = getItemUnitPrice(item);
  const qty = getItemQuantity(item);
  const lineTotal = unitPrice * qty;

  return (
    <View style={styles.itemRow}>
      <Text variant="subtitle2" numberOfLines={1} style={styles.itemName}>{label}</Text>
      <Text variant="caption" color="muted" style={styles.itemQty}>x{qty}</Text>
      <Text variant="caption" style={styles.itemUnitPrice}>${unitPrice.toLocaleString()}</Text>
      <Text variant="subtitle2" style={styles.itemPrice}>${lineTotal.toLocaleString()}</Text>
    </View>
  );
}

export default function OrderItemsList({ items, totalPrice }) {
  const { t, lang } = useLanguage();

  return (
    <View style={styles.detailCard}>
      {/* Column header row */}
      <View style={[styles.itemRow, styles.itemHeaderRow]}>
        <Text variant="overline" color="desc" numberOfLines={1} style={[styles.itemName, styles.itemColHeader]}>{t('adminOrdersItemName')}</Text>
        <Text variant="overline" color="desc" style={[styles.itemQty, styles.itemColHeader]}>{t('adminOrdersItemQty')}</Text>
        <Text variant="overline" color="desc" style={[styles.itemUnitPrice, styles.itemColHeader]}>{t('adminOrdersItemUnit')}</Text>
        <Text variant="overline" color="desc" style={[styles.itemPrice, styles.itemColHeader]}>{t('adminOrdersItemTotal')}</Text>
      </View>

      {items?.map((item, idx) => (
        <OrderItemRow
          key={idx}
          item={item}
          lang={lang}
        />
      ))}

      {/* Order total */}
      <View style={[styles.itemRow, styles.itemTotalRow]}>
        <Text variant="subtitle2" weight="bold" numberOfLines={1} style={styles.itemName}>{t('adminOrdersTotal')}</Text>
        <View style={styles.itemQty} />
        <View style={styles.itemUnitPrice} />
        <Text variant="subtitle2" weight="bold" style={styles.itemPrice}>
          ${(totalPrice || 0).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}
