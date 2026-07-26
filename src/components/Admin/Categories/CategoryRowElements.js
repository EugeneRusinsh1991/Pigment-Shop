import React from 'react';
import { View } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../context/ThemeContext';
import { ChevronDownIcon, ChevronRightIcon, CheckIcon, CrossIcon } from '@/components/Icons';
import { IconButton } from '@/components/Button';
import styles from './CategoriesStyles';

export const INDENT_PER_LEVEL = 20;

export function resolveCategoryName(name, lang) {
  if (!name) return '—';
  if (typeof name === 'string') return name;
  return name[lang] || name.ru || name.en || '—';
}

export function ToggleButton({ hasChildren, isCollapsed, onToggle, rowId }) {
  if (!hasChildren) return <View style={styles.togglePlaceholder} />;
  return (
    <IconButton
      icon={isCollapsed ? <ChevronRightIcon color="#475569" size={12} /> : <ChevronDownIcon color="#475569" size={12} />}
      onPress={(e) => {
        e?.stopPropagation?.();
        onToggle(rowId);
      }}
      size="sm"
      variant="transparent"
      animated={true}
    />
  );
}

export function ImageBadge({ image }) {
  const { t } = useTheme();
  const has = !!image;
  return (
    <View style={[styles.imageBadge, has ? styles.imageBadgeSet : styles.imageBadgeNone]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {has
          ? <CheckIcon color="#16A34A" size={12} />
          : <CrossIcon color="#DC2626" size={12} />}
        <Text style={[styles.imageBadgeText, has ? styles.imageBadgeSetText : styles.imageBadgeNoneText, { marginLeft: 4 }]}>
          {has ? t('adminCategoriesImageSet') : t('adminCategoriesImageNone')}
        </Text>
      </View>
    </View>
  );
}

export function getCategoryMeta(row, products) {
  const hasChildren = (row.children || []).length > 0;
  const type = row.type || (hasChildren ? 'category_holder' : 'product_holder');
  const childCount = (row.children || []).length;
  const assignedCount = Array.isArray(products)
    ? products.filter((p) => p && p.id && (row.productIds || []).includes(p.id)).length
    : 0;
  return { type, childCount, assignedCount };
}

export function DepthBars({ depth, leftOffset = 16 }) {
  if (depth === 0) return null;
  return (
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, pointerEvents: 'none' }}>
      {Array.from({ length: depth }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 2,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: leftOffset + i * INDENT_PER_LEVEL,
            backgroundColor: i === depth - 1 ? '#CBD5E1' : '#E8ECF0',
          }}
        />
      ))}
    </View>
  );
}
