import { StyleSheet } from 'react-native';
import { layout, shadows } from '../../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: layout.spacing.md,
    borderRadius: layout.radii.md,
    borderWidth: 1,
    maxWidth: '90%',
    zIndex: layout.zIndices.toast,
    ...shadows.dropdownLight.web,
  },
  text: {
    textAlign: 'center',
  },
});
