import { Text, TouchableOpacity, TextInput, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './UsersStyles';

export default function UserNoteSection({ note, setNote, loadingNote, savingNote, onSave }) {
  const { t } = useTheme();
  return (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{t('adminUserNote')}</Text>
      {loadingNote ? (
        <ActivityIndicator color="#E87A8E" style={{ marginVertical: 20 }} />
      ) : (
        <>
          <TextInput
            style={styles.noteInput}
            placeholder={t('adminUserNotePlaceholder')}
            placeholderTextColor="#CBD5E1"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
            editable={!savingNote}
          />
          <View style={styles.noteActions}>
            <TouchableOpacity
              style={[styles.noteSaveBtn, savingNote && styles.noteSaveBtnDisabled]}
              onPress={onSave}
              disabled={savingNote}
            >
              <Text style={styles.noteSaveBtnText}>
                {savingNote ? (t('saving') || 'Saving...') : t('btnSaveLabel')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
