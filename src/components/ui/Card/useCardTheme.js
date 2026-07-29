import { useTheme } from '../../../context/ThemeContext';
import { styleMap, variantStyles, slotStyles, getShadowStyle } from './CardStyles';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

function resolveDarkStyle(isDark, darkStyle, lightStyle) {
  return isDark ? darkStyle : lightStyle;
}

/**
 * Resolves active theme tokens & style overrides for the Card primitive module.
 */
export function useCardTheme({ isDarkProp, variant = 'grid', elevated = false } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();
  const baseContainerStyle = resolveDarkStyle(isDark, styleMap.containerDark, styleMap.containerLight);
  const variantStyle = variantStyles[variant] || variantStyles.grid;
  const shadowStyle = getShadowStyle(isDark, elevated);
  const titleStyle = [slotStyles.title, resolveDarkStyle(isDark, slotStyles.titleDark, slotStyles.titleLight)];
  const skeletonStyle = [slotStyles.skeleton, isDark ? slotStyles.skeletonDark : null];
  const cardBgColor = resolveDarkStyle(isDark, styleMap.cardBgDark, styleMap.cardBgLight);

  return {
    isDark,
    containerStyle: [baseContainerStyle, variantStyle, shadowStyle],
    titleStyle,
    skeletonStyle,
    cardBgColor,
  };
}
