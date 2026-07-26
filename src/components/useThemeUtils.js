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
