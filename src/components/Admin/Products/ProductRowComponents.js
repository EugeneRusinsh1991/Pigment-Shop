import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Text';
import { useTheme } from '../../../context/ThemeContext';
import { Button } from '../../Button';
import { Badge } from '../../Badge';
import styles from './ProductsStyles';
import { getLocalizedValue } from '../../../utils/localization';
export { getEffectivePrice } from '../../../utils/pricing';


export function resolveLocalizedValue(val, lang) {
  return getLocalizedValue(val, lang);
}

export const getRowStyle = (index, isMobile) => {
  if (isMobile) {
    return [styles.tableRow, index % 2 === 1 && styles.tableRowAlt];
  }
  return [styles.tableRowDesktop, index % 2 === 1 && styles.tableRowAlt];
};

export const getPlaceholderVal = (val) => val || '—';

export function getHighlightStyle(isNew, discountPercent) {
  if (isNew && discountPercent > 0) return { backgroundColor: '#F0FDFA' };
  if (isNew) return { backgroundColor: '#EFF6FF' };
  if (discountPercent > 0) return { backgroundColor: '#F0FDF4' };
  return null;
}

export function NewBadge() {
  const { t } = useTheme();
  return (
    <Badge variant="new" label={t('badgeNew')} size="sm" />
  );
}

export function StatusBadge({ active }) {
  const { t } = useTheme();
  return (
    <Badge
      variant="status"
      status={active ? 'active' : 'inactive'}
      label={active ? t('adminProductsActive') : t('adminProductsInactive')}
      size="sm"
    />
  );
}

export function StockBadge({ stock }) {
  const { t } = useTheme();
  const inStock = (stock ?? 0) > 0;
  return (
    <Badge
      variant="status"
      status={inStock ? 'active' : 'inactive'}
      label={inStock ? (t('productInStock') || 'In Stock') : (t('productOutOfStock') || 'Out of Stock')}
      size="sm"
    />
  );
}


export function DiscountCell({ discountPercent }) {
  if (discountPercent > 0) {
    return <Text style={[styles.discountText, styles.colDiscount]}>-{discountPercent}%</Text>;
  }
  return <Text style={[styles.discountNone, styles.colDiscount]}>—</Text>;
}
