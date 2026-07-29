// @audit-keep
import { Platform } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { colors, shadows } from '../../../theme/tokens';

export function useModalTheme() {
  const { isDark } = useTheme();

  return {
    overlayBg: colors.overlayScrim,
    cardBg: isDark ? colors.surfaceDark : colors.surfaceLight,
    titleColor: isDark ? colors.textDark : colors.textLight,
    messageColor: isDark ? colors.textMutedDark : colors.textMutedLight,
    cardShadow: getModalShadow(isDark)
  };
}

function getModalShadow(isDark) {
  if (Platform.OS === 'web') {
    return isDark ? shadows.modalDark.web : shadows.modalLight.web;
  }

  return isDark ? shadows.modalDark.elevation : shadows.modalLight.elevation;
}
