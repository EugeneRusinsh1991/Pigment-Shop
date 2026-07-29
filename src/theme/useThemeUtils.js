import { useTheme } from '../context/ThemeContext';

export function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

export function getStyle(styleMap, isDark, darkKey, lightKey) {
  if (!styleMap) return undefined;
  return isDark ? styleMap[darkKey] : styleMap[lightKey];
}

export function resolveThemeColor(isDark, darkColor, lightColor) {
  return isDark ? darkColor : lightColor;
}

export function useResolvedTheme() {
  const isDark = getIsDarkContext();
  return {
    isDark,
    themeKey: isDark ? 'Dark' : 'Light',
  };
}

