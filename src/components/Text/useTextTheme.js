import { useTheme } from '../../context/ThemeContext';
import { getTextStyle } from './TextStyles';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

/**
 * Hook for resolving theme context, dark mode support, and dynamic typography styling.
 */
export function useTextTheme({
  isDarkProp,
  variant = 'body1',
  color = 'primary',
  align,
  weight,
  font,
  size,
  lineHeight,
} = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();

  const styles = getTextStyle({
    variant,
    color,
    isDark,
    align,
    weight,
    font,
    size,
    lineHeight,
  });

  return {
    isDark,
    styles,
    textStyle: styles.text,
  };
}
