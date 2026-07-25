import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './OrdersStyles';

export default function AdminNoteSection({ note, setNote }) {
  const { t } = useTheme();

  return (
    <>
      <Text style={styles.sectionTitle}>{t('adminUserNote')}</Text>
      <View style={styles.detailCard}>
        <TextInput
          style={[
            styles.adminNoteInput,
            {
              borderColor: '#e2e8f0',
              borderWidth: 1,
              borderRadius: 6,
              padding: 12,
              minHeight: 100,
            },
          ]}
          multiline
          numberOfLines={4}
          placeholder={t('adminUserNotePlaceholder')}
          placeholderTextColor="#94a3b8"
          value={note}
          onChangeText={setNote}
        />
      </View>
    </>
  );
}
