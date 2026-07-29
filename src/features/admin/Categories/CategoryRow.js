import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { AnimatedButton } from '@/components/ui/Button';
import { useTheme } from '../../../context/ThemeContext';
import { Badge } from '@/components/ui/Badge';
import { layout, motion } from '../../../theme/tokens';
import styles, { CATEGORY_TYPE_COLORS } from './CategoriesStyles';
import {
  DepthBars,
  ImageBadge,
  INDENT_PER_LEVEL,
  ToggleButton,
  getCategoryMeta,
  resolveCategoryName,
} from './CategoryRowElements';

const row_styles = StyleSheet.create({
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    marginTop: layout.spacing.xxs,
  },
  mobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  flex1: {
    flex: 1,
  },
});

function useCategoryRowData(row, products) {
  const { lang, t } = useTheme();
  const safeDepth = typeof row._depth === 'number' ? row._depth : 0;
  const { type, childCount, assignedCount } = getCategoryMeta(row, products);
  const typeColors = CATEGORY_TYPE_COLORS[type] || CATEGORY_TYPE_COLORS.product_holder;
  const countLabel = type === 'category_holder' ? `${childCount}` : `${assignedCount}`;
  const name = resolveCategoryName(row.name, lang);
  return { safeDepth, type, typeColors, countLabel, name, t };
}

function CategoryTypeBadge({ type, typeColors, countLabel, children }) {
  return (
    <View style={row_styles.badgeRow}>
      <Badge
        variant="status"
        status={type === 'category_holder' ? 'categoryHolder' : 'productHolder'}
        label={typeColors.label}
        size="sm"
      />
      <Text style={styles.categoryId}>{countLabel}</Text>
      {children}
    </View>
  );
}

export function DesktopCategoryRow({ row, hasChildren, isCollapsed, onToggle, onEdit, isAlt, products }) {
  const { safeDepth, type, typeColors, countLabel, name } = useCategoryRowData(row, products);

  return (
    <AnimatedButton
      style={[
        styles.treeRow,
        isAlt && styles.treeRowAlt,
        type === 'category_holder' ? styles.treeRowCategoryHolder : styles.treeRowProductHolder,
      ]}
      onPress={() => onEdit(row)}
      activeOpacity={motion.press.activeOpacity}
    >
      <DepthBars depth={safeDepth} leftOffset={16} />

      {/* Name column */}
      <View style={[styles.colName, { paddingLeft: safeDepth * INDENT_PER_LEVEL + (safeDepth > 0 ? layout.spacing.sm : 0) }]}>
        <View style={styles.nameCell}>
          <ToggleButton hasChildren={hasChildren} isCollapsed={isCollapsed} onToggle={onToggle} rowId={row.id} />
          <View style={row_styles.flex1}>
            <Text style={styles.categoryName} size={safeDepth > 0 ? 12 : undefined}>{name}</Text>
            <CategoryTypeBadge type={type} typeColors={typeColors} countLabel={countLabel} />
          </View>
        </View>
      </View>

      {/* Image column */}
      <View style={styles.colImage}>
        <ImageBadge image={row.image} />
      </View>
    </AnimatedButton>
  );
}

export function MobileCategoryCard({ row, hasChildren, isCollapsed, onToggle, onEdit, products }) {
  const { safeDepth, type, typeColors, countLabel, name } = useCategoryRowData(row, products);

  return (
    <AnimatedButton
      style={[
        styles.mobileTreeCard,
        type === 'category_holder' ? styles.mobileTreeCardCategoryHolder : styles.mobileTreeCardProductHolder,
      ]}
      onPress={() => onEdit(row)}
      activeOpacity={motion.press.activeOpacity}
    >
      <DepthBars depth={safeDepth} leftOffset={16} />

      {/* Single row: toggle + name + image badge */}
      <View style={[row_styles.mobileRow, { paddingLeft: safeDepth * INDENT_PER_LEVEL + (safeDepth > 0 ? layout.spacing.sm : 0) }]}>
        <ToggleButton hasChildren={hasChildren} isCollapsed={isCollapsed} onToggle={onToggle} rowId={row.id} />

        <View style={row_styles.flex1}>
          <Text style={styles.categoryName} size={safeDepth > 0 ? 12 : undefined} numberOfLines={1}>{name}</Text>
          <CategoryTypeBadge type={type} typeColors={typeColors} countLabel={countLabel}>
            <ImageBadge image={row.image} />
          </CategoryTypeBadge>
        </View>
      </View>
    </AnimatedButton>
  );
}
