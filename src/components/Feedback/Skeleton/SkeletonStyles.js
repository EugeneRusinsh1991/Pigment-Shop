import { StyleSheet } from 'react-native';
import { layout } from '../../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    gap: layout.spacing.md,
    paddingVertical: layout.spacing.md,
  },
  skeleton: {
    overflow: 'hidden',
  },
});
