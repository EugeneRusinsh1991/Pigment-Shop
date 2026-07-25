/**
 * CategoryFormModal.js
 *
 * Modal for creating or editing a category.
 */
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FormModalLayout } from '../SharedFormComponents';
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
  visible,
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
    if (visible) {
      resetForm(buildInitialForm(category, presetParentId, categories));
      setActiveLang(lang);
    }
  }, [visible, category, presetParentId, categories, lang, resetForm]);

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
    <FormModalLayout
      visible={visible}
      title={title}
      onClose={onClose}
      onSave={handleSave}
      styles={styles}
      footer={
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
      }
    >
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
    </FormModalLayout>
  );
}


