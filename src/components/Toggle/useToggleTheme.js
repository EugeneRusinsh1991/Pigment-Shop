import { useTheme } from '../../context/ThemeContext';

export function useToggleTheme({ isDarkProp, styleMap } = {}) {
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
    container: isDark ? styleMap?.containerDark : null,
    activeOption: isDark ? styleMap?.activeOptionDark : null,
    text: isDark ? styleMap?.textBaseDark : null,
    activeText: isDark ? styleMap?.activeTextDark : null,
  };
}
