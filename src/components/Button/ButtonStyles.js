import { StyleSheet } from 'react-native';
import { buttonColors } from '../../theme/buttonCommon';
import { buttonTokens } from '../../theme/tokens';

/**
 * Generates button styles dynamically from design tokens.
 * Replaces manual theme × variant enumeration with a factory.
 */
function createButtonStyles() {
  const { dark, white, accent, danger, success,
    secondaryLightBg, secondaryLightBorder, secondaryLightText,
    secondaryDarkBg, secondaryDarkBorder, secondaryDarkText,
    outlineLightBorder, outlineDarkBorder,
    dangerSoftLightBg, dangerSoftLightBorder, dangerSoftLightText,
    dangerSoftDarkBg, dangerSoftDarkBorder,
  } = buttonColors;

  const variants = {
    // Light theme
    primaryLight:     { container: { backgroundColor: dark,               borderColor: dark               }, text: { color: white  } },
    accentLight:      { container: { backgroundColor: accent,             borderColor: accent             }, text: { color: white  } },
    secondaryLight:   { container: { backgroundColor: secondaryLightBg,   borderColor: secondaryLightBorder }, text: { color: secondaryLightText } },
    outlineLight:     { container: { backgroundColor: 'transparent',      borderColor: outlineLightBorder  }, text: { color: dark   } },
    dangerLight:      { container: { backgroundColor: danger,             borderColor: danger              }, text: { color: white  } },
    dangerSoftLight:  { container: { backgroundColor: dangerSoftLightBg,  borderColor: dangerSoftLightBorder }, text: { color: dangerSoftLightText } },
    successLight:     { container: { backgroundColor: success,            borderColor: success             }, text: { color: white  } },

    // Dark theme
    primaryDark:      { container: { backgroundColor: white,              borderColor: white               }, text: { color: dark   } },
    accentDark:       { container: { backgroundColor: accent,             borderColor: accent              }, text: { color: white  } },
    secondaryDark:    { container: { backgroundColor: secondaryDarkBg,    borderColor: secondaryDarkBorder  }, text: { color: secondaryDarkText  } },
    outlineDark:      { container: { backgroundColor: 'transparent',      borderColor: outlineDarkBorder   }, text: { color: white  } },
    dangerDark:       { container: { backgroundColor: danger,             borderColor: danger              }, text: { color: white  } },
    dangerSoftDark:   { container: { backgroundColor: dangerSoftDarkBg,   borderColor: dangerSoftDarkBorder }, text: { color: white  } },
    successDark:      { container: { backgroundColor: success,            borderColor: success             }, text: { color: white  } },
    ghostLight:       { container: { backgroundColor: 'transparent',      borderColor: 'transparent'       }, text: { color: dark   } },
    ghostDark:        { container: { backgroundColor: 'transparent',      borderColor: 'transparent'       }, text: { color: white  } },
  };

  // Build flat style map for StyleSheet.create
  const flat = {
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    textBase: {
      fontWeight: '600',
      textAlign: 'center',
    },

    // Sizes
    sm: {
      height: buttonTokens.sizes.sm.height,
      paddingHorizontal: buttonTokens.sizes.sm.paddingHorizontal,
      borderRadius: buttonTokens.sizes.sm.borderRadius,
    },
    md: {
      height: buttonTokens.sizes.md.height,
      paddingHorizontal: buttonTokens.sizes.md.paddingHorizontal,
      borderRadius: buttonTokens.sizes.md.borderRadius,
    },
    lg: {
      height: buttonTokens.sizes.lg.height,
      paddingHorizontal: buttonTokens.sizes.lg.paddingHorizontal,
      borderRadius: buttonTokens.sizes.lg.borderRadius,
    },

    // Text sizes
    text_sm: { fontSize: buttonTokens.sizes.sm.fontSize },
    text_md: { fontSize: buttonTokens.sizes.md.fontSize },
    text_lg: { fontSize: buttonTokens.sizes.lg.fontSize },

    // State modifiers
    fullWidth:    { width: '100%' },
    disabled:     { opacity: 0.5 },
    textDisabled: { opacity: 0.8 },
  };

  // Flatten variant containers and texts into the style map
  for (const [key, val] of Object.entries(variants)) {
    flat[key]           = val.container;
    flat[`text_${key}`] = val.text;
  }

  return StyleSheet.create(flat);
}

export default createButtonStyles();
