import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './ProductFormStyles';
import { CheckIcon } from '../../Icons';
import { useTheme } from '../../../context/ThemeContext';
import CategorySelect from './CategorySelect';

import { FieldInput as SharedFieldInput, FieldTextarea as SharedFieldTextarea } from '../SharedFormComponents';

/* ─── shared primitives wrappers ────────────────────────────── */

const FieldInput = (props) => <SharedFieldInput {...props} styles={styles} />;
const FieldTextarea = (props) => <SharedFieldTextarea {...props} styles={styles} numberOfLines={3} />;

function FieldCheckbox({ label, value, onChange }) {
  return (
    <TouchableOpacity style={styles.checkRow} onPress={() => onChange(!value)} activeOpacity={0.7}>
      <View style={[styles.checkBox, value && styles.checkBoxActive, { justifyContent: 'center', alignItems: 'center' }]}>
        {value && <CheckIcon color="#FFFFFF" size={10} />}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
}


export const NameField = ({ form, onChange, errors, activeLang }) => {
  const { t } = useTheme();
  const labelKey = `label_${activeLang}`;
  return (
    <FieldInput
      label={`${t('adminProductsFormName')} (${activeLang === 'uk' ? 'UA' : activeLang.toUpperCase()}) *`}
      value={form[labelKey]}
      onChangeText={(v) => onChange(labelKey, v)}
      placeholder={t('adminProductsFormNamePlaceholder')}
      error={errors.label}
    />
  );
};

export const DescriptionField = ({ form, onChange, activeLang }) => {
  const { t } = useTheme();
  const descKey = `description_${activeLang}`;
  return (
    <FieldTextarea
      label={`${t('adminProductsFormDesc')} (${activeLang === 'uk' ? 'UA' : activeLang.toUpperCase()})`}
      value={form[descKey]}
      onChangeText={(v) => onChange(descKey, v)}
      placeholder={t('adminProductsFormDescPlaceholder')}
    />
  );
};

export const PriceDiscountRow = ({ form, onChange, errors }) => {
  const { t } = useTheme();
  return (
    <View style={styles.fieldRow}>
      <FieldInput label={t('adminProductsFormPrice') + ' (₴) *'} value={form.price} onChangeText={(v) => onChange('price', v)} placeholder="0" keyboardType="numeric" error={errors.price} />
      <FieldInput label={t('adminProductsFormDiscount')} value={form.discountPercent} onChangeText={(v) => onChange('discountPercent', v)} placeholder="0" keyboardType="numeric" />
    </View>
  );
};

export const BrandSkuRow = ({ form, onChange }) => {
  const { t } = useTheme();
  return (
    <View style={styles.fieldRow}>
      <FieldInput label={t('adminProductsFormBrand')} value={form.brand} onChangeText={(v) => onChange('brand', v)} placeholder={t('adminProductsFormBrand')} />
      <FieldInput label={t('adminProductsFormSku')} value={form.sku} onChangeText={(v) => onChange('sku', v)} placeholder="SKU-001" />
    </View>
  );
};

export const CategoryStockRow = ({ form, onChange }) => {
  const { t } = useTheme();
  return (
    <View style={styles.fieldRow}>
      <CategorySelect value={form.category} onChange={(v) => onChange('category', v)} />
      <FieldInput label={t('adminProductsFormStock')} value={form.stock} onChangeText={(v) => onChange('stock', v)} placeholder="0" keyboardType="numeric" />
    </View>
  );
};

export const ImageField = ({ form, onChange }) => {
  const { t } = useTheme();
  return (
    <FieldInput label={t('adminProductsFormImage')} value={form.image} onChangeText={(v) => onChange('image', v)} placeholder="https://..." />
  );
};

export const FlagsSection = ({ form, onChange }) => {
  const { t } = useTheme();
  return (
    <>
      <FieldCheckbox label={t('adminProductsFormNew')} value={!!form.isNew} onChange={(v) => onChange('isNew', v)} />
      <FieldCheckbox label={t('adminProductsFormActive')} value={!!form.active} onChange={(v) => onChange('active', v)} />
    </>
  );
};



