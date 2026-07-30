import { StyleSheet } from 'react-native';
import { colors, fonts, typography } from '../../../theme/tokens';

export const VARIANTS = {
  display: { fontSize: typography.sizes.display, lineHeight: typography.lineHeights.display, fontWeight: typography.weights.bold, fontFamily: fonts.serif, letterSpacing: typography.letterSpacing.tight },
  h1: { fontSize: typography.sizes.h1, lineHeight: typography.lineHeights.h1, fontWeight: typography.weights.bold, fontFamily: fonts.serif, letterSpacing: typography.letterSpacing.tight },
  h2: { fontSize: typography.sizes.h2, lineHeight: typography.lineHeights.h2, fontWeight: typography.weights.bold, fontFamily: fonts.serif, letterSpacing: typography.letterSpacing.tight },
  h3: { fontSize: typography.sizes.h3, lineHeight: typography.lineHeights.h3, fontWeight: typography.weights.semibold, fontFamily: fonts.sans, letterSpacing: typography.letterSpacing.normal },
  h4: { fontSize: typography.sizes.md, lineHeight: typography.lineHeights.md, fontWeight: typography.weights.semibold, fontFamily: fonts.sans, letterSpacing: typography.letterSpacing.normal },
  subtitle1: { fontSize: typography.sizes.md, lineHeight: typography.lineHeights.md, fontWeight: typography.weights.medium, fontFamily: fonts.sans, letterSpacing: typography.letterSpacing.normal },
  subtitle2: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.sm, fontWeight: typography.weights.medium, fontFamily: fonts.sans, letterSpacing: typography.letterSpacing.normal },
  body1: { fontSize: typography.sizes.body1, lineHeight: typography.lineHeights.body1, fontWeight: typography.weights.regular, fontFamily: fonts.sans, letterSpacing: typography.letterSpacing.normal },
  body2: { fontSize: typography.sizes.body2, lineHeight: typography.lineHeights.body2, fontWeight: typography.weights.regular, fontFamily: fonts.sans, letterSpacing: typography.letterSpacing.normal },
  caption: { fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption, fontWeight: typography.weights.regular, fontFamily: fonts.sans, letterSpacing: typography.letterSpacing.wide },
  label: { fontSize: typography.sizes.label, lineHeight: typography.lineHeights.label, fontWeight: typography.weights.medium, fontFamily: fonts.sans, letterSpacing: typography.letterSpacing.wide },
  overline: { fontSize: typography.sizes.xxs, lineHeight: typography.lineHeights.xxs, fontWeight: typography.weights.bold, letterSpacing: typography.letterSpacing.widest, textTransform: 'uppercase', fontFamily: fonts.sans },
};

const colorPresetMap = {
  secondary: (isDark) => isDark ? colors.textMutedDark : colors.textMutedLight,
  muted:     (isDark) => isDark ? colors.textMutedDark : colors.textMutedLight,
  desc:      (isDark) => isDark ? colors.textDescDark : colors.textDescLight,
  subtle:    (isDark) => isDark ? colors.textSubtleDark : colors.textSubtleLight,
  strong:    (isDark) => isDark ? colors.textStrongDark : colors.textStrongLight,
  accent:    () => colors.accent,
  danger:    () => colors.danger,
  error:     () => colors.danger,
  success:   () => colors.success,
  warning:   (isDark) => isDark ? colors.warningMid : colors.warningDark,
  info:      (isDark) => isDark ? colors.infoLight : colors.infoDeep,
  inverse:   (isDark) => isDark ? colors.textLight : colors.textDark,
  white:     () => colors.white,
  black:     () => colors.black,
  primary:   (isDark) => isDark ? colors.textDark : colors.textLight,
};

export function getTextColor(colorPreset = 'primary', isDark = false) {
  if (colorPreset && colorPreset.startsWith && (colorPreset.startsWith('#') || colorPreset.startsWith('rgb'))) {
    return colorPreset;
  }
  const resolver = colorPresetMap[colorPreset] || colorPresetMap.primary;
  return resolver(isDark);
}


export function getTextStyle({
  variant = 'body1',
  color = 'primary',
  isDark = false,
  align,
  weight,
  font,
  size,
  lineHeight,
} = {}) {
  const baseVariant = VARIANTS[variant] || VARIANTS.body1;
  const textColor = getTextColor(color, isDark);

  const overrides = { textAlign: align, fontWeight: weight, fontFamily: font, fontSize: size, lineHeight };
  const filtered = Object.fromEntries(Object.entries(overrides).filter(([, v]) => v !== undefined));

  return StyleSheet.create({ text: { ...baseVariant, color: textColor, ...filtered } });
}

export const TextStyles = {
  VARIANTS,
  getTextColor,
  getTextStyle,
};

export default TextStyles;

