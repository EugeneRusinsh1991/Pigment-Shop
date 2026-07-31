import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useLanguage } from '../../../context/LanguageContext';
import { FieldTextarea } from '../SharedFormComponents';
import { colors } from '../../../theme/tokens';
import styles from './UsersStyles';

export default function UserNoteSection({ note, setNote, loadingNote }) {
  const { t } = useLanguage();
  return (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle} size={14} weight="bold">{t('adminUserNote')}</Text>
      {loadingNote ? (
        <ActivityIndicator color={colors.accentPinkLight} style={styles.loadingIndicator} />
      ) : (
        <FieldTextarea
          value={note}
          onChangeText={setNote}
          placeholder={t('adminUserNotePlaceholder')}
          placeholderTextColor={colors.slateStrong}
          numberOfLines={4}
          inputStyle={styles.noteInput}
        />
      )}
    </View>
  );
}
