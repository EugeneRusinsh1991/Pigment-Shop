/**
 * OrderItemsList.js — redesigned with aligned columns + order total
 */
import { Text } from '@/components/Text';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './OrdersStyles';

function resolveItemName(item, lang) {
  const field = item.label || item.name;
  if (!field) return '—';
  if (typeof field === 'object') {
    const choices = [field[lang], field.ru, field.en];
    return choices.find((v) => v) || '—';
  }
  return field;
}

function ItemRow({ item, lang, t, isLast }) {
  const name = resolveItemName(item, lang);
  const qty = item.qty ?? item.quantity ?? 0;
  const unitPrice = item.price ?? 0;
  const lineTotal = qty * unitPrice;

  return (
    <View style={[styles.itemRow, isLast ? { borderBottomWidth: 0 } : null]}>
      <Text style={styles.itemLabel} size={14} numberOfLines={2}>{name}</Text>
      <Text style={styles.itemQty} size={14}>{qty} {t('pcs')}</Text>
      <Text style={styles.itemUnitPrice} size={14}>${unitPrice.toLocaleString()}</Text>
      <Text style={styles.itemPrice} size={14} weight="500">${lineTotal.toLocaleString()}</Text>
    </View>
  );
}

export default function OrderItemsList({ items, totalPrice }) {
  const { t, lang } = useTheme();

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
        <ItemRow
          key={idx}
          item={item}
          lang={lang}
          t={t}
          isLast={idx === items.length - 1}
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
