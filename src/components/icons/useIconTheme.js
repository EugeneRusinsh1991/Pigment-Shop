import { useTheme } from '../../context/ThemeContext';
import { getIconColor, getIconSize } from './IconsStyles';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

/**
 * Hook for resolving theme context, dark mode support, dynamic colors and sizes for icons.
 */
export function useIconTheme({
  isDark: isDarkProp,
  color = 'currentColor',
  size = 24,
} = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();
  const resolvedColor = getIconColor(color, isDark);
  const resolvedSize = getIconSize(size);

  return {
    isDark,
    color: resolvedColor,
    size: resolvedSize,
  };
}
