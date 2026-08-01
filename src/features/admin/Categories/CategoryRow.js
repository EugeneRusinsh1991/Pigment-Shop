import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { AnimatedButton } from '@/components/ui/Button';
import { useLanguage } from '../../../context/LanguageContext';
import { Badge } from '@/components/ui/Badge';
import { layout, motion } from '../../../theme/tokens';
import styles, { CATEGORY_TYPE_COLORS } from './CategoriesStyles';
import {
  DepthBars,
  ImageBadge,
  INDENT_PER_LEVEL,
  MOBILE_INDENT_PER_LEVEL,
  ToggleButton,
  getCategoryMeta,
  resolveCategoryName,
} from './CategoryRowElements';

const row_styles = StyleSheet.create({
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xxs,
  },
  metaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
});

function useCategoryRowData(row, products) {
  const { lang, t } = useLanguage();
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
      <Text variant="code" style={styles.categoryId}>{countLabel}</Text>
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
        safeDepth === 1 && styles.treeRowDepth1,
        safeDepth >= 2 && styles.treeRowDepth2,
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
            <Text variant="subtitle2" style={styles.categoryName}>{name}</Text>
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
  const { safeDepth, type, countLabel, name } = useCategoryRowData(row, products);

  const isHolder = type === 'category_holder';

  return (
    <View
      style={[
        styles.mobileTreeCard,
        isHolder ? styles.mobileTreeCardCategoryHolder : styles.mobileTreeCardProductHolder,
      ]}
    >
      {/* Toggle zone — dedicated 44pt pressable, isolated from edit action */}
      <View style={styles.mobileToggleZone}>
        <ToggleButton hasChildren={hasChildren} isCollapsed={isCollapsed} onToggle={onToggle} rowId={row.id} />
      </View>

      {/* Content zone — tap to edit */}
      <AnimatedButton
        style={[styles.mobileContentZone, { paddingLeft: safeDepth * MOBILE_INDENT_PER_LEVEL }]}
        onPress={() => onEdit(row)}
        activeOpacity={motion.press.activeOpacity}
      >
        <View style={styles.mobileContentCol}>
          <View style={styles.mobileRowMain}>
            <Text variant="subtitle2" style={styles.categoryName} numberOfLines={1}>
              {name}
            </Text>
            <Badge
              variant="status"
              status={isHolder ? 'categoryHolder' : 'productHolder'}
              label={countLabel}
              size="xs"
            />
          </View>

          <View style={styles.mobileRowSub}>
            <ImageBadge image={row.image} />
          </View>
        </View>
      </AnimatedButton>
    </View>
  );
}
