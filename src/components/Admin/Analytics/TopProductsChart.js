/**
 * TopProductsChart.js
 *
 * Horizontal bar chart showing products by units sold.
 */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '../../Text';
import styles from './AnalyticsStyles';
import { useTheme } from '../../../context/ThemeContext';
import { getLocalizedValue } from '../../../utils/localization';

function truncateLabel(label, maxLen = 28) {
  if (!label) return 'Unknown Product';
  if (label.length <= maxLen) return label;
  return label.slice(0, maxLen - 1) + '…';
}


export default function TopProductsChart({ productsData = [] }) {
  const { lang, t } = useTheme();
  
  const products = useMemo(() => {
    return productsData.map((p) => ({
      ...p,
      label: getLocalizedValue(p.label, lang, 'Unknown Product'),
    }));
  }, [productsData, lang]);

  const maxValue = Math.max(...products.map((p) => p.value), 1);

  if (products.length === 0) {
    return (
      <View style={{ paddingVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text variant="body2" color="secondary" weight="medium">
          No selling products in this period.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {products.map((p, i) => (
        <View key={p.label + i} style={styles.barRow}>
          <Text variant="caption" color="secondary" style={styles.barLabel} numberOfLines={2}>
            {truncateLabel(p.label)}
          </Text>
          <View style={styles.barTrack}>
            <View style={{ flexDirection: 'row', width: `${(p.value / maxValue) * 100}%`, height: '100%', borderRadius: 4, overflow: 'hidden' }}>
              {p.completed > 0 && (
                <View style={{ flex: p.completed, backgroundColor: '#10B981' }} />
              )}
              {p.processing > 0 && (
                <View style={{ flex: p.processing, backgroundColor: '#F59E0B' }} />
              )}
              {p.pending > 0 && (
                <View style={{ flex: p.pending, backgroundColor: '#3B82F6' }} />
              )}
            </View>
          </View>
          <Text variant="caption" color="secondary" style={styles.barValue}>{p.value}</Text>
        </View>
      ))}
    </View>
  );
}
