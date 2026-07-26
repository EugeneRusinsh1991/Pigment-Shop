import { colors } from '../../theme/tokens';

export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const colorPresetMap = {
  primary: (isDark) => (isDark ? colors.textDark : colors.textLight),
  secondary: (isDark) => (isDark ? colors.textMutedDark : colors.textMutedLight),
  muted: (isDark) => (isDark ? colors.textMutedDark : colors.textMutedLight),
  desc: (isDark) => (isDark ? colors.textDescDark : colors.textDescLight),
  subtle: (isDark) => (isDark ? colors.textSubtleDark : colors.textSubtleLight),
  accent: () => colors.accent,
  danger: () => colors.danger,
  success: () => colors.success,
  warning: (isDark) => (isDark ? colors.warningMid : colors.warningDark),
  white: () => colors.white,
  black: () => colors.black,
};

export function getIconColor(colorPreset = 'currentColor', isDark = false) {
  if (!colorPreset || colorPreset === 'currentColor') {
    return colorPreset || 'currentColor';
  }
  if (typeof colorPreset === 'string' && (colorPreset.startsWith('#') || colorPreset.startsWith('rgb') || colorPreset.startsWith('hsl'))) {
    return colorPreset;
  }
  const resolver = colorPresetMap[colorPreset];
  return resolver ? resolver(isDark) : colorPreset;
}

export function getIconSize(size = 'md') {
  if (typeof size === 'number') {
    return size;
  }
  return ICON_SIZES[size] || ICON_SIZES.md;
}
