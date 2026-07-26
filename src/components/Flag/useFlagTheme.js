import { useTheme } from '../../context/ThemeContext';

/**
 * Resolves active theme tokens & style overrides for the Flag primitive module.
 */
export function useFlagTheme({ isDarkProp, styleMap } = {}) {
  let isDarkContext = false;
  try {
    const themeCtx = useTheme();
    isDarkContext = themeCtx?.isDark ?? false;
  } catch (e) {
    isDarkContext = false;
  }

  const isDark = isDarkProp ?? isDarkContext;

  return {
    isDark,
    container: isDark ? styleMap?.containerDark : styleMap?.containerLight,
    active: isDark ? styleMap?.activeDark : styleMap?.activeLight,
    text: isDark ? styleMap?.textDark : styleMap?.textLight,
    activeText: isDark ? styleMap?.activeTextDark : styleMap?.activeTextLight,
  };
}
