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
        <Text style={[styles.tdText, styles.rowDate]} size={12}>
          {product.sku ? `SKU: ${product.sku}` : ''}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: layout.spacing.xs }}>
          {product.isNew ? <NewBadge /> : null}
          <StatusBadge active={product.active} />
        </View>
      </View>

      {/* Row 2: Product Name + Price */}
      <View style={styles.rowMiddleCompact}>
        <Text style={[styles.tdText, styles.productName]} size={14} weight="bold" numberOfLines={1}>
          {label}
        </Text>
        <Text style={styles.priceValue} size={15} weight="700">
          ${effectivePrice.toLocaleString()}
        </Text>
      </View>

      {/* Row 3: Meta details (Brand, Stock, Discount) + Actions */}
      <View style={styles.productMetaRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: layout.spacing.md, flex: 1 }}>
          <Text size={12} style={styles.metaLabelInline}>
            {getLabel(t, 'adminProductsColBrand', 'Brand')}: <Text size={12} weight="600" style={styles.cardMetaValue}>{product.brand || '—'}</Text>
          </Text>
          <Text size={12} style={styles.metaLabelInline}>
            {getLabel(t, 'adminProductsColStock', 'Stock')}: <Text size={12} weight="600" style={styles.cardMetaValue}>{product.stock != null ? String(product.stock) : '—'}</Text>
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
