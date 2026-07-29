import { useTheme } from '../../../context/ThemeContext';
import { getBadgeStyle } from './BadgeStyles';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

/**
 * Hook for resolving theme context, dark mode support, and dynamic variant styling for Badge primitive.
 */
export function useBadgeTheme({
  isDarkProp,
  variant = 'product',
  status = 'pending',
  size = 'md',
  selected = false,
  customColor,
} = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();

  const styles = getBadgeStyle({
    variant,
    status,
    size,
    selected,
    isDark,
    customColor,
  });

  return {
    isDark,
    styles,
    containerStyle: styles.container,
    textStyle: styles.text,
  };
}
