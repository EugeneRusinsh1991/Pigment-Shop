import { useTheme } from '../../context/ThemeContext';

function getIsDarkContext() {
  try {
    const themeCtx = useTheme();
    return themeCtx?.isDark ?? false;
  } catch (e) {
    return false;
  }
}

export function useSharedLayoutWrapperTheme({ isDarkProp } = {}) {
  const isDark = isDarkProp ?? getIsDarkContext();
  return { isDark };
}

export default useSharedLayoutWrapperTheme;
