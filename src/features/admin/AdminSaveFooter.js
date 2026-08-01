import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { colors, layout } from '@/theme/tokens';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

function getSaveButtonTitle(isSaving, t) {
  if (isSaving) {
    return t('btnSavingLabel') || 'Saving...';
  }
  return t('btnSaveLabel') || 'Save Changes';
}

export default function AdminSaveFooter({ isDirty, isSaving, onSave }) {
  const { t } = useLanguage();

  const isVisible = isDirty || isSaving;
  if (!isVisible) {
    return null;
  }

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const buttonTitle = getSaveButtonTitle(isSaving, t);

  return (
    <KeyboardAvoidingView
      behavior={keyboardBehavior}
      style={[styles.container, { pointerEvents: 'box-none' }]}
    >
      <View style={styles.footer}>
        <Button
          variant="primary"
          size="md"
          title={buttonTitle}
          onPress={onSave}
          disabled={isSaving}
          loading={isSaving}
          style={styles.saveButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: layout.spacing.none,
    left: layout.spacing.none,
    right: layout.spacing.none,
    zIndex: layout.zIndices.dropdown,
  },
  footer: {
    padding: layout.spacing.lg,
    backgroundColor: colors.surfaceLight,
    borderTopWidth: layout.borderWidth.thin,
    ...Platform.select({
      web: { boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)' },
      default: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    minWidth: 160,
  },
});
