import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Button } from '../../Button';
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
    <View style={styles.badgeNew}>
      <Text style={styles.badgeNewText}>{t('badgeNew')}</Text>
    </View>
  );
}

export function StatusBadge({ active }) {
  const { t } = useTheme();
  const themedStyle = active ? styles.statusActive : styles.statusInactive;
  const themedTextStyle = active ? styles.statusActiveText : styles.statusInactiveText;
  return (
    <View style={[styles.statusBadge, themedStyle]}>
      <Text style={[styles.statusText, themedTextStyle]}>
        {active ? t('adminProductsActive') : t('adminProductsInactive')}
      </Text>
    </View>
  );
}


export function DiscountCell({ discountPercent }) {
  if (discountPercent > 0) {
    return <Text style={[styles.discountText, styles.colDiscount]}>-{discountPercent}%</Text>;
  }
  return <Text style={[styles.discountNone, styles.colDiscount]}>—</Text>;
}
