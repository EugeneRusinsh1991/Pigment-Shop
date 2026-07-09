/**
 * ProductFormHelpers.js
 *
 * Private helper components for individual form inputs.
 * Used internally by ProductFormFields.js.
 */
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './ProductFormStyles';

export const CATEGORIES = [
  'Иглы и картриджи',
  'Клеи и ресницы',
  'Базы и топы',
  'Пигменты для бровей',
  'Пигменты для губ',
  'Другое',
];

export function FieldInput({ label, value, onChangeText, placeholder, error, keyboardType }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, error && styles.fieldInputError]}
        value={String(value ?? '')}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#CBD5E1"
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export function FieldTextarea({ label, value, onChangeText, placeholder }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldTextarea}
        value={String(value ?? '')}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#CBD5E1"
        multiline
        numberOfLines={3}
      />
    </View>
  );
}

export function FieldCheckbox({ label, value, onChange }) {
  return (
    <TouchableOpacity style={styles.checkRow} onPress={() => onChange(!value)} activeOpacity={0.7}>
      <View style={[styles.checkBox, value && styles.checkBoxActive]}>
        {value && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export function CategorySelect({ value, onChange }) {
  const selectId = 'admin-category-select';
  const options = CATEGORIES.map(
    (c) => `<option value="${c}" ${value === c ? 'selected' : ''}>${c}</option>`
  ).join('');

  const html = `<select id="${selectId}"
    style="width:100%;height:40px;background:#F5F7FA;border:1px solid #E8EDF5;border-radius:8px;
    padding:0 12px;font-size:13px;color:#1C1C1C;outline:none;cursor:pointer;appearance:auto;">
    ${options}
  </select>`;

  const handleLayout = React.useCallback((e) => {
    const node = e?.target || e?.nativeEvent?.target;
    if (!node) return;
    const el = node.querySelector ? node.querySelector('select') : null;
    if (el && !el._adminBound) {
      el._adminBound = true;
      el.addEventListener('change', (evt) => onChange(evt.target.value));
    }
  }, [onChange]);

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Категория</Text>
      <View
        style={{ height: 40 }}
        dangerouslySetInnerHTML={{ __html: html }}
        onLayout={handleLayout}
      />
    </View>
  );
}
