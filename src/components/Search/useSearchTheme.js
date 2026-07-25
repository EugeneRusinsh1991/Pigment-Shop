import { useTheme } from '../../context/ThemeContext';

export function resolveStyle(styleMap, keys) {
  if (!styleMap) return null;
  for (const k of keys) {
    if (styleMap[k]) return styleMap[k];
  }
  return null;
}

export function useSearchTheme({ isDarkProp, variant = 'default', state = '', fallbackVariant = 'default', styleMap } = {}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const themeKey = isDark ? 'Dark' : 'Light';
  const suffix = `${themeKey}${state}`;

  const container = resolveStyle(styleMap, [`${variant}${suffix}`, `base${suffix}`, `${fallbackVariant}${suffix}`]);
  const text = resolveStyle(styleMap, [`text_${variant}${suffix}`, `text${suffix}`, `text_${fallbackVariant}${suffix}`]);
  const icon = resolveStyle(styleMap, [`icon_${variant}${suffix}`, `icon${suffix}`, `icon_${fallbackVariant}${suffix}`]);
  const placeholderColor = isDark ? '#9CA3AF' : '#6B7280';

  return { isDark, themeKey, container, text, icon, placeholderColor };
}
