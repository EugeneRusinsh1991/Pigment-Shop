import { useTheme } from '../../context/ThemeContext';
import { getFeedbackStyle } from './FeedbackStyles';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

/**
 * Hook for resolving theme context and styles for Feedback module.
 */
function useFeedbackTheme({ isDarkProp } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();
  const styles = getFeedbackStyle({ isDark });

  return {
    isDark,
    styles,
  };
}
