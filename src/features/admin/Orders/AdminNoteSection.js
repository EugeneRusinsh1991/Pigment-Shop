import { Text } from '@/components/ui/Text';
import { View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { colors, layout } from '../../../theme/tokens';
import { FieldTextarea } from '../SharedFormComponents';
import styles from './OrdersStyles';

export default function AdminNoteSection({ note, setNote }) {
  const { t } = useLanguage();

  return (
    <>
      <Text variant="h4" style={styles.sectionTitle}>{t('adminUserNote')}</Text>
      <View style={styles.detailCard}>
        <FieldTextarea
          value={note}
          onChangeText={setNote}
          placeholder={t('adminUserNotePlaceholder')}
          placeholderTextColor={colors.textDescDark}
          numberOfLines={4}
          inputStyle={[
            styles.adminNoteInput,
            {
              borderColor: colors.secondaryLightBorder,
              borderWidth: layout.borderWidth.thin,
              borderRadius: layout.radii.xs,
              padding: layout.spacing.md,
              minHeight: 100,
            },
          ]}
        />
      </View>
    </>
  );
}
