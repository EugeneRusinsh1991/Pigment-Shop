// @audit-keep
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';
import { createBreadcrumbStyles, createPaginationStyles } from './NavigationStyles';

export function useNavigationTheme(isDarkProps) {
  const { isDark: themeIsDark } = useTheme();
  const { t, lang } = useLanguage();
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


