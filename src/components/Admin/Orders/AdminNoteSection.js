import React from 'react';
import { View } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../context/ThemeContext';
import { FieldTextarea } from '../SharedFormComponents';
import styles from './OrdersStyles';

export default function AdminNoteSection({ note, setNote }) {
  const { t } = useTheme();

  return (
    <>
      <Text style={styles.sectionTitle}>{t('adminUserNote')}</Text>
      <View style={styles.detailCard}>
        <FieldTextarea
          value={note}
          onChangeText={setNote}
          placeholder={t('adminUserNotePlaceholder')}
          placeholderTextColor="#94a3b8"
          numberOfLines={4}
          inputStyle={[
            styles.adminNoteInput,
            {
              borderColor: '#e2e8f0',
              borderWidth: 1,
              borderRadius: 6,
              padding: 12,
              minHeight: 100,
            },
          ]}
        />
      </View>
    </>
  );
}
