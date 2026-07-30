/**
 * CategoryFormModal.js
 *
 * Modal for creating or editing a category.
 */
import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { colors, layout } from '../../../theme/tokens';
import { AnimatedButton } from '@/components/ui/Button';
import { BackArrowIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import {
  buildInitialForm,
  computeModalFlags,
  computeTypeConstraints,
  validateForm,
} from './categoryFormLogic';
import styles from './CategoryFormStyles';
import { useCategoryProducts } from './CategoryProductSection';
import { CategoryFormFooter } from './CategoryFormFooter';
import { CategoryFormContent } from './CategoryFormContent';
import { useForm } from '../../../hooks/useForm';

export default function CategoryFormModal({
  category,
  categories,
  presetParentId,
  onSave,
  onClose,
  onDelete,
  onAddChild,
  products,
}) {
  const { t, lang } = useTheme();
  const [activeLang, setActiveLang] = useState(lang);

  const { form, errors, handleChange, validate, resetForm } = useForm(
    buildInitialForm(category, presetParentId, categories),
    (f) => validateForm(f, categories, t, category, products)
  );

  useEffect(() => {
    resetForm(buildInitialForm(category, presetParentId, categories));
    setActiveLang(lang);
  }, [category, presetParentId, categories, lang, resetForm]);

  const handleSave = () => {
    if (validate()) {
      onSave({
        parentId: form.parentId || null,
        name: { ...form.name },
        description: { ...form.description },
        image: form.image.trim(),
        type: form.type,
        productIds: (form.productIds || []).filter(Boolean),
      });
    }
  };

  const { isTypeDisabled } = computeTypeConstraints(category, categories, products);
  const { assignedProducts, unassignedProducts, toggleProduct } = useCategoryProducts(
    categories,
    category?.id,
    form.productIds,
    products,
    handleChange
  );

  const { title, canAddChild, canDelete, hasFirstRow } = computeModalFlags(
    category,
    onAddChild,
    onDelete,
    t
  );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: layout.spacing.xxl + layout.spacing.sm }}>
      {/* Back button */}
      <AnimatedButton
        size="sm"
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: layout.spacing.xl }}
        onPress={onClose}
      >
        <BackArrowIcon color={colors.textDescLight} size={16} />
        <Text style={{ marginLeft: layout.spacing.sm, color: colors.textDescLight }} size={14} weight="500">
          {t('adminCategoriesBackBtn') || '← Back to Categories'}
        </Text>
      </AnimatedButton>

      {/* Header title */}
      <View style={{ marginBottom: layout.spacing.xl }}>
        <Text size={24} weight="bold" style={{ color: colors.textLight }}>
          {title}
        </Text>
      </View>

      <CategoryFormContent
        form={form}
        errors={errors}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        handleChange={handleChange}
        isTypeDisabled={isTypeDisabled}
        assignedProducts={assignedProducts}
        unassignedProducts={unassignedProducts}
        toggleProduct={toggleProduct}
        category={category}
        lang={lang}
        t={t}
      />

      <View style={{ marginTop: layout.spacing.xl }}>
        <CategoryFormFooter
          canAddChild={canAddChild}
          canDelete={canDelete}
          hasFirstRow={hasFirstRow}
          onAddChild={onAddChild}
          onDelete={onDelete}
          onClose={onClose}
          onSave={handleSave}
          category={category}
          t={t}
        />
      </View>
    </ScrollView>
  );
}


