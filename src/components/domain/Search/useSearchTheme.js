import { useTheme } from '../../../context/ThemeContext';
import { colors } from '../../../theme/tokens';

function resolveStyle(styleMap, keys) {
  if (!styleMap) return undefined;
  for (const k of keys) {
    if (styleMap[k]) return styleMap[k];
  }
  return undefined;
}

export function useSearchTheme({ isDarkProp, variant = 'default', state = '', fallbackVariant = 'default', styleMap } = {}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const themeKey = isDark ? 'Dark' : 'Light';
  const suffix = `${themeKey}${state}`;

  const container = resolveStyle(styleMap, [`${variant}${suffix}`, `base${suffix}`, `${fallbackVariant}${suffix}`]);
  const text = resolveStyle(styleMap, [`text_${variant}${suffix}`, `text${suffix}`, `text_${fallbackVariant}${suffix}`]);
  const icon = resolveStyle(styleMap, [`icon_${variant}${suffix}`, `icon${suffix}`, `icon_${fallbackVariant}${suffix}`]);
  const placeholderColor = isDark ? colors.textSubtleDark : colors.textSubtleLight;

  return {
    isDark,
    themeKey,
    container,
    text,
    icon,
    placeholderColor
  };
}


