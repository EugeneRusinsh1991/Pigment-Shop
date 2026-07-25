import { colors } from './tokens';

export const DEFAULT_ACTIVE_OPACITY = 0.8;

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

function resolveStyle(styleMap, keys) {
  for (const k of keys) {
    if (styleMap[k]) return styleMap[k];
  }
  return null;
}

/**
 * Resolves button container and text styles from a style map.
 * Standardizes variant resolution across Button, ChipButton, and IconButton.
 *
 * @param {object} styleMap
 * @param {string} variant
 * @param {boolean|string} isDark
 * @param {string} [state]
 * @param {string} [fallbackVariant='primary']
 * @returns {{ container: object, text: object }}
 */
export function getButtonStyle(styleMap = {}, variant = 'primary', isDark = false, state = '', fallbackVariant = 'primary') {
  const themeKey = typeof isDark === 'string' ? isDark : getThemeKey(isDark);
  const stateKey = state || '';
  const suffix = `${themeKey}${stateKey}`;

  const container = resolveStyle(styleMap, [`${variant}${suffix}`, `base${suffix}`, `${fallbackVariant}${suffix}`]);
  const text = resolveStyle(styleMap, [`text_${variant}${suffix}`, `text${suffix}`, `text_${fallbackVariant}${suffix}`]);

  return { container, text };
}
