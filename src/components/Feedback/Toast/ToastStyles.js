import { StyleSheet } from 'react-native';
import { layout, shadows } from '../../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: layout.spacing.xl - 4,
    alignSelf: 'center',
    paddingHorizontal: layout.spacing.lg + 4,
    paddingVertical: layout.spacing.md,
    borderRadius: layout.radii.md,
    borderWidth: layout.borderWidth.thin,
    maxWidth: '90%',
    zIndex: layout.zIndices.toast,
    ...shadows.dropdownLight.web,
  },
  text: {
    textAlign: 'center',
  },
});
