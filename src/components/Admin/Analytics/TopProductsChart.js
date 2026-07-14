/**
 * TopProductsChart.js
 *
 * Horizontal bar chart showing products by units sold.
 */
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import styles from './AnalyticsStyles';
import { useTheme } from '../../../context/ThemeContext';

function truncateLabel(label, maxLen = 28) {
  if (!label) return 'Unknown Product';
  if (label.length <= maxLen) return label;
  return label.slice(0, maxLen - 1) + '…';
}

function resolveLocalizedValue(val, lang) {
  if (!val) return 'Unknown Product';
  if (typeof val === 'object') {
    return val[lang] || val.en || val.ru || 'Unknown Product';
  }
  return val;
}

export default function TopProductsChart({ productsData = [] }) {
  const { lang, t } = useTheme();
  
  const products = useMemo(() => {
    return productsData.map((p) => ({
      ...p,
      label: resolveLocalizedValue(p.label, lang),
    }));
  }, [productsData, lang]);

  const maxValue = Math.max(...products.map((p) => p.value), 1);

  if (products.length === 0) {
    return (
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ color: '#94a3b8', fontSize: 13 }}>No data</Text>
      </View>
    );
  }

  return (
    <View>
      {products.map((p, i) => (
        <View key={p.label + i} style={styles.barRow}>
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
