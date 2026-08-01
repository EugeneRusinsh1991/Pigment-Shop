import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { colors, layout, motion } from '../../../theme/tokens';
import { getRowStyle, NewBadge, ProductRowActions, StatusBadge } from './ProductRowComponents';
import styles from './ProductsStyles';

function getLabel(t, key, fallback) {
  return t(key) || fallback;
}

export function MobileProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit, onDelete }) {
  const { t } = useLanguage();
  return (
    <TouchableOpacity
      style={[getRowStyle(index, true), highlightStyle]}
      onPress={() => onEdit(product)}
      activeOpacity={motion.press.activeOpacity}
    >
      {/* Row 1: SKU + Badges */}
      <View style={styles.rowTop}>
        <Text variant="code" style={[styles.tdText, styles.rowDate]}>
          {product.sku ? `SKU: ${product.sku}` : ''}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: layout.spacing.xs }}>
          {product.isNew ? <NewBadge /> : null}
          <StatusBadge active={product.active} />
        </View>
      </View>

      {/* Row 2: Product Name + Price */}
      <View style={styles.rowMiddleCompact}>
        <Text variant="subtitle2" style={[styles.tdText, styles.productName]} numberOfLines={1}>
          {label}
        </Text>
        <Text variant="subtitle2" weight="bold" style={styles.priceValue}>
          ${effectivePrice.toLocaleString()}
        </Text>
      </View>

      {/* Row 3: Meta details (Brand, Stock, Discount) + Actions */}
      <View style={styles.productMetaRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: layout.spacing.md, flex: 1 }}>
          <Text variant="caption" style={styles.metaLabelInline}>
            {getLabel(t, 'adminProductsColBrand', 'Brand')}: <Text variant="caption" style={styles.cardMetaValue}>{product.brand || '—'}</Text>
          </Text>
          <Text variant="caption" style={styles.metaLabelInline}>
            {getLabel(t, 'adminProductsColStock', 'Stock')}: <Text variant="caption" style={styles.cardMetaValue}>{product.stock != null ? String(product.stock) : '—'}</Text>
          </Text>
          {product.discountPercent ? (
            <Badge variant="sale" label={`-${product.discountPercent}%`} size="xs" />
          ) : null}
        </View>
        <ProductRowActions product={product} onEdit={onEdit} onDelete={onDelete} />
      </View>
    </TouchableOpacity>
  );
}
