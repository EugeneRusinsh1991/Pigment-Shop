import { StyleSheet, Platform } from 'react-native';
import { layout, shadows } from '../../theme/tokens';

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: layout.zIndices.modal,
  },
  content: {
    width: '100%',
    maxWidth: 420,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: layout.radii.md,
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  message: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
