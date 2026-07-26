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

export function getTextColor(colorPreset = 'primary', isDark = false) {
  if (colorPreset && colorPreset.startsWith && (colorPreset.startsWith('#') || colorPreset.startsWith('rgb'))) {
    return colorPreset;
  }
  switch (colorPreset) {
    case 'secondary':
    case 'muted':
      return isDark ? colors.textMutedDark : colors.textMutedLight;
    case 'desc':
      return isDark ? colors.textDescDark : colors.textDescLight;
    case 'subtle':
      return isDark ? colors.textSubtleDark : colors.textSubtleLight;
    case 'strong':
      return isDark ? colors.textStrongDark : colors.textStrongLight;
    case 'accent':
      return colors.accent;
    case 'danger':
      return colors.danger;
    case 'success':
      return colors.success;
    case 'warning':
      return isDark ? colors.warningMid : colors.warningDark;
    case 'white':
      return colors.white;
    case 'black':
      return colors.black;
    case 'primary':
    default:
      return isDark ? colors.textDark : colors.textLight;
  }
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

  const styleObj = {
    ...baseVariant,
    color: textColor,
  };

  if (align) styleObj.textAlign = align;
  if (weight) styleObj.fontWeight = weight;
  if (font) styleObj.fontFamily = font;
  if (size !== undefined) styleObj.fontSize = size;
  if (lineHeight !== undefined) styleObj.lineHeight = lineHeight;

  return StyleSheet.create({ text: styleObj });
}
