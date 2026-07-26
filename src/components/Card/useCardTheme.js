import { useTheme } from '../../context/ThemeContext';
import { styleMap, variantStyles, slotStyles, getShadowStyle } from './CardStyles';

/**
 * Resolves active theme tokens & style overrides for the Card primitive module.
 */
export function useCardTheme({ isDarkProp, variant = 'grid', elevated = false } = {}) {
  let isDarkContext = false;
  try {
    const themeCtx = useTheme();
    isDarkContext = themeCtx?.isDark ?? false;
  } catch (e) {
    isDarkContext = false;
  }

  const isDark = isDarkProp ?? isDarkContext;
  const baseContainerStyle = isDark ? styleMap.containerDark : styleMap.containerLight;
  const variantStyle = variantStyles[variant] || variantStyles.grid;
  const shadowStyle = getShadowStyle(isDark, elevated);

  return {
    isDark,
    containerStyle: [baseContainerStyle, variantStyle, shadowStyle],
    titleStyle: [slotStyles.title, isDark ? slotStyles.titleDark : slotStyles.titleLight],
    skeletonStyle: [slotStyles.skeleton, isDark && slotStyles.skeletonDark],
    cardBgColor: isDark ? styleMap.cardBgDark : styleMap.cardBgLight,
  };
}
