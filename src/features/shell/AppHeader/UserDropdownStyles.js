import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../theme/tokens';
import appHeaderStyles from './AppHeaderStyles';

const UserDropdownStyles = StyleSheet.create({
  dropdown: {
    ...appHeaderStyles.dropdown,
    width: 180,
    borderRadius: layout.radii.md,
  },
  dropdownDark: appHeaderStyles.dropdownDark,
  dropdownLight: appHeaderStyles.dropdownLight,
  dropdownItem: {
    ...appHeaderStyles.dropdownItem,
    justifyContent: 'flex-start',
    minHeight: 36,
  },
  dropdownText: appHeaderStyles.dropdownText,
  textDark: appHeaderStyles.textDark,
  textLight: appHeaderStyles.textLight,
  subtextDark: appHeaderStyles.subtextDark,
  subtextLight: appHeaderStyles.subtextLight,
  userHeader: {
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.lg,
    borderBottomWidth: layout.borderWidth.thin,
    marginBottom: layout.spacing.xxs,
  },
});

export default UserDropdownStyles;
