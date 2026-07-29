import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import DataTable from '@/components/domain/DataTable/DataTable';
import ProductRow from './ProductRow';
import {
  resolveLocalizedValue,
  getEffectivePrice,
  getHighlightStyle,
} from './ProductRowComponents';
import { MobileProductRow } from './ProductRowVariants';
import styles from './ProductsStyles';

export default function ProductsTable({ products, sortField, sortDirection, onSort, onEdit }) {
  const { t, lang } = useTheme();

  const columns = [
    { key: null, label: '#', style: { width: 32 }, sortable: false },
    { key: 'label', label: t('adminProductsColProduct'), style: styles.colProduct, sortable: true },
    { key: 'brand', label: t('adminProductsColBrand'), style: styles.colBrand, sortable: true },
    { key: 'discountPercent', label: t('adminProductsColDiscount'), style: styles.colDiscount, sortable: true },
    { key: 'isNew', label: t('adminProductsColNew'), style: styles.colNew, sortable: true },
    { key: 'active', label: t('adminProductsColStatus'), style: styles.colStatus, sortable: true },
    { key: 'stock', label: t('adminProductsColStock'), style: styles.colStock, sortable: true },
    { key: 'price', label: t('adminProductsColPrice'), style: styles.colPrice, sortable: true },
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={onSort}
      emptyText={t('adminProductsEmpty')}
      renderRow={(p, idx) => (
        <ProductRow
          key={p.id}
          product={p}
          index={idx}
          onEdit={() => onEdit(p)}
        />
      )}
      renderMobileRow={(p, idx) => {
        const label = resolveLocalizedValue(p.label, lang);
        const effectivePrice = getEffectivePrice(p.price, p.discountPercent);
        const highlightStyle = getHighlightStyle(p.isNew, p.discountPercent);
        return (
          <MobileProductRow
            key={p.id}
            product={p}
            index={idx}
            label={label}
            effectivePrice={effectivePrice}
            highlightStyle={highlightStyle}
            onEdit={() => onEdit(p)}
          />
        );
      }}
      keyExtractor={(p) => p.id}
    />
  );
}
