import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useLanguage } from '../../../context/LanguageContext';
import { ChevronDownIcon, ChevronRightIcon, CheckIcon, CrossIcon } from '@/components/Icons';
import { IconButton } from '@/components/ui/Button';
import { colors, layout } from '../../../theme/tokens';
import styles from './CategoriesStyles';

export const INDENT_PER_LEVEL = 20;
export const MOBILE_INDENT_PER_LEVEL = 12;

const elem_styles = StyleSheet.create({
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xxs,
  },
  badgeText: {
    marginLeft: layout.spacing.xxs,
  },
  depthContainer: {
    position: 'absolute',
    top: layout.spacing.none,
    bottom: layout.spacing.none,
    left: layout.spacing.none,
    pointerEvents: 'none',
  },
  depthBarBase: {
    width: 2,
    position: 'absolute',
    top: layout.spacing.none,
    bottom: layout.spacing.none,
  },
});

export function resolveCategoryName(name, lang) {
  if (!name) return '—';
  if (typeof name === 'string') return name;
  return name[lang] || name.ru || name.en || '—';
}

export function ToggleButton({ expanded, onToggle, t }) {
  return (
    <IconButton
      icon={
        expanded ? (
          <ChevronDownIcon color={colors.accentPinkLight} size={14} />
        ) : (
          <ChevronRightIcon color={colors.slateText} size={14} />
        )
      }
      onPress={onToggle}
      size="sm"
      variant="transparent"
      animated={true}
    />
  );
}

export function isCategoryComplete(category) {
  if (!category) return false;
  const name = category.name;
  const hasName = Boolean(name && (typeof name === 'string' ? name.trim() : (name.ru || name.en || name.uk)));
  const desc = category.description;
  const hasDesc = Boolean(desc && (typeof desc === 'string' ? desc.trim() : (desc.ru || desc.en || desc.uk)));
  const image = category.image;
  const hasImage = Boolean(image && (typeof image === 'string' ? image.trim() : false));
  return hasName && hasDesc && hasImage;
}

export function CategoryCompletionBadge({ category, image }) {
  const { t } = useLanguage();
  const targetCategory = category || { image };
  const complete = isCategoryComplete(targetCategory);
  return (
    <View style={[styles.imageBadge, complete ? styles.imageBadgeSet : styles.imageBadgeNone]}>
      <View style={elem_styles.badgeRow}>
        {complete
          ? <CheckIcon color={colors.success} size={12} />
          : <CrossIcon color={colors.dangerMid} size={12} />}
        <Text
          variant="label"
          style={[styles.imageBadgeText, complete ? styles.imageBadgeSetText : styles.imageBadgeNoneText, elem_styles.badgeText]}
        >
          {complete
            ? (t('adminCategoriesComplete') || 'Complete')
            : (t('adminCategoriesIncomplete') || 'Incomplete')}
        </Text>
      </View>
    </View>
  );
}

export const ImageBadge = CategoryCompletionBadge;

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
    <View style={elem_styles.depthContainer}>
      {Array.from({ length: depth }).map((_, i) => (
        <View
          key={i}
          style={[
            elem_styles.depthBarBase,
            {
              left: leftOffset + i * INDENT_PER_LEVEL,
              backgroundColor: i === depth - 1 ? colors.slateStrong : colors.borderLight,
            },
          ]}
        />
      ))}
    </View>
  );
}
