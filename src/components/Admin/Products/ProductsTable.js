/**
 * ProductsTable.js
 *
 * Scrollable table showing all products with edit/delete actions.
 */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './ProductsStyles';

function TableHeader() {
  return (
    <View style={styles.tableHeader}>
      <Text style={[styles.thText, { width: 32 }]}>#</Text>
      <Text style={[styles.thText, styles.colProduct]}>Товар</Text>
      <Text style={[styles.thText, styles.colCategory]}>Категория</Text>
      <Text style={[styles.thText, styles.colBrand]}>Бренд</Text>
      <Text style={[styles.thText, styles.colPrice]}>Цена</Text>
      <Text style={[styles.thText, styles.colDiscount]}>Скидка</Text>
      <Text style={[styles.thText, styles.colStock]}>Остаток</Text>
      <Text style={[styles.thText, styles.colStatus]}>Статус</Text>
      <Text style={[styles.thText, styles.colActions]}>Действия</Text>
    </View>
  );
}

function ProductBadges({ isNew }) {
  if (!isNew) return null;
  return (
    <View style={styles.badgesRow}>
      <View style={styles.badgeNew}>
        <Text style={styles.badgeNewText}>NEW</Text>
      </View>
    </View>
  );
}

function StatusBadge({ active }) {
  return (
    <View style={[styles.statusBadge, active ? styles.statusActive : styles.statusInactive]}>
      <Text style={[styles.statusText, active ? styles.statusActiveText : styles.statusInactiveText]}>
        {active ? 'Активен' : 'Скрыт'}
      </Text>
    </View>
  );
}

function RowActions({ onEdit, onDelete }) {
  return (
    <View style={styles.colActions}>
      <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
        <Text style={styles.actionIcon}>✏️</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
        <Text style={styles.actionIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProductRow({ product, index, onEdit, onDelete }) {
  const effectivePrice = product.discountPercent
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : product.price;

  return (
    <View style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}>
      <Text style={styles.rowNum}>{index + 1}</Text>
      <View style={styles.colProduct}>
        <Text style={styles.productName} numberOfLines={1}>{product.label}</Text>
        <Text style={styles.productSku}>{product.sku}</Text>
        <ProductBadges isNew={product.isNew} />
      </View>
      <Text style={[styles.cellText, styles.colCategory]} numberOfLines={1}>
        {product.category || '—'}
      </Text>
      <Text style={[styles.cellText, styles.colBrand]} numberOfLines={1}>
        {product.brand || '—'}
      </Text>
      <Text style={[styles.cellText, styles.colPrice]}>
        ${effectivePrice.toLocaleString()}
      </Text>
      {product.discountPercent > 0 ? (
        <Text style={[styles.discountText, styles.colDiscount]}>-{product.discountPercent}%</Text>
      ) : (
        <Text style={[styles.discountNone, styles.colDiscount]}>—</Text>
      )}
      <Text style={[styles.cellText, styles.colStock]}>{product.stock}</Text>
      <View style={styles.colStatus}>
        <StatusBadge active={product.active} />
      </View>
      <RowActions onEdit={() => onEdit(product)} onDelete={() => onDelete(product.id)} />
    </View>
  );
}

export default function ProductsTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <View style={styles.tableCard}>
        <Text style={styles.emptyText}>Нет товаров. Добавьте первый товар.</Text>
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
