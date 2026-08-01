import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { DataTableCell, DataTableRow } from '@/components/domain/DataTable/DataTable';
import {
  DiscountCell,
  getPlaceholderVal,
  NewBadge,
  ProductRowActions,
  StatusBadge,
} from './ProductRowComponents';
import { layout, motion } from '../../../theme/tokens';
import styles from './ProductsStyles';

export { MobileProductRow } from './MobileProductRow';

export function TabletProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit, onDelete }) {
  return (
    <TouchableOpacity
      style={[styles.tableRowTablet, index % 2 === 1 && styles.tableRowAlt, highlightStyle]}
      onPress={() => onEdit(product)}
      activeOpacity={motion.press.activeOpacity}
    >
      <View style={styles.desktopTopRow}>
        <Text variant="caption" style={styles.desktopCell}>{index + 1}</Text>
        <View style={[styles.desktopCell, styles.desktopProductCell]}>
          <Text variant="subtitle2" style={styles.productName} numberOfLines={1}>{label}</Text>
        </View>
        <Text variant="caption" style={[styles.cellText, styles.desktopCell]} numberOfLines={1}>
          {getPlaceholderVal(product.brand)}
        </Text>
        <DiscountCell discountPercent={product.discountPercent} />
        <Text variant="caption" style={[styles.cellText, styles.desktopCell]}>{product.stock}</Text>
        <Text variant="subtitle2" style={[styles.cellText, styles.desktopCell]}>${effectivePrice.toLocaleString()}</Text>
      </View>
      <View style={styles.desktopBottomRow}>
        <View style={styles.desktopStatusCell}>
          <StatusBadge active={product.active} />
        </View>
        <ProductRowActions product={product} onEdit={onEdit} onDelete={onDelete} />
      </View>
    </TouchableOpacity>
  );
}

export function DesktopProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit, onDelete }) {
  return (
    <DataTableRow
      index={index}
      style={[
        styles.tableRowDesktop,
        { paddingVertical: layout.spacing.sm },
        highlightStyle
      ]}
      onPress={() => onEdit(product)}
    >
      <DataTableCell style={styles.colIndex}>
        <Text variant="caption" style={styles.cellText}>{index + 1}</Text>
      </DataTableCell>
      <DataTableCell style={[styles.colProduct, { paddingRight: layout.spacing.md }]}>
        <Text variant="subtitle2" style={styles.productName} numberOfLines={1}>{label}</Text>
      </DataTableCell>
      <DataTableCell style={styles.colBrand}>
        <Text variant="caption" style={styles.cellText} numberOfLines={1}>
          {getPlaceholderVal(product.brand)}
        </Text>
      </DataTableCell>
      <DataTableCell style={styles.colDiscount}>
        <DiscountCell discountPercent={product.discountPercent} />
      </DataTableCell>
      <DataTableCell style={styles.colNew}>
        {product.isNew && (
          <NewBadge />
        )}
      </DataTableCell>
      <DataTableCell style={styles.colStatus}>
        <StatusBadge active={product.active} />
      </DataTableCell>
      <DataTableCell style={styles.colStock}>
        <Text variant="caption" style={styles.cellText}>{product.stock}</Text>
      </DataTableCell>
      <DataTableCell style={styles.colPrice}>
        <Text variant="subtitle2" weight="bold" style={styles.priceEmphasis}>${effectivePrice.toLocaleString()}</Text>
      </DataTableCell>
      <DataTableCell style={styles.colActions}>
        <ProductRowActions product={product} onEdit={onEdit} onDelete={onDelete} />
      </DataTableCell>
    </DataTableRow>
  );
}
