import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { DataTableCell, DataTableRow } from '../../DataTable/DataTable';
import {
  DiscountCell,
  getPlaceholderVal,
  getRowStyle,
  NewBadge,
  StatusBadge,
} from './ProductRowComponents';
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
        <Text style={isDiscounted ? [styles.discountText, { fontSize: 13 }] : styles.discountNone}>
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

export function MobileProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit }) {
  const { t } = useTheme();
  return (
    <TouchableOpacity
      style={[getRowStyle(index, true), highlightStyle]}
      onPress={() => onEdit(product)}
      activeOpacity={0.85}
    >
      {/* Top: name + badge + price */}
      <View style={styles.cardTopRow}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Text style={styles.productName} numberOfLines={2}>{label}</Text>
            {product.isNew ? <NewBadge /> : null}
          </View>
          {product.sku ? <Text style={styles.productSku}>{product.sku}</Text> : null}
        </View>
        <Text style={styles.priceText}>${effectivePrice.toLocaleString()}</Text>
      </View>

      <MobileMetaGrid product={product} t={t} />
    </TouchableOpacity>
  );
}

export function TabletProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit }) {
  return (
    <TouchableOpacity
      style={[getRowStyle(index, false), highlightStyle]}
      onPress={() => onEdit(product)}
      activeOpacity={0.85}
    >
      <View style={styles.desktopTopRow}>
        <Text style={styles.desktopCell}>{index + 1}</Text>
        <View style={[styles.desktopCell, styles.desktopProductCell]}>
          <Text style={styles.productName} numberOfLines={1}>{label}</Text>
        </View>
        <Text style={[styles.cellText, styles.desktopCell]} numberOfLines={1}>
          {getPlaceholderVal(product.brand)}
        </Text>
        <DiscountCell discountPercent={product.discountPercent} />
        <Text style={[styles.cellText, styles.desktopCell]}>{product.stock}</Text>
        <Text style={[styles.cellText, styles.desktopCell]}>${effectivePrice.toLocaleString()}</Text>
      </View>
      <View style={styles.desktopBottomRow}>
        <View style={styles.desktopStatusCell}>
          <StatusBadge active={product.active} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function DesktopProductRow({ product, index, label, effectivePrice, highlightStyle, onEdit }) {
  return (
    <DataTableRow
      index={index}
      style={[
        styles.tableRowDesktop,
        { paddingVertical: 8 },
        highlightStyle
      ]}
      onPress={() => onEdit(product)}
    >
      <DataTableCell style={{ width: 32 }}>
        <Text style={[styles.cellText, { fontSize: 13 }]}>{index + 1}</Text>
      </DataTableCell>
      <DataTableCell style={[styles.colProduct, { paddingRight: 12 }]}>
        <Text style={styles.productName} numberOfLines={1}>{label}</Text>
      </DataTableCell>
      <DataTableCell style={styles.colBrand}>
        <Text style={styles.cellText} numberOfLines={1}>
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
        <Text style={styles.cellText}>{product.stock}</Text>
      </DataTableCell>
      <DataTableCell style={styles.colPrice}>
        <Text style={styles.priceEmphasis}>${effectivePrice.toLocaleString()}</Text>
      </DataTableCell>
    </DataTableRow>
  );
}
