/**
 * TopProductsChart.js
 *
 * Horizontal bar chart showing products by units sold.
 */
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ChevronDownIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import styles from './AnalyticsStyles';
import { useLanguage } from '../../../context/LanguageContext';
import { colors } from '../../../theme/tokens';
import { getLocalizedValue } from '../../../utils/localization';

function truncateLabel(label, maxLen = 28) {
  if (!label) return 'Unknown Product';
  if (label.length <= maxLen) return label;
  return label.slice(0, maxLen - 1) + '…';
}

export default function TopProductsChart({ productsData = [] }) {
  const { lang, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const products = useMemo(() => {
    return productsData.map((p) => ({
      ...p,
      label: getLocalizedValue(p.label, lang, 'Unknown Product'),
    }));
  }, [productsData, lang]);

  const visibleProducts = useMemo(() => {
    return isExpanded ? products.slice(0, 15) : products.slice(0, 5);
  }, [products, isExpanded]);

  const maxValue = Math.max(...visibleProducts.map((p) => p.value), 1);

  if (products.length === 0) {
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
      {visibleProducts.map((p, i) => (
        <View key={p.label + i} style={styles.barRow}>
          <Text variant="caption" color="secondary" style={styles.barLabel} numberOfLines={2}>
            {truncateLabel(p.label)}
          </Text>
          <View style={styles.barTrack}>
            <View style={[styles.topProductsBarContainer, { width: `${(p.value / maxValue) * 100}%` }]}>
              {p.completed > 0 && (
                <View style={[styles.topProductsSegment, { flex: p.completed, backgroundColor: colors.successMid }]} />
              )}
              {p.processing > 0 && (
                <View style={[styles.topProductsSegment, { flex: p.processing, backgroundColor: colors.warningStrong }]} />
              )}
              {p.pending > 0 && (
                <View style={[styles.topProductsSegment, { flex: p.pending, backgroundColor: colors.infoStrong }]} />
              )}
            </View>
          </View>
          <Text variant="subtitle2" style={styles.barValue}>{p.value}</Text>
        </View>
      ))}
      {products.length > 5 && (
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
