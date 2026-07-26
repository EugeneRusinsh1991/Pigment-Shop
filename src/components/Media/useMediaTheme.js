import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';

export function useMediaTheme() {
  const { isDark } = useTheme();

  return {
    overlayBg: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)',
    iconColor: colors.white,
    containerBg: colors.black,
  };
}
