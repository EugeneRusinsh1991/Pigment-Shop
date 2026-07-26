import { useTheme } from '../../context/ThemeContext';
import { styleMap, variantStyles, slotStyles, getShadowStyle } from './CardStyles';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

/**
 * Resolves active theme tokens & style overrides for the Card primitive module.
 */
export function useCardTheme({ isDarkProp, variant = 'grid', elevated = false } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();
  const baseContainerStyle = isDark ? styleMap.containerDark : styleMap.containerLight;
  const variantStyle = variantStyles[variant] || variantStyles.grid;
  const shadowStyle = getShadowStyle(isDark, elevated);

  return {
    isDark,
    containerStyle: [baseContainerStyle, variantStyle, shadowStyle],
    titleStyle: [slotStyles.title, isDark ? slotStyles.titleDark : slotStyles.titleLight],
    skeletonStyle: [slotStyles.skeleton, isDark ? slotStyles.skeletonDark : null],
    cardBgColor: isDark ? styleMap.cardBgDark : styleMap.cardBgLight,
  };
}
