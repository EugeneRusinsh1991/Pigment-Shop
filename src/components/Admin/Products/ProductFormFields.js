/**
 * ProductFormFields.js
 *
 * Exported composed field groups for the product create/edit form.
 * Used by ProductFormModal.
 */
import React from 'react';
import { View } from 'react-native';
import {
  CategorySelect,
  FieldCheckbox,
  FieldInput,
  FieldTextarea,
} from './ProductFormHelpers';
import styles from './ProductFormStyles';

/** Main row: name */
export function NameField({ form, onChange, errors }) {
  return (
    <FieldInput
      label="Название *"
      value={form.label}
      onChangeText={(v) => onChange('label', v)}
      placeholder="Название товара"
      error={errors.label}
    />
  );
}

/** Row: description */
export function DescriptionField({ form, onChange }) {
  return (
    <FieldTextarea
      label="Описание"
      value={form.description}
      onChangeText={(v) => onChange('description', v)}
      placeholder="Описание товара..."
    />
  );
}

/** Row: price + discount */
export function PriceDiscountRow({ form, onChange, errors }) {
  return (
    <View style={styles.fieldRow}>
      <FieldInput
        label="Цена (₴) *"
        value={form.price}
        onChangeText={(v) => onChange('price', v)}
        placeholder="0"
        keyboardType="numeric"
        error={errors.price}
      />
      <FieldInput
        label="Скидка %"
        value={form.discountPercent}
        onChangeText={(v) => onChange('discountPercent', v)}
        placeholder="0"
        keyboardType="numeric"
      />
    </View>
  );
}

/** Row: brand + SKU */
export function BrandSkuRow({ form, onChange }) {
  return (
    <View style={styles.fieldRow}>
      <FieldInput
        label="Бренд"
        value={form.brand}
        onChangeText={(v) => onChange('brand', v)}
        placeholder="Бренд"
      />
      <FieldInput
        label="Артикул (SKU)"
        value={form.sku}
        onChangeText={(v) => onChange('sku', v)}
        placeholder="SKU-001"
      />
    </View>
  );
}

/** Row: category + stock */
export function CategoryStockRow({ form, onChange }) {
  return (
    <View style={styles.fieldRow}>
      <CategorySelect value={form.category} onChange={(v) => onChange('category', v)} />
      <FieldInput
        label="Остаток"
        value={form.stock}
        onChangeText={(v) => onChange('stock', v)}
        placeholder="0"
        keyboardType="numeric"
      />
    </View>
  );
}

/** Image URL field */
export function ImageField({ form, onChange }) {
  return (
    <FieldInput
      label="URL изображения"
      value={form.image}
      onChangeText={(v) => onChange('image', v)}
      placeholder="https://..."
    />
  );
}

/** Checkboxes: isNew, active */
export function FlagsSection({ form, onChange }) {
  return (
    <>
      <FieldCheckbox
        label="Новинка (значок NEW)"
        value={!!form.isNew}
        onChange={(v) => onChange('isNew', v)}
      />
      <FieldCheckbox
        label="Товар активен (виден в каталоге)"
        value={!!form.active}
        onChange={(v) => onChange('active', v)}
      />
    </>
  );
}
