/**
 * ProductsFilterBar.js
 *
 * Controls bar for the admin Products tab.
 * Renders Discount, New Arrivals, and Add Product controls in a single row.
 */
import React from 'react';
import { View } from 'react-native';
import { Button } from '../../Button';
import { Badge } from '../../Badge';
import { useTheme } from '../../../context/ThemeContext';
import { layout } from '../../../theme/tokens';

export default function ProductsFilterBar({
  onlyDiscount,
  onlyNew,
  onToggleDiscount,
  onToggleNew,
  onAdd,
}) {
  const { t } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: layout.spacing.sm, marginBottom: layout.spacing.lg }}>
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

