import React from 'react';
import { Text } from '@/components/ui/Text';
import { layout } from '../../../theme/tokens';
import { LanguageTabs } from '../SharedFormComponents';
import { CategoryTypeDisplay, CategoryTypeSelect, DescriptionField, ImagePickerField, NameField } from './CategoryFormFields';
import { CategoryProductSection } from './CategoryProductSection';
import styles from './CategoryFormStyles';

export function CategoryFormContent({
  form,
  errors,
  activeLang,
  setActiveLang,
  handleChange,
  isTypeDisabled,
  assignedProducts,
  unassignedProducts,
  toggleProduct,
  category,
  lang,
  t,
}) {
  return (
    <>
      {category ? (
        <CategoryTypeDisplay value={form.type} />
      ) : (
        <>
          <CategoryTypeSelect
            value={form.type}
            onChange={(v) => handleChange('type', v)}
            disabled={isTypeDisabled}
          />
          {!!errors.type && <Text style={[styles.errorText, { marginBottom: layout.spacing.md }]}>{errors.type}</Text>}
        </>
      )}

      <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />

      <NameField form={form} onChange={handleChange} errors={errors} activeLang={activeLang} />
      <DescriptionField form={form} onChange={handleChange} activeLang={activeLang} />
      <ImagePickerField value={form.image} onChange={(v) => handleChange('image', v)} />

      {form.type === 'product_holder' && (
        <CategoryProductSection
          assignedProducts={assignedProducts}
          unassignedProducts={unassignedProducts}
          toggleProduct={toggleProduct}
          lang={lang}
          t={t}
        />
      )}
    </>
  );
}
