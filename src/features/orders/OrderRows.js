import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/Text';
import { getLocalizedValue } from '../../utils/localization';
import { colors, layout } from '../../theme/tokens';

function getProductLabel(item, flatList, lang) {
  const matched = flatList.find((p) => p.id === item.id);
  const labelObj = matched ? matched.label : (item.label || item.name);
  return getLocalizedValue(labelObj, lang);
}

export function OrderMetaRow({ label, value, isPrice, isLast, isDark, textStyle, subtextStyle }) {
  const borderStyle = isDark ? styles.borderDark : styles.borderLight;
  return (
    <View style={[styles.metaRow, borderStyle, isLast && styles.noBorder]}>
      <Text variant="body" color="muted" style={[styles.subtextCell, subtextStyle]}>{label}</Text>
      <Text variant={isPrice ? 'title' : 'body'} weight={isPrice ? 'heavy' : 'medium'} style={[styles.textCell, textStyle]}>
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
    <View style={[styles.itemRow, borderStyle, isLast && styles.noBorder]}>
      <Text variant="body" style={[styles.colProduct, textStyle]} numberOfLines={2}>
        {label}
      </Text>
      <Text variant="body" color="muted" style={[styles.colQty, styles.textCenter, subtextStyle]}>
        {item.qty}
      </Text>
      <Text variant="body" color="muted" style={[styles.colPrice, styles.textRight, subtextStyle]}>
        ${priceNum.toFixed(2)}
      </Text>
      <Text variant="body" weight="medium" style={[styles.colTotal, styles.textRight, textStyle]}>
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
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
  },
  borderDark: {
    borderBottomColor: colors.borderDark,
  },
  borderLight: {
    borderBottomColor: colors.slateMid,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
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
  noBorder: {
    borderBottomWidth: 0,
    paddingBottom: layout.spacing.none,
  },
  textCell: {},
  subtextCell: {},
  textCenter: { textAlign: 'center' },
  textRight: { textAlign: 'right' },
});
