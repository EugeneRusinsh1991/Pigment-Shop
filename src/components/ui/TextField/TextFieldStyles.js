import { StyleSheet } from 'react-native';
import { colors, layout, typography } from '../../../theme/tokens';

export const SIZES = {
  sm: {
    height: 36,
    paddingHorizontal: layout.spacing.md,
    fontSize: typography.sizes.xs,
    iconSize: 16,
    borderRadius: layout.radii.xs,
  },
  md: {
    height: 44,
    paddingHorizontal: layout.spacing.md,
    fontSize: typography.sizes.sm,
    iconSize: 18,
    borderRadius: layout.radii.sm,
  },
  lg: {
    height: 52,
    paddingHorizontal: layout.spacing.lg,
    fontSize: typography.sizes.md,
    iconSize: 20,
    borderRadius: layout.radii.md,
  },
};

const SPACING_NONE = 0;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: layout.spacing.xxs,
  },
  label: {
    color: colors.textLight,
    marginBottom: layout.spacing.xs,
  },
  labelDark: {
    color: colors.textDark,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.inputBorderLight,
    backgroundColor: colors.inputBgLight,
    borderRadius: layout.radii.sm,
    width: '100%',
  },
  inputWrapperDark: {
    borderColor: colors.inputBorderDark,
    backgroundColor: colors.inputBgDark,
  },
  inputWrapperFocused: {
    borderColor: colors.accent,
  },
  inputWrapperError: {
    borderColor: colors.danger,
  },
  inputWrapperDisabled: {
    opacity: layout.opacity.muted,
  },
  input: {
    flex: 1,
    color: colors.textLight,
    paddingVertical: SPACING_NONE,
    margin: SPACING_NONE,
    outlineStyle: 'none',
    outlineWidth: 0,
  },
  inputDark: {
    color: colors.textDark,
  },
  inputMultiline: {
    textAlignVertical: 'top',
    paddingVertical: layout.spacing.md,
  },
  leadingIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.sm,
  },
  trailingIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: layout.spacing.sm,
  },
  helperText: {
    marginTop: layout.spacing.xxs,
    color: colors.textMutedLight,
  },
  helperTextDark: {
    color: colors.textMutedDark,
  },
  errorText: {
    color: colors.danger,
  },
});

function getContainerStyles(fullWidth, width) {
  return [
    styles.container,
    fullWidth ? { width: '100%' } : null,
    width ? { width } : null,
  ];
}

function getLabelStyles(isDark) {
  return [
    styles.label,
    isDark ? styles.labelDark : null,
  ];
}

function getInputWrapperStyles(sizeTokens, computedHeight, multiline, isDark, focused, error, disabled) {
  return [
    styles.inputWrapper,
    {
      height: computedHeight,
      paddingHorizontal: sizeTokens.paddingHorizontal,
      borderRadius: sizeTokens.borderRadius,
      alignItems: multiline ? 'flex-start' : 'center',
    },
    isDark ? styles.inputWrapperDark : null,
    focused ? styles.inputWrapperFocused : null,
    error ? styles.inputWrapperError : null,
    disabled ? styles.inputWrapperDisabled : null,
  ];
}

function sanitizeInputStyle(style) {
  if (!style) return null;
  const flat = Array.isArray(style)
    ? Object.assign({}, ...style.flat().filter(Boolean))
    : { ...style };
  delete flat.borderWidth;
  delete flat.borderColor;
  delete flat.borderStyle;
  delete flat.borderRadius;
  delete flat.backgroundColor;
  delete flat.height;
  return flat;
}

function getInputStyles(sizeTokens, multiline, isDark, customInputStyle) {
  return [
    styles.input,
    { fontSize: sizeTokens.fontSize },
    multiline ? styles.inputMultiline : null,
    isDark ? styles.inputDark : null,
    sanitizeInputStyle(customInputStyle),
  ];
}

function getHelperTextStyles(isDark, error) {
  return [
    styles.helperText,
    isDark ? styles.helperTextDark : null,
    error ? styles.errorText : null,
  ];
}

/**
 * Dynamic style resolver for TextField component based on state and props.
 */
export function getTextFieldStyles({
  size = 'md',
  multiline = false,
  numberOfLines = 3,
  fullWidth = true,
  width,
  height,
  disabled = false,
  error = false,
  focused = false,
  isDark = false,
  inputStyle,
} = {}) {
  const sizeTokens = SIZES[size] || SIZES.md;
  const computedHeight = multiline
    ? height || Math.max(sizeTokens.height, numberOfLines * 22 + 16)
    : height || sizeTokens.height;

  return {
    container: getContainerStyles(fullWidth, width),
    label: getLabelStyles(isDark),
    inputWrapper: getInputWrapperStyles(sizeTokens, computedHeight, multiline, isDark, focused, error, disabled),
    input: getInputStyles(sizeTokens, multiline, isDark, inputStyle),
    leadingIcon: styles.leadingIconContainer,
    trailingIcon: styles.trailingIconContainer,
    helperText: getHelperTextStyles(isDark, error),
    sizeTokens,
  };
}

export default styles;
