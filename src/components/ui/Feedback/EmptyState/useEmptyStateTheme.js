// @audit-keep
import { useTheme } from '../../../../context/ThemeContext';
import { colors } from '../../../../theme/tokens';
import { styles } from './EmptyStateStyles';

export function useEmptyStateTheme() {
  const { isDark } = useTheme();

  return {
    textColor: isDark ? colors.textDark : colors.textLight,
    mutedColor: isDark ? colors.textMutedDark : colors.textMutedLight,
    styles,
  };
}
