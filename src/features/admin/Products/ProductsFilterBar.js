/**
 * ProductsFilterBar.js
 *
 * Controls bar for the admin Products tab.
 * Renders Discount, New Arrivals, and Add Product controls in a single row.
 */
import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
      <Badge
        variant="chip"
        selected={onlyDiscount}
        onPress={onToggleDiscount}
        label={t('adminProductsFilterDiscount')}
      />
      <Badge
        variant="chip"
        selected={onlyNew}
        onPress={onToggleNew}
        label={t('adminProductsFilterNew')}
      />
      <Button
        title={t('adminProductsAddBtn')}
        onPress={onAdd}
        variant="primary"
        size="md"
      />
    </View>
  );
}

