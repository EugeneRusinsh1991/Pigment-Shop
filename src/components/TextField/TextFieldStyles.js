import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export const SIZES = {
  sm: {
    height: 36,
    paddingHorizontal: 10,
    fontSize: 13,
    iconSize: 16,
    borderRadius: layout.radii.xs,
  },
  md: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 14,
    iconSize: 18,
    borderRadius: layout.radii.sm,
  },
  lg: {
    height: 52,
    paddingHorizontal: 16,
    fontSize: 15,
    iconSize: 20,
    borderRadius: layout.radii.md,
  },
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textLight,
    marginBottom: 6,
  },
  labelDark: {
    color: colors.textDark,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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
    opacity: 0.6,
  },
  input: {
    flex: 1,
    color: colors.textLight,
    paddingVertical: 0,
    margin: 0,
  },
  inputDark: {
    color: colors.textDark,
  },
  inputMultiline: {
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  leadingIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  trailingIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
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

function getInputStyles(sizeTokens, multiline, isDark) {
  return [
    styles.input,
    { fontSize: sizeTokens.fontSize },
    multiline ? styles.inputMultiline : null,
    isDark ? styles.inputDark : null,
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
} = {}) {
  const sizeTokens = SIZES[size] || SIZES.md;
  const computedHeight = multiline
    ? height || Math.max(sizeTokens.height, numberOfLines * 22 + 16)
    : height || sizeTokens.height;

  return {
    container: getContainerStyles(fullWidth, width),
    label: getLabelStyles(isDark),
    inputWrapper: getInputWrapperStyles(sizeTokens, computedHeight, multiline, isDark, focused, error, disabled),
    input: getInputStyles(sizeTokens, multiline, isDark),
    leadingIcon: styles.leadingIconContainer,
    trailingIcon: styles.trailingIconContainer,
    helperText: getHelperTextStyles(isDark, error),
    sizeTokens,
  };
}

export default styles;
