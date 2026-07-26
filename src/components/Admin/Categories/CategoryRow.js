import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedButton } from '../../Button';
import { useTheme } from '../../../context/ThemeContext';
import { Badge } from '../../Badge';
import styles, { CATEGORY_TYPE_COLORS } from './CategoriesStyles';
import {
  DepthBars,
  ImageBadge,
  INDENT_PER_LEVEL,
  ToggleButton,
  getCategoryMeta,
  resolveCategoryName,
} from './CategoryRowElements';

function useCategoryRowData(row, products) {
  const { lang, t } = useTheme();
  const safeDepth = typeof row._depth === 'number' ? row._depth : 0;
  const { type, childCount, assignedCount } = getCategoryMeta(row, products);
  const typeColors = CATEGORY_TYPE_COLORS[type] || CATEGORY_TYPE_COLORS.product_holder;
  const countLabel = type === 'category_holder' ? `${childCount}` : `${assignedCount}`;
  const name = resolveCategoryName(row.name, lang);
  return { safeDepth, type, typeColors, countLabel, name, t };
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
      activeOpacity={0.85}
    >
      <DepthBars depth={safeDepth} leftOffset={16} />

      {/* Name column */}
      <View style={[styles.colName, { paddingLeft: safeDepth * INDENT_PER_LEVEL + (safeDepth > 0 ? 10 : 0) }]}>
        <View style={styles.nameCell}>
          <ToggleButton hasChildren={hasChildren} isCollapsed={isCollapsed} onToggle={onToggle} rowId={row.id} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.categoryName, safeDepth > 0 && { fontSize: 12 }]}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <Badge
                variant="status"
                status={type === 'category_holder' ? 'categoryHolder' : 'productHolder'}
                label={typeColors.label}
                size="sm"
              />
              <Text style={styles.categoryId}>{countLabel}</Text>
            </View>
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
      activeOpacity={0.85}
    >
      <DepthBars depth={safeDepth} leftOffset={16} />

      {/* Single row: toggle + name + image badge */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: safeDepth * INDENT_PER_LEVEL + (safeDepth > 0 ? 10 : 0) }}>
        <ToggleButton hasChildren={hasChildren} isCollapsed={isCollapsed} onToggle={onToggle} rowId={row.id} />

        <View style={{ flex: 1 }}>
          <Text style={[styles.categoryName, safeDepth > 0 && { fontSize: 12 }]} numberOfLines={1}>{name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <Badge
              variant="status"
              status={type === 'category_holder' ? 'categoryHolder' : 'productHolder'}
              label={typeColors.label}
              size="sm"
            />
            <Text style={styles.categoryId}>{countLabel}</Text>
            <ImageBadge image={row.image} />
          </View>
        </View>
      </View>
    </AnimatedButton>
  );
}

