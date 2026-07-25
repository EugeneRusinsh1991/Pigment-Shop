import { Alert, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * Shared hook for cross-platform delete confirmations.
 * Handles `window.confirm` for web and `Alert.alert` for native platforms.
 */
export function useDeleteConfirmation() {
  const { t } = useTheme();

  const confirmDelete = ({
    title = t('confirmDeleteDefaultTitle'),
    message = t('confirmDeleteDefaultMsg'),
    confirmText = t('confirmDeleteYes'),
    cancelText = t('confirmDeleteCancel'),
    onConfirm,
  }) => {
    if (Platform.OS === 'web') {
      // For web, use the native browser confirmation dialog which blocks the thread
      const confirmed = window.confirm(`${title ? title + '\n\n' : ''}${message}`);
      if (confirmed && onConfirm) {
        onConfirm();
      }
    } else {
      // For mobile, use React Native's async Alert system
      Alert.alert(
        title,
        message,
        [
          { text: cancelText, style: 'cancel' },
          {
            text: confirmText,
            style: 'destructive',
            onPress: () => {
              if (onConfirm) onConfirm();
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return { confirmDelete };
}
