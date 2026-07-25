import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { colors, layout, shadows } from '../../theme/tokens';
import { Button } from '../Button';
import Modal from './Modal';

const VARIANT_MAP = { primary: 'primary', success: 'success' };

function resolveModalTexts(t, confirmText, cancelText, title) {
  return {
    confirmText: confirmText || t('confirmDeleteYes') || 'Confirm',
    cancelText: cancelText || t('confirmDeleteCancel') || 'Cancel',
    title: title || t('confirmDeleteDefaultTitle') || 'Are you sure?',
  };
}

function resolveModalTheme(isDark) {
  return {
    cardBg: isDark ? colors.surfaceDark : colors.surfaceLight,
    titleColor: isDark ? colors.textDark : colors.textLight,
    messageColor: isDark ? colors.textMutedDark : colors.textMutedLight,
  };
}

export default function ConfirmationModal({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  variant = 'danger',
  loading = false,
  ...modalProps
}) {
  const { isDark, t } = useTheme();

  if (!visible) return null;

  const { confirmText: resolvedConfirmText, cancelText: resolvedCancelText, title: resolvedTitle } = resolveModalTexts(t, confirmText, cancelText, title);
  const { cardBg, titleColor, messageColor } = resolveModalTheme(isDark);
  const confirmVariant = VARIANT_MAP[variant] || 'danger';

  return (
    <Modal
      visible={visible}
      onClose={onCancel}
      contentStyle={[styles.card, { backgroundColor: cardBg }]}
      {...modalProps}
    >
      {resolvedTitle ? (
        <Text style={[styles.title, { color: titleColor }]}>{resolvedTitle}</Text>
      ) : null}
      {message ? (
        <Text style={[styles.message, { color: messageColor }]}>{message}</Text>
      ) : null}
      <View style={styles.footer}>
        <Button
          title={resolvedCancelText}
          onPress={onCancel}
          variant="secondary"
          size="md"
          disabled={loading}
        />
        <Button
          title={resolvedConfirmText}
          onPress={onConfirm}
          variant={confirmVariant}
          size="md"
          loading={loading}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: layout.radii.md,
    padding: 24,
    ...shadows.modalLight.web,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
