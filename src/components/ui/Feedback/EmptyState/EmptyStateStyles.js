import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: layout.spacing.xxl,
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
    marginTop: layout.spacing.xl,
  },
  retryButton: {
    marginTop: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: layout.radii.sm,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
  },
});
