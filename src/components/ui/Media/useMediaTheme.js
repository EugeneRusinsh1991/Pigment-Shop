// @audit-keep
import { useTheme } from '../../../context/ThemeContext';
import { colors } from '../../../theme/tokens';

export function useMediaTheme() {
  const { isDark } = useTheme();

  return {
    overlayBg: isDark ? colors.overlayDark : colors.overlayScrim,
    iconColor: colors.white,
    containerBg: colors.black,
  };
}
