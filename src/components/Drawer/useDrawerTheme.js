import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

export function useDrawerTheme({ isDarkProp, styleMap } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();

  const overlayColor = colors.overlayScrim;
  const borderColor = isDark ? colors.borderDark : colors.secondaryLightBorder;
  const panelStyle = isDark ? styleMap?.panelDark : styleMap?.panelLight;

  return {
    isDark,
    overlayColor,
    panelStyle,
    borderColor,
    styles: {
      overlay: { backgroundColor: overlayColor },
      border: { borderColor },
    },
  };
}


