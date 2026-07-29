import { useTheme } from '@/context/ThemeContext';
import { useMemo } from 'react';
import { createBreadcrumbStyles, createPaginationStyles } from './NavigationStyles';

export function useNavigationTheme(isDarkProps) {
  const { t, lang, isDark: themeIsDark } = useTheme();
  const isDark = isDarkProps !== undefined ? isDarkProps : themeIsDark;

  const breadcrumbStyles = useMemo(() => createBreadcrumbStyles(isDark), [isDark]);
  const paginationStyles = useMemo(() => createPaginationStyles(isDark), [isDark]);

  return {
    t,
    lang,
    isDark,
    breadcrumbStyles,
    paginationStyles,
  };
}


