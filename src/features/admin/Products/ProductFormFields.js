import { AnimatedButton } from '@/components/ui/Button';
import { Flag } from '@/components/domain/Flag';
import { UploadIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import { View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { colors, layout, motion } from '../../../theme/tokens';
import { triggerFileUpload } from '../../../utils/fileInput';
import styles from './ProductFormStyles';

import { FieldInput as SharedFieldInput, FieldTextarea as SharedFieldTextarea } from '../SharedFormComponents';

/* ─── shared primitives wrappers ────────────────────────────── */

const FieldInput = (props) => <SharedFieldInput {...props} styles={styles} />;
const FieldTextarea = (props) => <SharedFieldTextarea {...props} styles={styles} numberOfLines={3} />;

function FieldCheckbox({ label, value, onChange }) {
  return (
    <Flag
      variant="chip"
      checked={!!value}
      onChange={onChange}
    >
      {label}
    </Flag>
  );
}


export const NameField = ({ form, onChange, errors, activeLang = 'uk' }) => {
  const { t } = useLanguage();
  const safeLang = activeLang || 'uk';
  const langLabel = safeLang === 'uk' ? 'UA' : safeLang.toUpperCase();
  return (
    <FieldInput
      label={`${t('adminProductsFormName')} (${langLabel}) *`}
      value={form.label?.[safeLang] ?? ''}
      onChangeText={(v) => onChange('label', { ...form.label, [safeLang]: v })}
      placeholder={t('adminProductsFormNamePlaceholder')}
      error={errors.label}
    />
  );
};

export const DescriptionField = ({ form, onChange, activeLang = 'uk' }) => {
  const { t } = useLanguage();
  const safeLang = activeLang || 'uk';
  const langLabel = safeLang === 'uk' ? 'UA' : safeLang.toUpperCase();
  return (
    <FieldTextarea
      label={`${t('adminProductsFormDesc')} (${langLabel})`}
      value={form.description?.[safeLang] ?? ''}
      onChangeText={(v) => onChange('description', { ...form.description, [safeLang]: v })}
      placeholder={t('adminProductsFormDescPlaceholder')}
    />
  );
};

export const PriceDiscountRow = ({ form, onChange, errors }) => {
  const { t } = useLanguage();
  return (
    <View style={styles.fieldRow}>
      <FieldInput label={t('adminProductsFormPrice') + ' (₴) *'} value={form.price} onChangeText={(v) => onChange('price', v)} placeholder="0" keyboardType="numeric" error={errors.price} />
      <FieldInput label={t('adminProductsFormDiscount')} value={form.discountPercent} onChangeText={(v) => onChange('discountPercent', v)} placeholder="0" keyboardType="numeric" />
    </View>
  );
};

export const BrandSkuRow = ({ form, onChange }) => {
  const { t } = useLanguage();
  return (
    <View style={styles.fieldRow}>
      <FieldInput label={t('adminProductsFormBrand')} value={form.brand} onChangeText={(v) => onChange('brand', v)} placeholder={t('adminProductsFormBrand')} />
      <FieldInput label={t('adminProductsFormSku')} value={form.sku} onChangeText={(v) => onChange('sku', v)} placeholder="SKU-001" />
    </View>
  );
};

export const CategoryStockRow = ({ form, onChange }) => {
  const { t } = useLanguage();
  return (
    <View style={styles.fieldRow}>
      <FieldInput label={t('adminProductsFormStock')} value={form.stock} onChangeText={(v) => onChange('stock', v)} placeholder="0" keyboardType="numeric" />
    </View>
  );
};

export const ImageFields = ({ form, onChange }) => {
  const { t } = useLanguage();
  const renderRow = (num, key, required = false) => (
    <View style={styles.imageFieldRow} key={key}>
      <View style={{ flex: 1 }}>
        <FieldInput
          label={`${t('adminProductsFormImage')} ${num} ${required ? '*' : ''}`}
          value={form[key]}
          onChangeText={(v) => onChange(key, v)}
          placeholder={required ? 'https://...' : t('adminPlaceholderOptionalUrl')}
        />
      </View>
      <AnimatedButton
        style={[styles.uploadBtn, { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.xxs, alignSelf: 'flex-end', marginBottom: 2 }]}
        onPress={() => triggerFileUpload(`prod-img-${key}`, (url) => onChange(key, url), { folder: 'products' })}
        activeOpacity={motion.press.activeOpacity}
      >
        <UploadIcon color={colors.white} size={12} />
        <Text variant="label" style={styles.uploadBtnText}>{t('adminCategoriesFormUploadBtn')}</Text>
      </AnimatedButton>
    </View>
  );

  return (
    <View style={styles.imageFieldsGroup}>
      {renderRow(1, 'image1', true)}
      {renderRow(2, 'image2')}
      {renderRow(3, 'image3')}
    </View>
  );
};

export const FlagsSection = ({ form, onChange }) => {
  const { t } = useLanguage();
  return (
    <>
      <FieldCheckbox label={t('adminProductsFormNew')} value={!!form.isNew} onChange={(v) => onChange('isNew', v)} />
      <FieldCheckbox label={t('adminProductsFormActive')} value={!!form.active} onChange={(v) => onChange('active', v)} />
    </>
  );
};



