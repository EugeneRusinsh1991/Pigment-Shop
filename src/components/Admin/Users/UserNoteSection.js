import React from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { FieldTextarea } from '../SharedFormComponents';
import styles from './UsersStyles';

export default function UserNoteSection({ note, setNote, loadingNote }) {
  const { t } = useTheme();
  return (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{t('adminUserNote')}</Text>
      {loadingNote ? (
        <ActivityIndicator color="#E87A8E" style={{ marginVertical: 20 }} />
      ) : (
        <FieldTextarea
          value={note}
          onChangeText={setNote}
          placeholder={t('adminUserNotePlaceholder')}
          placeholderTextColor="#CBD5E1"
          numberOfLines={4}
          inputStyle={styles.noteInput}
        />
      )}
    </View>
  );
}
