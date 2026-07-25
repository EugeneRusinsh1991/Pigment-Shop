import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors, layout, shadows } from '../theme/tokens';
import { useTheme } from '../context/ThemeContext';

const TOAST_THEMES = {
  light: {
    error:   { bg: colors.dangerBgLight,  text: colors.dangerDeep,  border: colors.dangerMid },
    success: { bg: colors.successBgLight, text: colors.successDeep, border: colors.successMid },
    default: { bg: colors.surfaceLight,   text: colors.textLight,   border: colors.borderLight },
  },
  dark: {
    error:   { bg: colors.dangerDarkShellBg, text: colors.textDark,    border: colors.dangerMid },
    success: { bg: colors.navSurfaceDark,    text: colors.successLight, border: colors.successMid },
    default: { bg: colors.surfaceDark,       text: colors.textDark,     border: colors.borderDark },
  },
};

function resolveToastTheme(type, isDark) {
  const map = isDark ? TOAST_THEMES.dark : TOAST_THEMES.light;
  return map[type] || map.default;
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
