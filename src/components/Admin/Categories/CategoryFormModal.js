/**
 * CategoryFormModal.js
 *
 * Modal for creating or editing a category.
 * Delegates form logic to categoryFormLogic.js.
 */
import React, { useState } from 'react';
import { Text } from 'react-native';
import { ImagePickerField, NameField, DescriptionField, CategoryTypeSelect } from './CategoryFormFields';
import { FormModalLayout, LanguageTabs } from '../SharedFormComponents';
import styles from './CategoryFormStyles';
import { useTheme } from '../../../context/ThemeContext';
import {
  buildInitialForm,
  updateField,
  executeSave,
  computeTypeConstraints,
} from './categoryFormLogic';

export default function CategoryFormModal({ visible, category, categories, presetParentId, onSave, onClose }) {
  const { t, lang } = useTheme();
  const [form, setForm] = useState(() => buildInitialForm(category, presetParentId, categories));
  const [errors, setErrors] = useState({});
  const [activeLang, setActiveLang] = useState(lang);

  React.useEffect(() => {
    if (visible) {
      setForm(buildInitialForm(category, presetParentId, categories));
      setErrors({});
      setActiveLang(lang);
    }
  }, [visible, category, presetParentId, lang, categories]);

  const handleChange = (field, value) => updateField(field, value, setForm, errors, setErrors);
  const handleSave = () => executeSave(form, categories, onSave, setErrors, t, category);

  const { isTypeDisabled } = computeTypeConstraints(category, categories);

  return (
    <FormModalLayout
      visible={visible}
      title={category ? t('adminCategoriesEditTitle') : t('adminCategoriesNewTitle')}
      onClose={onClose}
      onSave={handleSave}
      styles={styles}
      cardWidth={560}
    >
      <CategoryTypeSelect
        value={form.type}
        onChange={(v) => handleChange('type', v)}
        disabled={isTypeDisabled}
      />
      {!!errors.type && <Text style={[styles.errorText, { marginBottom: 12 }]}>{errors.type}</Text>}

      <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />

      <NameField form={form} onChange={handleChange} errors={errors} activeLang={activeLang} />
      <DescriptionField form={form} onChange={handleChange} activeLang={activeLang} />
      <ImagePickerField value={form.image} onChange={(v) => handleChange('image', v)} />
    </FormModalLayout>
  );
}
