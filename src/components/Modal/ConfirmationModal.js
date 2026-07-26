import React from 'react';
import { View } from 'react-native';
import { Text, Heading } from '../Text';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../Button';
import Modal from './Modal';
import { modalStyles as styles } from './ModalStyles';
import { useModalTheme } from './useModalTheme';

const VARIANT_MAP = { primary: 'primary', success: 'success' };

function firstDefined(...vals) {
  return vals.find((v) => v != null && v !== '') ?? vals[vals.length - 1];
}

function resolveModalTexts(t, confirmText, cancelText, title) {
  return {
    confirmText: firstDefined(confirmText, t('confirmDeleteYes'), 'Confirm'),
    cancelText: firstDefined(cancelText, t('confirmDeleteCancel'), 'Cancel'),
    title: firstDefined(title, t('confirmDeleteDefaultTitle'), 'Are you sure?'),
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
  const { t } = useTheme();
  const { cardBg, titleColor, messageColor, cardShadow } = useModalTheme();

  if (!visible) return null;

  const { confirmText: resolvedConfirmText, cancelText: resolvedCancelText, title: resolvedTitle } = resolveModalTexts(t, confirmText, cancelText, title);
  const confirmVariant = VARIANT_MAP[variant] || 'danger';

  return (
    <Modal
      visible={visible}
      onClose={onCancel}
      contentStyle={[styles.card, { backgroundColor: cardBg, ...cardShadow }]}
      {...modalProps}
    >
      {resolvedTitle ? (
        <Heading level={4} style={[styles.title, { color: titleColor }]}>{resolvedTitle}</Heading>
      ) : null}
      {message ? (
        <Text variant="body2" style={[styles.message, { color: messageColor }]}>{message}</Text>
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

