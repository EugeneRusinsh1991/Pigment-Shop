/**
 * ProductFormModal.js
 *
 * Modal for creating or editing a product.
 * Validates required fields and calls onSave(formData).
 */
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  BrandSkuRow,
  CategoryStockRow,
  DescriptionField,
  FlagsSection,
  ImageField,
  NameField,
  PriceDiscountRow,
} from './ProductFormFields';
import styles from './ProductFormStyles';
import { useTheme } from '../../../context/ThemeContext';

import { FormModalLayout, LanguageTabs } from '../SharedFormComponents';
import { buildInitialForm, validateForm, parseFormToProduct } from './productFormLogic';

export default function ProductFormModal({ visible, product, onSave, onClose }) {
  const { t, lang } = useTheme();
  const [form, setForm] = useState(() => buildInitialForm(product, lang));
  const [errors, setErrors] = useState({});
  const [activeLang, setActiveLang] = useState(lang);

  React.useEffect(() => {
    if (visible) {
      setForm(buildInitialForm(product, lang));
      setErrors({});
      setActiveLang(lang);
    }
  }, [visible, product, lang]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSave = () => {
    const validationErrors = validateForm(form, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(parseFormToProduct(form, product, lang));
  };

  return (
    <FormModalLayout
      visible={visible}
      title={product ? t('adminProductsEditTitle') : t('adminProductsNewTitle')}
      onClose={onClose}
      onSave={handleSave}
      styles={styles}
      cardWidth={520}
    >
      <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />
      <NameField form={form} onChange={handleChange} errors={errors} activeLang={activeLang} />
      <DescriptionField form={form} onChange={handleChange} activeLang={activeLang} />
      <PriceDiscountRow form={form} onChange={handleChange} errors={errors} />
      <BrandSkuRow form={form} onChange={handleChange} />
      <CategoryStockRow form={form} onChange={handleChange} />
      <ImageField form={form} onChange={handleChange} />
      <FlagsSection form={form} onChange={handleChange} />
    </FormModalLayout>
  );
}
