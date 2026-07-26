import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '../../components/Text';
import { useTheme } from '../../context/ThemeContext';
import { CrossIcon } from '@/components/Icons';
import { IconButton } from '../../components/Button';
import { getLocalizedValue } from '../../utils/localization';
import { colors, layout } from '../../theme/tokens';
import { shadow } from '../../theme/shadows';

export default function CartItem({ item, isDark, onIncrease, onDecrease, onRemove }) {
  const { lang } = useTheme();
  const priceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
  const subtotal = `$${(priceNum * item.qty).toFixed(2)}`;
  const ic = (dark, light) => (isDark ? dark : light);

  return (
    <View style={[styles.card, ic(styles.cardDark, styles.cardLight)]}>
      {/* Product Image */}
      <View style={[styles.imageWrap, ic(styles.imageWrapDark, styles.imageWrapLight)]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop' }}
          style={styles.img}
          resizeMode="cover"
        />
      </View>

      {/* Product Info & Controls */}
      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text variant="body" weight="bold" style={styles.label} numberOfLines={2}>
            {getLocalizedValue(item.label, lang, item.label)}
          </Text>
          <IconButton
            icon={<CrossIcon color={isDark ? colors.slateText : colors.secondaryDarkText} size={14} />}
            onPress={onRemove}
            size={24}
            variant="transparent"
            style={styles.removeBtn}
          />
        </View>

        <View style={styles.priceRow}>
          <Text variant="caption" color="muted">
            {item.price}
          </Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.qtyRow}>
            <IconButton
              icon={<Text variant="body" weight="medium" style={[styles.qtyBtnTxt, ic(styles.qtyBtnTxtDark, styles.qtyBtnTxtLight)]}>−</Text>}
              onPress={onDecrease}
              size={28}
              variant="outline"
            />

            <Text variant="body" weight="bold" style={styles.qty}>{item.qty}</Text>

            <IconButton
              icon={<Text variant="body" weight="medium" style={[styles.qtyBtnTxt, ic(styles.qtyBtnTxtDark, styles.qtyBtnTxtLight)]}>+</Text>}
              onPress={onIncrease}
              size={28}
              variant="outline"
            />
          </View>

          <Text variant="body" weight="heavy" color={isDark ? 'info' : 'primary'}>
            {subtotal}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: layout.spacing.none,
    marginVertical: layout.spacing.xs,
    borderRadius: layout.radii.md,
    padding: layout.spacing.md,
    borderWidth: 1,
    ...shadow.dropdown(),
    elevation: layout.elevation.sm,
  },
  cardDark: { backgroundColor: colors.surfaceNeutralDark, borderColor: colors.borderDarkAlt },
  cardLight: { backgroundColor: colors.surfaceLight, borderColor: colors.secondaryLightBorder },

  imageWrap: {
    width: 96,
    height: 96,
    borderRadius: layout.spacing.md,
    overflow: 'hidden',
  },
  imageWrapDark: { backgroundColor: colors.productCardDark },
  imageWrapLight: { backgroundColor: colors.navItemHoverDark },
  img: {
    width: '100%',
    height: '100%',
  },

  details: {
    flex: 1,
    marginLeft: layout.spacing.md,
    justifyContent: 'space-between',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: { flex: 1, marginRight: layout.spacing.sm },
  removeBtn: { marginTop: -layout.spacing.xxs, marginRight: -layout.spacing.xxs },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 28, height: 28, borderRadius: layout.radii.sm, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  qtyBtnDark: { backgroundColor: colors.textStrongDark, borderColor: colors.secondaryDarkBorder },
  qtyBtnLight: { backgroundColor: colors.slateMid, borderColor: colors.secondaryLightBorder },
  qtyBtnTxt: {},
  qtyBtnTxtDark: { color: colors.slateMid },
  qtyBtnTxtLight: { color: colors.textStrongDark },
  qty: { marginHorizontal: layout.spacing.sm, minWidth: 20, textAlign: 'center' },
});
