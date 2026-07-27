import { useCallback, useState } from 'react';
import { ConfirmationModal } from '../components/Modal';
import { useTheme } from '../context/ThemeContext';

/**
 * Shared hook for cross-platform delete confirmations.
 * Uses custom themed ConfirmationModal.
 */
export function useDeleteConfirmation() {
  const { t } = useTheme();
  const [dialogState, setDialogState] = useState({
    visible: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: null,
  });

  const confirmDelete = useCallback(({
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
  } = {}) => {
    setDialogState({
      visible: true,
      title: title || t('confirmDeleteDefaultTitle'),
      message: message || t('confirmDeleteDefaultMsg'),
      confirmText: confirmText || t('confirmDeleteYes'),
      cancelText: cancelText || t('confirmDeleteCancel'),
      onConfirm: () => {
        setDialogState((prev) => ({ ...prev, visible: false }));
        if (onConfirm) onConfirm();
      },
    });
  }, [t]);

  const closeConfirm = useCallback(() => {
    setDialogState((prev) => ({ ...prev, visible: false }));
  }, []);

  const confirmationDialog = (
    <ConfirmationModal
      visible={dialogState.visible}
      title={dialogState.title}
      message={dialogState.message}
      confirmText={dialogState.confirmText}
      cancelText={dialogState.cancelText}
      onConfirm={dialogState.onConfirm}
      onCancel={closeConfirm}
      variant="danger"
    />
  );

  return { confirmDelete, confirmationDialog, closeConfirm };
}
