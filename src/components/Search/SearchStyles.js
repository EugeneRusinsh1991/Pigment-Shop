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
      paddingHorizontal: layout.spacing.md,
    },
    containerFocused: {
      borderColor: colors.infoStrong,
    },
    inputBase: {
      flex: 1,
      paddingVertical: 0,
      paddingHorizontal: layout.spacing.sm,
    },
    searchIconWrapper: {
      alignItems: 'center',
      justify: 'center',
    },
    clearButton: {
      padding: layout.spacing.xxs,
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
    autocompleteContainer: {
      position: 'relative',
      width: '100%',
      zIndex: layout.zIndices.dropdown,
    },
    resultRowContent: {
      minHeight: 44,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: layout.spacing.md,
      gap: layout.spacing.sm,
    },
    resultImage: {
      width: layout.spacing.xl,
      height: layout.spacing.xl,
      borderRadius: layout.radii.xs,
    },
    resultText: {
      flex: 1,
    },
    emptyText: {
      padding: layout.spacing.md,
      textAlign: 'center',
    },
    moreText: {
      padding: layout.spacing.sm,
      textAlign: 'center',
    },
    scrollView: {
      maxHeight: 300,
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
