import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { DataTableCell, DataTableRow } from '@/components/domain/DataTable/DataTable';
import {
  DiscountCell,
  NewBadge,
} from './ProductRowComponents';
import { layout, motion } from '../../../theme/tokens';
import styles from './ProductsStyles';

export { MobileProductRow } from './MobileProductRow';

export function TabletProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit }) {
  return (
    <DataTableRow
      index={index}
      style={[
        styles.tableRowDesktop,
        { paddingVertical: layout.spacing.xs },
        highlightStyle,
      ]}
      onPress={() => onEdit(product)}
    >
      <DataTableCell style={styles.colIndex}>
        <Text variant="caption" style={styles.cellText}>{index + 1}</Text>
      </DataTableCell>
      <DataTableCell style={[styles.colProduct, { paddingRight: layout.spacing.sm }]}>
        <Text variant="subtitle2" style={styles.productName} numberOfLines={1} ellipsizeMode="tail">{label}</Text>
      </DataTableCell>
      <DataTableCell style={styles.colDiscount}>
        <DiscountCell discountPercent={product.discountPercent} />
      </DataTableCell>
      <DataTableCell style={styles.colNew}>
        {product.isNew && (
          <NewBadge />
        )}
      </DataTableCell>
      <DataTableCell style={styles.colStock}>
        <Text variant="caption" style={styles.cellText}>{product.stock}</Text>
      </DataTableCell>
      <DataTableCell style={styles.colPrice}>
        <Text variant="subtitle2" weight="bold" style={styles.priceEmphasis}>${effectivePrice.toLocaleString()}</Text>
      </DataTableCell>
    </DataTableRow>
  );
}

export function DesktopProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit }) {
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
      <DataTableCell style={styles.colDiscount}>
        <DiscountCell discountPercent={product.discountPercent} />
      </DataTableCell>
      <DataTableCell style={styles.colNew}>
        {product.isNew && (
          <NewBadge />
        )}
      </DataTableCell>
      <DataTableCell style={styles.colStock}>
        <Text variant="caption" style={styles.cellText}>{product.stock}</Text>
      </DataTableCell>
      <DataTableCell style={styles.colPrice}>
        <Text variant="subtitle2" weight="bold" style={styles.priceEmphasis}>${effectivePrice.toLocaleString()}</Text>
      </DataTableCell>
    </DataTableRow>
  );
}
