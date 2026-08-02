/**
 * ProductFormModal.js
 *
 * Modal for creating or editing a product.
 * Validates required fields and calls onSave(formData).
 */
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
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
import { colors, layout } from '../../../theme/tokens';
import { AnimatedButton, Button } from '@/components/ui/Button';
import { BackArrowIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import { LanguageTabs } from '../SharedFormComponents';
import { buildInitialForm, parseFormToProduct, validateForm } from './productFormLogic';

export default function ProductFormModal({ product, onSave, onClose, onDelete }) {
  const { t, lang } = useLanguage();
  const [activeLang, setActiveLang] = useState(lang);

  const { form, errors, handleChange, validate, resetForm } = useForm(
    buildInitialForm(product, lang),
    (f) => validateForm(f, t)
  );

  const { confirmDelete, confirmationDialog } = useDeleteConfirmation();

  React.useEffect(() => {
    resetForm(buildInitialForm(product, lang));
    setActiveLang(lang);
  }, [product, lang, resetForm]);

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
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: layout.spacing.xxl + layout.spacing.sm }}>
        {/* Back button */}
        <AnimatedButton
          size="sm"
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: layout.spacing.lg }}
          onPress={onClose}
        >
          <BackArrowIcon color={colors.textDescLight} size={16} />
          <Text variant="subtitle2" style={{ marginLeft: layout.spacing.sm, color: colors.textDescLight }}>
            {t('adminProductsBackBtn') || 'Back to Products'}
          </Text>
        </AnimatedButton>

        <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />
        <NameField form={form} onChange={handleChange} errors={errors} activeLang={activeLang} />
        <DescriptionField form={form} onChange={handleChange} activeLang={activeLang} />
        <PriceDiscountRow form={form} onChange={handleChange} errors={errors} />
        <BrandSkuRow form={form} onChange={handleChange} />
        <CategoryStockRow form={form} onChange={handleChange} />
        <ImageFields form={form} onChange={handleChange} errors={errors} />
        <FlagsSection form={form} onChange={handleChange} />

        {/* Actions row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: layout.spacing.xl,
            paddingTop: layout.spacing.lg,
            borderTopWidth: layout.borderWidth.thin,
            borderTopColor: colors.borderLight,
          }}
        >
          {product && onDelete ? (
            <Button
              title={t('adminProductsActionDelete')}
              onPress={handleDelete}
              variant="dangerSoft"
              size="md"
              textStyle={{ color: colors.dangerStrong }}
              haptic="warning"
            />
          ) : (
            <View />
          )}

          <View style={{ flexDirection: 'row', gap: layout.spacing.md }}>
            <Button
              title={t('btnCancelLabel')}
              onPress={onClose}
              variant="secondary"
              size="md"
            />
            <Button
              title={t('btnSaveLabel')}
              onPress={handleSave}
              variant="success"
              size="md"
              haptic="success"
            />
          </View>
        </View>
      </ScrollView>
      {confirmationDialog}
    </>
  );
}
