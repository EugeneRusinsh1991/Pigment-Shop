// @audit-keep
import { colors } from '../../../../theme/tokens';
import { useTheme } from '../../../../context/ThemeContext';
import { styles } from './ToastStyles';

const TOAST_THEMES = {
  light: {
    error:   { bg: colors.dangerBgLight,  text: colors.dangerDeep,  border: colors.dangerMid },
    success: { bg: colors.successBgLight, text: colors.successDeep, border: colors.successMid },
    default: { bg: colors.surfaceLight,   text: colors.textLight,   border: colors.borderLight },
  },
  dark: {
    error:   { bg: colors.dangerDarkShellBg, text: colors.textDark,    border: colors.dangerMid },
    success: { bg: colors.navSurfaceDark,    text: colors.successLight, border: colors.successMid },
    default: { bg: colors.surfaceDark,       text: colors.textDark,     border: colors.borderDark },
  },
};

export function useToastTheme(type) {
  const { isDark } = useTheme();
  const map = isDark ? TOAST_THEMES.dark : TOAST_THEMES.light;
  return { ...(map[type] || map.default), styles };
}
