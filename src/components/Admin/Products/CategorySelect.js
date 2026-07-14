import { createElement, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getCategories } from '../../../data/catalogState';
import { CATEGORY_TRANSLATIONS } from './productFormConstants';
import styles from './ProductFormStyles';

const CATEGORIES = [
  'Иглы и картриджи',
  'Клеи и ресницы',
  'Базы и топы',
  'Пигменты для бровей',
  'Пигменты для губ',
  'Другое',
];

function getFallbackCategoryLabel(c, lang) {
  const t = CATEGORY_TRANSLATIONS[c];
  return (t && t[lang]) ? t[lang] : c;
}

function buildOptionsList(rawCategories, lang) {
  const productHolders = rawCategories.filter((cat) => {
    if (cat.type) return cat.type === 'product_holder';
    return !rawCategories.some((c) => c.parentId === cat.id);
  });

  if (productHolders.length > 0) {
    return productHolders.map((cat) => ({
      value: cat.id,
      label: cat.name?.[lang] || cat.name?.ru || cat.id,
    }));
  }

  return CATEGORIES.map((c) => ({
    value: c,
    label: getFallbackCategoryLabel(c, lang),
  }));
}

export default function CategorySelect({ value, onChange }) {
  const { t, lang } = useTheme();

  const optionsList = buildOptionsList(getCategories(), lang);
  const matchedOption = optionsList.find((o) => o.value === value || o.label === value);
  const valueInList = Boolean(matchedOption);
  const effectiveValue = valueInList ? matchedOption.value : (optionsList[0]?.value ?? value);

  // Sync form state when current value is not in the list (e.g. new product default)
  useEffect(() => {
    if (!valueInList && optionsList.length > 0) {
      onChange(optionsList[0].value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueInList, optionsList.length]);

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{t('adminProductsFormCategory')}</Text>
      {createElement(
        'select',
        {
          style: {
            width: '100%',
            height: 40,
            backgroundColor: '#F5F7FA',
            borderWidth: 1,
            borderColor: '#E8EDF5',
            borderRadius: 8,
            padding: '0 12px',
            fontSize: 13,
            color: '#1C1C1C',
            outline: 'none',
            cursor: 'pointer',
          },
          value: effectiveValue,
          onChange: (e) => onChange(e.target.value),
        },
        optionsList.map((o) => 
          createElement('option', { key: o.value, value: o.value }, o.label)
        )
      )}
    </View>
  );
}
