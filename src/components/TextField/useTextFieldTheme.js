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

function getBorderColor(isDark, error, styleMap) {
  if (!styleMap) return undefined;
  if (error) return isDark ? styleMap.borderErrorDark : styleMap.borderErrorLight;
  return isDark ? styleMap.borderDark : styleMap.borderLight;
}

function getHelperColor(isDark, error, styleMap) {
  if (!styleMap) return undefined;
  if (error) return isDark ? styleMap.helperErrorDark : styleMap.helperErrorLight;
  return isDark ? styleMap.helperDark : styleMap.helperLight;
}

/**
 * Resolves dynamic surface, text, border, and dark mode tokens for TextField primitive.
 */
export function useTextFieldTheme({ isDarkProp, disabled = false, error = false, styleMap } = {}) {
  const isDarkContext = getIsDarkContext();
  const isDark = isDarkProp ?? isDarkContext;
  const themeKey = isDark ? 'Dark' : 'Light';

  return {
    isDark,
    themeKey,
    surface: getStyle(styleMap, isDark, 'surfaceDark', 'surfaceLight'),
    text: getStyle(styleMap, isDark, 'textDark', 'textLight'),
    border: getBorderColor(isDark, error, styleMap),
    label: getStyle(styleMap, isDark, 'labelDark', 'labelLight'),
    helper: getHelperColor(isDark, error, styleMap),
    placeholderColor: isDark ? '#9CA3AF' : '#6B7280',
    iconColor: isDark ? '#9CA3AF' : '#6B7280',
  };
}
