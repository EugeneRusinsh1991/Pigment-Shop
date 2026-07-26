import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

export function useDataTableTheme({ isDarkProp } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();

  const surfaceColor = isDark ? colors.surfaceDark : colors.surfaceLight;
  const headerBgColor = isDark ? colors.surfaceNeutralDark : colors.slateLight;
  const headerBorderColor = isDark ? colors.borderSlateDark : colors.borderSlateLight;
  const headerTextColor = isDark ? colors.textMutedDark : colors.slateText;
  const rowAltBgColor = isDark ? colors.surfaceSubtleDark : colors.surfaceSubtleLight;
  const rowBorderColor = colors.borderLight;

  return {
    isDark,
    surfaceColor,
    headerBgColor,
    headerBorderColor,
    headerTextColor,
    rowAltBgColor,
    rowBorderColor,
  };
}

export default useDataTableTheme;
