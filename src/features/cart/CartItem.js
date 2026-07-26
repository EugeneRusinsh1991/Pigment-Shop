import React from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { Text } from '../../components/Text';
import { useTheme } from '../../context/ThemeContext';
import { CrossIcon } from '@/components/Icons';
import { IconButton } from '../../components/Button';
import { getLocalizedValue } from '../../utils/localization';

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
            icon={<CrossIcon color={isDark ? '#64748b' : '#94a3b8'} size={14} />}
            onPress={onRemove}
            size={24}
            variant="transparent"
            style={{ marginTop: -4, marginRight: -4 }}
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
              icon={<Text style={[styles.qtyBtnTxt, ic(styles.qtyBtnTxtDark, styles.qtyBtnTxtLight)]}>−</Text>}
              onPress={onDecrease}
              size={28}
              variant="outline"
            />

            <Text variant="body" weight="bold" style={styles.qty}>{item.qty}</Text>

            <IconButton
              icon={<Text style={[styles.qtyBtnTxt, ic(styles.qtyBtnTxtDark, styles.qtyBtnTxtLight)]}>+</Text>}
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
    marginHorizontal: 0,
    marginVertical: 6,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
    }),
    elevation: 2,
  },
  cardDark: { backgroundColor: '#121212', borderColor: '#242424' },
  cardLight: { backgroundColor: '#ffffff', borderColor: '#e2e8f0' },

  imageWrap: {
    width: 96,
    height: 96,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageWrapDark: { backgroundColor: '#1E1E1E' },
  imageWrapLight: { backgroundColor: '#e8edf5' },
  img: {
    width: '100%',
    height: '100%',
  },

  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: { flex: 1, marginRight: 8 },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  qtyBtnDark: { backgroundColor: '#0f172a', borderColor: '#334155' },
  qtyBtnLight: { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0' },
  qtyBtnTxt: { fontSize: 16, lineHeight: 20, fontWeight: '500' },
  qtyBtnTxtDark: { color: '#f1f5f9' },
  qtyBtnTxtLight: { color: '#0f172a' },
  qty: { marginHorizontal: 8, minWidth: 20, textAlign: 'center' },
});
