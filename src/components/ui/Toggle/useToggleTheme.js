import { useTheme } from '../../../context/ThemeContext';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

function getStyle(styleMap, isDark, key) {
  if (!styleMap) return undefined;
  return isDark ? styleMap[key] : null;
}

export function useToggleTheme({ isDarkProp, styleMap } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();

  return {
    isDark,
    container: getStyle(styleMap, isDark, 'containerDark'),
    activeOption: getStyle(styleMap, isDark, 'activeOptionDark'),
    text: getStyle(styleMap, isDark, 'textBaseDark'),
    activeText: getStyle(styleMap, isDark, 'activeTextDark'),
  };
}
