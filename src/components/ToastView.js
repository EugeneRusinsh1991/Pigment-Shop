import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors, layout, shadows } from '../theme/tokens';
import { useTheme } from '../context/ThemeContext';

function resolveToastTheme(type, isDark) {
  const themes = {
    error: {
      bg: isDark ? colors.dangerDarkShellBg : colors.dangerBgLight,
      text: isDark ? colors.textDark : colors.dangerDeep,
      border: colors.dangerMid,
    },
    success: {
      bg: isDark ? colors.navSurfaceDark : colors.successBgLight,
      text: isDark ? colors.successLight : colors.successDeep,
      border: colors.successMid,
    },
    default: {
      bg: isDark ? colors.surfaceDark : colors.surfaceLight,
      text: isDark ? colors.textDark : colors.textLight,
      border: isDark ? colors.borderDark : colors.borderLight,
    },
  };
  return themes[type] || themes.default;
}

export function ToastView({ toast, fadeAnim }) {
  const { isDark } = useTheme();

  if (!toast) return null;

  const { bg: toastBg, text: textColor, border: borderColor } = resolveToastTheme(toast.type, isDark);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: toastBg,
          borderColor,
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}
      pointerEvents="none"
    >
      <Text style={[styles.text, { color: textColor }]}>{toast.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: layout.radii.md,
    borderWidth: 1,
    maxWidth: '90%',
    zIndex: layout.zIndices.toast,
    ...shadows.dropdownLight.web,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
