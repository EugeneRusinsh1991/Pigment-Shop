import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getLocalizedValue } from '../../utils/localization';

function getProductLabel(item, flatList, lang) {
  const matched = flatList.find((p) => p.id === item.id);
  const labelObj = matched ? matched.label : (item.label || item.name);
  return getLocalizedValue(labelObj, lang);
}

export function OrderMetaRow({ label, value, isPrice, isLast, isDark, textStyle, subtextStyle }) {
  const borderStyle = isDark ? styles.borderDark : styles.borderLight;
  return (
    <View style={[styles.metaRow, borderStyle, isLast && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <Text style={[styles.metaLabel, subtextStyle]}>{label}</Text>
      <Text style={[isPrice ? styles.metaPrice : styles.metaValue, textStyle]}>
        {value}
      </Text>
    </View>
  );
}

export function OrderItemRow({ item, flatList, lang, isDark, isLast, textStyle, subtextStyle }) {
  const label = getProductLabel(item, flatList, lang);
  const priceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
  const lineTotal = (priceNum * item.qty).toFixed(2);
  const borderStyle = isDark ? styles.borderDark : styles.borderLight;

  return (
    <View style={[styles.itemRow, borderStyle, isLast && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <Text style={[styles.itemText, styles.colProduct, textStyle]} numberOfLines={2}>
        {label}
      </Text>
      <Text style={[styles.itemText, styles.colQty, subtextStyle, { textAlign: 'center' }]}>
        {item.qty}
      </Text>
      <Text style={[styles.itemText, styles.colPrice, subtextStyle, { textAlign: 'right' }]}>
        ${priceNum.toFixed(2)}
      </Text>
      <Text style={[styles.itemText, styles.colTotal, textStyle, { textAlign: 'right', fontWeight: '500' }]}>
        ${lineTotal}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  borderDark: {
    borderBottomColor: '#2A2A2A',
  },
  borderLight: {
    borderBottomColor: '#F1F5F9',
  },
  metaLabel: {
    fontSize: 14,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  metaPrice: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 13,
  },
  colProduct: {
    flex: 4,
  },
  colQty: {
    flex: 1,
  },
  colPrice: {
    flex: 1.5,
  },
  colTotal: {
    flex: 1.5,
  },
});
