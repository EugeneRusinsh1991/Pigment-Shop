import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

function createSearchStyles() {
  const searchVariants = {
    // Light Theme Variants
    defaultLight: {
      container: {
        backgroundColor: colors.surfaceSubtleLight,
        borderColor: colors.borderSlateLight,
      },
      text: { color: colors.textStrongLight },
      icon: { color: colors.textMutedLight },
    },
    toolbarLight: {
      container: {
        backgroundColor: colors.surfaceLight,
        borderColor: colors.borderSlateLight,
      },
      text: { color: colors.textStrongLight },
      icon: { color: colors.textMutedLight },
    },

    // Dark Theme Variants
    defaultDark: {
      container: {
        backgroundColor: colors.surfaceSubtleDark,
        borderColor: colors.borderSlateDark,
      },
      text: { color: colors.textDark },
      icon: { color: colors.textMutedDark },
    },
    toolbarDark: {
      container: {
        backgroundColor: colors.surfaceDark,
        borderColor: colors.borderSlateDark,
      },
      text: { color: colors.textDark },
      icon: { color: colors.textMutedDark },
    },
  };

  const flat = {
    containerBase: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 44,
      borderRadius: layout.radii.sm,
      borderWidth: 1,
      paddingHorizontal: 12,
    },
    containerFocused: {
      borderColor: colors.infoStrong,
    },
    inputBase: {
      flex: 1,
      paddingVertical: 0,
      paddingHorizontal: 8,
    },
    searchIconWrapper: {
      alignItems: 'center',
      justify: 'center',
    },
    clearButton: {
      padding: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdownOverlay: {
      position: 'absolute',
      top: 48,
      left: 0,
      right: 0,
      zIndex: layout.zIndices.dropdown,
      borderRadius: layout.radii.sm,
      borderWidth: 1,
      overflow: 'hidden',
    },
  };

  for (const [key, val] of Object.entries(searchVariants)) {
    flat[key] = val.container;
    flat[`text_${key}`] = val.text;
    flat[`icon_${key}`] = val.icon;
  }

  return StyleSheet.create(flat);
}

export default createSearchStyles();
