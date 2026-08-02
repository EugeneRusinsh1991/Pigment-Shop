/**
 * ProductsFilterBar.js
 *
 * Controls bar for the admin Products tab.
 * Renders Discount, New Arrivals, and Add Product controls in a single row.
 */
import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Flag } from '@/components/domain/Flag';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { layout } from '../../../theme/tokens';
import styles from './ProductsStyles';

export default function ProductsFilterBar({
  onlyDiscount,
  onlyNew,
  onToggleDiscount,
  onToggleNew,
  onAdd,
}) {
  const { t } = useLanguage();
  return (
    <View style={styles.filterBar}>
      <Flag
        variant="chip"
        checked={onlyDiscount}
        onChange={onToggleDiscount}
        style={{ flex: 1 }}
      >
        {t('adminProductsFilterDiscount')}
      </Flag>
      <Flag
        variant="chip"
        checked={onlyNew}
        onChange={onToggleNew}
        style={{ flex: 1 }}
      >
        {t('adminProductsFilterNew')}
      </Flag>
      <Button
        title={t('adminProductsAddBtn')}
        onPress={onAdd}
        variant="primary"
        size="md"
        style={{ flex: 1 }}
      />
    </View>
  );
}


