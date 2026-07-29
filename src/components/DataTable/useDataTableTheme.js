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

function chooseColor(isDark, darkColor, lightColor) {
  return isDark ? darkColor : lightColor;
}

function useDataTableTheme({ isDarkProp } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();

  const surfaceColor = chooseColor(isDark, colors.surfaceDark, colors.surfaceLight);
  const headerBgColor = chooseColor(isDark, colors.surfaceNeutralDark, colors.slateLight);
  const headerBorderColor = chooseColor(isDark, colors.borderSlateDark, colors.borderSlateLight);
  const headerTextColor = chooseColor(isDark, colors.textMutedDark, colors.slateText);
  const rowAltBgColor = chooseColor(isDark, colors.surfaceSubtleDark, colors.surfaceSubtleLight);
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
