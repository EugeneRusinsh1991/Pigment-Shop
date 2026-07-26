import { useTheme } from '@/context/ThemeContext';
import { createPaginationStyles } from './PaginationStyles';
import { useMemo } from 'react';

export function usePaginationTheme(isDarkProps) {
  const { t, isDark: themeIsDark } = useTheme();
  const isDark = isDarkProps !== undefined ? isDarkProps : themeIsDark;
  const styles = useMemo(() => createPaginationStyles(isDark), [isDark]);
  
  return {
    t,
    isDark,
    styles,
  };
}
