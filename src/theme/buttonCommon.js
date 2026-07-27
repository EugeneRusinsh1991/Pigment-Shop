import { colors, motion } from './tokens';

export const DEFAULT_ACTIVE_OPACITY = motion.press.activeOpacity;

function getThemeKey(isDark) {
  return isDark ? 'Dark' : 'Light';
}

export const buttonColors = {
  // Common colors
  dark: colors.dark,
  white: colors.white,
  accent: colors.accent,
  danger: colors.danger,
  success: colors.success,

  // Secondary
  secondaryLightBg: colors.secondaryLightBg,
  secondaryLightBorder: colors.secondaryLightBorder,
  secondaryLightText: colors.secondaryLightText,
  secondaryDarkBg: colors.secondaryDarkBg,
  secondaryDarkBorder: colors.secondaryDarkBorder,
  secondaryDarkText: colors.secondaryDarkText,

  // Base tokens used by wrappers
  surfaceLight: colors.surfaceLight,
  surfaceDark: colors.surfaceDark,
  borderLight: colors.borderLight,
  borderDark: colors.borderDark,
  textLight: colors.textLight,
  textDark: colors.textDark,
  textMutedLight: colors.textMutedLight,
  textMutedDark: colors.textMutedDark,

  // Outlines / borders
  outlineLightBorder: colors.outlineLightBorder,
  outlineDarkBorder: colors.outlineDarkBorder,

  // Soft variants
  dangerSoftLightBg: colors.dangerSoftLightBg,
  dangerSoftLightBorder: colors.dangerSoftLightBorder,
  dangerSoftLightText: colors.dangerSoftLightText,
  dangerSoftDarkBg: colors.dangerSoftDarkBg,
  dangerSoftDarkBorder: colors.dangerSoftDarkBorder,

  // Glass/Special
  glassLightBg: colors.overlayLight,
  glassDarkBg: colors.overlayDark,
  
  // Chip
  chipLightInactiveBorder: colors.chipLightInactiveBorder,
  chipLightInactiveText: colors.chipLightInactiveText,
  chipDarkInactiveBg: colors.chipDarkInactiveBg,
  chipDarkInactiveBorder: colors.chipDarkInactiveBorder,
  chipDarkInactiveText: colors.chipDarkInactiveText,
};

export function useButtonProps({ isDark = false, disabled, loading, activeOpacity = DEFAULT_ACTIVE_OPACITY, ...rest } = {}) {
  const themeKey = getThemeKey(isDark);
  
  return {
    isDark,
    themeKey,
    touchableProps: {
      disabled: disabled || loading,
      activeOpacity,
      ...rest,
    }
  };
}

export function calculateHitSlop(width, height) {
  const minTarget = 44;
  return {
    top: Math.max(0, Math.ceil((minTarget - height) / 2)),
    bottom: Math.max(0, Math.ceil((minTarget - height) / 2)),
    left: Math.max(0, Math.ceil((minTarget - width) / 2)),
    right: Math.max(0, Math.ceil((minTarget - width) / 2)),
  };
}

