import { useCallback, useState } from 'react';
import { ConfirmationModal } from '../components/ui/Modal';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useDrawerBackHandler } from './useProductNavigation';

/**
 * Shared hook for cross-platform delete confirmations.
 * Uses custom themed ConfirmationModal.
 */
export function useDeleteConfirmation() {
  const { t } = useLanguage();
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

  useDrawerBackHandler(dialogState.visible, closeConfirm);

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
