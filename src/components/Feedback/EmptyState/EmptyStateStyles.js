import { StyleSheet } from 'react-native';
import { layout } from '../../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: layout.spacing.xl * 2 - 8,
    paddingHorizontal: layout.spacing.xl,
  },
  iconWrapper: {
    marginBottom: layout.spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: layout.spacing.sm,
  },
  description: {
    textAlign: 'center',
    maxWidth: 360,
  },
  actionWrapper: {
    marginTop: layout.spacing.lg + 4,
  },
  retryButton: {
    marginTop: layout.spacing.md,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#E91E8C',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
