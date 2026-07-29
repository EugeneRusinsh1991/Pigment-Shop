import { useTheme } from '../../../context/ThemeContext';
import { colors, layout, typography } from '../../../theme/tokens';
import ButtonStyles from './ButtonStyles';

function resolveStyle(styleMap, keys) {
  if (!styleMap) return undefined;
  for (const k of keys) {
    if (styleMap[k]) return styleMap[k];
  }
  return undefined;
}

function resolveIsDark(isDarkProp) {
  if (typeof isDarkProp === 'boolean') return isDarkProp;
  try {
    const themeCtx = useTheme();
    return Boolean(themeCtx?.isDark);
  } catch {
    return false;
  }
}

export function useButtonTheme({
  isDarkProp,
  variant = 'primary',
  state = '',
  fallbackVariant = 'primary',
  styleMap = ButtonStyles,
} = {}) {
  const isDark = resolveIsDark(isDarkProp);

  const themeKey = isDark ? 'Dark' : 'Light';
  const suffix = `${themeKey}${state}`;

  const defaultContainer = { padding: layout.spacing.md, borderRadius: layout.radii.xs };
  const defaultText = { color: colors.textLight };

  const container = resolveStyle(styleMap, [`${variant}${suffix}`, `base${suffix}`, `${fallbackVariant}${suffix}`]) || defaultContainer;
  const text = resolveStyle(styleMap, [`text_${variant}${suffix}`, `text${suffix}`, `text_${fallbackVariant}${suffix}`]) || defaultText;

  return {
    isDark,
    themeKey,
    container,
    text
  };
}


