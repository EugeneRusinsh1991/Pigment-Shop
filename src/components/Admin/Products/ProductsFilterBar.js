/**
 * ProductsFilterBar.js
 *
 * Quick-filter toggles for the admin Products tab.
 * Renders beneath the SearchToolbar.
 */
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './ProductsStyles';
import { useTheme } from '../../../context/ThemeContext';
import { TagIcon, StarIcon } from '../../Icons';

/** A pill toggle button. */
function Toggle({ icon, label, active, onPress }) {
  const color = active ? '#FFFFFF' : '#475569';
  return (
    <TouchableOpacity
      style={[styles.filterToggle, active && styles.filterToggleActive, { flexDirection: 'row', alignItems: 'center', gap: 4 }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {icon && React.cloneElement(icon, { color })}
      <Text style={[styles.filterToggleText, active && styles.filterToggleTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ProductsFilterBar({ onlyDiscount, onlyNew, onToggleDiscount, onToggleNew }) {
  const { t } = useTheme();
  return (
    <View style={styles.filterBar}>
      <View style={styles.filterToggles}>
        <Toggle
          icon={<TagIcon size={14} />}
          label={t('adminProductsFilterDiscount')}
          active={onlyDiscount}
          onPress={onToggleDiscount}
        />
        <Toggle
          icon={<StarIcon size={14} />}
          label={t('adminProductsFilterNew')}
          active={onlyNew}
          onPress={onToggleNew}
        />
      </View>
    </View>
  );
}

