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
import { Text, View } from 'react-native';
import { AnimatedButton } from '../../Button';
import { useTheme } from '../../../context/ThemeContext';
import { fromMediaRef } from '../../../media';
import { triggerFileInput } from '../../../utils/fileInput';
import { ImageIcon, UploadIcon } from '@/components/Icons';
import TextField from '@/components/TextField';
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
    <AnimatedButton
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
    </AnimatedButton>
  );
}

/* ─── CategoryTypeDisplay ────────────────────────────────────── */

export function CategoryTypeDisplay({ value }) {
  const typeKey = value || 'category_holder';
  const typeColors = CATEGORY_TYPE_COLORS[typeKey] || CATEGORY_TYPE_COLORS.category_holder;

  return (
    <View style={styles.categoryTypeRow}>
      <Text style={styles.categoryTypeLabel}>Category Type</Text>
      <View style={[styles.categoryTypeBadge, { backgroundColor: typeColors.softBg, borderColor: typeColors.accent }]}>
        <Text style={[styles.categoryTypeBadgeText, { color: typeColors.text }]}>
          {typeColors.label}
        </Text>
      </View>
    </View>
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
        <TextField
          containerStyle={{ flex: 1 }}
          value={String(value ?? '')}
          onChangeText={onChange}
          placeholder={t('adminCategoriesFormImagePlaceholder')}
          autoCapitalize="none"
        />
        <AnimatedButton style={[styles.uploadBtn, { flexDirection: 'row', alignItems: 'center', gap: 4 }]} onPress={() => triggerFileInput('cat-image-file-input', onChange)} activeOpacity={0.8}>
          <UploadIcon color="#FFFFFF" size={12} />
          <Text style={styles.uploadBtnText}>{t('adminCategoriesFormUploadBtn')}</Text>
        </AnimatedButton>
        <AnimatedButton style={[styles.uploadBtn, { flexDirection: 'row', alignItems: 'center', gap: 4 }]} onPress={() => setBrowserOpen(true)} activeOpacity={0.8}>
          <ImageIcon color="#FFFFFF" size={12} />
          <Text style={styles.uploadBtnText}>Browse</Text>
        </AnimatedButton>
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

export function NameField({ form, onChange, errors, activeLang = 'uk' }) {
  const { t } = useTheme();
  const safeLang = activeLang || 'uk';
  const langLabel = safeLang === 'uk' ? 'UA' : safeLang.toUpperCase();
  const placeholders = { uk: 'Назва українською', ru: 'Название на русском', en: 'Name in English' };
  return (
    <FieldInput
      label={`${t('adminCategoriesFormNameSection')} (${langLabel}) *`}
      value={form.name?.[safeLang]}
      onChangeText={(v) => onChange('name', { ...form.name, [safeLang]: v })}
      placeholder={placeholders[safeLang]}
      error={errors?.name}
    />
  );
}

/* ─── DescriptionField ────────────────────────────────────── */

export function DescriptionField({ form, onChange, activeLang = 'uk' }) {
  const { t } = useTheme();
  const safeLang = activeLang || 'uk';
  const langLabel = safeLang === 'uk' ? 'UA' : safeLang.toUpperCase();
  const placeholders = { uk: 'Опис українською...', ru: 'Описание на русском...', en: 'Description in English...' };
  return (
    <FieldTextarea
      label={`${t('adminCategoriesFormDescSection')} (${langLabel})`}
      value={form.description?.[safeLang]}
      onChangeText={(v) => onChange('description', { ...form.description, [safeLang]: v })}
      placeholder={placeholders[safeLang]}
    />
  );
}
