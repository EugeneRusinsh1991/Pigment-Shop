/**
 * @audit-keep Theme hook for InlineError component
 */
import { useTheme } from '../../../context/ThemeContext';
import { colors } from '../../../theme/tokens';
import { styles } from './FieldErrorStyles';

export function useInlineErrorTheme() {
  const { isDark } = useTheme();

  return {
    textColor: isDark ? colors.dangerLight : colors.dangerDeep,
    styles,
  };
}
