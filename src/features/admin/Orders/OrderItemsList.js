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
      <Text style={styles.itemName} size={14}>{label}</Text>
      <Text style={styles.itemQty} size={14} color="muted">x{qty}</Text>
      <Text style={styles.itemUnitPrice} size={14}>${unitPrice.toLocaleString()}</Text>
      <Text style={styles.itemPrice} size={14} weight="500">${lineTotal.toLocaleString()}</Text>
    </View>
  );
}

export default function OrderItemsList({ items, totalPrice }) {
  const { t, lang } = useLanguage();

  return (
    <View style={styles.detailCard}>
      {/* Column header row */}
      <View style={[styles.itemRow, styles.itemHeaderRow]}>
        <Text variant="overline" color="desc" style={[styles.itemLabel, styles.itemColHeader]}>{t('adminOrdersItemName')}</Text>
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
        <Text style={styles.itemLabel} size={14} weight="bold">{t('adminOrdersTotal')}</Text>
        <Text style={styles.itemQty} size={14} />
        <Text style={styles.itemUnitPrice} size={14} />
        <Text style={styles.itemPrice} size={14} weight="bold">
          ${(totalPrice || 0).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}
