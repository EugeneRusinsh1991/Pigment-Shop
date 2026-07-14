/**
 * CategoryFormFields.js
 *
 * Reusable field components for the category create/edit form:
 * - CategoryTypeSelect  (category_holder / product_holder toggle)
 * - ImagePickerField    (file upload button + path display)
 * - NameField           (localized name input)
 * - DescriptionField    (localized description textarea)
 */
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { fromMediaRef } from '../../../media';
import { triggerFileInput } from '../../../utils/fileInput';
import { ImageIcon, UploadIcon } from '../../Icons';
import MediaBrowser from '../Media/MediaBrowser';
import { FieldInput as SharedFieldInput, FieldTextarea as SharedFieldTextarea } from '../SharedFormComponents';
import { CATEGORY_TYPE_COLORS } from './CategoriesStyles';
import styles from './CategoryFormStyles';

/* ─── shared primitives wrappers ────────────────────────────── */

const FieldInput = (props) => <SharedFieldInput {...props} styles={styles} />;
const FieldTextarea = (props) => <SharedFieldTextarea {...props} styles={styles} numberOfLines={2} />;

/* ─── CategoryTypeSelect helpers ────────────────────────────── */

function TypeToggleButton({ typeKey, label, activeValue, disabled, onPress }) {
  const isActive = activeValue === typeKey;
  const typeColors = CATEGORY_TYPE_COLORS[typeKey];
  const buttonStyle = isActive
    ? {
        backgroundColor: typeColors.softBg,
        borderColor: typeColors.accent,
      }
    : {
        backgroundColor: '#F1F5F9',
        borderColor: '#E2E8F0',
      };
  const textStyle = isActive
    ? { color: typeColors.text }
    : { color: '#475569' };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        opacity: disabled ? 0.6 : 1,
        ...buttonStyle,
      }}
      onPress={() => !disabled && onPress(typeKey)}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={{ fontSize: 13, fontWeight: '600', ...textStyle }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ─── CategoryTypeSelect ────────────────────────────────────── */

export function CategoryTypeSelect({ value, onChange, disabled }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Category Type</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TypeToggleButton typeKey="category_holder" label="Category Holder" activeValue={value} disabled={disabled} onPress={onChange} />
        <TypeToggleButton typeKey="product_holder" label="Product Holder" activeValue={value} disabled={disabled} onPress={onChange} />
      </View>
      {disabled && (
        <Text style={[styles.errorText, { color: '#64748B', marginTop: 4 }]}>
          Type cannot be changed due to existing subcategories or assigned products.
        </Text>
      )}
    </View>
  );
}

/* ─── ImagePickerField ──────────────────────────────────────── */

export function ImagePickerField({ value, onChange }) {
  const { t } = useTheme();
  const [browserOpen, setBrowserOpen] = useState(false);

  function handleMediaSelect(item) {
    setBrowserOpen(false);
    onChange(fromMediaRef(item.path));
  }

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{t('adminCategoriesFormImage')}</Text>
      <View style={styles.imagePickerRow}>
        <TextInput
          style={styles.imagePickerInput}
          value={String(value ?? '')}
          onChangeText={onChange}
          placeholder={t('adminCategoriesFormImagePlaceholder')}
          placeholderTextColor="#CBD5E1"
          autoCapitalize="none"
        />
        <TouchableOpacity style={[styles.uploadBtn, { flexDirection: 'row', alignItems: 'center', gap: 4 }]} onPress={() => triggerFileInput('cat-image-file-input', onChange)} activeOpacity={0.8}>
          <UploadIcon color="#FFFFFF" size={12} />
          <Text style={styles.uploadBtnText}>{t('adminCategoriesFormUploadBtn')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.uploadBtn, { flexDirection: 'row', alignItems: 'center', gap: 4 }]} onPress={() => setBrowserOpen(true)} activeOpacity={0.8}>
          <ImageIcon color="#FFFFFF" size={12} />
          <Text style={styles.uploadBtnText}>Browse</Text>
        </TouchableOpacity>
      </View>
      <MediaBrowser
        visible={browserOpen}
        category="images"
        onSelect={handleMediaSelect}
        onClose={() => setBrowserOpen(false)}
      />
    </View>
  );
}

/* ─── NameField ───────────────────────────────────────────── */

export function NameField({ form, onChange, errors, activeLang }) {
  const { t } = useTheme();
  const langLabel = activeLang === 'uk' ? 'UA' : activeLang.toUpperCase();
  const placeholders = { uk: 'Назва українською', ru: 'Название на русском', en: 'Name in English' };
  return (
    <FieldInput
      label={`${t('adminCategoriesFormNameSection')} (${langLabel}) *`}
      value={form.name?.[activeLang]}
      onChangeText={(v) => onChange('name', { ...form.name, [activeLang]: v })}
      placeholder={placeholders[activeLang]}
      error={errors?.name}
    />
  );
}

/* ─── DescriptionField ────────────────────────────────────── */

export function DescriptionField({ form, onChange, activeLang }) {
  const { t } = useTheme();
  const langLabel = activeLang === 'uk' ? 'UA' : activeLang.toUpperCase();
  const placeholders = { uk: 'Опис українською...', ru: 'Описание на русском...', en: 'Description in English...' };
  return (
    <FieldTextarea
      label={`${t('adminCategoriesFormDescSection')} (${langLabel})`}
      value={form.description?.[activeLang]}
      onChangeText={(v) => onChange('description', { ...form.description, [activeLang]: v })}
      placeholder={placeholders[activeLang]}
    />
  );
}
