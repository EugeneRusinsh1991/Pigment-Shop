/**
 * ProductsFilterBar.js
 *
 * Controls bar for the admin Products tab.
 * Renders Discount, New Arrivals, and Add Product controls in a single row.
 */
import React from 'react';
import { View } from 'react-native';
import { Button } from '../../Button';
import { Flag, FlagGroup } from '../../Flag';
import { useTheme } from '../../../context/ThemeContext';

export default function ProductsFilterBar({
  onlyDiscount,
  onlyNew,
  onToggleDiscount,
  onToggleNew,
  onAdd,
}) {
  const { t } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
      <FlagGroup>
        <Flag
          variant="chip"
          checked={onlyDiscount}
          onChange={onToggleDiscount}
        >
          {t('adminProductsFilterDiscount')}
        </Flag>
        <Flag
          variant="chip"
          checked={onlyNew}
          onChange={onToggleNew}
        >
          {t('adminProductsFilterNew')}
        </Flag>
      </FlagGroup>
      <Button
        title={t('adminProductsAddBtn')}
        onPress={onAdd}
        variant="primary"
        size="md"
      />
    </View>
  );
}

