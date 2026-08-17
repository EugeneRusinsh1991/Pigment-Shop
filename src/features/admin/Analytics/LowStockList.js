/**
 * LowStockList.js
 *
 * Renders products with lowest warehouse stock.
 */
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ChevronDownIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import styles from './AnalyticsStyles';
import { useLanguage } from '../../../context/LanguageContext';
import { useAdminDrafts } from '../../../services/adminDomain';
import { colors } from '../../../theme/tokens';
import { getLocalizedValue } from '../../../utils/localization';

function truncateLabel(label, maxLen = 28) {
  if (!label) return 'Unknown Product';
  if (label.length <= maxLen) return label;
  return label.slice(0, maxLen - 1) + '…';
}

export default function LowStockList() {
  const { lang, t } = useLanguage();
  const { draftProducts = [] } = useAdminDrafts();
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedProducts = useMemo(() => {
    if (!Array.isArray(draftProducts)) return [];
    
    return [...draftProducts]
      .filter((p) => p && !p.isDeleted)
      .map((p) => {
        const rawStock = p.stock ?? p.quantity ?? p.count;
        const numStock = typeof rawStock === 'number' ? rawStock : parseInt(rawStock, 10);
        const stock = isNaN(numStock) ? 0 : numStock;
        return {
          id: p.id,
          label: getLocalizedValue(p.label || p.name, lang, 'Unknown Product'),
          stock,
        };
      })
      .sort((a, b) => a.stock - b.stock);
  }, [draftProducts, lang]);

  const visibleProducts = useMemo(() => {
    return isExpanded ? sortedProducts.slice(0, 15) : sortedProducts.slice(0, 5);
  }, [sortedProducts, isExpanded]);

  if (sortedProducts.length === 0) {
    return (
      <View style={styles.topProductsEmpty}>
        <Text variant="body2" color="secondary">
          {t('adminAnalyticsNoData')}
        </Text>
      </View>
    );
  }

  return (
    <View>
      {visibleProducts.map((p, i) => {
        const isOutOfStock = p.stock === 0;
        const isLowStock = p.stock > 0 && p.stock <= 5;
        
        let badgeStyle = styles.lowStockBadge;
        let textColor = colors.secondaryLightText;
        if (isOutOfStock) {
          badgeStyle = [styles.lowStockBadge, styles.lowStockBadgeDanger];
          textColor = colors.dangerMid || colors.danger;
        } else if (isLowStock) {
          badgeStyle = [styles.lowStockBadge, styles.lowStockBadgeWarning];
          textColor = colors.warningStrong;
        }

        return (
          <View key={p.id || p.label + i} style={styles.lowStockRow}>
            <View style={styles.lowStockNameCol}>
              <Text variant="caption" color="secondary" numberOfLines={2}>
                {truncateLabel(p.label)}
              </Text>
            </View>
            <View style={badgeStyle}>
              <Text variant="caption" style={[styles.lowStockQty, { color: textColor }]}>
                {isOutOfStock ? t('adminAnalyticsOutOfStock') : `${p.stock} ${t('adminAnalyticsUnitsLeft')}`}
              </Text>
            </View>
          </View>
        );
      })}

      {sortedProducts.length > 5 && (
        <View style={styles.topProductsExpandRow}>
          <TouchableOpacity
            style={styles.topProductsExpandBtn}
            onPress={() => setIsExpanded((prev) => !prev)}
            accessibilityRole="button"
            accessibilityLabel={isExpanded ? t('adminAnalyticsShowLess') : t('adminAnalyticsShowMore')}
          >
            <ChevronDownIcon
              size={16}
              color={colors.accent}
              style={isExpanded ? styles.topProductsExpandIconRotated : undefined}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
