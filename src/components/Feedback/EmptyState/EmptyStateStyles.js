import { StyleSheet } from 'react-native';
import { layout } from '../../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
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
    marginTop: 20,
  },
});
