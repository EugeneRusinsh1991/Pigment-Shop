/**
 * TopProductsChart.js
 *
 * Horizontal bar chart showing top products by units sold.
 */
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { getTopProducts } from '../../../data/adminAnalytics';
import styles from './AnalyticsStyles';

function truncateLabel(label, maxLen = 28) {
  if (label.length <= maxLen) return label;
  return label.slice(0, maxLen - 1) + '…';
}

export default function TopProductsChart() {
  const products = useMemo(() => getTopProducts(5), []);
  const maxValue = Math.max(...products.map((p) => p.value), 1);

  return (
    <View>
      {products.map((p) => (
        <View key={p.label} style={styles.barRow}>
          <Text style={styles.barLabel} numberOfLines={2}>
            {truncateLabel(p.label)}
          </Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${(p.value / maxValue) * 100}%` }]} />
          </View>
          <Text style={styles.barValue}>{p.value}</Text>
        </View>
      ))}
    </View>
  );
}
