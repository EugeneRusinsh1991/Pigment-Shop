// @audit-keep
import { useTheme } from '../../../context/ThemeContext';
import FooterStyles from './FooterStyles';

export function useFooterTheme({ isDarkProp } = {}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;

  const containerStyle = [
    FooterStyles.footer,
    isDark ? FooterStyles.footerDark : FooterStyles.footerLight,
  ];

  return {
    isDark,
    containerStyle,
  };
}


