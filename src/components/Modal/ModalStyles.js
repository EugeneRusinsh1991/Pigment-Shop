import { StyleSheet, Platform } from 'react-native';
import { layout, shadows } from '../../theme/tokens';

const OVERLAY_PADDING = 20;

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: OVERLAY_PADDING,
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
    padding: layout.spacing.xl,
  },
  title: {
    marginBottom: layout.spacing.sm,
  },
  message: {
    marginBottom: layout.spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: layout.spacing.md,
  },
});
