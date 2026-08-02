import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/ui/Text';
import { colors, layout, primitives } from '../../theme/tokens';
import { getLocalizedValue } from '../../utils/localization';

function getProductLabel(item, flatList, lang) {
  const matched = flatList.find((p) => p.id === item.id);
  const labelObj = matched ? matched.label : (item.label || item.name);
  return getLocalizedValue(labelObj, lang);
}

export function OrderMetaRow({ label, value, isPrice, isOrderId, isLast, isDark, textStyle, subtextStyle }) {
  const borderStyle = isDark ? styles.borderDark : styles.borderLight;
  return (
    <View style={[styles.metaRow, borderStyle, isLast && styles.noBorder]}>
      <Text variant="body1" color="muted" style={[styles.subtextCell, subtextStyle]}>{label}</Text>
      {isOrderId ? (
        <View style={[styles.orderIdBadge, isDark ? styles.orderIdBadgeDark : styles.orderIdBadgeLight]}>
          <Text variant="caption" weight="bold" style={[styles.orderIdText, isDark ? styles.orderIdTextDark : styles.orderIdTextLight]}>
            #{value}
          </Text>
        </View>
      ) : (
        <Text
          variant={isPrice ? 'h3' : 'body1'}
          weight={isPrice ? 'bold' : 'medium'}
          style={[isPrice ? (isDark ? styles.priceTextDark : styles.priceTextLight) : styles.textCell, textStyle]}
        >
          {value}
        </Text>
      )}
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
      <Text variant="body1" weight="medium" style={[styles.colProduct, textStyle]} numberOfLines={2}>
        {label}
      </Text>
      <View style={styles.colQty}>
        <View style={[styles.qtyBadge, isDark ? styles.qtyBadgeDark : styles.qtyBadgeLight]}>
          <Text variant="caption" weight="bold" style={isDark ? styles.qtyTextDark : styles.qtyTextLight}>
            {item.qty}
          </Text>
        </View>
      </View>
      <Text variant="body1" color="muted" style={[styles.colPrice, styles.textRight, subtextStyle]}>
        ${priceNum.toFixed(2)}
      </Text>
      <Text variant="body1" weight="bold" style={[styles.colTotal, styles.textRight, textStyle]}>
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
    paddingHorizontal: layout.spacing.xs,
    borderBottomWidth: layout.borderWidth.thin,
  },
  borderDark: {
    borderBottomColor: primitives.slate[800],
  },
  borderLight: {
    borderBottomColor: primitives.slate[200],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.xs,
    borderBottomWidth: layout.borderWidth.thin,
  },
  colProduct: {
    flex: 3.8,
    paddingRight: layout.spacing.xs,
  },
  colQty: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colPrice: {
    flex: 2,
  },
  colTotal: {
    flex: 2,
  },
  noBorder: {
    borderBottomWidth: layout.borderWidth.none,
  },
  textCell: {},
  subtextCell: {},
  textRight: {
    textAlign: 'right',
  },
  orderIdBadge: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxs,
    borderRadius: layout.radii.xs,
    borderWidth: layout.borderWidth.thin,
  },
  orderIdBadgeLight: {
    backgroundColor: primitives.slate[100],
    borderColor: primitives.slate[200],
  },
  orderIdBadgeDark: {
    backgroundColor: primitives.slate[800],
    borderColor: primitives.slate[700],
  },
  orderIdTextLight: {
    color: primitives.slate[800],
  },
  orderIdTextDark: {
    color: primitives.slate[200],
  },
  qtyBadge: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxxs,
    borderRadius: layout.radii.full,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBadgeLight: {
    backgroundColor: primitives.slate[100],
  },
  qtyBadgeDark: {
    backgroundColor: primitives.slate[800],
  },
  qtyTextLight: {
    color: primitives.slate[700],
  },
  qtyTextDark: {
    color: primitives.slate[300],
  },
  priceTextLight: {
    color: primitives.slate[900],
  },
  priceTextDark: {
    color: primitives.slate[50],
  },
});

