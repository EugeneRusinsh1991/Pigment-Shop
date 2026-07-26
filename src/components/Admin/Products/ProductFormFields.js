import { Flag } from '../../Flag';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { layout } from '../../../theme/tokens';
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
  const { t } = useTheme();
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
  const { t } = useTheme();
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
  const { t } = useTheme();
  return (
    <View style={styles.fieldRow}>
      <FieldInput label={t('adminProductsFormPrice') + ' (₴) *'} value={form.price} onChangeText={(v) => onChange('price', v)} placeholder="0" keyboardType="numeric" error={errors.price} />
      <FieldInput label={t('adminProductsFormDiscount')} value={form.discountPercent} onChangeText={(v) => onChange('discountPercent', v)} placeholder="0" keyboardType="numeric" />
    </View>
  );
};

export const BrandSkuRow = ({ form, onChange }) => {
  const { t } = useTheme();
  return (
    <View style={styles.fieldRow}>
      <FieldInput label={t('adminProductsFormBrand')} value={form.brand} onChangeText={(v) => onChange('brand', v)} placeholder={t('adminProductsFormBrand')} />
      <FieldInput label={t('adminProductsFormSku')} value={form.sku} onChangeText={(v) => onChange('sku', v)} placeholder="SKU-001" />
    </View>
  );
};

export const CategoryStockRow = ({ form, onChange }) => {
  const { t } = useTheme();
  return (
    <View style={styles.fieldRow}>
      <FieldInput label={t('adminProductsFormStock')} value={form.stock} onChangeText={(v) => onChange('stock', v)} placeholder="0" keyboardType="numeric" />
    </View>
  );
};

export const ImageFields = ({ form, onChange }) => {
  const { t } = useTheme();
  return (
    <View style={{ gap: layout.spacing.sm, marginBottom: layout.spacing.md }}>
      <FieldInput label={`${t('adminProductsFormImage')} 1 *`} value={form.image1} onChangeText={(v) => onChange('image1', v)} placeholder="https://..." />
      <FieldInput label={`${t('adminProductsFormImage')} 2`} value={form.image2} onChangeText={(v) => onChange('image2', v)} placeholder="https://... (optional)" />
      <FieldInput label={`${t('adminProductsFormImage')} 3`} value={form.image3} onChangeText={(v) => onChange('image3', v)} placeholder="https://... (optional)" />
    </View>
  );
};

export const FlagsSection = ({ form, onChange }) => {
  const { t } = useTheme();
  return (
    <>
      <FieldCheckbox label={t('adminProductsFormNew')} value={!!form.isNew} onChange={(v) => onChange('isNew', v)} />
      <FieldCheckbox label={t('adminProductsFormActive')} value={!!form.active} onChange={(v) => onChange('active', v)} />
    </>
  );
};



