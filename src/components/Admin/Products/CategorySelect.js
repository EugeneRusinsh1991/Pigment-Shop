import React from 'react';
import { Text, View } from 'react-native';
import styles from './ProductFormStyles';
import { useTheme } from '../../../context/ThemeContext';
import { getCategories } from '../../../data/catalogState';
import { CATEGORY_TRANSLATIONS } from './productFormConstants';

const CATEGORIES = [
  'Иглы и картриджи',
  'Клеи и ресницы',
  'Базы и топы',
  'Пигменты для бровей',
  'Пигменты для губ',
  'Другое',
];

function getFallbackCategoryLabel(c, lang) {
  const translations = CATEGORY_TRANSLATIONS[c];
  if (translations && translations[lang]) {
    return translations[lang];
  }
  return c;
}

function getEventTarget(e) {
  if (!e) return null;
  return e.target || (e.nativeEvent && e.nativeEvent.target);
}

function findSelectElement(node) {
  if (node && typeof node.querySelector === 'function') {
    return node.querySelector('select');
  }
  return null;
}

function bindSelectElement(el, onChange) {
  if (!el || el._adminBound) return;
  el._adminBound = true;
  el.addEventListener('change', (evt) => onChange(evt.target.value));
}

export default function CategorySelect({ value, onChange }) {
  const { t, lang } = useTheme();
  const rawCategories = getCategories();

  const productHolders = rawCategories.filter((cat) => {
    if (cat.type) {
      return cat.type === 'product_holder';
    }
    const hasChildren = rawCategories.some((c) => c.parentId === cat.id);
    return !hasChildren;
  });

  const optionsList = productHolders.length > 0
    ? productHolders.map((cat) => ({
        value: cat.name.ru || cat.id,
        label: cat.name[lang] || cat.name.ru || cat.id,
      }))
    : CATEGORIES.map((c) => ({
        value: c,
        label: getFallbackCategoryLabel(c, lang),
      }));

  const selectId = 'admin-category-select';
  const options = optionsList
    .map((o) => `<option value="${o.value}" ${value === o.value ? 'selected' : ''}>${o.label}</option>`)
    .join('');

  const html = `<select id="${selectId}" style="width:100%;height:40px;background:#F5F7FA;border:1px solid #E8EDF5;border-radius:8px;padding:0 12px;font-size:13px;color:#1C1C1C;outline:none;cursor:pointer;appearance:auto;">${options}</select>`;

  const handleLayout = React.useCallback(
    (e) => {
      const target = getEventTarget(e);
      const el = findSelectElement(target);
      bindSelectElement(el, onChange);
    },
    [onChange]
  );

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{t('adminProductsFormCategory')}</Text>
      <View style={{ height: 40 }} dangerouslySetInnerHTML={{ __html: html }} onLayout={handleLayout} />
    </View>
  );
}
