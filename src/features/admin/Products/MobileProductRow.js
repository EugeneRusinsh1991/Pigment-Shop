import { Text } from '@/components/ui/Text';
import { TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from '../../../theme/tokens';
import { getRowStyle, StatusBadge } from './ProductRowComponents';
import styles from './ProductsStyles';

function getLabel(t, key, fallback) {
  return t(key) || fallback;
}

export function MobileProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit }) {
  const { t } = useLanguage();
  return (
    <TouchableOpacity
      style={[getRowStyle(index, true), highlightStyle]}
      onPress={() => onEdit(product)}
      activeOpacity={motion.press.activeOpacity}
    >
      {/* Line 1: Product Name + Status */}
      <View style={styles.rowTop}>
        <Text variant="subtitle2" style={[styles.tdText, styles.productName]} numberOfLines={1}>
          {label}
        </Text>
        <StatusBadge active={product.active} />
      </View>

      {/* Line 2: Stock Quantity + Price */}
      <View style={styles.rowMiddleCompact}>
        <Text variant="caption" style={styles.subText}>
          {getLabel(t, 'adminProductsColStock', 'Stock')}: {product.stock != null ? String(product.stock) : '—'}
        </Text>
        <Text variant="subtitle2" weight="bold" style={styles.priceValue}>
          ${effectivePrice.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
