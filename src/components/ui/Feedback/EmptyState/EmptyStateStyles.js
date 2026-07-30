import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../../theme/tokens';

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
    paddingVertical: layout.spacing.md - 2,
    paddingHorizontal: layout.spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: layout.radii.sm,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
  },
});
