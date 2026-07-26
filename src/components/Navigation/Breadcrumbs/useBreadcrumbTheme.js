import { useTheme } from '@/context/ThemeContext';
import { createBreadcrumbStyles } from './BreadcrumbStyles';
import { useMemo } from 'react';

export function useBreadcrumbTheme(isDarkProps) {
  const { t, lang, isDark: themeIsDark } = useTheme();
  const isDark = isDarkProps !== undefined ? isDarkProps : themeIsDark;
  const styles = useMemo(() => createBreadcrumbStyles(isDark), [isDark]);
  
  return {
    t,
    lang,
    isDark,
    styles,
  };
}
