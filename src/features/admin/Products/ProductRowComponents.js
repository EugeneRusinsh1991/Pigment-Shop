import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { Button, IconButton } from '@/components/ui/Button';
import { EditIcon, TrashIcon } from '@/components/Icons';
import { Badge } from '@/components/ui/Badge';
import { colors, layout } from '../../../theme/tokens';
import styles from './ProductsStyles';
import { getLocalizedValue } from '../../../utils/localization';
export { getEffectivePrice } from '../../../utils/pricing';


export function resolveLocalizedValue(val, lang) {
  return getLocalizedValue(val, lang);
}

export const getRowStyle = (index, isMobile) => {
  if (isMobile) {
    return [styles.tableRow, index % 2 === 1 && styles.tableRowAlt];
  }
  return [styles.tableRowDesktop, index % 2 === 1 && styles.tableRowAlt];
};

export const getPlaceholderVal = (val) => val || '—';

export function getHighlightStyle(isNew, discountPercent) {
  return null;
}

export function NewBadge() {
  const { t } = useLanguage();
  return (
    <Badge variant="new" label={t('badgeNew')} size="sm" />
  );
}

export function StatusBadge({ active }) {
  const { t } = useLanguage();
  return (
    <Badge
      variant="status"
      status={active ? 'active' : 'inactive'}
      label={active ? t('adminProductsActive') : t('adminProductsInactive')}
      size="sm"
    />
  );
}

export function DiscountCell({ discountPercent }) {
  if (discountPercent > 0) {
    return <Badge.Discount value={discountPercent} />;
  }
  return <Text style={[styles.discountNone, styles.colDiscount]}>—</Text>;
}

export function ProductRowActions({ product, onEdit, onDelete }) {
  return (
    <View style={styles.rowActionsCompact}>
      <IconButton
        icon={<EditIcon size={14} />}
        onPress={() => onEdit(product)}
        size="sm"
        variant="transparent"
      />
      {onDelete && (
        <IconButton
          icon={<TrashIcon size={14} />}
          onPress={() => onDelete(product)}
          size="sm"
          variant="transparent"
          haptic="warning"
        />
      )}
    </View>
  );
}
