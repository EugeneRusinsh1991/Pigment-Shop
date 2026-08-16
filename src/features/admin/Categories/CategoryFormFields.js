/**
 * CategoryFormFields.js
 *
 * Reusable field components for the category create/edit form:
 * - CategoryTypeSelect  (category_holder / product_holder toggle)
 * - ImagePickerField    (file upload button + path display)
 * - NameField           (localized name input)
 * - DescriptionField    (localized description textarea)
 */
import { AnimatedButton } from '@/components/ui/Button';
import { Flag, FlagGroup } from '@/components/domain/Flag';
import { TrashIcon, UploadIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import MediaRenderer from '@/components/ui/Media/MediaRenderer';
import { useState } from 'react';
import { View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { fromMediaRef } from '../../../media';
import { colors, layout, motion } from '../../../theme/tokens';
import { triggerFileUpload } from '../../../utils/fileInput';
import MediaBrowser from '../Media/MediaBrowser';
import { FieldInput as SharedFieldInput, FieldTextarea as SharedFieldTextarea } from '../SharedFormComponents';
import { CATEGORY_TYPE_COLORS } from './CategoriesStyles';
import styles from './CategoryFormStyles';

/* ─── shared primitives wrappers ────────────────────────────── */

const FieldInput = (props) => <SharedFieldInput {...props} styles={styles} />;
const FieldTextarea = (props) => <SharedFieldTextarea {...props} styles={styles} numberOfLines={2} />;

/* ─── CategoryTypeDisplay ────────────────────────────────────── */

export function CategoryTypeDisplay({ value }) {
  const { t } = useLanguage();
  const typeKey = value || 'category_holder';
  const typeColors = CATEGORY_TYPE_COLORS[typeKey] || CATEGORY_TYPE_COLORS.category_holder;

  return (
    <View style={styles.categoryTypeRow}>
      <Text variant="label" style={styles.categoryTypeLabel}>{t('adminCategoryType') || 'Type'}</Text>
      <View style={[styles.categoryTypeBadge, { backgroundColor: typeColors.softBg, borderColor: typeColors.accent }]}>
        <Text variant="overline" style={[styles.categoryTypeBadgeText, { color: typeColors.text }]}>
          {typeColors.label}
        </Text>
      </View>
    </View>
  );
}

/* ─── CategoryTypeSelect ────────────────────────────────────── */

export function CategoryTypeSelect({ value, onChange, disabled }) {
  const { t } = useLanguage();
  return (
    <View style={styles.fieldGroup}>
      <Text variant="label" style={styles.fieldLabel}>{t('adminCategoryType')}</Text>
      <FlagGroup value={value} onChange={onChange} multiple={false}>
        <Flag value="category_holder" variant="chip" disabled={disabled}>
          Category Holder
        </Flag>
        <Flag value="product_holder" variant="chip" disabled={disabled}>
          Product Holder
        </Flag>
      </FlagGroup>
      {disabled && (
        <Text variant="caption" style={[styles.errorText, { color: colors.slateText, marginTop: layout.spacing.xxs }]}>
          Type cannot be changed due to existing subcategories or assigned products.
        </Text>
      )}
    </View>
  );
}

/* ─── ImagePickerField ──────────────────────────────────────── */

export function ImagePickerField({ value, onChange }) {
  const { t } = useLanguage();
  const [browserOpen, setBrowserOpen] = useState(false);

  function handleMediaSelect(item) {
    setBrowserOpen(false);
    onChange(fromMediaRef(item.path));
  }

  const handleUpload = () => {
    triggerFileUpload(
      'cat-image-file-input',
      (url) => onChange(url),
      { folder: 'categories' }
    );
  };

  const handleDelete = () => {
    onChange('');
  };

  return (
    <View style={styles.imageSlotContainer}>
      <Text variant="label" style={styles.fieldLabel}>{t('adminCategoriesFormImage')}</Text>
      <View style={styles.imageSlotCard}>
        <AnimatedButton
          style={styles.imageSlotPreview}
          onPress={() => setBrowserOpen(true)}
          activeOpacity={motion.press.activeOpacity}
        >
          {value ? (
            <MediaRenderer uri={value} style={styles.imageSlotPreviewImg} resizeMode="cover" />
          ) : (
            <View style={styles.imageSlotPlaceholder}>
              <Text variant="caption" style={styles.imageSlotPlaceholderText}>
                {t('adminCategoriesNoImage') || t('adminBannersNoImage')}
              </Text>
            </View>
          )}
        </AnimatedButton>

        <View style={styles.imageSlotActions}>
          <AnimatedButton
            style={styles.imageSlotUploadBtn}
            onPress={handleUpload}
            activeOpacity={motion.press.activeOpacity}
          >
            <UploadIcon color={colors.white} size={12} />
            <Text variant="label" style={styles.imageSlotUploadText}>
              {t('adminCategoriesFormUploadBtn')}
            </Text>
          </AnimatedButton>

          {!!value && (
            <AnimatedButton
              style={styles.imageSlotDeleteBtn}
              onPress={handleDelete}
              activeOpacity={motion.press.activeOpacity}
              haptic="warning"
            >
              <TrashIcon color={colors.white} size={12} />
              <Text variant="label" style={styles.imageSlotDeleteText}>
                {t('adminBannersDeleteBtn')}
              </Text>
            </AnimatedButton>
          )}
        </View>
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
  const { t } = useLanguage();
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
  const { t } = useLanguage();
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
