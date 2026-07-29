// @audit-keep
import { useNavigationTheme } from '../useNavigationTheme';

export function usePaginationTheme(isDarkProps) {
  const { t, lang, isDark, paginationStyles } = useNavigationTheme(isDarkProps);
  return {
    t,
    lang,
    isDark,
    styles: paginationStyles,
  };
}


