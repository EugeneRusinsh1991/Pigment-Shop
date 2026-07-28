import { useTheme } from '../../context/ThemeContext';
import { colors, layout, typography } from '../../theme/tokens';
import ButtonStyles from './ButtonStyles';

function resolveStyle(styleMap, keys) {
  if (!styleMap) return null;
  for (const k of keys) {
    if (styleMap[k]) return styleMap[k];
  }
  return null;
}

export function useButtonTheme({
  isDarkProp,
  variant = 'primary',
  state = '',
  fallbackVariant = 'primary',
  styleMap = ButtonStyles,
} = {}) {
  let isDark = false;
  try {
    const themeCtx = useTheme();
    isDark = isDarkProp ?? themeCtx?.isDark ?? false;
  } catch (e) {
    isDark = isDarkProp ?? false;
  }

  const themeKey = isDark ? 'Dark' : 'Light';
  const suffix = `${themeKey}${state}`;

  const defaultContainer = { padding: layout.spacing.md, borderRadius: layout.radii.xs };
  const defaultText = { color: colors.textLight, fontSize: typography.sizes.sm };

  const container = resolveStyle(styleMap, [`${variant}${suffix}`, `base${suffix}`, `${fallbackVariant}${suffix}`]) || defaultContainer;
  const text = resolveStyle(styleMap, [`text_${variant}${suffix}`, `text${suffix}`, `text_${fallbackVariant}${suffix}`]) || defaultText;

  return { isDark, themeKey, container, text };
}

export default useButtonTheme;
