/**
 * ProductsTable.js
 *
 * Scrollable table showing all products with edit/delete actions.
 */
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './ProductsStyles';

function TableHeader({ sortField, sortDirection, onSort }) {
  const { t } = useTheme();

  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return (
      <Text style={styles.sortArrow}>
        {sortDirection === 'asc' ? ' ▲' : ' ▼'}
      </Text>
    );
  };

  const HeaderCell = ({ field, labelKey, style, extraStyle }) => {
    return (
      <TouchableOpacity
        style={[styles.colHeader, style, extraStyle]}
        onPress={() => onSort(field)}
        activeOpacity={0.7}
      >
        <Text style={styles.thText}>{t(labelKey)}</Text>
        {renderSortIndicator(field)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tableHeader}>
      <Text style={[styles.thText, { width: 32 }]}>#</Text>
      <HeaderCell field="label" labelKey="adminProductsColProduct" style={styles.colProduct} />
      <HeaderCell field="brand" labelKey="adminProductsColBrand" style={styles.colBrand} />
      <HeaderCell field="price" labelKey="adminProductsColPrice" style={styles.colPrice} />
      <HeaderCell field="discountPercent" labelKey="adminProductsColDiscount" style={styles.colDiscount} />
      <HeaderCell field="stock" labelKey="adminProductsColStock" style={styles.colStock} />
      <HeaderCell field="active" labelKey="adminProductsColStatus" style={styles.colStatus} />
      <Text style={[styles.thText, styles.colActions]}>{t('adminProductsColActions')}</Text>
    </View>
  );
}

function ProductBadges({ isNew }) {
  const { t } = useTheme();
  if (!isNew) return null;
  return (
    <View style={styles.badgesRow}>
      <View style={styles.badgeNew}>
        <Text style={styles.badgeNewText}>{t('badgeNew')}</Text>
      </View>
    </View>
  );
}

function StatusBadge({ active }) {
  const { t } = useTheme();
  const themedStyle = active ? styles.statusActive : styles.statusInactive;
  const themedTextStyle = active ? styles.statusActiveText : styles.statusInactiveText;
  return (
    <View style={[styles.statusBadge, themedStyle]}>
      <Text style={[styles.statusText, themedTextStyle]}>
        {active ? t('adminProductsActive') : t('adminProductsInactive')}
      </Text>
    </View>
  );
}

function RowActions({ onEdit, onDelete }) {
  return (
    <View style={styles.rowActions}>
      <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={onEdit} activeOpacity={0.85}>
        <Text style={styles.actionBtnText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={onDelete} activeOpacity={0.85}>
        <Text style={styles.actionBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

function resolveLocalizedValue(val, lang) {
  if (!val) return '';
  if (typeof val !== 'object') return val;
  const match = [lang, 'en', 'ru'].find((l) => val[l]);
  return match ? val[match] : '';
}

const getEffectivePrice = (price, discountPercent) => {
  if (discountPercent) {
    return Math.round(price * (1 - discountPercent / 100));
  }
  return price;
};

const getRowStyle = (index, isMobile) => {
  if (isMobile) {
    return [styles.tableRow, index % 2 === 1 && styles.tableRowAlt];
  }
  return [styles.tableRowDesktop, index % 2 === 1 && styles.tableRowAlt];
};

const getPlaceholderVal = (val) => {
  return val || '—';
};

function DiscountCell({ discountPercent }) {
  if (discountPercent > 0) {
    return <Text style={[styles.discountText, styles.colDiscount]}>-{discountPercent}%</Text>;
  }
  return <Text style={[styles.discountNone, styles.colDiscount]}>—</Text>;
}

function ProductRow({ product, index, isMobile, onEdit, onDelete }) {
  const { lang } = useTheme();
  const label = resolveLocalizedValue(product.label, lang);
  const effectivePrice = getEffectivePrice(product.price, product.discountPercent);

  return isMobile ? (
    <View style={getRowStyle(index, true)}>
      <View style={styles.cardTopRow}>
        <Text style={styles.productName}>{label}</Text>
        <Text style={styles.priceText}>${effectivePrice.toLocaleString()}</Text>
      </View>
      <View style={styles.cardMiddleRow}>
        <Text style={styles.metaText}>{getPlaceholderVal(product.brand)}</Text>
        <DiscountCell discountPercent={product.discountPercent} />
        <Text style={styles.metaText}>{product.stock}</Text>
        <View style={styles.colStatus}>
          <StatusBadge active={product.active} />
        </View>
      </View>
      <View style={styles.cardBottomRow}> 
        <RowActions onEdit={() => onEdit(product)} onDelete={() => onDelete(product.id)} />
      </View>
    </View>
  ) : (
    <View style={getRowStyle(index, false)}>
      <View style={styles.desktopTopRow}>
        <Text style={styles.desktopCell}>{index + 1}</Text>
        <View style={[styles.desktopCell, styles.desktopProductCell]}>
          <Text style={styles.productName} numberOfLines={1}>{label}</Text>
        </View>
        <Text style={[styles.cellText, styles.desktopCell]} numberOfLines={1}>
          {getPlaceholderVal(product.brand)}
        </Text>
        <Text style={[styles.cellText, styles.desktopCell]}>${effectivePrice.toLocaleString()}</Text>
        <DiscountCell discountPercent={product.discountPercent} />
        <Text style={[styles.cellText, styles.desktopCell]}>{product.stock}</Text>
      </View>
      <View style={styles.desktopBottomRow}>
        <View style={styles.desktopStatusCell}>
          <StatusBadge active={product.active} />
        </View>
        <RowActions onEdit={() => onEdit(product)} onDelete={() => onDelete(product.id)} />
      </View>
    </View>
  );
}

export default function ProductsTable({ products, sortField, sortDirection, onSort, onEdit, onDelete }) {
  const { t } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (products.length === 0) {
    return (
      <View style={styles.tableCard}>
        <Text style={styles.emptyText}>{t('adminProductsEmpty')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.tableCard}>
      {!isMobile && <TableHeader sortField={sortField} sortDirection={sortDirection} onSort={onSort} />}
      {products.map((p, idx) => (
        <ProductRow
          key={p.id}
          product={p}
          index={idx}
          isMobile={isMobile}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
}
