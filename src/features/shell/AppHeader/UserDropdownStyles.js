import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../theme/tokens';
import appHeaderStyles from './AppHeaderStyles';

const UserDropdownStyles = StyleSheet.create({
  dropdown: {
    ...appHeaderStyles.dropdown,
    width: 180,
  },
  dropdownDark: appHeaderStyles.dropdownDark,
  dropdownLight: appHeaderStyles.dropdownLight,
  dropdownItem: {
    ...appHeaderStyles.dropdownItem,
    justifyContent: 'flex-start',
  },
  dropdownText: appHeaderStyles.dropdownText,
  textDark: appHeaderStyles.textDark,
  textLight: appHeaderStyles.textLight,
  subtextDark: appHeaderStyles.subtextDark,
  subtextLight: appHeaderStyles.subtextLight,
  userHeader: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderBottomWidth: layout.borderWidth.thin,
    marginBottom: layout.spacing.xxs,
  },
});

export default UserDropdownStyles;
