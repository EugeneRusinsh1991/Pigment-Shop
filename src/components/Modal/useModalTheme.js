import { useTheme } from '../../context/ThemeContext';
import { colors, shadows } from '../../theme/tokens';
import { Platform } from 'react-native';

export function useModalTheme() {
  const { isDark } = useTheme();

  return {
    overlayBg: 'rgba(0, 0, 0, 0.6)',
    cardBg: isDark ? colors.surfaceDark : colors.surfaceLight,
    titleColor: isDark ? colors.textDark : colors.textLight,
    messageColor: isDark ? colors.textMutedDark : colors.textMutedLight,
    cardShadow: Platform.OS === 'web' 
      ? (isDark ? shadows.modalDark.web : shadows.modalLight.web)
      : (isDark ? shadows.modalDark.elevation : shadows.modalLight.elevation)
  };
}
