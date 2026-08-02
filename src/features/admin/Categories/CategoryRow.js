import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { AnimatedButton } from '@/components/ui/Button';
import { useLanguage } from '../../../context/LanguageContext';
import { Badge } from '@/components/ui/Badge';
import { motion } from '../../../theme/tokens';
import styles, { CATEGORY_TYPE_COLORS } from './CategoriesStyles';
import {
  CategoryCompletionBadge,
  INDENT_PER_LEVEL,
  MOBILE_INDENT_PER_LEVEL,
  ToggleButton,
  getCategoryMeta,
  resolveCategoryName,
} from './CategoryRowElements';

function useCategoryRowData(row, products) {
  const { lang, t } = useLanguage();
  const safeDepth = typeof row._depth === 'number' ? row._depth : 0;
  const { type, childCount, assignedCount } = getCategoryMeta(row, products);
  const typeColors = CATEGORY_TYPE_COLORS[type] || CATEGORY_TYPE_COLORS.product_holder;
  const countLabel = type === 'category_holder' ? `${childCount}` : `${assignedCount}`;
  const name = resolveCategoryName(row.name, lang);
  return { safeDepth, type, typeColors, countLabel, name, t };
}

export function CategoryCardRow({ row, hasChildren, isCollapsed, onToggle, onEdit, products, isMobile }) {
  const { safeDepth, type, countLabel, name } = useCategoryRowData(row, products);
  const isHolder = type === 'category_holder';
  const indentStep = isMobile ? MOBILE_INDENT_PER_LEVEL : INDENT_PER_LEVEL;

  return (
    <View
      style={[
        styles.mobileTreeCard,
        isHolder ? styles.mobileTreeCardCategoryHolder : styles.mobileTreeCardProductHolder,
      ]}
    >
      <View style={styles.mobileToggleZone}>
        <ToggleButton hasChildren={hasChildren} isCollapsed={isCollapsed} onToggle={onToggle} rowId={row.id} />
      </View>

      <AnimatedButton
        style={[styles.mobileContentZone, { paddingLeft: safeDepth * indentStep }]}
        onPress={() => onEdit(row)}
        activeOpacity={motion.press.activeOpacity}
      >
        <View style={styles.categorySingleRow}>
          <Text variant="subtitle2" style={styles.categoryName} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.badgeGroupRow}>
            <CategoryCompletionBadge category={row} />
            <Badge
              variant="status"
              status={isHolder ? 'categoryHolder' : 'productHolder'}
              label={countLabel}
              size="xs"
            />
          </View>
        </View>
      </AnimatedButton>
    </View>
  );
}

export const MobileCategoryCard = (props) => <CategoryCardRow {...props} isMobile={true} />;
export const DesktopCategoryRow = (props) => <CategoryCardRow {...props} isMobile={false} />;
