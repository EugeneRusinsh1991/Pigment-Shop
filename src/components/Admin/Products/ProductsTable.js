/**
 * ProductsTable.js
 *
 * Scrollable table showing all products with edit/delete actions.
 */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './ProductsStyles';
import { EditIcon, TrashIcon } from '../../Icons';
import { useTheme } from '../../../context/ThemeContext';

function TableHeader() {
  const { t } = useTheme();
  return (
    <View style={styles.tableHeader}>
      <Text style={[styles.thText, { width: 32 }]}>#</Text>
      <Text style={[styles.thText, styles.colProduct]}>{t('adminProductsColProduct')}</Text>
      <Text style={[styles.thText, styles.colCategory]}>{t('adminProductsColCategory')}</Text>
      <Text style={[styles.thText, styles.colBrand]}>{t('adminProductsColBrand')}</Text>
      <Text style={[styles.thText, styles.colPrice]}>{t('adminProductsColPrice')}</Text>
      <Text style={[styles.thText, styles.colDiscount]}>{t('adminProductsColDiscount')}</Text>
      <Text style={[styles.thText, styles.colStock]}>{t('adminProductsColStock')}</Text>
      <Text style={[styles.thText, styles.colStatus]}>{t('adminProductsColStatus')}</Text>
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
    <View style={styles.colActions}>
      <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
        <EditIcon color="#475569" size={14} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
        <TrashIcon color="#EF4444" size={14} />
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

const getRowStyle = (index) => {
  return [styles.tableRow, index % 2 === 1 && styles.tableRowAlt];
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

function ProductRow({ product, index, onEdit, onDelete }) {
  const { lang } = useTheme();
  const label = resolveLocalizedValue(product.label, lang);
  const category = resolveLocalizedValue(product.category, lang);
  const effectivePrice = getEffectivePrice(product.price, product.discountPercent);

  return (
    <View style={getRowStyle(index)}>
      <Text style={styles.rowNum}>{index + 1}</Text>
      <View style={styles.colProduct}>
        <Text style={styles.productName} numberOfLines={1}>{label}</Text>
        <Text style={styles.productSku}>{product.sku}</Text>
        <ProductBadges isNew={product.isNew} />
      </View>
      <Text style={[styles.cellText, styles.colCategory]} numberOfLines={1}>
        {getPlaceholderVal(category)}
      </Text>
      <Text style={[styles.cellText, styles.colBrand]} numberOfLines={1}>
        {getPlaceholderVal(product.brand)}
      </Text>
      <Text style={[styles.cellText, styles.colPrice]}>
        ${effectivePrice.toLocaleString()}
      </Text>
      <DiscountCell discountPercent={product.discountPercent} />
      <Text style={[styles.cellText, styles.colStock]}>{product.stock}</Text>
      <View style={styles.colStatus}>
        <StatusBadge active={product.active} />
      </View>
      <RowActions onEdit={() => onEdit(product)} onDelete={() => onDelete(product.id)} />
    </View>
  );
}

export default function ProductsTable({ products, onEdit, onDelete }) {
  const { t } = useTheme();
  if (products.length === 0) {
    return (
      <View style={styles.tableCard}>
        <Text style={styles.emptyText}>{t('adminProductsEmpty')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.tableCard}>
      <TableHeader />
      {products.map((p, idx) => (
        <ProductRow
          key={p.id}
          product={p}
          index={idx}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
}
