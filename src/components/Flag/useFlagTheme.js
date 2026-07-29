// @audit-keep
import { getIsDarkContext, getStyle } from '../../theme/useThemeUtils';

/**
 * Resolves active theme tokens & style overrides for the Flag primitive module.
 */
export function useFlagTheme({ isDarkProp, styleMap } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();

  return {
    isDark,
    container: getStyle(styleMap, isDark, 'containerDark', 'containerLight'),
    active: getStyle(styleMap, isDark, 'activeDark', 'activeLight'),
    text: getStyle(styleMap, isDark, 'textDark', 'textLight'),
    activeText: getStyle(styleMap, isDark, 'activeTextDark', 'activeTextLight'),
  };
}
