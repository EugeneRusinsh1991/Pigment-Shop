import { motion, buttonTokens } from './tokens';

export const DEFAULT_ACTIVE_OPACITY = motion.press.activeOpacity;
const BUTTON_SIZES = buttonTokens.sizes;

function getThemeKey(isDark) {
  return isDark ? 'Dark' : 'Light';
}

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


