/**
 * ProductsFilterBar.js
 *
 * Controls bar for the admin Products tab.
 * Renders Discount, New Arrivals, and Add Product controls in a single row.
 */
import React from 'react';
import { View } from 'react-native';
import Button from '../../Button';
import ChipButton from '../../ChipButton';
import { useTheme } from '../../../context/ThemeContext';
import { TagIcon, StarIcon } from '@/components/Icons';

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
      <ChipButton
        variant="pill"
        leftIcon={<TagIcon size={14} />}
        label={t('adminProductsFilterDiscount')}
        active={onlyDiscount}
        onPress={onToggleDiscount}
      />
      <ChipButton
        variant="pill"
        leftIcon={<StarIcon size={14} />}
        label={t('adminProductsFilterNew')}
        active={onlyNew}
        onPress={onToggleNew}
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

