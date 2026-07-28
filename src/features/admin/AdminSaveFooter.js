import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/Button';
import { colors, layout } from '@/theme/tokens';

function getSaveButtonTitle(isSaving, t) {
  if (isSaving) {
    return t('btnSavingLabel') || 'Saving...';
  }
  return t('btnSaveLabel') || 'Save Changes';
}

export default function AdminSaveFooter({ isDirty, isSaving, onSave }) {
  const { t } = useTheme();

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
          size="lg"
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
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: layout.zIndices.dropdown,
  },
  footer: {
    padding: layout.spacing.lg,
    backgroundColor: colors.surfaceLight,
    borderTopWidth: 1,
    borderTopColor: colors.borderSlateLight,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    minWidth: 160,
  },
});
