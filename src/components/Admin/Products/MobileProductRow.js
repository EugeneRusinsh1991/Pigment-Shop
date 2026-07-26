import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Text';
import { useTheme } from '../../../context/ThemeContext';
import { getRowStyle, NewBadge, StatusBadge, ProductRowActions } from './ProductRowComponents';
import styles from './ProductsStyles';

function CardMetaBlock({ label, children }) {
  return (
    <View style={styles.cardMetaBlock}>
      <Text style={styles.cardMetaLabel}>{label}</Text>
      {children}
    </View>
  );
}

function getLabel(t, key, fallback) {
  return t(key) || fallback;
}

function MobileMetaGrid({ product, t }) {
  const brand = product.brand;
  const discount = product.discountPercent;
  const isDiscounted = discount > 0;

  return (
    <View style={styles.cardMetaGrid}>
      {!!brand && (
        <CardMetaBlock label={getLabel(t, 'adminProductsColBrand', 'Brand')}>
          <Text style={styles.cardMetaValue}>{brand}</Text>
        </CardMetaBlock>
      )}
      <CardMetaBlock label={getLabel(t, 'adminProductsColDiscount', 'Discount')}>
        <Text style={isDiscounted ? styles.discountText : styles.discountNone} size={isDiscounted ? 13 : undefined}>
          {isDiscounted ? `-${discount}%` : '—'}
        </Text>
      </CardMetaBlock>
      <CardMetaBlock label={getLabel(t, 'adminProductsColStock', 'Stock')}>
        <Text style={styles.cardMetaValue}>{product.stock ?? '—'}</Text>
      </CardMetaBlock>
      <CardMetaBlock label={getLabel(t, 'adminProductsColStatus', 'Status')}>
        <StatusBadge active={product.active} />
      </CardMetaBlock>
    </View>
  );
}

export function MobileProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit, onDelete }) {
  const { t } = useTheme();
  return (
    <TouchableOpacity
      style={[getRowStyle(index, true), highlightStyle]}
      onPress={() => onEdit(product)}
      activeOpacity={0.85}
    >
      {/* Top: name + badge + price + action */}
      <View style={styles.cardTopRow}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Text style={styles.productName} numberOfLines={2}>{label}</Text>
            {product.isNew ? <NewBadge /> : null}
          </View>
          {product.sku ? <Text style={styles.productSku}>{product.sku}</Text> : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={styles.priceText}>${effectivePrice.toLocaleString()}</Text>
          <ProductRowActions product={product} onEdit={onEdit} onDelete={onDelete} />
        </View>
      </View>

      <MobileMetaGrid product={product} t={t} />
    </TouchableOpacity>
  );
}
