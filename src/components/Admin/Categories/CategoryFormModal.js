/**
 * CategoryFormModal.js
 *
 * Modal for creating or editing a category.
 * Delegates form logic to categoryFormLogic.js.
 */
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getProducts } from '../../../data/catalogState';
import { FormModalLayout, LanguageTabs } from '../SharedFormComponents';
import { CategoryTypeSelect, DescriptionField, ImagePickerField, NameField } from './CategoryFormFields';
import {
    buildInitialForm,
    computeTypeConstraints,
    executeSave,
    updateField,
} from './categoryFormLogic';
import styles from './CategoryFormStyles';

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
  const allProducts = getProducts();
  const selectedProductIds = form.productIds || [];
  const blockedProductIds = useMemo(() => {
    return new Set(
      categories
        .filter((cat) => cat.type === 'product_holder' && cat.id !== category?.id)
        .flatMap((cat) => cat.productIds || [])
        .filter(Boolean),
    );
  }, [categories, category?.id]);

  const assignedProducts = allProducts.filter((product) => selectedProductIds.includes(product.id));
  const unassignedProducts = allProducts.filter(
    (product) => !blockedProductIds.has(product.id) && !selectedProductIds.includes(product.id),
  );
  const canAssignProducts = form.type === 'product_holder';

  const toggleProduct = (productId) => {
    const next = selectedProductIds.includes(productId)
      ? selectedProductIds.filter((id) => id !== productId)
      : [...selectedProductIds, productId];
    handleChange('productIds', next);
  };

  const productLabel = (product) => {
    const label = product?.label;
    if (typeof label === 'object') {
      return label[lang] || label.ru || label.en || product.id;
    }
    return label || product.id;
  };

  const renderProductOption = (product, selected) => (
    <TouchableOpacity
      key={product.id}
      onPress={() => toggleProduct(product.id)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: selected ? '#16A34A' : '#E2E8F0',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: selected ? '#ECFDF5' : '#F8FAFC',
      }}
      activeOpacity={0.8}
    >
      <View style={{ width: 16, height: 16, borderRadius: 999, borderWidth: 1, borderColor: selected ? '#16A34A' : '#CBD5E1', backgroundColor: selected ? '#16A34A' : '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
        {selected ? <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>✓</Text> : null}
      </View>
      <Text style={{ fontSize: 13, color: '#1F2937' }}>{productLabel(product)}</Text>
    </TouchableOpacity>
  );

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
      {canAssignProducts && (
        <View style={{ marginTop: 8 }}>
          <Text style={styles.sectionLabel}>{t('adminCategoriesFormAssignedProducts')}</Text>
          <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>
            {t('adminCategoriesFormAssignedProductsHint')}
          </Text>
          <View style={{ gap: 6 }}>
            {assignedProducts.length === 0 ? (
              <Text style={{ fontSize: 12, color: '#64748B' }}>{t('adminCategoriesFormNoAssignedProducts')}</Text>
            ) : assignedProducts.map((product) => renderProductOption(product, true))}
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 16 }]}>{t('adminCategoriesFormUnassignedProducts')}</Text>
          <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>
            {t('adminCategoriesFormUnassignedProductsHint')}
          </Text>
          <View style={{ gap: 6 }}>
            {unassignedProducts.length === 0 ? (
              <Text style={{ fontSize: 12, color: '#64748B' }}>{t('adminCategoriesFormNoUnassignedProducts')}</Text>
            ) : unassignedProducts.map((product) => renderProductOption(product, false))}
          </View>
        </View>
      )}
    </FormModalLayout>
  );
}
