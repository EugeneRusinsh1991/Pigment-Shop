import { useTheme } from '../../context/ThemeContext';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

function getStyle(styleMap, isDark, darkKey, lightKey) {
  if (!styleMap) return undefined;
  return isDark ? styleMap[darkKey] : styleMap[lightKey];
}

/**
 * Resolves active theme tokens & style overrides for the Flag primitive module.
 */
export function useFlagTheme({ isDarkProp, styleMap } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();

  return {
    isDark,
    container: getStyle(styleMap, isDark, 'containerDark', 'containerLight'),
    active: getStyle(styleMap, isDark, 'activeDark', 'activeLight'),
    text: getStyle(styleMap, isDark, 'textDark', 'textLight'),
    activeText: getStyle(styleMap, isDark, 'activeTextDark', 'activeTextLight'),
  };
}
