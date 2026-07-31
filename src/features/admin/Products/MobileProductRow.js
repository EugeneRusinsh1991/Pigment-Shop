import { Text } from '@/components/ui/Text';
import { TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { motion, typography } from '../../../theme/tokens';
import { getRowStyle, NewBadge, ProductRowActions, StatusBadge } from './ProductRowComponents';
import styles from './ProductsStyles';

function CardMetaBlock({ label, children }) {
  return (
    <View style={styles.cardMetaBlock}>
      <Text variant="overline" color="desc" style={styles.cardMetaLabel}>{label}</Text>
      {children}
    </View>
  );
}

function getLabel(t, key, fallback) {
  return t(key) || fallback;
}

function ProductCardMeta({ product, t }) {
  return (
    <View style={styles.cardMetaGrid}>
      <CardMetaBlock label={getLabel(t, 'adminProductsColBrand', 'Brand')}>
        <Text variant="body2" style={styles.cardMetaValue}>{product.brand || '—'}</Text>
      </CardMetaBlock>
      <CardMetaBlock label={getLabel(t, 'adminProductsColDiscount', 'Discount')}>
        <Text variant="body2" style={styles.cardMetaValue}>
          {product.discountPercent ? `${product.discountPercent}%` : '—'}
        </Text>
      </CardMetaBlock>
      <CardMetaBlock label={getLabel(t, 'adminProductsColStock', 'Stock')}>
        <Text variant="body2" style={styles.cardMetaValue}>
          {product.stock != null ? String(product.stock) : '—'}
        </Text>
      </CardMetaBlock>
      <CardMetaBlock label={getLabel(t, 'adminProductsColStatus', 'Status')}>
        <StatusBadge active={product.active} />
      </CardMetaBlock>
    </View>
  );
}

export function MobileProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit, onDelete }) {
  const { t } = useLanguage();
  return (
    <TouchableOpacity
      style={[getRowStyle(index, true), highlightStyle]}
      onPress={() => onEdit(product)}
      activeOpacity={motion.press.activeOpacity}
    >
      {/* Top: name + badge + price + action */}
      <View style={styles.cardTopRow}>
        <View style={styles.mobileInfoCol}>
          <View style={styles.mobileNameRow}>
            <Text style={styles.productName} numberOfLines={2}>{label}</Text>
            {product.isNew ? <NewBadge /> : null}
          </View>
          {product.sku ? <Text style={styles.productSku}>{product.sku}</Text> : null}
        </View>
        <View style={styles.mobilePriceRow}>
          <Text style={styles.priceText}>${effectivePrice.toLocaleString()}</Text>
          <ProductRowActions product={product} onEdit={onEdit} onDelete={onDelete} />
        </View>
      </View>

      <MobileMetaGrid product={product} t={t} />
    </TouchableOpacity>
  );
}
