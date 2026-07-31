// @audit-keep
import { useTheme } from '../../../../context/ThemeContext';
import { colors } from '../../../../theme/tokens';
import { styles } from './SkeletonStyles';

export function useSkeletonTheme() {
  const { isDark } = useTheme();

  return {
    backgroundColor: isDark ? colors.surfaceSkeletonDark : colors.surfaceSkeletonLight,
    styles,
  };
}
