import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/tokens';

export const VARIANTS = {
  h1: { fontSize: 32, lineHeight: 38, fontWeight: '700', fontFamily: fonts.serif },
  h2: { fontSize: 24, lineHeight: 30, fontWeight: '600', fontFamily: fonts.serif },
  h3: { fontSize: 20, lineHeight: 26, fontWeight: '600', fontFamily: fonts.sans },
  h4: { fontSize: 18, lineHeight: 24, fontWeight: '600', fontFamily: fonts.sans },
  subtitle1: { fontSize: 16, lineHeight: 22, fontWeight: '500', fontFamily: fonts.sans },
  subtitle2: { fontSize: 14, lineHeight: 20, fontWeight: '500', fontFamily: fonts.sans },
  body1: { fontSize: 16, lineHeight: 24, fontWeight: '400', fontFamily: fonts.sans },
  body2: { fontSize: 14, lineHeight: 20, fontWeight: '400', fontFamily: fonts.sans },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400', fontFamily: fonts.sans },
  overline: { fontSize: 10, lineHeight: 14, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', fontFamily: fonts.sans },
};

const colorPresetMap = {
  secondary: (isDark) => isDark ? colors.textMutedDark : colors.textMutedLight,
  muted:     (isDark) => isDark ? colors.textMutedDark : colors.textMutedLight,
  desc:      (isDark) => isDark ? colors.textDescDark : colors.textDescLight,
  subtle:    (isDark) => isDark ? colors.textSubtleDark : colors.textSubtleLight,
  strong:    (isDark) => isDark ? colors.textStrongDark : colors.textStrongLight,
  accent:    () => colors.accent,
  danger:    () => colors.danger,
  success:   () => colors.success,
  warning:   (isDark) => isDark ? colors.warningMid : colors.warningDark,
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

