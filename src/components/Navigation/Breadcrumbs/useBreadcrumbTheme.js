import { useNavigationTheme } from '../useNavigationTheme';

export function useBreadcrumbTheme(isDarkProps) {
  const { t, lang, isDark, breadcrumbStyles } = useNavigationTheme(isDarkProps);
  return {
    t,
    lang,
    isDark,
    styles: breadcrumbStyles,
  };
}

export default useBreadcrumbTheme;
