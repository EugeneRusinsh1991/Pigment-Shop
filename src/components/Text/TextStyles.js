import { StyleSheet } from 'react-native';
import { colors, fonts, typography } from '../../theme/tokens';

export const VARIANTS = {
  h1: { fontSize: typography.sizes.xxl, lineHeight: 34, fontWeight: typography.weights.bold, fontFamily: fonts.serif },
  h2: { fontSize: typography.sizes.xl, lineHeight: 30, fontWeight: typography.weights.bold, fontFamily: fonts.serif },
  h3: { fontSize: typography.sizes.lg, lineHeight: 26, fontWeight: typography.weights.semibold, fontFamily: fonts.sans },
  h4: { fontSize: typography.sizes.md, lineHeight: 22, fontWeight: typography.weights.semibold, fontFamily: fonts.sans },
  subtitle1: { fontSize: typography.sizes.md, lineHeight: 22, fontWeight: typography.weights.medium, fontFamily: fonts.sans },
  subtitle2: { fontSize: typography.sizes.sm, lineHeight: 18, fontWeight: typography.weights.medium, fontFamily: fonts.sans },
  body1: { fontSize: typography.sizes.md, lineHeight: 24, fontWeight: typography.weights.regular, fontFamily: fonts.sans },
  body2: { fontSize: typography.sizes.sm, lineHeight: 20, fontWeight: typography.weights.regular, fontFamily: fonts.sans },
  caption: { fontSize: typography.sizes.xs, lineHeight: 16, fontWeight: typography.weights.regular, fontFamily: fonts.sans },
  overline: { fontSize: typography.sizes.xxs, lineHeight: 14, fontWeight: typography.weights.bold, letterSpacing: 1, textTransform: 'uppercase', fontFamily: fonts.sans },
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

