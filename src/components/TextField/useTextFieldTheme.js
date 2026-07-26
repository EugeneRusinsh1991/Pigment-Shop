import { useTheme } from '../../context/ThemeContext';

/**
 * Resolves dynamic surface, text, border, and dark mode tokens for TextField primitive.
 */
export function useTextFieldTheme({ isDarkProp, disabled = false, error = false, styleMap } = {}) {
  let isDarkContext = false;
  try {
    const themeCtx = useTheme();
    isDarkContext = themeCtx?.isDark ?? false;
  } catch (e) {
    isDarkContext = false;
  }

  const isDark = isDarkProp ?? isDarkContext;
  const themeKey = isDark ? 'Dark' : 'Light';

  const surface = isDark ? styleMap?.surfaceDark : styleMap?.surfaceLight;
  const text = isDark ? styleMap?.textDark : styleMap?.textLight;
  const border = error
    ? (isDark ? styleMap?.borderErrorDark : styleMap?.borderErrorLight)
    : (isDark ? styleMap?.borderDark : styleMap?.borderLight);
  const label = isDark ? styleMap?.labelDark : styleMap?.labelLight;
  const helper = error
    ? (isDark ? styleMap?.helperErrorDark : styleMap?.helperErrorLight)
    : (isDark ? styleMap?.helperDark : styleMap?.helperLight);
  const placeholderColor = isDark ? '#9CA3AF' : '#6B7280';
  const iconColor = isDark ? '#9CA3AF' : '#6B7280';

  return {
    isDark,
    themeKey,
    surface,
    text,
    border,
    label,
    helper,
    placeholderColor,
    iconColor,
  };
}
