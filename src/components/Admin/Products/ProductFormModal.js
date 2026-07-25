/**
 * ProductFormModal.js
 *
 * Modal for creating or editing a product.
 * Validates required fields and calls onSave(formData).
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import {
  BrandSkuRow,
  CategoryStockRow,
  DescriptionField,
  FlagsSection,
  ImageFields,
  NameField,
  PriceDiscountRow,
} from './ProductFormFields';
import styles from './ProductFormStyles';

import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';
import { useForm } from '../../../hooks/useForm';
import { colors } from '../../../theme/tokens';
import Button from '../../Button';
import { FormModalLayout, LanguageTabs } from '../SharedFormComponents';
import { buildInitialForm, parseFormToProduct, validateForm } from './productFormLogic';

export default function ProductFormModal({ visible, product, onSave, onClose, onDelete }) {
  const { t, lang } = useTheme();
  const [activeLang, setActiveLang] = useState(lang);

  const { form, errors, handleChange, validate, resetForm } = useForm(
    buildInitialForm(product, lang),
    (f) => validateForm(f, t)
  );

  const { confirmDelete } = useDeleteConfirmation();

  React.useEffect(() => {
    if (visible) {
      resetForm(buildInitialForm(product, lang));
      setActiveLang(lang);
    }
  }, [visible, product, lang, resetForm]);

  const handleSave = () => {
    if (validate()) {
      onSave(parseFormToProduct(form, product, lang));
    }
  };

  const handleDelete = () => {
    if (!product || !onDelete) return;

    confirmDelete({
      onConfirm: () => {
        onDelete(product.id);
        onClose();
      }
    });
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
      <ImageFields form={form} onChange={handleChange} errors={errors} />
      <FlagsSection form={form} onChange={handleChange} />
      {product && onDelete && (
        <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: colors.secondaryLightBorder, paddingTop: 20 }}>
          <Button
            title={t('adminProductsActionDelete')}
            onPress={handleDelete}
            variant="dangerSoft"
            size="md"
            textStyle={{ color: colors.dangerStrong }}
          />
        </View>
      )}
    </FormModalLayout>
  );
}
