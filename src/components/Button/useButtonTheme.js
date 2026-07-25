import { useTheme } from '../../context/ThemeContext';

function resolveStyle(styleMap, keys) {
  for (const k of keys) {
    if (styleMap[k]) return styleMap[k];
  }
  return null;
}

export function useButtonTheme({ isDarkProp, variant, state = '', fallbackVariant = 'primary', styleMap }) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const themeKey = isDark ? 'Dark' : 'Light';
  const suffix = `${themeKey}${state}`;

  const container = resolveStyle(styleMap, [`${variant}${suffix}`, `base${suffix}`, `${fallbackVariant}${suffix}`]);
  const text = resolveStyle(styleMap, [`text_${variant}${suffix}`, `text${suffix}`, `text_${fallbackVariant}${suffix}`]);

  return { isDark, themeKey, container, text };
}
