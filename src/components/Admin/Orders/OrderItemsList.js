/**
 * OrderItemsList.js — redesigned with aligned columns + order total
 */
import { View } from 'react-native';
import { Text } from '../../Text';
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
      <Text style={styles.itemLabel} numberOfLines={2}>{name}</Text>
      <Text style={styles.itemQty}>{qty} {t('pcs')}</Text>
      <Text style={styles.itemUnitPrice}>${unitPrice.toLocaleString()}</Text>
      <Text style={styles.itemPrice}>${lineTotal.toLocaleString()}</Text>
    </View>
  );
}

export default function OrderItemsList({ items, totalPrice }) {
  const { t, lang } = useTheme();

  return (
    <View style={styles.detailCard}>
      {/* Column header row */}
      <View style={[styles.itemRow, { borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 8 }]}>
        <Text style={[styles.itemLabel, styles.itemColHeader]}>{t('adminOrdersItemName')}</Text>
        <Text style={[styles.itemQty, styles.itemColHeader]}>{t('adminOrdersItemQty')}</Text>
        <Text style={[styles.itemUnitPrice, styles.itemColHeader]}>{t('adminOrdersItemUnit')}</Text>
        <Text style={[styles.itemPrice, styles.itemColHeader]}>{t('adminOrdersItemTotal')}</Text>
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
      <View style={[styles.itemRow, { borderTopWidth: 1, borderTopColor: '#E2E8F0', borderBottomWidth: 0, marginTop: 4 }]}>
        <Text style={[styles.itemLabel, { fontWeight: '700', color: '#1C1C1C' }]}>{t('adminOrdersTotal')}</Text>
        <Text style={styles.itemQty} />
        <Text style={styles.itemUnitPrice} />
        <Text style={[styles.itemPrice, { color: '#1C1C1C', fontWeight: '700' }]}>
          ${(totalPrice || 0).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}
