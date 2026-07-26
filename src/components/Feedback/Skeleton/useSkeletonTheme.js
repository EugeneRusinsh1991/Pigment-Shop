import { useTheme } from '../../../context/ThemeContext';
import { colors } from '../../../theme/tokens';
import { styles } from './SkeletonStyles';

export function useSkeletonTheme() {
  const { isDark } = useTheme();

  return {
    backgroundColor: isDark ? colors.surfaceSubtleDark : colors.neutralLightStrong,
    styles,
  };
}
